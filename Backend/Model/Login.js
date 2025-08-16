import { configDotenv } from "dotenv";
import { createClient } from "@supabase/supabase-js";

configDotenv();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export const Login = async ({ sub, email, name, picture }) => {
  try {
    if (!sub) throw new Error("sub is missing!");
    // 1. Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("sub", sub)
      .maybeSingle();

    if (fetchError) throw new Error(`Error fetching user: ${fetchError.message}`);
    if (existingUser) return existingUser;

    // 2. Insert new user
    const { data: insertedRows, error: insertError } = await supabase
      .from("users")
      .insert([{ sub , email , name , picture }]) 
      .maybeSingle();

    if (insertError) throw new Error(`Error creating user: ${insertError.message}`);
    return 0;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
