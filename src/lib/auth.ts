import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const signUp = async (email: string, password: string) => {
  try {
    ("user server");
    const { error, data } = await supabase.auth.signUp({ email, password });
    return { error, data };
  } catch (err) {
    console.error("Error during sign up:", err);
    return { error: err, data: null };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    ("user server");

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error, data };
  } catch (err) {
    console.error("Error during sign in:", err);
    return { error: err, data: null };
  }
};

export const signInWithGoogle = async () => {
  try {
    ("user server");

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    return { error, data };
  } catch (err) {
    console.error("Error during sign in with Google:", err);
    return { error: err, data: null };
  }
};

export const getUser = async () => {
  try {
    ("user server");

    const user = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.error("Error getting user:", err);
    return { error: err, user: null };
  }
};

export const signOut = async () => {
  try {
    ("user server");
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error("Error during sign out:", err);
    return { error: err };
  }
};
