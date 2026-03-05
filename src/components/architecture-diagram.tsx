"use client";

import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
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
} from "lucide-react";

interface ArchitectureDiagramProps {
  projectSlug: string;
}

// ─── Custom node types ───────────────────────────────────────────────────────

function RoleNode({ data }: NodeProps) {
  const d = data as {
    label: string;
    icon: React.ReactNode;
    color: string;
  };
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border
        bg-${d.color}-500/10 border-${d.color}-500/30 text-${d.color}-600 dark:text-${d.color}-400`}
    >
      {d.icon}
      {d.label}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !border-0"
      />
    </div>
  );
}

function AppNode({ data }: NodeProps) {
  const d = data as {
    label: string;
    sub: string;
    icon: React.ReactNode;
    color: string;
  };
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl p-4 w-[120px]
        bg-${d.color}-500/5 border border-${d.color}-500/20 shadow-sm`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0"
      />
      <div className={`p-2.5 rounded-xl bg-${d.color}-500/10`}>{d.icon}</div>
      <span className="text-xs font-semibold text-foreground text-center leading-tight">
        {d.label}
      </span>
      <span className="text-[10px] text-muted-foreground text-center">
        {d.sub}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !border-0"
      />
    </div>
  );
}

function ProxyNode({ data }: NodeProps) {
  const d = data as { label: string; sub: string; icon: React.ReactNode };
  return (
    <div className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/25 shadow-sm w-[380px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0"
      />
      {d.icon}
      <div>
        <p className="text-sm font-semibold text-foreground">{d.label}</p>
        <p className="text-[10px] text-muted-foreground">{d.sub}</p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !border-0"
      />
    </div>
  );
}

function BackendNode({ data }: NodeProps) {
  const d = data as { apis: string[]; icon: React.ReactNode };
  return (
    <div className="rounded-xl bg-red-500/5 border border-red-500/25 p-5 shadow-sm w-[380px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0"
      />
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-red-500/10">{d.icon}</div>
        <div>
          <p className="text-sm font-bold text-foreground">
            Django REST Framework
          </p>
          <p className="text-[10px] text-muted-foreground">Backend API</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {d.apis.map((api: string) => (
          <div
            key={api}
            className="px-2 py-1.5 bg-background rounded-lg text-center text-[10px] font-medium border border-border/50"
          >
            {api}
          </div>
        ))}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !border-0"
      />
    </div>
  );
}

function ServiceNode({ data }: NodeProps) {
  const d = data as {
    label: string;
    sub: string;
    icon: React.ReactNode;
    color: string;
  };
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl p-4 w-[120px] bg-${d.color}-500/5 border border-${d.color}-500/20 shadow-sm`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0"
      />
      <div className={`p-2.5 rounded-xl bg-${d.color}-500/10`}>{d.icon}</div>
      <span className="text-xs font-semibold text-foreground text-center">
        {d.label}
      </span>
      <span className="text-[10px] text-muted-foreground text-center leading-tight">
        {d.sub}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-transparent !border-0"
      />
    </div>
  );
}

function DevOpsNode({ data }: NodeProps) {
  const d = data as {
    tools: { label: string; icon: React.ReactNode; color: string }[];
  };
  return (
    <div className="rounded-xl bg-violet-500/5 border border-violet-500/20 px-6 py-4 shadow-sm w-[500px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0"
      />
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-center mb-4">
        DevOps &amp; Monitoring
      </p>
      <div className="flex flex-wrap justify-center gap-5">
        {d.tools.map(
          ({
            label,
            icon,
            color,
          }: {
            label: string;
            icon: React.ReactNode;
            color: string;
          }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className={`text-${color}-400`}>{icon}</div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {label}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

const nodeTypes = {
  role: RoleNode,
  app: AppNode,
  proxy: ProxyNode,
  backend: BackendNode,
  service: ServiceNode,
  devops: DevOpsNode,
};

// ─── Nodes & Edges ────────────────────────────────────────────────────────────

const nodes = [
  // Row 0 – roles
  {
    id: "r-admin",
    type: "role",
    position: { x: 30, y: 0 },
    data: {
      label: "Admin",
      color: "blue",
      icon: <Shield className="w-3 h-3" />,
    },
  },
  {
    id: "r-client",
    type: "role",
    position: { x: 165, y: 0 },
    data: {
      label: "Client",
      color: "green",
      icon: <Building2 className="w-3 h-3" />,
    },
  },
  {
    id: "r-manager",
    type: "role",
    position: { x: 300, y: 0 },
    data: {
      label: "Sector Manager",
      color: "orange",
      icon: <UserCog className="w-3 h-3" />,
    },
  },
  {
    id: "r-agent",
    type: "role",
    position: { x: 460, y: 0 },
    data: {
      label: "Agent",
      color: "purple",
      icon: <HardHat className="w-3 h-3" />,
    },
  },

  // Row 1 – apps
  {
    id: "app-web",
    type: "app",
    position: { x: 0, y: 80 },
    data: {
      label: "Web Admin",
      sub: "Flutter Web",
      color: "blue",
      icon: <Globe className="w-7 h-7 text-blue-500" />,
    },
  },
  {
    id: "app-client",
    type: "app",
    position: { x: 140, y: 80 },
    data: {
      label: "Client App",
      sub: "iOS/Android",
      color: "green",
      icon: <Smartphone className="w-7 h-7 text-green-500" />,
    },
  },
  {
    id: "app-manager",
    type: "app",
    position: { x: 280, y: 80 },
    data: {
      label: "Manager App",
      sub: "iOS/Android",
      color: "orange",
      icon: <Smartphone className="w-7 h-7 text-orange-500" />,
    },
  },
  {
    id: "app-agent",
    type: "app",
    position: { x: 420, y: 80 },
    data: {
      label: "Agent App",
      sub: "iOS/Android",
      color: "purple",
      icon: <Smartphone className="w-7 h-7 text-purple-500" />,
    },
  },

  // Row 2 – nginx
  {
    id: "nginx",
    type: "proxy",
    position: { x: 70, y: 280 },
    data: {
      label: "Nginx Proxy Manager",
      sub: "SSL · Load Balancing · Reverse Proxy",
      icon: <Cloud className="w-5 h-5 text-cyan-500 shrink-0" />,
    },
  },

  // Row 3 – backend
  {
    id: "backend",
    type: "backend",
    position: { x: 70, y: 410 },
    data: {
      icon: <Server className="w-6 h-6 text-red-500" />,
      apis: [
        "Users API",
        "Jobs API",
        "Timeclock API",
        "Contracts API",
        "Reports API",
        "Auth API",
      ],
    },
  },

  // Row 4 – services
  {
    id: "svc-pg",
    type: "service",
    position: { x: 70, y: 620 },
    data: {
      label: "PostgreSQL",
      sub: "Database",
      color: "indigo",
      icon: <Database className="w-6 h-6 text-indigo-500" />,
    },
  },
  {
    id: "svc-fcm",
    type: "service",
    position: { x: 210, y: 620 },
    data: {
      label: "FCM",
      sub: "Push Notifications",
      color: "amber",
      icon: <Bell className="w-6 h-6 text-amber-500" />,
    },
  },
  {
    id: "svc-adminer",
    type: "service",
    position: { x: 350, y: 620 },
    data: {
      label: "Adminer",
      sub: "DB Management",
      color: "slate",
      icon: <Database className="w-6 h-6 text-slate-500" />,
    },
  },

  // Row 5 – devops
  {
    id: "devops",
    type: "devops",
    position: { x: 70, y: 800 },
    data: {
      tools: [
        {
          label: "Docker",
          color: "sky",
          icon: <Container className="w-5 h-5" />,
        },
        {
          label: "GitHub Actions",
          color: "green",
          icon: <GitBranch className="w-5 h-5" />,
        },
        { label: "Azure", color: "cyan", icon: <Cloud className="w-5 h-5" /> },
        {
          label: "Grafana",
          color: "orange",
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          label: "Prometheus",
          color: "red",
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          label: "Sentry",
          color: "purple",
          icon: <AlertTriangle className="w-5 h-5" />,
        },
      ],
    },
  },
];

const edgeStyle = { stroke: "#94a3b8", strokeWidth: 1.5 };
const edges = [
  // roles → apps
  {
    id: "e-r-admin-app",
    source: "r-admin",
    target: "app-web",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-r-client-app",
    source: "r-client",
    target: "app-client",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-r-manager-app",
    source: "r-manager",
    target: "app-manager",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-r-agent-app",
    source: "r-agent",
    target: "app-agent",
    style: edgeStyle,
    type: "smoothstep",
  },
  // apps → nginx
  {
    id: "e-web-nginx",
    source: "app-web",
    target: "nginx",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-client-nginx",
    source: "app-client",
    target: "nginx",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-manager-nginx",
    source: "app-manager",
    target: "nginx",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-agent-nginx",
    source: "app-agent",
    target: "nginx",
    style: edgeStyle,
    type: "smoothstep",
  },
  // nginx → backend
  {
    id: "e-nginx-be",
    source: "nginx",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  // backend → services
  {
    id: "e-be-pg",
    source: "backend",
    target: "svc-pg",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-be-fcm",
    source: "backend",
    target: "svc-fcm",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-be-adminer",
    source: "backend",
    target: "svc-adminer",
    style: edgeStyle,
    type: "smoothstep",
  },
  // services → devops
  {
    id: "e-svc-devops",
    source: "svc-fcm",
    target: "devops",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function SmartCleanArchitectureDiagram() {
  return (
    <div
      className="w-full rounded-2xl border border-border/60 bg-background overflow-hidden"
      style={{ height: 960 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#94a3b840"
        />
      </ReactFlow>
    </div>
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
