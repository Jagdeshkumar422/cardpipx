import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*", // Allow requests from frontend
    //origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Include all standard methods
    credentials: true, // Allow cookies and credentials
  })
);

app.use(cookieParser());
app.options("*", cors()); // Handle preflight requests

import mongoose from "mongoose";

//routes
import AuthRoute from "./Routes/Auth.route.js";
import TransactionRoute from "./Routes/Transaction.route.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to the Database");
  })
  .catch((error) => {
    console.log("Error connecting to Database", error.message);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", AuthRoute);
app.use("/api/transaction", TransactionRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// MIDDLEWARE # 01
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
