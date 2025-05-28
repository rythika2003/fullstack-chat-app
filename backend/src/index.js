
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.routes.js";
// import messageRoutes from "./routes/message.route.js";
// import { app, server } from "./lib/socket.js";
// import { connectDB } from "./lib/db.js";
// import dotenv from "dotenv";
// dotenv.config();


// const PORT = process.env.PORT || 5001;

// connectDB();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}`);
//   next();
// });


// app.use(express.json());
// app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));

// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//   res.send("Chat App Backend is Running");
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
// });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// For ES module compatibility (because you're using `import`)
const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname= path.resolve();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
 
  
  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

app.get("/", (req, res) => {
  res.send("Chat App Backend is Running");
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT: ${PORT}`);
});
