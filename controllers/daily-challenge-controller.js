const dailyChallengeModel = require("../models/daily-challenge-model");

const getDailyChallenge = async (req, res) => {
  const { date } = req.body;
  try {
    const challenge = await dailyChallengeModel.find({
      daily_challenge_display_date: date,
    });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDailyChallenge = async (req, res) => {
  const {
    daily_challenge_type,
    daily_challenge_display_date,
    daily_challenge_total_chances,
    daily_challenge_clue,
    daily_challenge_answer,
  } = req.body;
  const newChallenge = new dailyChallengeModel({
    daily_challenge_type,
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
  const { id } = req.body;
  const {
    daily_challenge_type,
    daily_challenge_display_date,
    daily_challenge_total_chances,
    daily_challenge_clue,
    daily_challenge_answer,
  } = req.body;
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
