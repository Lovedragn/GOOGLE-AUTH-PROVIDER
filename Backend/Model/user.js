import { createClient } from "@supabase/supabase-js";

import { configDotenv } from "dotenv";
configDotenv();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export const gettasks = async (req, res) => {
  try {
    const { sub } = req.body;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("sub", sub)
      .single();

    if (error) throw Error("user get error");
    return res.json(data);
  } catch (err) {
    console.log("error");
    return res.status(500).json({ message: "Failed to fetch user data" });
  }
};

export const addtasks = async (req, res) => {
  try {
    const { sub, values } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const { data: existing, error: fetcherror } = await supabase
      .from("tasks")
      .select("*")
      .eq("sub", sub)
      .maybeSingle  ();

    if (fetcherror) throw fetcherror;

    if (existing) {
      const ensureArray = (val) => Array.isArray(val) ? val : [];

      const updatedTitle = [...ensureArray(existing.title), values.title];
      const updatedDesc = [...ensureArray(existing.desc), values.desc];
      const updatedDate = [...ensureArray(existing.date), date];

      const { error: updateError } = await supabase
        .from("tasks")
        .update({
          title: updatedTitle,
          desc: updatedDesc,
          date: updatedDate,
        })
        .eq("sub", sub);

      if (updateError) throw updateError;

      return res.status(200).json({ message: "Appended successfully" });
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          sub: sub,
          title: [values.title],
          desc: [values.desc],
          date: [date],
        },
      ]);
    if (error) throw error;

    return res.status(200).json({ message: "Inserted new task", data });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "failed", error: err.message });
  }
};

export const deletetasks = async (req, res) => {
  try {
    const { sub, taskIndex } = req.body;
    
    // Get the current user's tasks
    const { data: existing, error: fetcherror } = await supabase
      .from("tasks")
      .select("*")
      .eq("sub", sub)
      .single();

    if (fetcherror) throw fetcherror;
    if (!existing) throw new Error("User not found");

    // Remove the task at the specified index
    const updatedTitle = existing.title.filter((_, index) => index !== taskIndex);
    const updatedDesc = existing.desc.filter((_, index) => index !== taskIndex);
    const updatedDate = existing.date.filter((_, index) => index !== taskIndex);

    // Update the database with the filtered arrays
    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        title: updatedTitle,
        desc: updatedDesc,
        date: updatedDate,
      })
      .eq("sub", sub);

    if (updateError) throw updateError;

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
};
