"use client";

import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type NodeProps,
  type Node,
  type Edge,
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
  MapPin,
  ShoppingCart,
  Truck,
  Package,
  UtensilsCrossed,
  BookOpen,
  Mountain,
  Film,
  Flame,
  Code2,
  Layers,
  Cpu,
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
  const d = data as {
    title: string;
    subtitle?: string;
    apis: string[];
    icon: React.ReactNode;
    color?: string;
  };
  const color = d.color ?? "red";
  return (
    <div
      className={`rounded-xl bg-${color}-500/5 border border-${color}-500/25 p-5 shadow-sm w-[380px]`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-transparent !border-0"
      />
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-${color}-500/10`}>{d.icon}</div>
        <div>
          <p className="text-sm font-bold text-foreground">{d.title}</p>
          <p className="text-[10px] text-muted-foreground">
            {d.subtitle ?? "Backend API"}
          </p>
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
      title: "Django REST Framework",
      subtitle: "Backend API",
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
  return <FlowDiagram flowNodes={nodes} flowEdges={edges} height={960} />;
}

// ─── Tawsil Star VTC ─────────────────────────────────────────────────────────

const vtcNodes = [
  // Users
  {
    id: "u-rider",
    type: "role",
    position: { x: 60, y: 0 },
    data: {
      label: "Rider",
      color: "blue",
      icon: <UserCog className="w-3 h-3" />,
    },
  },
  {
    id: "u-driver",
    type: "role",
    position: { x: 220, y: 0 },
    data: {
      label: "Driver",
      color: "green",
      icon: <HardHat className="w-3 h-3" />,
    },
  },
  {
    id: "u-admin",
    type: "role",
    position: { x: 370, y: 0 },
    data: {
      label: "Admin",
      color: "purple",
      icon: <Shield className="w-3 h-3" />,
    },
  },

  // Apps
  {
    id: "app-rider",
    type: "app",
    position: { x: 0, y: 80 },
    data: {
      label: "Rider App",
      sub: "Flutter",
      color: "blue",
      icon: <Smartphone className="w-7 h-7 text-blue-500" />,
    },
  },
  {
    id: "app-driver",
    type: "app",
    position: { x: 150, y: 80 },
    data: {
      label: "Driver App",
      sub: "Flutter",
      color: "green",
      icon: <Smartphone className="w-7 h-7 text-green-500" />,
    },
  },
  {
    id: "app-admin",
    type: "app",
    position: { x: 300, y: 80 },
    data: {
      label: "Admin Panel",
      sub: "Web Dashboard",
      color: "purple",
      icon: <Globe className="w-7 h-7 text-purple-500" />,
    },
  },

  // Backend
  {
    id: "backend",
    type: "backend",
    position: { x: 60, y: 280 },
    data: {
      title: "Django REST Framework",
      subtitle: "Backend API",
      icon: <Server className="w-6 h-6 text-red-500" />,
      apis: [
        "Booking API",
        "Tracking API",
        "Auth API",
        "Payments API",
        "Drivers API",
        "History API",
      ],
    },
  },

  // Services
  {
    id: "svc-db",
    type: "service",
    position: { x: 30, y: 490 },
    data: {
      label: "PostgreSQL",
      sub: "Database",
      color: "indigo",
      icon: <Database className="w-6 h-6 text-indigo-500" />,
    },
  },
  {
    id: "svc-maps",
    type: "service",
    position: { x: 170, y: 490 },
    data: {
      label: "Google Maps",
      sub: "Location",
      color: "green",
      icon: <MapPin className="w-6 h-6 text-green-500" />,
    },
  },
  {
    id: "svc-ws",
    type: "service",
    position: { x: 310, y: 490 },
    data: {
      label: "WebSockets",
      sub: "Real-time",
      color: "amber",
      icon: <Bell className="w-6 h-6 text-amber-500" />,
    },
  },
];

const vtcEdges = [
  {
    id: "ur-app",
    source: "u-rider",
    target: "app-rider",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ud-app",
    source: "u-driver",
    target: "app-driver",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ua-app",
    source: "u-admin",
    target: "app-admin",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "r-be",
    source: "app-rider",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "d-be",
    source: "app-driver",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "a-be",
    source: "app-admin",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-db",
    source: "backend",
    target: "svc-db",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-maps",
    source: "backend",
    target: "svc-maps",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-ws",
    source: "backend",
    target: "svc-ws",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── Tawsil Star Expeditor ────────────────────────────────────────────────────

const expeditorNodes = [
  {
    id: "u-expeditor",
    type: "role",
    position: { x: 40, y: 0 },
    data: {
      label: "Expeditor",
      color: "blue",
      icon: <Package className="w-3 h-3" />,
    },
  },
  {
    id: "u-driver",
    type: "role",
    position: { x: 200, y: 0 },
    data: {
      label: "Driver",
      color: "green",
      icon: <Truck className="w-3 h-3" />,
    },
  },
  {
    id: "u-admin",
    type: "role",
    position: { x: 350, y: 0 },
    data: {
      label: "Admin",
      color: "purple",
      icon: <Shield className="w-3 h-3" />,
    },
  },

  {
    id: "app-exp",
    type: "app",
    position: { x: 0, y: 80 },
    data: {
      label: "Expeditor App",
      sub: "Flutter",
      color: "blue",
      icon: <Smartphone className="w-7 h-7 text-blue-500" />,
    },
  },
  {
    id: "app-driver",
    type: "app",
    position: { x: 150, y: 80 },
    data: {
      label: "Driver App",
      sub: "Flutter",
      color: "green",
      icon: <Smartphone className="w-7 h-7 text-green-500" />,
    },
  },
  {
    id: "app-admin",
    type: "app",
    position: { x: 300, y: 80 },
    data: {
      label: "Admin Panel",
      sub: "Web Dashboard",
      color: "purple",
      icon: <Globe className="w-7 h-7 text-purple-500" />,
    },
  },

  {
    id: "backend",
    type: "backend",
    position: { x: 60, y: 280 },
    data: {
      title: "Django REST Framework",
      subtitle: "Backend API",
      icon: <Server className="w-6 h-6 text-red-500" />,
      apis: [
        "Orders API",
        "Tracking API",
        "Auth API",
        "Routing API",
        "Drivers API",
        "Notifications",
      ],
    },
  },

  {
    id: "svc-db",
    type: "service",
    position: { x: 30, y: 490 },
    data: {
      label: "PostgreSQL",
      sub: "Database",
      color: "indigo",
      icon: <Database className="w-6 h-6 text-indigo-500" />,
    },
  },
  {
    id: "svc-ws",
    type: "service",
    position: { x: 170, y: 490 },
    data: {
      label: "WebSockets",
      sub: "Live Tracking",
      color: "amber",
      icon: <Bell className="w-6 h-6 text-amber-500" />,
    },
  },
  {
    id: "svc-map",
    type: "service",
    position: { x: 310, y: 490 },
    data: {
      label: "Google Maps",
      sub: "Route Optimize",
      color: "green",
      icon: <MapPin className="w-6 h-6 text-green-500" />,
    },
  },
];

const expeditorEdges = [
  {
    id: "ue-app",
    source: "u-expeditor",
    target: "app-exp",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ud-app",
    source: "u-driver",
    target: "app-driver",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ua-app",
    source: "u-admin",
    target: "app-admin",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "e-be",
    source: "app-exp",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "d-be",
    source: "app-driver",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "a-be",
    source: "app-admin",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-db",
    source: "backend",
    target: "svc-db",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-ws",
    source: "backend",
    target: "svc-ws",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-map",
    source: "backend",
    target: "svc-map",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── DA-Mall ──────────────────────────────────────────────────────────────────

const daMallNodes = [
  {
    id: "u-buyer",
    type: "role",
    position: { x: 50, y: 0 },
    data: {
      label: "Buyer",
      color: "blue",
      icon: <UserCog className="w-3 h-3" />,
    },
  },
  {
    id: "u-seller",
    type: "role",
    position: { x: 200, y: 0 },
    data: {
      label: "Seller",
      color: "green",
      icon: <Building2 className="w-3 h-3" />,
    },
  },
  {
    id: "u-admin",
    type: "role",
    position: { x: 350, y: 0 },
    data: {
      label: "Admin",
      color: "purple",
      icon: <Shield className="w-3 h-3" />,
    },
  },

  {
    id: "app-buyer",
    type: "app",
    position: { x: 0, y: 80 },
    data: {
      label: "Buyer App",
      sub: "Flutter",
      color: "blue",
      icon: <Smartphone className="w-7 h-7 text-blue-500" />,
    },
  },
  {
    id: "app-seller",
    type: "app",
    position: { x: 150, y: 80 },
    data: {
      label: "Seller App",
      sub: "Flutter",
      color: "green",
      icon: <ShoppingCart className="w-7 h-7 text-green-500" />,
    },
  },
  {
    id: "app-admin",
    type: "app",
    position: { x: 300, y: 80 },
    data: {
      label: "Admin Panel",
      sub: "Web",
      color: "purple",
      icon: <Globe className="w-7 h-7 text-purple-500" />,
    },
  },

  {
    id: "backend",
    type: "backend",
    position: { x: 60, y: 280 },
    data: {
      title: "Laravel",
      subtitle: "REST API",
      color: "red",
      icon: <Server className="w-6 h-6 text-red-500" />,
      apis: [
        "Products API",
        "Orders API",
        "Auth API",
        "Payments API",
        "Reviews API",
        "Sellers API",
      ],
    },
  },

  {
    id: "svc-db",
    type: "service",
    position: { x: 30, y: 490 },
    data: {
      label: "MySQL",
      sub: "Database",
      color: "orange",
      icon: <Database className="w-6 h-6 text-orange-500" />,
    },
  },
  {
    id: "svc-fb",
    type: "service",
    position: { x: 170, y: 490 },
    data: {
      label: "Firebase",
      sub: "Notifications",
      color: "amber",
      icon: <Flame className="w-6 h-6 text-amber-500" />,
    },
  },
  {
    id: "svc-pay",
    type: "service",
    position: { x: 310, y: 490 },
    data: {
      label: "Payment",
      sub: "Gateway",
      color: "green",
      icon: <Package className="w-6 h-6 text-green-500" />,
    },
  },
];

const daMallEdges = [
  {
    id: "ub-app",
    source: "u-buyer",
    target: "app-buyer",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "us-app",
    source: "u-seller",
    target: "app-seller",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ua-app",
    source: "u-admin",
    target: "app-admin",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "b-be",
    source: "app-buyer",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "s-be",
    source: "app-seller",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "a-be",
    source: "app-admin",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-db",
    source: "backend",
    target: "svc-db",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-fb",
    source: "backend",
    target: "svc-fb",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-pay",
    source: "backend",
    target: "svc-pay",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── Algeria Eats ─────────────────────────────────────────────────────────────

const algeriaEatsNodes = [
  {
    id: "u-cust",
    type: "role",
    position: { x: 30, y: 0 },
    data: {
      label: "Customer",
      color: "blue",
      icon: <UserCog className="w-3 h-3" />,
    },
  },
  {
    id: "u-artisan",
    type: "role",
    position: { x: 190, y: 0 },
    data: {
      label: "Artisan",
      color: "orange",
      icon: <UtensilsCrossed className="w-3 h-3" />,
    },
  },
  {
    id: "u-deliver",
    type: "role",
    position: { x: 360, y: 0 },
    data: {
      label: "Delivery",
      color: "green",
      icon: <Truck className="w-3 h-3" />,
    },
  },

  {
    id: "app-mobile",
    type: "app",
    position: { x: 0, y: 80 },
    data: {
      label: "Mobile App",
      sub: "Flutter",
      color: "blue",
      icon: <Smartphone className="w-7 h-7 text-blue-500" />,
    },
  },
  {
    id: "app-web",
    type: "app",
    position: { x: 150, y: 80 },
    data: {
      label: "Web App",
      sub: "Laravel+Alpine",
      color: "orange",
      icon: <Globe className="w-7 h-7 text-orange-500" />,
    },
  },
  {
    id: "app-dash",
    type: "app",
    position: { x: 300, y: 80 },
    data: {
      label: "Admin Panel",
      sub: "Livewire",
      color: "purple",
      icon: <Layers className="w-7 h-7 text-purple-500" />,
    },
  },

  {
    id: "backend",
    type: "backend",
    position: { x: 60, y: 280 },
    data: {
      title: "Laravel + Livewire",
      subtitle: "Full-stack MVC",
      color: "red",
      icon: <Server className="w-6 h-6 text-red-500" />,
      apis: ["Products", "Orders", "Auth", "Artisans", "Delivery", "Reviews"],
    },
  },

  {
    id: "svc-db",
    type: "service",
    position: { x: 30, y: 490 },
    data: {
      label: "MySQL",
      sub: "Database",
      color: "orange",
      icon: <Database className="w-6 h-6 text-orange-500" />,
    },
  },
  {
    id: "svc-map",
    type: "service",
    position: { x: 170, y: 490 },
    data: {
      label: "Maps",
      sub: "Location",
      color: "green",
      icon: <MapPin className="w-6 h-6 text-green-500" />,
    },
  },
  {
    id: "svc-liv",
    type: "service",
    position: { x: 310, y: 490 },
    data: {
      label: "AlpineJS",
      sub: "Reactive UI",
      color: "teal",
      icon: <Cpu className="w-6 h-6 text-teal-500" />,
    },
  },
];

const algeriaEatsEdges = [
  {
    id: "uc-app",
    source: "u-cust",
    target: "app-mobile",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ua-app",
    source: "u-artisan",
    target: "app-web",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ud-app",
    source: "u-deliver",
    target: "app-dash",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "m-be",
    source: "app-mobile",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "w-be",
    source: "app-web",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "d-be",
    source: "app-dash",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-db",
    source: "backend",
    target: "svc-db",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-map",
    source: "backend",
    target: "svc-map",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-liv",
    source: "backend",
    target: "svc-liv",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── Wamidh ───────────────────────────────────────────────────────────────────

const wamidhNodes = [
  {
    id: "u-student",
    type: "role",
    position: { x: 30, y: 0 },
    data: {
      label: "Student",
      color: "blue",
      icon: <UserCog className="w-3 h-3" />,
    },
  },
  {
    id: "u-teacher",
    type: "role",
    position: { x: 200, y: 0 },
    data: {
      label: "Teacher",
      color: "green",
      icon: <BookOpen className="w-3 h-3" />,
    },
  },
  {
    id: "u-admin",
    type: "role",
    position: { x: 360, y: 0 },
    data: {
      label: "Admin",
      color: "purple",
      icon: <Shield className="w-3 h-3" />,
    },
  },

  {
    id: "app",
    type: "proxy",
    position: { x: 70, y: 80 },
    data: {
      label: "Wamidh Mobile App",
      sub: "Flutter · iOS & Android",
      icon: <Smartphone className="w-5 h-5 text-blue-500" />,
    },
  },

  {
    id: "firebase",
    type: "proxy",
    position: { x: 70, y: 210 },
    data: {
      label: "Firebase (BaaS)",
      sub: "Firestore · Auth · FCM · Storage",
      icon: <Flame className="w-5 h-5 text-orange-500" />,
    },
  },

  {
    id: "svc-fs",
    type: "service",
    position: { x: 30, y: 340 },
    data: {
      label: "Firestore",
      sub: "Database",
      color: "orange",
      icon: <Database className="w-6 h-6 text-orange-500" />,
    },
  },
  {
    id: "svc-auth",
    type: "service",
    position: { x: 170, y: 340 },
    data: {
      label: "Firebase Auth",
      sub: "Authentication",
      color: "amber",
      icon: <Shield className="w-6 h-6 text-amber-500" />,
    },
  },
  {
    id: "svc-notif",
    type: "service",
    position: { x: 310, y: 340 },
    data: {
      label: "FCM",
      sub: "Push Notifications",
      color: "red",
      icon: <Bell className="w-6 h-6 text-red-500" />,
    },
  },
];

const wamidhEdges = [
  {
    id: "us-app",
    source: "u-student",
    target: "app",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ut-app",
    source: "u-teacher",
    target: "app",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ua-app",
    source: "u-admin",
    target: "app",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "app-fb",
    source: "app",
    target: "firebase",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "fb-fs",
    source: "firebase",
    target: "svc-fs",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "fb-auth",
    source: "firebase",
    target: "svc-auth",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "fb-notif",
    source: "firebase",
    target: "svc-notif",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── Waffir ───────────────────────────────────────────────────────────────────

const waffirNodes = [
  {
    id: "u-buyer",
    type: "role",
    position: { x: 60, y: 0 },
    data: {
      label: "Buyer",
      color: "blue",
      icon: <UserCog className="w-3 h-3" />,
    },
  },
  {
    id: "u-seller",
    type: "role",
    position: { x: 240, y: 0 },
    data: {
      label: "Seller",
      color: "green",
      icon: <UtensilsCrossed className="w-3 h-3" />,
    },
  },

  {
    id: "app",
    type: "proxy",
    position: { x: 70, y: 80 },
    data: {
      label: "Waffir Mobile App",
      sub: "Flutter · GetX · iOS & Android",
      icon: <Smartphone className="w-5 h-5 text-blue-500" />,
    },
  },

  {
    id: "firebase",
    type: "proxy",
    position: { x: 70, y: 210 },
    data: {
      label: "Firebase (BaaS)",
      sub: "Firestore · Auth · FCM",
      icon: <Flame className="w-5 h-5 text-orange-500" />,
    },
  },

  {
    id: "svc-fb",
    type: "service",
    position: { x: 30, y: 340 },
    data: {
      label: "Firestore",
      sub: "Orders & Products",
      color: "orange",
      icon: <Database className="w-6 h-6 text-orange-500" />,
    },
  },
  {
    id: "svc-map",
    type: "service",
    position: { x: 170, y: 340 },
    data: {
      label: "Google Maps",
      sub: "Location",
      color: "green",
      icon: <MapPin className="w-6 h-6 text-green-500" />,
    },
  },
  {
    id: "svc-auth",
    type: "service",
    position: { x: 310, y: 340 },
    data: {
      label: "Firebase Auth",
      sub: "Authentication",
      color: "amber",
      icon: <Shield className="w-6 h-6 text-amber-500" />,
    },
  },
];

const waffirEdges = [
  {
    id: "ub-app",
    source: "u-buyer",
    target: "app",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "us-app",
    source: "u-seller",
    target: "app",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "app-fb",
    source: "app",
    target: "firebase",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "fb-fs",
    source: "firebase",
    target: "svc-fb",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "fb-map",
    source: "firebase",
    target: "svc-map",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "fb-auth",
    source: "firebase",
    target: "svc-auth",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── DZHIKERS ─────────────────────────────────────────────────────────────────

const dzhikersNodes = [
  {
    id: "u-hiker",
    type: "role",
    position: { x: 50, y: 0 },
    data: {
      label: "Hiker",
      color: "green",
      icon: <Mountain className="w-3 h-3" />,
    },
  },
  {
    id: "u-seller",
    type: "role",
    position: { x: 210, y: 0 },
    data: {
      label: "Seller",
      color: "orange",
      icon: <ShoppingCart className="w-3 h-3" />,
    },
  },
  {
    id: "u-admin",
    type: "role",
    position: { x: 360, y: 0 },
    data: {
      label: "Admin",
      color: "purple",
      icon: <Shield className="w-3 h-3" />,
    },
  },

  {
    id: "app-mobile",
    type: "app",
    position: { x: 0, y: 80 },
    data: {
      label: "Mobile App",
      sub: "React Native",
      color: "blue",
      icon: <Smartphone className="w-7 h-7 text-blue-500" />,
    },
  },
  {
    id: "app-web",
    type: "app",
    position: { x: 150, y: 80 },
    data: {
      label: "Web App",
      sub: "React / Vite",
      color: "green",
      icon: <Globe className="w-7 h-7 text-green-500" />,
    },
  },
  {
    id: "app-admin",
    type: "app",
    position: { x: 300, y: 80 },
    data: {
      label: "Admin Panel",
      sub: "React",
      color: "purple",
      icon: <Layers className="w-7 h-7 text-purple-500" />,
    },
  },

  {
    id: "backend",
    type: "backend",
    position: { x: 60, y: 280 },
    data: {
      title: "Node.js + Express",
      subtitle: "REST API",
      color: "green",
      icon: <Code2 className="w-6 h-6 text-green-600" />,
      apis: [
        "Hikes API",
        "Shop API",
        "Auth API",
        "Orders API",
        "Maps API",
        "Reviews API",
      ],
    },
  },

  {
    id: "svc-db",
    type: "service",
    position: { x: 30, y: 490 },
    data: {
      label: "MongoDB",
      sub: "Database",
      color: "green",
      icon: <Database className="w-6 h-6 text-green-600" />,
    },
  },
  {
    id: "svc-map",
    type: "service",
    position: { x: 170, y: 490 },
    data: {
      label: "Google Maps",
      sub: "Location",
      color: "blue",
      icon: <MapPin className="w-6 h-6 text-blue-500" />,
    },
  },
  {
    id: "svc-pay",
    type: "service",
    position: { x: 310, y: 490 },
    data: {
      label: "Chargily",
      sub: "Payments",
      color: "amber",
      icon: <Package className="w-6 h-6 text-amber-500" />,
    },
  },
];

const dzhikersEdges = [
  {
    id: "uh-app",
    source: "u-hiker",
    target: "app-mobile",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "us-app",
    source: "u-seller",
    target: "app-web",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "ua-app",
    source: "u-admin",
    target: "app-admin",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "m-be",
    source: "app-mobile",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "w-be",
    source: "app-web",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "a-be",
    source: "app-admin",
    target: "backend",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-db",
    source: "backend",
    target: "svc-db",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-map",
    source: "backend",
    target: "svc-map",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "be-pay",
    source: "backend",
    target: "svc-pay",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── Movies App ───────────────────────────────────────────────────────────────

const moviesNodes = [
  {
    id: "u-user",
    type: "role",
    position: { x: 155, y: 0 },
    data: {
      label: "User",
      color: "blue",
      icon: <UserCog className="w-3 h-3" />,
    },
  },

  {
    id: "app",
    type: "proxy",
    position: { x: 70, y: 80 },
    data: {
      label: "Movies App",
      sub: "Flutter · Clean Architecture",
      icon: <Film className="w-5 h-5 text-blue-500" />,
    },
  },

  {
    id: "bloc",
    type: "proxy",
    position: { x: 70, y: 210 },
    data: {
      label: "BLoC State Management",
      sub: "MovieBloc · SearchBloc · FavoritesBloc",
      icon: <Cpu className="w-5 h-5 text-violet-500" />,
    },
  },

  {
    id: "svc-tmdb",
    type: "service",
    position: { x: 30, y: 340 },
    data: {
      label: "TMDB API",
      sub: "Movies Data",
      color: "blue",
      icon: <Film className="w-6 h-6 text-blue-500" />,
    },
  },
  {
    id: "svc-hive",
    type: "service",
    position: { x: 170, y: 340 },
    data: {
      label: "Hive",
      sub: "Local Cache",
      color: "amber",
      icon: <Database className="w-6 h-6 text-amber-500" />,
    },
  },
  {
    id: "svc-clean",
    type: "service",
    position: { x: 310, y: 340 },
    data: {
      label: "Clean Arch",
      sub: "Domain / Data",
      color: "violet",
      icon: <Layers className="w-6 h-6 text-violet-500" />,
    },
  },
];

const moviesEdges = [
  {
    id: "u-app",
    source: "u-user",
    target: "app",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "app-bloc",
    source: "app",
    target: "bloc",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "bl-tmdb",
    source: "bloc",
    target: "svc-tmdb",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "bl-hive",
    source: "bloc",
    target: "svc-hive",
    style: edgeStyle,
    type: "smoothstep",
  },
  {
    id: "bl-clean",
    source: "bloc",
    target: "svc-clean",
    style: edgeStyle,
    type: "smoothstep",
  },
];

// ─── Generic diagram wrapper ──────────────────────────────────────────────────

function FlowDiagram({
  flowNodes,
  flowEdges,
  height = 660,
}: {
  flowNodes: Node[];
  flowEdges: Edge[];
  height?: number;
}) {
  return (
    <div
      className="w-full rounded-2xl border border-border/60 bg-background overflow-hidden"
      style={{ height }}
    >
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
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
    case "tawsil-star-vtc":
      return <FlowDiagram flowNodes={vtcNodes} flowEdges={vtcEdges} />;
    case "tawsil-star-expeditor":
      return (
        <FlowDiagram flowNodes={expeditorNodes} flowEdges={expeditorEdges} />
      );
    case "da-mall":
      return <FlowDiagram flowNodes={daMallNodes} flowEdges={daMallEdges} />;
    case "algeria-eats":
      return (
        <FlowDiagram
          flowNodes={algeriaEatsNodes}
          flowEdges={algeriaEatsEdges}
        />
      );
    case "wamidh":
      return (
        <FlowDiagram
          flowNodes={wamidhNodes}
          flowEdges={wamidhEdges}
          height={580}
        />
      );
    case "waffir":
      return (
        <FlowDiagram
          flowNodes={waffirNodes}
          flowEdges={waffirEdges}
          height={580}
        />
      );
    case "dzhikers":
      return (
        <FlowDiagram flowNodes={dzhikersNodes} flowEdges={dzhikersEdges} />
      );
    case "movies-app":
      return (
        <FlowDiagram
          flowNodes={moviesNodes}
          flowEdges={moviesEdges}
          height={580}
        />
      );
    default:
      return null;
  }
}
