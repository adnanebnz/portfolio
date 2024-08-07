import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RegisterForm from "../login/components/RegisterForm";

export default async function Register() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/profile");
  }

  return (
    <div className="flex flex-col items-center justify-center bg-background py-12 sm:py-8 px-6 md:py-0 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome to my portfolio!
          </h1>
          <p className="mt-2 text-muted-foreground">Create your account now!</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
