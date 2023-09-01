const { User } = require('../../models/user');

const addBodyData = async (req, res) => {
  const { _id } = req.user;
  const userData = req.body;
  const { height, currentWeight, birthday, sex, activityLevel } = userData;

  const activityLevels = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
  const activityCoefficient = activityLevels[activityLevel] || 1.2;

  const birthdayDate = new Date(birthday);
  const currentDate = new Date();
  const userAge = currentDate.getFullYear() - birthdayDate.getFullYear();

  let dailyCalorieNorm;
  if (sex === 'male') {    
    dailyCalorieNorm = Math.round(
      (10 * currentWeight + 6.25 * height - 5 * userAge + 5) * activityCoefficient
    );    
  } else {
    dailyCalorieNorm = Math.round(
      (10 * currentWeight + 6.25 * height - 5 * userAge - 161) * activityCoefficient
    );    
  }
  const dailyExerciseTime = 110;
  const updatedUser = await User.findByIdAndUpdate(_id, {
    bodyData: {
      ...userData,
      dailyRateCalories: dailyCalorieNorm,
      dailyExerciseTime,
    },
  }, { new: true }).select('name email avatar bodyData token');

  res.json(updatedUser);
};

module.exports = addBodyData;
