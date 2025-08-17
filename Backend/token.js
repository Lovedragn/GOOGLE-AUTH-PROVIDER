import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { Login } from "./Model/Login.js"; // Adjust the import path as necessary
import { configDotenv } from "dotenv";

configDotenv();
const token = async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  try {
    const { idToken } = req.body;
    if (!idToken)
      return res.status(400).json({ message: "No idToken provided" });

    // ✅ verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // must match the clientId used on the frontend
    });

    const payload = ticket.getPayload();

    const { email, sub, name, picture } = payload; // sub = Google's stable user ID

    // TODO: upsert user in your SQL DB here (optional but recommended)
    const user = await Login({ sub, email, name, picture });

    // ✅ issue your own app token
    const token = jwt.sign(
      { sub, email, name },
      process.env.JWT_SECRET_KEY, // set this in your .env
      { expiresIn: "12d" }
    );

    return res.json({ token, user });
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

export default token;
