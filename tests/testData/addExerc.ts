import axios from "axios";
const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
export const generateAddExerc = async (token: string) => {
 

  const resp = await axios.get(`${baseUrl}/exercises`,
    {
      headers: { "Authorization": `Bearer ${token}` },
    });

    const exercisesData = resp.data;

  const randomIndex = Math.floor(Math.random() * exercisesData.length);
  const selectedexerc = exercisesData[randomIndex];
  const exercisesId = selectedexerc._id;
  const randomTime = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

  const formattedDate = formatDate(new Date());
  const obj = {
    "date": formattedDate.toString(),
    "exercise": exercisesId.toString(),
    "time": randomTime
  };
  
  return [obj, selectedexerc.time, selectedexerc.burnedCalories]
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}