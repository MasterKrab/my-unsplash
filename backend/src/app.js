
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

// Enviroment variables
require("dotenv").config();
const { PORT, MONGODB_URI, ORIGIN } = process.env;

const port = PORT || 3000;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(error => console.log(error));

// Cors
const cors = require("cors");

const corsConfig = {
  origin: ORIGIN,
};

app.use(cors(corsConfig));

// Routes
app.use("/images", require("./router/images"));

app.get("/", (req, res) => {
  res.status(404).json({
    state: false,
    message: "Not found",
  });
});

app.listen(port, () => {
  console.log("Server working", port);
});
