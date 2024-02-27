// create express application instance
const express = require("express");

// function to create a new router object.
const router = express.Router();

// import the daily-challenge-user-controller.js
const {
  getDailyChallengeUser,
  createDailyChallengeUser,
  updateDailyChallengeUser,
  deleteDailyChallengeUser,
} = require("../controllers/daily-challenge-user-controller");

// create daily challenge user
router.post("/daily-challenge-user", createDailyChallengeUser);

// get daily challenge user
router.get("/daily-challenge-user", getDailyChallengeUser);

// update daily challenge user
router.patch("/daily-challenge-user", updateDailyChallengeUser);

// delete daily challenge user
router.delete("/daily-challenge-user", deleteDailyChallengeUser);

// export the router
module.exports = router;
