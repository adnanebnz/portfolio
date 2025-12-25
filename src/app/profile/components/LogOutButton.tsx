"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

const LogOutButton = () => {
  const { logout } = useAuth();

  return (
    <Button variant="default" className="mb-4 md:mb-0" onClick={() => logout()}>
      Sign Out
    </Button>
  );
};

export default LogOutButton;
