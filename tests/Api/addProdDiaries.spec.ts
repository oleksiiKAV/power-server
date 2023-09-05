import { test, expect} from '@playwright/test'
import { singnUpValidBody } from "../testData/signUp"
import {generateAddProd} from "../testData/addProd"
import { addIncorrectBody, bodyData } from "../testData/body"
// import { bodyData } from "../testData/body"
import { UserData, signUpAndLogin, deleteUser, addUserBody, BodyData } from "../helpers/actions"


test.describe.parallel('Products in diaries', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
  // const baseUrl = 'http://localhost:3000/api'
  let savedRandom
  let prodCalories

  test(`Add eaten product, check it, and delete it.`, async ({ request }) => {
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
      
      const expectedCalories= (responseAddBody.consumedProducts[0].amount*prodCalories)/100
      expect(responseAddBody.consumedCalories).toBeCloseTo(expectedCalories);


      const respDelProd = await request.delete(`${baseUrl}/diaries/product/delete/`,
      {
        headers: { "Authorization": `Bearer ${token}` },        
        data:{
          date:savedRandom.date,
          productId: responseAddBody.consumedProducts[0]._id
        }
      })
      
      expect(respDelProd.status()).toBe(200)
      const respDelProdBody = JSON.parse(await respDelProd.text());
      
      expect(respDelProdBody.consumedProducts.length).toBe(0)
      
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
