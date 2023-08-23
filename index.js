import express from "express";
import dotenv from 'dotenv';
dotenv.config();
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import busesRoute from "./routes/buses.js";
import paymentsRoute from "./routes/payments.js";
import ticketRoute from "./routes/ticket.js";
import cityRoutes from './routes/cities.js';
import cookieParser from "cookie-parser";
import passport from "./utils/passport.js";


const app = express();
//middlewares
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    throw err;
  }
};



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/buses", busesRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/ticket", ticketRoute);
app.use('/api/cities', cityRoutes);
//error handler

app.use((createError, req, res, next) => {
  console.log(createError.message);
  res.status(createError.status || 500).json({ error: createError.message });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend");
});
