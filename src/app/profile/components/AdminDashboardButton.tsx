"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const AdminDashboardButton = () => {
  const supabase = createClient();
  const router = useRouter();
  return (
    <Button
      variant="default"
      className="mb-4 md:mb-0"
      onClick={() => {
        router.push("/dashboard");
        router.refresh();
      }}
    >
      Dashboard
    </Button>
  );
};

export default AdminDashboardButton;
