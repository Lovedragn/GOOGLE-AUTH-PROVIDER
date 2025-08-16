import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import token, { verifyToken } from "./token.js";
import { getUserData } from "./Model/user.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/login", token); // Google OAuth login
app.get("/user/get", verifyToken, getUserData); // JWT-protected fetch


app.listen(5000, () => console.log("Server is running on port 5000"));
