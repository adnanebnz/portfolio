import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import LogOutButton from "./components/LogOutButton";
import { redirect } from "next/navigation";
import AdminDashboardButton from "./components/AdminDashboardButton";
import { isUserAdmin } from "../dashboard/logic/logic";

export default async function Profile() {
  const supabase = createClient();
  const getUser = await supabase.auth.getUser();
  const user = getUser.data.user;
  const isAdmin = await isUserAdmin();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="w-full max-w-3xl mx-auto py-12 sm:py-24 px-6">
      <div className="bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary py-8 px-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  process.env.NEXT_PUBLIC_SUPABASE_STORAGE +
                  user?.user_metadata.profilePic
                }
                alt={user?.user_metadata.name}
              />
              <AvatarFallback>
                {user?.user_metadata.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">
                {user?.user_metadata.name}
              </h2>
              <p className="text-primary-foreground/80">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="p-6 grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Input id="email" type="email" defaultValue={user?.email} />
              <Button>Save</Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center gap-2">
              <Input id="password" type="password" />
              <Button>Save</Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <div className="flex items-center gap-2">
              <Input id="name" defaultValue={user?.user_metadata.name} />
              <Button>Save</Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload New
              </Button>
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

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
