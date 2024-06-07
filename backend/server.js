const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const parser = require("body-parser");
dotenv.config();
const connectDB = require("./config/db");
connectDB();
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(parser.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is runnin on ${process.env.PORT}`.bgRed.italic.white);
});