"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getUserCount() {
  const supabase = createClient();
  const { data, error } = await supabase.from("roles").select("id");
  if (error) {
    console.log(error);
    return error;
  }
  return data.length;
}

export async function getPostsCount() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("id");
  if (error) {
    console.log(error);
    return error;
  }
  return data.length;
}

export async function getCommentsCount() {
  const supabase = createClient();
  const { data, error } = await supabase.from("comments").select("id");
  if (error) {
    console.log(error);
    return error;
  }
  return data.length;
}
export async function getProjectsCount() {
  const supabase = createClient();
  const { data, error } = await supabase.from("projects").select("id");
  if (error) {
    console.log(error);
    return error;
  }
  return data.length;
}

export async function getReviewsCount() {
  const supabase = createClient();
  const { data, error } = await supabase.from("reviews").select("id");
  if (error) {
    console.log(error);
    return error;
  }
  return data.length;
}

export async function isUserAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase.from("roles").select("isAdmin");
  if (error) {
    console.log(error);
    return error;
  }
  return data[0].isAdmin;
}

export async function addNewProject(prevState: any, formData: FormData) {
  const supabase = createClient();

  const formDataSchema = z.object({
    name: z.string().refine((val) => val.length > 0, {
      message: "Name is required and cannot be empty",
    }),
    description: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.length > 0, {
        message: "Description cannot be empty if provided",
      }),
    slug: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.length > 0, {
        message: "Slug cannot be empty if provided",
      }),

    tools: z.array(z.string()).refine((val) => val.length > 0, {
      message: "Tools array cannot be empty",
    }),
    dates: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.length > 0, {
        message: "Dates cannot be empty if provided",
      }),
  });

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    slug: formData.get("slug"),
    images: formData.getAll("images") as File[],
    links: JSON.parse(formData.get("links") as string),
    href: formData.get("href"),
    tools: formData.getAll("tools"),
    dates: formData.get("dates"),
  };

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.errors);
    return { errors: result.error.errors };
  }

  const uploadedImageUrls: string[] = [];

  if (data.images.length !== 0) {
    for (const image of data.images) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("main-storage")
        .upload(`images/${image.name}${Date.now()}`, image);

      if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        return { errors: [{ message: uploadError.message }] };
      }

      const imageUrl = supabase.storage
        .from("main-storage")
        .getPublicUrl(uploadData.path).data;

      uploadedImageUrls.push(imageUrl.publicUrl);
    }
  }
  const mergedData = {
    ...result.data,
    images: uploadedImageUrls,
  };
  const { error } = await supabase.from("projects").insert([mergedData]);

  if (error) {
    return {
      errors: [{ message: error.message }],
    };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}
