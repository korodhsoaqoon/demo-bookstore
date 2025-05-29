import express from "express";

import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import bookRoute from "./routes/book.route.js";
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/books", bookRoute);
