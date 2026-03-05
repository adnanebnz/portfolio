"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  Server,
  Database,
  Cloud,
  Bell,
  Shield,
  BarChart3,
  Container,
  GitBranch,
  AlertTriangle,
  Building2,
  UserCog,
  HardHat,
  ChevronDown,
} from "lucide-react";

interface ArchitectureDiagramProps {
  projectSlug: string;
}

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  },
});

function Connector() {
  return (
    <div className="flex justify-center my-1">
      <ChevronDown className="w-5 h-5 text-border" />
    </div>
  );
}

export function SmartCleanArchitectureDiagram() {
  return (
    <motion.div
      className="w-full rounded-2xl border border-border/60 bg-card p-6 md:p-10 flex flex-col items-center gap-0"
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h3
        className="text-lg md:text-xl font-bold mb-8 text-foreground"
        variants={fade(0)}
      >
        SmartClean System Architecture
      </motion.h3>

      {/* ── Row 1: User Role Pills ── */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-6"
        variants={fade(0.05)}
      >
        {[
          { label: "Admin", color: "blue", Icon: Shield },
          { label: "Client", color: "green", Icon: Building2 },
          { label: "Sector Manager", color: "orange", Icon: UserCog },
          { label: "Agent", color: "purple", Icon: HardHat },
        ].map(({ label, color, Icon }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
              bg-${color}-500/10 border border-${color}-500/30 text-${color}-600 dark:text-${color}-400`}
          >
            <Icon className="w-3 h-3" />
            {label}
          </span>
        ))}
      </motion.div>

      {/* ── Row 2: Client Apps ── */}
      <motion.div
        className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3"
        variants={fade(0.1)}
      >
        {[
          {
            label: "Web Admin",
            sub: "Flutter Web",
            Icon: Globe,
            color: "blue",
          },
          {
            label: "Client App",
            sub: "iOS / Android",
            Icon: Smartphone,
            color: "green",
          },
          {
            label: "Manager App",
            sub: "iOS / Android",
            Icon: Smartphone,
            color: "orange",
          },
          {
            label: "Agent App",
            sub: "iOS / Android",
            Icon: Smartphone,
            color: "purple",
          },
        ].map(({ label, sub, Icon, color }) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-2 rounded-xl p-4
              bg-${color}-500/5 border border-${color}-500/20`}
          >
            <div className={`p-2.5 rounded-xl bg-${color}-500/10`}>
              <Icon className={`w-7 h-7 text-${color}-500`} />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {label}
            </span>
            <span className="text-[10px] text-muted-foreground">{sub}</span>
          </div>
        ))}
      </motion.div>

      <Connector />

      {/* ── Row 3: Nginx ── */}
      <motion.div className="w-full max-w-2xl" variants={fade(0.15)}>
        <div className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/25">
          <Cloud className="w-5 h-5 text-cyan-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Nginx Proxy Manager
            </p>
            <p className="text-[10px] text-muted-foreground">
              SSL · Load Balancing · Reverse Proxy
            </p>
          </div>
        </div>
      </motion.div>

      <Connector />

      {/* ── Row 4: Django Backend ── */}
      <motion.div className="w-full max-w-2xl" variants={fade(0.2)}>
        <div className="rounded-xl bg-red-500/5 border border-red-500/25 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-500/10">
              <Server className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                Django REST Framework
              </p>
              <p className="text-[10px] text-muted-foreground">Backend API</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              "Users API",
              "Jobs API",
              "Timeclock API",
              "Contracts API",
              "Reports API",
              "Auth API",
            ].map((api) => (
              <div
                key={api}
                className="px-2 py-1.5 bg-background rounded-lg text-center text-[10px] font-medium border border-border/50"
              >
                {api}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <Connector />

      {/* ── Row 5: Data / Services ── */}
      <motion.div
        className="w-full max-w-2xl grid grid-cols-3 gap-3"
        variants={fade(0.25)}
      >
        {[
          {
            label: "PostgreSQL",
            sub: "Database",
            Icon: Database,
            color: "indigo",
          },
          {
            label: "FCM",
            sub: "Push Notifications",
            Icon: Bell,
            color: "amber",
          },
          {
            label: "Adminer",
            sub: "DB Management",
            Icon: Database,
            color: "slate",
          },
        ].map(({ label, sub, Icon, color }) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-2 rounded-xl p-4
              bg-${color}-500/5 border border-${color}-500/20`}
          >
            <div className={`p-2.5 rounded-xl bg-${color}-500/10`}>
              <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {label}
            </span>
            <span className="text-[10px] text-muted-foreground text-center">
              {sub}
            </span>
          </div>
        ))}
      </motion.div>

      <Connector />

      {/* ── Row 6: DevOps / Monitoring ── */}
      <motion.div className="w-full max-w-2xl" variants={fade(0.3)}>
        <div className="rounded-xl bg-violet-500/5 border border-violet-500/20 px-5 py-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-center mb-4">
            DevOps &amp; Monitoring
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Docker", Icon: Container, color: "blue" },
              { label: "GitHub Actions", Icon: GitBranch, color: "green" },
              { label: "Azure", Icon: Cloud, color: "cyan" },
              { label: "Grafana", Icon: BarChart3, color: "orange" },
              { label: "Prometheus", Icon: BarChart3, color: "red" },
              { label: "Sentry", Icon: AlertTriangle, color: "purple" },
            ].map(({ label, Icon, color }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <Icon className={`w-5 h-5 text-${color}-400`} />
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Legend ── */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-8 pt-5 border-t border-border/30 w-full"
        variants={fade(0.35)}
      >
        {[
          {
            dot: "from-blue-500 to-green-500",
            label: "Client Applications (Flutter)",
          },
          { dot: "from-red-500 to-orange-500", label: "Backend (Django DRF)" },
          {
            dot: "from-violet-500 to-purple-500",
            label: "DevOps & Monitoring",
          },
        ].map(({ dot, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-[11px] text-muted-foreground"
          >
            <div
              className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${dot}`}
            />
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function ArchitectureDiagram({ projectSlug }: ArchitectureDiagramProps) {
  switch (projectSlug) {
    case "smartclean":
      return <SmartCleanArchitectureDiagram />;
    default:
      return null;
  }
}
