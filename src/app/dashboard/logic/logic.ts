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
    tools: z.array(z.string()).refine((val) => val.length > 0, {
      message: "Tools array cannot be empty",
    }),
    dates: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.length > 0, {
        message: "Dates cannot be empty if provided",
      }),
    ghlink: z.string().optional(),
    demolink: z.string().optional(),
    storelink: z.string().optional(),
  });

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    images: formData.getAll("images") as File[],
    ghlink: formData.get("ghlink"),
    demolink: formData.get("demolink"),
    storelink: formData.get("storelink"),
    tools: formData.getAll("tools") as string[],
    dates: formData.get("dates"),
  };

  const result = formDataSchema.safeParse(data);

  console.log(data);

  if (!result.success) {
    console.log(result.error.errors);
    return { errors: result.error.errors };
  }

  const uploadedImageUrls: string[] = [];

  if (data.images.length !== 0) {
    console.log(data.images.length);
    for (const image of data.images) {
      console.log(image.name);
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
    slug: createSlug(result.data.name),
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

function createSlug(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

export async function deleteProject(slug: string) {
  const supabase = createClient();
  const { error } = await supabase.from("projects").delete().match({ slug });
  if (error) {
    console.error("Error deleting project:", error.message);
    return error;
  }
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}
