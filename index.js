const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.ATLAS_URI)
  .catch((err) => console.log(err))
  .then(() => console.log("MongoDB connected"));
console.log("MongoDB connected");

// daily challenge model
const dailyChallengeRoute = require("./routes/daily-challenge-route");
app.use("/", dailyChallengeRoute);

// daily challenge user model
const dailyChallengeUserRoute = require("./routes/daily-challenge-user-route");
app.use("/", dailyChallengeUserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
