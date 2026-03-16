import "dotenv/config";
const PORT = process.env.PORT || 5000;
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();

connectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());

app.use("/api", routes);
app.listen(PORT, () => {
  console.log("Server running at port 5000");
});
