import { test, expect } from '@playwright/test'
import { getRouters, postRouters,delRouters } from "../testData/secureRoutes"

test.describe.parallel('User Sign Up API Testing', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'  
  // const baseUrl = 'http://localhost:3000/api'

  test('User registration - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
    const expectedMessage = "Not Found";
    expect(response.status()).toBe(404)
    expect(response.statusText()).toBe(expectedMessage);
  })

  getRouters.forEach(element => {
    test(`Check GET access to autorizes roters: ${baseUrl}${element}. Expected message: "Unauthorized" with status 401}`, async ({ request }) => {
      const resp = await request.get(`${baseUrl}${element}`);
      const expectedStatus = 401;
      const expectedMessage = "Unauthorized";
      
      expect(resp.status()).toBe(expectedStatus);
      expect(resp.statusText()).toBe(expectedMessage);
      
    });
  });

  postRouters.forEach(element => {
    test(`Check POST access to autorizes roters: ${baseUrl}${element}. Expected message: "Unauthorized" with status 401}`, async ({ request }) => {
      const resp = await request.post(`${baseUrl}${element}`);
      const expectedStatus = 401;
      const expectedMessage = "Unauthorized";
      
      expect(resp.status()).toBe(expectedStatus);
      expect(resp.statusText()).toBe(expectedMessage);
      
    });
  });
  

  delRouters.forEach(element => {
    test(`Check DELETE access to autorizes roters: ${baseUrl}${element}. Expected message: "Unauthorized" with status 401}`, async ({ request }) => {
      const resp = await request.delete(`${baseUrl}${element}`);
      const expectedStatus = 401;
      const expectedMessage = "Unauthorized";
      
      expect(resp.status()).toBe(expectedStatus);
      expect(resp.statusText()).toBe(expectedMessage);
      
    });
  });
})
