"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  return (
    <Button
      variant="default"
      className="mb-4 md:mb-0"
      onClick={() => {
        supabase.auth.signOut();
        router.push("/");
        router.refresh();
      }}
    >
      Sign Out
    </Button>
  );
};

export default LogOutButton;
