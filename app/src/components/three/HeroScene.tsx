import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const isCoarse =
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/* ---------- GLSL ---------- */

const noiseGLSL = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const blobVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vView;
${noiseGLSL}
void main() {
  float n = snoise(position * uFreq + uTime * 0.35);
  float n2 = snoise(position * uFreq * 2.3 - uTime * 0.2) * 0.35;
  float displacement = (n + n2) * uAmp;
  vec3 newPos = position + normal * displacement;
  vNoise = n + n2;
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(newPos, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const blobFragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
  vec3 base = mix(uColorA, uColorB, smoothstep(-0.6, 0.8, vNoise));
  vec3 col = base * 0.22 + base * fresnel * 1.6;
  gl_FragColor = vec4(col, 1.0);
}
`;

/* ---------- Components ---------- */

function Blob() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: isCoarse ? 0.28 : 0.34 },
      uFreq: { value: 1.15 },
      uColorA: { value: new THREE.Color("#2979FF") },
      uColorB: { value: new THREE.Color("#00C853") },
    }),
    []
  );
  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh>
      <icosahedronGeometry args={[1.55, isCoarse ? 32 : 48]} />
      <shaderMaterial
        ref={mat}
        vertexShader={blobVertex}
        fragmentShader={blobFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function WireShell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.08;
    ref.current.rotation.x += delta * 0.03;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} scale={1.55}>
      <icosahedronGeometry args={[1.9, 1]} />
      <meshBasicMaterial color="#2979FF" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function Rings() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!g.current) return;
    g.current.rotation.z += delta * 0.05;
    g.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.4;
  });
  return (
    <group ref={g} rotation={[Math.PI / 2.6, 0, 0]}>
      <mesh>
        <torusGeometry args={[3.1, 0.006, 8, 128]} />
        <meshBasicMaterial color="#2979FF" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[3.6, 0.004, 8, 128]} />
        <meshBasicMaterial color="#f2f0eb" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = isCoarse ? 900 : 2600;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#2979FF"),
      new THREE.Color("#00C853"),
      new THREE.Color("#f2f0eb"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* Pointer parallax + scroll rig */
function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  useFrame((state, delta) => {
    if (!g.current) return;
    const px = state.pointer.x;
    const py = state.pointer.y;
    target.current.x = py * 0.25;
    target.current.y = px * 0.4;
    g.current.rotation.x = THREE.MathUtils.damp(
      g.current.rotation.x,
      target.current.x,
      2.5,
      delta
    );
    g.current.rotation.y = THREE.MathUtils.damp(
      g.current.rotation.y,
      target.current.y + state.clock.elapsedTime * 0.05,
      2.5,
      delta
    );
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.4);
    g.current.position.y = scroll * 1.6;
    g.current.position.x = isCoarse ? 0 : scroll * -1.2;
    const s = 1 - scroll * 0.18;
    g.current.scale.setScalar(Math.max(s, 0.6));
  });
  return <group ref={g}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Rig>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
          <group position={isCoarse ? [0, 0.4, 0] : [1.6, 0, 0]}>
            <Blob />
            <WireShell />
            <Rings />
          </group>
        </Float>
        <Particles />
      </Rig>
    </Canvas>
  );
}
