import { test, expect } from '@playwright/test'
import {singnUpIncorrectBody} from "../testData/signUp"

// const mongoose = require('mongoose');
// const request = require('supertest');
// const app = require('../app');


test.describe.parallel('User Sign Up API Testing', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'

  // const userData = {
  //   "name":"sdfsd",
  //   "email": "new_user6@example.com",
  //   "password": "new_user6"
  // }

  test.only('User registration - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
    const expectedMessage = "Not Found";
    expect(response.status()).toBe(404)
    expect(response.statusText()).toBe(expectedMessage);    
  })

  for (const testCase of singnUpIncorrectBody) {
    test.only(`User registration  - wrong body data: ${JSON.stringify(testCase.userData)}. Expected message: "${testCase.expectedMessage}"}`, async ({request}) => {
      const resp = await request.post(`${baseUrl}/users/signup`,{data:testCase.userData});
      const expectedStatus = 400;
      const expectedMessage = "Bad Request";
      const responseBody = JSON.parse(await resp.text());  
      expect(resp.status()).toBe(expectedStatus);
      expect(resp.statusText()).toBe(expectedMessage);
      expect(responseBody.message).toBe(testCase.expectedMessage);
    });
  }

  

  // test('Simple API Test - token is returned on login with valid data', async ({ request }) => {
    
  //   const response = await request.post(`${baseUrl}/api/users/login`, {data:userData,})

  //   const responseBody = JSON.parse(await response.text())
  //   expect(responseBody.token).toBeTruthy()
    
  // })
  
  test('"user" object is returned on login with valid user data and has has properties "email" and "subscription"', async ({ request }) => {
    const userData= {
      "name":"test",
      "email": "new_user6@example.com",
      "password": ""
    }
    const response = await request.post(`${baseUrl}/users/signin`, {data:userData,})
    console.log(JSON.parse(await response.text()))
    // const responseBody = JSON.parse(await response.text())    

    // expect(responseBody).toHaveProperty("user");
    // expect(typeof responseBody.user).toBe("object");
    // expect(responseBody.user).toMatchObject({
    //   email: expect.any(String),
    //   subscription: expect.stringContaining("starter" || "pro" || "business"),

  });

});


