import express from "express";

import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import bookRoute from "./routes/book.route.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/books", bookRoute);
