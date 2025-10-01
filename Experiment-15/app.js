const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/experiment15");

app.use("/api", require("./studentRoutes"));

app.listen(3000, () => console.log("Server running on port 3000"));
