import { test, expect } from '@playwright/test'
import fs from "fs";
import path from "path";
import { singnUpValidBody } from "../testData/signUp"
import { addIncorrectBody } from "../testData/body"
import { bodyData } from "../testData/body"
import { UserData, signUpAndLogin, deleteUser } from "../helpers/actions"
const savedRandom = singnUpValidBody

test.describe.parallel('User add users body information', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
  // const baseUrl = 'http://localhost:3000/api'

  test(`Get and update user's information. Create user, login, add body, update avatar and name, and delete.`, async ({ request }) => {
    const userData: UserData = singnUpValidBody.userData;
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    try {
        const respAddBody = await request.post(`${baseUrl}/users/body`,
        {
          headers: { "Authorization": `Bearer ${token}` },
          data: bodyData.body,
        });
        expect(respAddBody.status()).toBe(200);

        const respGetCurr = await request.get(`${baseUrl}/users/current`,
        {
          headers: { "Authorization": `Bearer ${token}` },
        });
        expect(respGetCurr.status()).toBe(200);
        const respGetBody = JSON.parse(await respGetCurr.text())
        expect(respGetBody).toEqual(expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          token: expect.any(String),
          avatar: expect.any(String),
          bodyData: expect.objectContaining({
            height: expect.any(Number),
            currentWeight: expect.any(Number),
            desiredWeight: expect.any(Number),
            birthday: expect.any(String),
            blood: expect.any(Number),
            sex: expect.any(String),
            levelActivity: expect.any(Number),
            dailyRateCalories: expect.any(Number),
            dailySportMin: expect.any(Number),
          }),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }));
        const fileName="test.png"
        const file = path.join(__dirname, "../testData/"+fileName);
        console.log(file)
        const image = fs.readFileSync(file);
        const newName="Avatar was changed"

        const respUpdate = await request.post(`${baseUrl}/users/current/edit`, {
          headers: { "Authorization": `Bearer ${token}` },
          multipart: {
            avatar: {
              name: file,
              mimeType: "image/png",
              buffer: image,
            },
            name: newName,
          },
        });
        const updateBody = JSON.parse(await respUpdate.text());
        
        expect(respUpdate.status()).toBe(200);
        expect(updateBody.name).toBe(newName);  
        const fileNameInAvatar = updateBody.avatar.indexOf(fileName)
        expect(fileNameInAvatar).not.toBe(0)        
        const cloud = updateBody.avatar.indexOf("cloudinary.com")
        expect(cloud).not.toBe(0)        
        
    }
    finally {
      const deleteResponse = await deleteUser(request, token);
      expect(deleteResponse.status()).toBe(200);
      
    }
  });



})
