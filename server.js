const express = require("express");
const app = express();
const router = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;

// cors middleware to allow connection for front/backend
app.use(cors());
// middleware
app.use(express.json());

// connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// upload image route
app.use("/movie", router);

// connects to port
app.listen(port, () => console.log(`server is running on ${port}`));
