import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoutes";
import contactRoutes from "../routes/contactRoutes";
import postRoutes from "../routes/postRoutes";

/* CONFIGURATIONS */
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/assets", express.static("assets"));

/* ROUTES */
app.get("/", (req: Request, res: Response) => {
  res.send("working");
});
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/posts", postRoutes);
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(
    "mongodb+srv://ritiksingh7762:oPCKt7nWHgHWOHg5@cluster0.p7dt24l.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "GymMate",
    }
  )
  .then(() => {
    app.listen(PORT, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error(`${error} did not connect`));
