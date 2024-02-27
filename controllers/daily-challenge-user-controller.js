const dailyChallengeUserModel = require("../models/daily-challenge-user-model");
const dailyChallengeModel = require("../models/daily-challenge-model");

const getDailyChallengeUser = async (req, res) => {
  console.log("getDailyChallengeUser");
  const { daily_challenge_owner_id } = req.query;
  try {
    const dailyChallengeUser = await dailyChallengeUserModel.find({
      daily_challenge_owner_id,
    });
    res.status(200).json(dailyChallengeUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createDailyChallengeUser = async (req, res) => {
  console.log("createDailyChallengeUser");
  const {
    daily_challenge_owner_id,
    daily_challenge_date,
    daily_challenge_type,
  } = req.body;
  const dailyChallengeUser = new dailyChallengeUserModel({
    daily_challenge_owner_id,
    daily_challenge_date,
    daily_challenge_type,
  });
  try {
    await dailyChallengeUser.save();
    res.status(201).json(dailyChallengeUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateDailyChallengeUser = async (req, res) => {
  console.log("updateDailyChallengeUser");
  const {
    daily_challenge_owner_id,
    daily_challenge_date,
    daily_challenge_word,
  } = req.body;

  try {
    const { daily_challenge_answer, daily_challenge_total_chances } =
      await dailyChallengeModel.findOne({
        daily_challenge_display_date: daily_challenge_date,
      });
    const dailyChallengeUser = await dailyChallengeUserModel.findOne({
      daily_challenge_owner_id,
      daily_challenge_date,
    });

    if (dailyChallengeUser.daily_challenge_isCompleted) {
      return res.status(200).send({ message: "Daily Challenge Completed" });
    } else {
      const updateResult = await dailyChallengeUserModel.updateOne(
        {
          daily_challenge_owner_id,
          daily_challenge_date,
        },
        {
          $set: {
            daily_challenge_isCompleted:
              daily_challenge_answer.toLowerCase() ===
                daily_challenge_word.toLowerCase() ||
              dailyChallengeUser.daily_challenge_words.length ==
                daily_challenge_total_chances - 1,
          },
          $push: {
            daily_challenge_words: daily_challenge_word,
          },
        }
      );
    }
    res.status(200).json(dailyChallengeUser);
  } catch (error) {
    // console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const deleteDailyChallengeUser = async (req, res) => {
  console.log("deleteDailyChallengeUser");
  const { daily_challenge_owner_id, daily_challenge_date } = req.body;
  try {
    await dailyChallengeUserModel.findOneAndDelete({
      daily_challenge_owner_id,
      daily_challenge_date,
    });
    res.status(200).json("Daily Challenge User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getDailyChallengeUser,
  createDailyChallengeUser,
  updateDailyChallengeUser,
  deleteDailyChallengeUser,
};
