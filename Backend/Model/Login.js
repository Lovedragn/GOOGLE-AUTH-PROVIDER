import { configDotenv } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { blake3 } from '@noble/hashes/blake3'

function hashSubId(subId) {
  const hash = blake3(new TextEncoder().encode(subId))
  return Buffer.from(hash).toString('hex').slice(0, 16) // 8 bytes = 16 hex chars
}

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
    const address = hashSubId(sub);
    if (fetchError) throw new Error(`Error fetching user: ${fetchError.message}`);

    if (existingUser) return JSON.stringify({sub , email , name , picture , address});

    // 2. Insert new user
    const { data: insertedRows, error: insertError } = await supabase
      .from("users")
      .insert([{ sub , email , name , picture }]) 
      .maybeSingle();

    if (insertError) throw new Error(`Error creating user: ${insertError.message}`);
   
    return  JSON.stringify({sub , email , name , picture});
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
