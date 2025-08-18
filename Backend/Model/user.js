import { createClient } from "@supabase/supabase-js";

import { configDotenv } from "dotenv";
configDotenv();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export const gettasks = async (req, res) => {
  try {
    const {sub} = req.body;
    
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("sub", sub)
      .single();

    if (error) throw Error("user get error");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch user data" });
  }
};
