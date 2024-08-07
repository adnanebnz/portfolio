"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function login(prevState: any, formData: FormData) {
  const supabase = createClient();

  const formDataSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.errors };
  }
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      errors: [{ message: error.message }],
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function loginWithGoogle() {
  const supabase = createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) {
    return {
      errors: [{ message: error.message }],
    };
  }
  if (data.url) redirect(data.url);
}

export async function register(prevState: any, formData: FormData) {
  const supabase = createClient();

  const file = formData.get("profilePic") as File | null;
  let profilePicUrl = null;
  let pictureName = null;

  if (file) {
    pictureName = generateFileName(file);
    const { data: image, error: uploadError } = await supabase.storage
      .from("main-storage")
      .upload(pictureName, file);

    if (uploadError) {
      return { errors: [{ message: uploadError.message }] };
    }

    if (image) {
      profilePicUrl = image.fullPath;
    }
  }

  const formDataSchema = z.object({
    name: z.string().refine((val) => val.length > 0, {
      message: "Name is required",
    }),
    profilePic: z.string().optional().nullable(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
        profilePic: profilePicUrl,
      },
    },
  };
  const result = formDataSchema.safeParse({
    name: data.options.data.name,
    profilePic: data.options.data.profilePic,
    email: data.email,
    password: data.password,
  });

  if (!result.success) {
    return { errors: result.error.errors };
  }
  const { error, data: signUpData } = await supabase.auth.signUp(data);
  const userId = signUpData.user?.id;
  if (userId) {
    const { error: insertError } = await supabase.from("roles").insert([
      {
        uuid: userId,
        isAdmin: false,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.log(insertError);
      return {
        errors: [{ message: insertError.message }],
      };
    }
    if (error) {
      console.log(error);
      if (pictureName) {
        await supabase.storage.from("main-storage").remove([pictureName]);
      }
      return {
        errors: [{ message: error.message }],
      };
    }

    revalidatePath("/login", "layout");
    redirect("/login");
  }
}
const generateFileName = (file: File): string => {
  const timestamp = Math.floor(Date.now() / 1000);
  const fileExtension = file.name.split(".").pop();
  return `${timestamp}.${fileExtension}`;
};
