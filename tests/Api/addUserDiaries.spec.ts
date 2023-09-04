import { test, expect} from '@playwright/test'
import { singnUpValidBody } from "../testData/signUp"
import {generateAddProd} from "../testData/addProd"
import { addIncorrectBody, bodyData } from "../testData/body"
// import { bodyData } from "../testData/body"
import { UserData, signUpAndLogin, deleteUser, addUserBody, BodyData } from "../helpers/actions"


test.describe.parallel('User add diaries information', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
  // const baseUrl = 'http://localhost:3000/api'
  let savedRandom
  let prodCalories

  test.only(`Add eaten product.`, async ({ request }) => {
    [savedRandom, prodCalories] = await generateAddProd()
    const userData: UserData = singnUpValidBody.userData;
    const bodyAddData = bodyData.body
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    await addUserBody(request, token, bodyAddData)    
    
    try {
      const respAddProduct = await request.post(`${baseUrl}/diaries/product/add`,
      {
        headers: { "Authorization": `Bearer ${token}` },
        data: savedRandom,
      });      
      expect(respAddProduct.status()).toBe(200);
      const responseAddBody = JSON.parse(await respAddProduct.text());
      expect(responseAddBody.consumedProducts).toEqual(expect.arrayContaining([
        expect.objectContaining({
          product: expect.any(String), 
          amount: expect.any(Number),  
          calories: expect.any(Number),
          _id: expect.any(String), 
        }),
      ]));
      console.log()
      const expectedCalories= (responseAddBody.consumedProducts[0].amount*prodCalories)/100
      expect(responseAddBody.consumedCalories).toBeCloseTo(expectedCalories);

    } finally { 
      await deleteUser(request, token)       
    };
  });



})
