const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User } = require("../../models/user");
const {Exercise} = require("../../models/exercise");
const {Diary} = require("../../models/diary");

router.get('/', async (req, res, next) => {
  try {
    const totalVideoTrainings = await Exercise.countDocuments();
    const totalBurnedCaloriesResult = await Diary.aggregate([
      { $group: { _id: null, totalCalories: { $sum: '$burnedCalories' } } },
    ]);
    const totalBurnedCalories = totalBurnedCaloriesResult[0]?.totalCalories || 0;
    const totalUsers = await User.countDocuments();
    

    const totalTrainingHoursResult = await Diary.aggregate([
        { $group: { _id: null, totalHours: { $sum: '$timeSport' } } },
      ]);
      
      const totalTrainingMinutes = totalTrainingHoursResult[0]?.totalHours || 0;
      const hours = Math.floor(totalTrainingMinutes / 60);
      
      const totalTrainingTime = hours < 100 ? hours.toString().padStart(2, '0') : `${hours}`;
      

    const totalCompletedTrainingsResult = await Diary.aggregate([
      { $group: { _id: null, totalCount: { $sum: { $size: '$doneExercises' } } } },
    ]);
    const totalCompletedTrainings = totalCompletedTrainingsResult[0]?.totalCount || 0;

    const statistics = {
      totalVideoTrainings,
      totalBurnedCalories,
      totalUsers,
    
    totalTrainingTime,
      totalCompletedTrainings,
    };

    res.json(statistics);
  } catch (error) {
    next(error);
  }
});

module.exports = router;