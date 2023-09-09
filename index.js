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
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 8800;
const corsOrigin = process.env.NODE_ENV === 'production' ? 'https://busboy.vercel.app' : 'http://localhost:3000';

//middlewares
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: corsOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

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

app.listen(PORT, () => {
  connect();
  console.log("Connected to backend");
});
