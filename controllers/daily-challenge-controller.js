const dailyChallengeModel = require("../models/daily-challenge-model");

const getDailyChallenge = async (req, res) => {
  console.log("getDailyChallenge");
  const { date, type } = req.query;
  // console.log("test" + date, type);
  if (type === "last5") {
    try {
      const challenge = await dailyChallengeModel
        .find({
          daily_challenge_display_date: {
            $lte: date,
          },
        })
        .sort({ _id: -1 })
        .limit(5);
      res.json(challenge);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const challenge = await dailyChallengeModel.find({
        daily_challenge_display_date: date,
      });
      res.json(challenge);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const createDailyChallenge = async (req, res) => {
  console.log("createDailyChallenge");
  const {
    daily_challenge_type,
    daily_challenge_display_date,
    daily_challenge_total_chances,
    daily_challenge_clue,
    daily_challenge_answer,
  } = req.body;
  const newChallenge = new dailyChallengeModel({
    daily_challenge_type,  //TRY GIVING DATA NOT IN THE SAME ORDER
    daily_challenge_display_date,
    daily_challenge_total_chances,
    daily_challenge_clue,
    daily_challenge_answer,
  });
  try {
    const challenge = await newChallenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateDailyChallenge = async (req, res) => {
  console.log("updateDailyChallenge");
  const { id } = req.body;
  const {
    daily_challenge_type,   //TRY ADDING DATA WITH REORDERING THE FIELDS 
    daily_challenge_display_date,
    daily_challenge_total_chances,
    daily_challenge_clue,
    daily_challenge_answer,
  } = req.body;
  console.log("updateDailyChallenge", id);
  const updatedDailyChallenge = {
    daily_challenge_type,
    daily_challenge_updated_date: Date.now(),
    daily_challenge_display_date,
    daily_challenge_total_chances,
    daily_challenge_clue,
    daily_challenge_answer,
  };
  try {
    const response = await dailyChallengeModel.findByIdAndUpdate(
      id,
      updatedDailyChallenge,
      { new: true }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDailyChallenge = async (req, res) => {
  console.log("deleteDailyChallenge");
  const { id } = req.body;
  try {
    const response = await dailyChallengeModel.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getDailyChallenge,
  createDailyChallenge,
  updateDailyChallenge,
  deleteDailyChallenge,
};
