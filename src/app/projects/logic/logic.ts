"use server";
// TODO FIX ACCORDING TO TYPE
import { createClient } from "@/utils/supabase/server";
import { projectType, Response } from "@/utils/types";

export async function getAllProjects(): Promise<Response<projectType[]>> {
  const supabase = createClient();
  const { data, error } = await supabase.from("projects").select("*");
  if (error) {
    console.log(error);
    return { data: null, error: error.message };
  }
  return { data: data as projectType[], error: null };
}

export async function getProjectBySlug(
  slug: string
): Promise<Response<projectType>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.log(error);
    return { data: null, error: error.message };
  }
  return { data: data as projectType, error: null };
}
