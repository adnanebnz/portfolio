import { getSession } from "@/lib/jwt";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

export default async function Login() {
  const session = await getSession();

  if (session) {
    redirect("/profile");
  }

  return (
    <div className="flex flex-col items-center justify-center bg-background py-12 sm:py-8 px-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Admin Login
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to access the dashboard.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
