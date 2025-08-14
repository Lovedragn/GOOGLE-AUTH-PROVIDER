import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Must be your OAuth 2.0 Web client ID from Google Cloud Console
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/auth/login", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "No idToken provided" });

    // ✅ verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // must match the clientId used on the frontend
    });

    const payload = ticket.getPayload();
    const { email, sub, name } = payload; // sub = Google's stable user ID

    // TODO: upsert user in your SQL DB here (optional but recommended)

    // ✅ issue your own app token
    const token = jwt.sign(
      { googleId: sub, email, name },
      process.env.JWT_SECRET_KEY,          // set this in your .env
      { expiresIn: "12d" }
    );

    return res.json({ token });
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
