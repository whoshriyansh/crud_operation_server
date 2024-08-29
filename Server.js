import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/ConfigDB.js";
import adminRoutes from "./routes/Admin.route.js";
import userRoutes from "./routes/User.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res
    .status(errorStatus)
    .json({ success: false, status: errorStatus, message: errorMessage });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`App is listening on PORT ${PORT}`);
});
