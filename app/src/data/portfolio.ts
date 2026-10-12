export const profile = {
  name: "JOHN WILLIAMS",
  firstName: "JOHN",
  lastName: "WILLIAMS",
  role: "Aspiring Cloud Engineer",
  tagline: "CompTIA Network+ certified professional building cloud infrastructure, homelabs, and automated systems.",
  location: "United Kingdom / Remote",
  email: "john_williams_400@hotmail.co.uk",
  availability: "Open to Cloud & IT Support roles — 2026",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Résumé (PDF)", href: "#" },
  ],
};

export const marqueeItems = [
  "AWS S3",
  "CloudFront",
  "CompTIA Network+",
  "Linux (Ubuntu/Mint)",
  "Docker",
  "Terraform",
  "Python",
  "Networking & Security",
  "Netplan & Bash",
  "Homelab Architecture",
];

export const stats = [
  { value: "Network+", label: "CompTIA Certified" },
  { value: "100%", label: "Hands-on Homelabs" },
  { value: "AWS", label: "S3 & CloudFront" },
  { value: "Linux", label: "Server Hardened" },
];

export type Project = {
  index: string;
  title: string;
  year: string;
  description: string;
  stack: string[];
  accent: string;
  link: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "AWS S3 & CloudFront 3D Portfolio",
    year: "2026",
    description:
      "Securely hosted a static 3D portfolio on AWS S3, fronted by CloudFront CDN with Origin Access Control (OAC) and free SSL/TLS encryption.",
    stack: ["AWS S3", "CloudFront", "OAC", "Three.js"],
    accent: "#2979FF",
    link: "#",
  },
  {
    index: "02",
    title: "Oracle Cloud Linux Hardening",
    year: "2026",
    description:
      "Executed automated security auditing and vulnerability scanning on Oracle Cloud Infrastructure using Lynis, Trivy, and Docker containers.",
    stack: ["Oracle Cloud", "Linux", "Lynis", "Docker"],
    accent: "#00C853",
    link: "#",
  },
  {
    index: "03",
    title: "Interactive AI Assistant ('Jarvis')",
    year: "2026",
    description:
      "Programmed an interactive Python voice and text assistant leveraging Google Gemini API integrations for task automation.",
    stack: ["Python", "Gemini API", "REST API", "Linux"],
    accent: "#2979FF",
    link: "#",
  },
  {
    index: "04",
    title: "Ubuntu Server Homelab Setup",
    year: "2026",
    description:
      "Configured an Ubuntu Server VM on VirtualBox with static Netplan IP addressing, Docker container deployment, and GitHub tracking.",
    stack: ["Ubuntu", "VirtualBox", "Docker", "Netplan"],
    accent: "#00C853",
    link: "#",
  },
];

export const skills = [
  { group: "Cloud & Storage", items: ["AWS (S3, CloudFront)", "Oracle Cloud (OCI)", "Cloud Architecture"] },
  { group: "Networking & Security", items: ["CompTIA Network+", "TCP/IP & OSI Model", "Firewalls & Routing", "Linux Hardening"] },
  { group: "Systems & Tools", items: ["Linux (Ubuntu, Mint)", "Docker", "Terraform", "Netplan", "Git & GitHub"] },
  { group: "Scripting & Basics", items: ["Python", "Bash", "HTML/CSS", "SQL"] },
];

export const timeline = [
  {
    period: "2026 — Present",
    title: "Cloud & Network Engineering Training",
    org: "Learning People / Self-Study",
    detail:
      "Achieved CompTIA Network+ certification. Actively building AWS cloud infrastructure and Linux security homelabs.",
  },
  {
    period: "2026",
    title: "Cloud & Security Homelab Projects",
    org: "AWS & Oracle Cloud Labs",
    detail:
      "Deployed secure S3/CloudFront static sites, hardened cloud instances using Lynis/Trivy, and authored automated Python utilities.",
  },
  {
    period: "Previous Work",
    title: "Computing Coordinator & Technical Support",
    org: "Primary Education",
    detail:
      "Managed IT resources, authored technical documentation, conducted staff onboarding, and handled daily operational incident response.",
  },
];