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
  Users,
  Building2,
  UserCog,
  HardHat,
} from "lucide-react";

interface ArchitectureDiagramProps {
  projectSlug: string;
}

export function SmartCleanArchitectureDiagram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="w-full p-6 bg-gradient-to-br from-background via-background to-muted/20 rounded-xl border border-border/50 overflow-x-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        SmartClean System Architecture
      </h3>

      <div className="min-w-[900px] relative">
        {/* SVG for connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="currentColor"
                className="text-primary/40"
              />
            </marker>
          </defs>

          {/* Client Apps to API Gateway */}
          <motion.line
            x1="200"
            y1="120"
            x2="450"
            y2="180"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />
          <motion.line
            x1="350"
            y1="120"
            x2="450"
            y2="180"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />
          <motion.line
            x1="500"
            y1="120"
            x2="500"
            y2="170"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />
          <motion.line
            x1="650"
            y1="120"
            x2="550"
            y2="180"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />
          <motion.line
            x1="800"
            y1="120"
            x2="550"
            y2="180"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />

          {/* API Gateway to Backend */}
          <motion.line
            x1="500"
            y1="230"
            x2="500"
            y2="280"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />

          {/* Backend to Services */}
          <motion.line
            x1="450"
            y1="380"
            x2="300"
            y2="430"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />
          <motion.line
            x1="500"
            y1="380"
            x2="500"
            y2="430"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />
          <motion.line
            x1="550"
            y1="380"
            x2="700"
            y2="430"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
            markerEnd="url(#arrowhead)"
            variants={lineVariants}
          />
        </svg>

        {/* User Roles Row */}
        <motion.div
          className="flex justify-center gap-4 mb-4"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs">
            <Shield className="w-3 h-3 text-blue-500" />
            <span>Admin</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-xs">
            <Building2 className="w-3 h-3 text-green-500" />
            <span>Client</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-xs">
            <UserCog className="w-3 h-3 text-orange-500" />
            <span>Sector Manager</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs">
            <HardHat className="w-3 h-3 text-purple-500" />
            <span>Agent</span>
          </div>
        </motion.div>

        {/* Client Applications Row */}
        <motion.div
          className="flex justify-center gap-6 mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl">
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
            <span className="text-xs font-medium">Web Admin</span>
            <span className="text-[10px] text-muted-foreground">
              Flutter Web
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl">
              <Smartphone className="w-8 h-8 text-green-500" />
            </div>
            <span className="text-xs font-medium">Client App</span>
            <span className="text-[10px] text-muted-foreground">
              iOS/Android
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl">
              <Smartphone className="w-8 h-8 text-orange-500" />
            </div>
            <span className="text-xs font-medium">Manager App</span>
            <span className="text-[10px] text-muted-foreground">
              iOS/Android
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl">
              <Smartphone className="w-8 h-8 text-purple-500" />
            </div>
            <span className="text-xs font-medium">Agent App</span>
            <span className="text-[10px] text-muted-foreground">
              iOS/Android
            </span>
          </div>
        </motion.div>

        {/* API Gateway */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 rounded-xl">
            <Cloud className="w-6 h-6 text-cyan-500" />
            <div className="text-center">
              <span className="text-sm font-semibold">Nginx Proxy Manager</span>
              <p className="text-[10px] text-muted-foreground">
                SSL • Load Balancing • Reverse Proxy
              </p>
            </div>
          </div>
        </motion.div>

        {/* Backend Services */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="p-6 bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/30 rounded-xl max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <Server className="w-8 h-8 text-red-500" />
              <div>
                <span className="text-lg font-bold">Django REST Framework</span>
                <p className="text-xs text-muted-foreground">Backend API</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="px-2 py-1 bg-background/50 rounded text-center">
                Users API
              </div>
              <div className="px-2 py-1 bg-background/50 rounded text-center">
                Jobs API
              </div>
              <div className="px-2 py-1 bg-background/50 rounded text-center">
                Timeclock API
              </div>
              <div className="px-2 py-1 bg-background/50 rounded text-center">
                Contracts API
              </div>
              <div className="px-2 py-1 bg-background/50 rounded text-center">
                Reports API
              </div>
              <div className="px-2 py-1 bg-background/50 rounded text-center">
                Auth API
              </div>
            </div>
          </div>
        </motion.div>

        {/* Infrastructure Layer */}
        <motion.div
          className="flex justify-center gap-6 mb-8"
          variants={itemVariants}
        >
          {/* Database */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-600/30 rounded-xl">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-xs font-medium">PostgreSQL</span>
            <span className="text-[10px] text-muted-foreground">Database</span>
          </div>

          {/* Push Notifications */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 rounded-xl">
              <Bell className="w-8 h-8 text-amber-500" />
            </div>
            <span className="text-xs font-medium">FCM</span>
            <span className="text-[10px] text-muted-foreground">
              Push Notifications
            </span>
          </div>

          {/* Adminer */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-gradient-to-br from-slate-500/20 to-gray-500/10 border border-slate-500/30 rounded-xl">
              <Database className="w-8 h-8 text-slate-500" />
            </div>
            <span className="text-xs font-medium">Adminer</span>
            <span className="text-[10px] text-muted-foreground">
              DB Management
            </span>
          </div>
        </motion.div>

        {/* DevOps & Monitoring Row */}
        <motion.div
          className="flex justify-center gap-4"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl">
            {/* Docker */}
            <div className="flex flex-col items-center gap-1">
              <Container className="w-6 h-6 text-blue-400" />
              <span className="text-[10px]">Docker</span>
            </div>

            {/* CI/CD */}
            <div className="flex flex-col items-center gap-1">
              <GitBranch className="w-6 h-6 text-green-400" />
              <span className="text-[10px]">GitHub Actions</span>
            </div>

            {/* Azure */}
            <div className="flex flex-col items-center gap-1">
              <Cloud className="w-6 h-6 text-cyan-400" />
              <span className="text-[10px]">Azure</span>
            </div>

            {/* Grafana */}
            <div className="flex flex-col items-center gap-1">
              <BarChart3 className="w-6 h-6 text-orange-400" />
              <span className="text-[10px]">Grafana</span>
            </div>

            {/* Prometheus */}
            <div className="flex flex-col items-center gap-1">
              <BarChart3 className="w-6 h-6 text-red-400" />
              <span className="text-[10px]">Prometheus</span>
            </div>

            {/* Sentry */}
            <div className="flex flex-col items-center gap-1">
              <AlertTriangle className="w-6 h-6 text-purple-400" />
              <span className="text-[10px]">Sentry</span>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex justify-center gap-6 mt-6 pt-4 border-t border-border/30"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
            <span>Client Applications (Flutter)</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
            <span>Backend (Django DRF)</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
            <span>DevOps & Monitoring</span>
          </div>
        </motion.div>
      </div>
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
