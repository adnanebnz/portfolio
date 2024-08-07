import { createClient } from "@/utils/supabase/server";

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
