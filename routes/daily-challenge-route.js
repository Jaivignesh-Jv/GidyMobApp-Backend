// create express application instance
const express = require("express");

// function to create a new router object.
const router = express.Router();

// import the daily-challenge-controller.js
const {
  createDailyChallenge,
  getDailyChallenge,
  updateDailyChallenge,
  deleteDailyChallenge,
} = require("../controllers/daily-challenge-controller");

// create daily challenge
router.post("/daily-challenge", createDailyChallenge);

// get daily challenge
router.get("/daily-challenge", getDailyChallenge);

// update daily challenge
router.patch("/daily-challenge/", updateDailyChallenge);

//delete daily challenge
router.delete("/daily-challenge/", deleteDailyChallenge);

// export the router
module.exports = router;
