import { test, expect } from '@playwright/test'
const fs = require("fs/promises");

import { singnUpValidBody } from "../testData/signUp"
import { bodyData } from "../testData/body"
import { UserData, signUpAndLogin, deleteUser } from "../helpers/actions"
import { object } from 'joi';
const savedRandom = singnUpValidBody

test.describe.parallel.only('Get products information', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
  // const baseUrl = 'http://localhost:3000/api'
  test(`Get all products`, async ({ request }) => {
    const userData: UserData = singnUpValidBody.userData;
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    
    try {
      const respGet = await request.get(`${baseUrl}/products`,
        {
          headers: { "Authorization": `Bearer ${token}` },
        });
      expect(respGet.status()).toBe(200);
      const respGetBody = JSON.parse(await respGet.text())
      expect(respGetBody.length).not.toBe(0);
    }
    finally {
      const deleteResponse = await deleteUser(request, token);
      expect(deleteResponse.status()).toBe(200);
    }
  });
  test(`Get healthy recommended products  - by blood type. /products/admissible/?filter=true`, async ({ request }) => {
    const userData: UserData = singnUpValidBody.userData;
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;

    const respAddBody = await request.post(`${baseUrl}/users/body`,
    {
      headers: { "Authorization": `Bearer ${token}` },
      data: bodyData.body,
    });
    expect(respAddBody.status()).toBe(200);
    const respAddBodyData = JSON.parse(await respAddBody.text())
    const userBloodType = respAddBodyData.bodyData.blood
    
    try {
      const respGet = await request.get(`${baseUrl}/products/admissible/?filter=true`,
        {
          headers: { "Authorization": `Bearer ${token}` },
        });
      expect(respGet.status()).toBe(200);
      const respGetBody = JSON.parse(await respGet.text())
      expect(respGetBody.length).not.toBe(0);      
      respGetBody.forEach(element => {        
        expect(element.groupBloodNotAllowed[userBloodType]).toBe(true)
      });
    }
    finally {
      const deleteResponse = await deleteUser(request, token);
      expect(deleteResponse.status()).toBe(200);
    }
  });
  
})
