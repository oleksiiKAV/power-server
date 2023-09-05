import { test, expect } from '@playwright/test'
const fs = require("fs/promises");

import { singnUpValidBody } from "../testData/signUp"

import { UserData, signUpAndLogin, deleteUser } from "../helpers/actions"
const savedRandom = singnUpValidBody

test.describe.parallel('Get products information', () => {
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
  
})
