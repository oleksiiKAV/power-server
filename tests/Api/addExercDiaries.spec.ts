import { test, expect} from '@playwright/test'
import { singnUpValidBody } from "../testData/signUp"
import {generateAddProd} from "../testData/addProd"
import {generateAddExerc} from "../testData/addExerc"
import { addIncorrectBody, bodyData } from "../testData/body"
// import { bodyData } from "../testData/body"
import { UserData, signUpAndLogin, deleteUser, addUserBody, BodyData } from "../helpers/actions"


test.describe.parallel('Exercises in diaries', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
  // const baseUrl = 'http://localhost:3000/api'
  let savedRandom
  let exercTime
  let exercBurnedCalories

  test(`Add done exercise, check it, and delete it.`, async ({ request }) => {
    
    const userData: UserData = singnUpValidBody.userData;
    const bodyAddData = bodyData.body
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    [savedRandom, exercTime, exercBurnedCalories] = await generateAddExerc(token)
    
    await addUserBody(request, token, bodyAddData)    
    
    try {
      const respAddProduct = await request.post(`${baseUrl}/diaries/exercise/add`,
      {
        headers: { "Authorization": `Bearer ${token}` },
        data: savedRandom,
      });      
      expect(respAddProduct.status()).toBe(200);
      const responseAddBody = JSON.parse(await respAddProduct.text());
      expect(responseAddBody.doneExercises).toEqual(expect.arrayContaining([
        expect.objectContaining({
          exercise: expect.any(String), 
          time: expect.any(Number),  
          burnedCalories: expect.any(Number),
          _id: expect.any(String), 
        }),
      ]));
      
      const expectedBurnedCalories= (savedRandom.time*exercBurnedCalories)/exercTime
      expect(responseAddBody.burnedCalories).toBeCloseTo(expectedBurnedCalories);

      const respDelProd = await request.delete(`${baseUrl}/diaries/exercise/delete/`,
      {
        headers: { "Authorization": `Bearer ${token}` },        
        data:{
          date:savedRandom.date,
          exerciseId: responseAddBody.doneExercises[0]._id
        }
      })
      
      expect(respDelProd.status()).toBe(200)
      const respDelProdBody = JSON.parse(await respDelProd.text());
      
      expect(respDelProdBody.doneExercises.length).toBe(0)
      
      const respDel = await request.delete(`${baseUrl}/diaries/daily/${savedRandom.date}`,
      {
        headers: { "Authorization": `Bearer ${token}` },        
      })
      expect(respDel.status()).toBe(200)
      
      
    } finally { 
      await deleteUser(request, token)       
    };
  });



})
