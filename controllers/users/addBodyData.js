const { User } = require('../../models/user');

const addBodyData = async (req, res) => {
  const { _id } = req.user;
  const bodyData = req.body;

  const birthday = new Date(bodyData.birthday);
  const currentDate = new Date();
  const userAge = currentDate.getFullYear() - birthday.getFullYear();

  let dailyRateCalories;
  //   Малорухливий спосіб життя (мало або без фізичних вправ): BMR * 1,2
  // Легка активність (легкі вправи/спорт 1-3 дні/тиждень): BMR * 1,375
  // Помірно активний (помірні вправи/спорт 3-5 днів на тиждень): BMR * 1,55
  // Дуже активний (інтенсивні вправи/спорт 6-7 днів на тиждень): BMR * 1,725
  // Дуже активний (дуже важкі вправи/спорт і фізична робота): BMR * 1,9

  const cofByLevelActivity = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };

  if (bodyData.sex === 'female') {
    //Для жінок: BMR = (10 * вага (кг) + 6,25 * зріст (см) - 5 * вік (роки) - 161) * коефіцієнт по способу життя
    dailyRateCalories = Math.round(
      (10 * bodyData.currentWeight + 6.25 * bodyData.height - 5 * userAge - 161) * cofByLevelActivity[bodyData.levelActivity],
    );
  } else {
    //Для чоловіків: BMR = (10 * вага (кг) + 6,25 * зріст (см) - 5 * вік (роки) + 5) * коефіцієнт по способу життя
    dailyRateCalories = Math.round((10 * bodyData.currentWeight + 6.25 * bodyData.height - 5 * userAge + 5) * cofByLevelActivity[bodyData.levelActivity]);
  }

  const results = await User.findByIdAndUpdate(_id, { bodyData: { ...bodyData, dailyRateCalories } }, { new: true }).select('name email avatar bodyData token');
  res.json(results);
};

module.exports = addBodyData;
