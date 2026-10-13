import { useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Cloud,
  Container,
  FileSearch,
  Gauge,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const infrastructure = [
  {
    id: "oci",
    label: "Cloud security",
    name: "OCI Vulnerability Scanning",
    meta: "ORACLE CLOUD · VSS",
    summary: "OCI host recipes and scheduled scans check the cloud server for vulnerable packages and exposed ports.",
    Icon: Cloud,
  },
  {
    id: "host",
    label: "Compute",
    name: "Linux cloud server",
    meta: "ORACLE CLOUD · UBUNTU",
    summary: "The Ubuntu Linux virtual machine is the homelab hub, hosting Docker services and on-host security audits.",
    Icon: Server,
  },
  {
    id: "docker",
    label: "Workloads",
    name: "Docker Engine",
    meta: "DOCKER · COMPOSE",
    summary: "Docker isolates services on the host. The control center queries the Docker API to inspect container names, images, ports, and status.",
    Icon: Container,
  },
  {
    id: "dashboard",
    label: "Monitoring",
    name: "Home Lab Control Center",
    meta: "PYTHON · STREAMLIT :8502",
    summary: "The dashboard reads CPU, memory, and disk usage with psutil, lists Docker containers, and can scan a subnet for SSH hosts.",
    Icon: Gauge,
  },
];

const securityFlow = [
  {
    id: "schedule",
    label: "Schedule",
    name: "Cron",
    meta: "WEEKLY SCAN",
    summary: "A scheduled Cron job runs the custom security-scan.sh script on the server.",
    Icon: Activity,
  },
  {
    id: "script",
    label: "Automation",
    name: "security-scan.sh",
    meta: "BASH · ON HOST",
    summary: "The shell script combines local operating system and filesystem checks into a repeatable scan.",
    Icon: Terminal,
  },
  {
    id: "lynis",
    label: "OS audit",
    name: "Lynis",
    meta: "SYSTEM HARDENING",
    summary: "Lynis audits Linux security configuration and surfaces hardening recommendations.",
    Icon: ShieldCheck,
  },
  {
    id: "trivy",
    label: "Filesystem scan",
    name: "Trivy",
    meta: "PACKAGES · /ETC",
    summary: "Trivy scans local files and packages for known vulnerabilities and secrets, including the /etc filesystem audit.",
    Icon: FileSearch,
  },
];

const components = [...infrastructure, ...securityFlow];

export default function Infrastructure() {
  const [selectedId, setSelectedId] = useState("host");
  const selected = components.find((component) => component.id === selectedId) ?? components[1];
  const SelectedIcon = selected.Icon;

  return (
    <section id="infrastructure" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="font-mono-tech mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9d9b96]">
        <span className="text-[#00C853]">■</span> 03 — Infrastructure
      </div>
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <h2 className="max-w-4xl text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-tighter">
          Under the <span className="text-outline-blue">hood</span>
        </h2>
        <p className="font-mono-tech max-w-sm text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[#9d9b96]">
          OCI homelab · documented topology · select a component to inspect
        </p>
      </div>

      <div className="border-y border-[rgba(242,240,235,0.14)] py-8 md:py-12">
        <div className="font-mono-tech mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#9d9b96]">
          <span className="h-px w-6 bg-[#2979FF]" /> Cloud to control center
        </div>
        <div className="grid grid-cols-1 items-stretch gap-y-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center md:gap-x-3">
          {infrastructure.map((component, index) => {
            const Icon = component.Icon;
            return (
              <div key={component.id} className="contents">
                <button
                  type="button"
                  aria-pressed={selectedId === component.id}
                  onClick={() => setSelectedId(component.id)}
                  className={`group min-h-36 border p-4 text-left transition-colors md:min-h-44 md:p-5 ${
                    selectedId === component.id
                      ? "border-[#2979FF] bg-[#101216]"
                      : "border-[rgba(242,240,235,0.14)] hover:border-[rgba(242,240,235,0.45)]"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <Icon aria-hidden="true" className={selectedId === component.id ? "text-[#2979FF]" : "text-[#9d9b96]"} size={19} strokeWidth={1.6} />
                    <span className="font-mono-tech text-[9px] tabular text-[#777671]">0{index + 1}</span>
                  </span>
                  <span className="font-mono-tech mt-5 block text-[9px] uppercase tracking-[0.14em] text-[#9d9b96]">{component.label}</span>
                  <span className="mt-1 block text-sm font-semibold leading-snug text-[#f2f0eb]">{component.name}</span>
                  <span className="font-mono-tech mt-2 block text-[8px] uppercase tracking-[0.08em] text-[#777671]">{component.meta}</span>
                </button>
                {index < infrastructure.length - 1 && (
                  <span aria-hidden="true" className="mx-auto text-[#2979FF] md:mx-0">
                    <ArrowRight className="hidden md:block" size={16} />
                    <ArrowDown className="md:hidden" size={16} />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 border-l-2 border-[#00C853] pl-4 md:ml-[12.5%] md:mt-10 md:pl-6">
          <div className="font-mono-tech mb-4 text-[10px] uppercase tracking-[0.18em] text-[#9d9b96]">
            On-host security loop <span className="text-[#00C853]">· scheduled</span>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-y-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center md:gap-x-3">
            {securityFlow.map((component, index) => {
              const Icon = component.Icon;
              return (
                <div key={component.id} className="contents">
                  <button
                    type="button"
                    aria-pressed={selectedId === component.id}
                    onClick={() => setSelectedId(component.id)}
                    className={`group min-h-32 border p-4 text-left transition-colors md:min-h-36 md:p-5 ${
                      selectedId === component.id
                        ? "border-[#00C853] bg-[#101411]"
                        : "border-[rgba(242,240,235,0.14)] hover:border-[rgba(242,240,235,0.45)]"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <Icon aria-hidden="true" className={selectedId === component.id ? "text-[#00C853]" : "text-[#9d9b96]"} size={18} strokeWidth={1.6} />
                      <span className="font-mono-tech text-[9px] tabular text-[#777671]">0{index + 1}</span>
                    </span>
                    <span className="font-mono-tech mt-4 block text-[9px] uppercase tracking-[0.14em] text-[#9d9b96]">{component.label}</span>
                    <span className="mt-1 block text-sm font-semibold leading-snug text-[#f2f0eb]">{component.name}</span>
                    <span className="font-mono-tech mt-2 block text-[8px] uppercase tracking-[0.08em] text-[#777671]">{component.meta}</span>
                  </button>
                  {index < securityFlow.length - 1 && (
                    <span aria-hidden="true" className="mx-auto text-[#00C853] md:mx-0">
                      <ArrowRight className="hidden md:block" size={16} />
                      <ArrowDown className="md:hidden" size={16} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div aria-live="polite" className="mt-8 grid gap-4 border-t border-[rgba(242,240,235,0.12)] pt-6 md:grid-cols-[auto_1fr] md:items-start md:gap-5">
          <span className="flex h-10 w-10 items-center justify-center border border-[rgba(242,240,235,0.16)] text-[#2979FF]">
            <SelectedIcon aria-hidden="true" size={18} strokeWidth={1.6} />
          </span>
          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#2979FF]">Component detail / {selected.meta}</div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#b3b1aa]">{selected.summary}</p>
          </div>
        </div>
      </div>
      <p className="font-mono-tech mt-5 text-[9px] uppercase tracking-[0.14em] text-[#777671]">
        Architecture based on the documented homelab inventory and project code. This diagram is not connected to live server telemetry.
      </p>
    </section>
  );
}