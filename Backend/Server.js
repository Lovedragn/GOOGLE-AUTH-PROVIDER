import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import token from "./token.js";
import { gettasks } from "./Model/user.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/login", token); // Google OAuth login
app.post("/db/tasks", gettasks); // fetch tasks


app.listen(5000, () => console.log("Server is running on port 5000"));
