"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AdminDashboardButton = () => {
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
