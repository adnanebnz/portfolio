"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { register } from "../actions";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const RegisterForm = () => {
  const initialState = {
    errors: [],
  };

  const [state, formAction] = useFormState(register, initialState);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [otherError, setOtherError] = useState<string | null>(null);

  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        toast.error("You must select an image to upload.");
        return;
      }
      const file = e.target.files[0];
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      toast.error("Something wrong happened while uploading the image.");
    }
  };

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        if (error.message?.includes("Name")) {
          setNameError(error.message);
        } else if (error.message?.includes("email")) {
          setEmailError(error.message);
        } else if (error.message?.includes("Password")) {
          setPasswordError(error.message);
        } else {
          setOtherError(error.message);
        }
      });
    }
  }, [state.errors]);

  return (
    <form method="POST" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="picture">Profile Picture</Label>
        <Input
          id="picture"
          type="file"
          onChange={changeImage}
          name="profilePic"
        />
      </div>
      {imageUrl && (
        <div className="flex items-center justify-center">
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={100}
            height={100}
            className="rounded-full mt-4"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Will Smith"
          required
        />
        {nameError && <div className="text-sm text-red-500">{nameError}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          required
        />
        {emailError && <div className="text-sm text-red-500">{emailError}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
        {passwordError && (
          <div className="text-sm text-red-500">{passwordError}</div>
        )}
        {otherError && <div className="text-sm text-red-500">{otherError}</div>}
      </div>
      <Button type="submit" className="w-full" formAction={formAction}>
        Register
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
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

export default RegisterForm;
