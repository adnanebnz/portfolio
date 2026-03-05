import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  getUserCount,
  isUserAdmin,
  getPostsCount,
  getProjectsCount,
  getWorkCount,
} from "./logic/logic";
import { redirect } from "next/navigation";
import {
  Users,
  FileText,
  FolderKanban,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!(await isUserAdmin())) {
    redirect("/login");
  }

  const [userCount, postsCount, projectsCount, workCount] = await Promise.all([
    getUserCount(),
    getPostsCount(),
    getProjectsCount(),
    getWorkCount(),
  ]);

  const stats = [
    {
      title: "Users",
      value: userCount,
      description: "Total registered users",
      icon: Users,
      href: "/dashboard/settings",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Blog Posts",
      value: postsCount,
      description: "Published articles",
      icon: FileText,
      href: "/dashboard/blog",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Projects",
      value: projectsCount,
      description: "Portfolio projects",
      icon: FolderKanban,
      href: "/dashboard/projects",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Work Experience",
      value: workCount,
      description: "Career positions",
      icon: Briefcase,
      href: "/dashboard/work",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const quickLinks = [
    {
      title: "Add Blog Post",
      href: "/dashboard/blog",
      description: "Write a new article",
    },
    {
      title: "Add Project",
      href: "/dashboard/projects",
      description: "Showcase new work",
    },
    {
      title: "Add Work Experience",
      href: "/dashboard/work",
      description: "Update your career",
    },
    {
      title: "Manage Resume",
      href: "/dashboard/resume",
      description: "Edit CV content",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{link.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Management Sections */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/dashboard/blog">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Blog Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create, edit, and manage your blog posts. Write in both
                  English and French.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/projects">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5" />
                  Projects Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Showcase your portfolio projects with images, links, and
                  descriptions.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/work">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage your professional experience and career history.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
