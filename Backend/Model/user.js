    import { createClient } from "@supabase/supabase-js";

    import { configDotenv } from 'dotenv';
    configDotenv();
    const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
    );

    export const getUserData = async (req, res) => {
    try {
        
        const sub = req.user.sub; 
    
        const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("sub", sub)
        .single();
           
        return res.json( data );
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch user data" });
    }
    };
