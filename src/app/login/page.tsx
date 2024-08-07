import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

export default async function Login() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/profile");
  }

  return (
    <div className="flex flex-col items-center justify-center bg-background py-12 sm:py-8 px-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome to my portfolio!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Please sign in or create an account to continue.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
