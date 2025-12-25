import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LogOutButton from "./components/LogOutButton";
import { redirect } from "next/navigation";
import AdminDashboardButton from "./components/AdminDashboardButton";
import { getSession, isAdmin as checkIsAdmin } from "@/lib/jwt";
import { getUserById } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserById(session.userId);
  const isAdmin = await checkIsAdmin();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-12 sm:py-24 px-6">
      <div className="bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary py-8 px-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
              <AvatarFallback>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">
                {user.name}
              </h2>
              <p className="text-primary-foreground/80">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="p-6 grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                disabled
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <div className="flex items-center gap-2">
              <Input id="name" defaultValue={user.name} disabled />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {user.role}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mx-auto">
            <LogOutButton />
            {isAdmin && <AdminDashboardButton />}
          </div>
        </div>
      </div>
    </div>
  );
}
