import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors"



const app = express();
dotenv.config();




// Connecting with database
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connected with MongoDB");
  } catch (error) {
    throw error
  }

}


//Check if connection is fine
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
})


//middlewares

app.use(cors())

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/hotels", hotelsRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});




// listening express server
app.listen(3000, () => {
  connect()
  console.log("Connected to backend :)");
})