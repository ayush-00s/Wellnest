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

// Middleware to parse JSON
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// ✅ Connect to MongoDB
try {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("✅ Connected to MongoDB");
} catch (error) {
  console.log("❌ MongoDB Connection Error:", error);
}

// ✅ Define Routes
app.use("/Blog", blogRoute);
app.use("/User", userRoute);
app.use("/MentalHealth", mentalHealthRoute);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
