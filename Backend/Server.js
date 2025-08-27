import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import token from "./token.js";
import { gettasks , addtasks } from "./Model/user.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/login", token); // Google OAuth login
app.post("/db/get/tasks", gettasks); // fetch tasks
app.post("/db/add/tasks" ,addtasks );

const PORT = process.env.PORT || 5000;  // 5000 for local dev
app.listen(PORT, () => console.log("Server is running on port 5000"));
