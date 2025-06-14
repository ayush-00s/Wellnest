import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import blogRoute from "./route/blog.route.js";
import userRoute from "./route/user.route.js";
import mentalHealthRoute from "./route/mentalhealth.route.js";

dotenv.config();

const app = express();

// ✅ CORS Setup for Vercel frontend
const allowedOrigins = ['https://wellnest-three.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// ✅ MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}
connectDB();

// ✅ Routes
app.use("/Blog", blogRoute);
app.use("/User", userRoute);
app.use("/MentalHealth", mentalHealthRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
