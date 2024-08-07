"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { login, loginWithGoogle } from "../actions";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const initialState = {
    errors: [],
  };
  const [state, formAction] = useFormState(login, initialState);

  useEffect(() => {
    state.errors.forEach((error) => {
      if (error.message === "Invalid login credentials") {
        toast.error("Invalid login credentials");
      }
    });
  }, [state.errors]);

  return (
    <>
      <form method="POST" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
          {state.errors.map((error) => (
            <div key={error.message} className="text-sm text-red-500">
              {error.message}
            </div>
          ))}
        </div>
        <Link
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </Link>
        <Button type="submit" className="w-full" formAction={formAction}>
          Sign in
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">OR</p>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => loginWithGoogle()}
      >
        <ChromeIcon className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </>
  );
};

function ChromeIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default LoginForm;
