import { test, expect } from '@playwright/test'
import { getRouters,postRouters} from "../testData/publicRoutes"

test.describe.parallel('User Sign Up API Testing', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'  
  // const baseUrl = 'http://localhost:3000/api'

  getRouters.forEach(element => {
    test(`Check GET access to public roters: ${baseUrl}${element}. Expected message: "OK" with status 200}`, async ({ request }) => {
      const resp = await request.get(`${baseUrl}${element}`);
      const expectedStatus = 200;
      const expectedMessage = "OK";      
      expect(resp.status()).toBe(expectedStatus);
      expect(resp.statusText()).toBe(expectedMessage);      
    });
  });

  postRouters.forEach(element => {
    test(`Check GET access to public roters: ${baseUrl}${element}. Expected  - any message instead of "Unautorized" "}`, async ({ request }) => {
      const resp = await request.get(`${baseUrl}${element}`);
      const expectedStatus = 401;           
      expect(resp.status()).not.toBe(expectedStatus);
      
    });
  });
    test(`Check api documentation access: ${baseUrl}/api-docs. Expected status 200}`, async ({ request }) => {
      const resp = await request.get(`https://powerpulse-y0gd.onrender.com/api-docs`);
      const expectedStatus = 200;
      expect(resp.status()).toBe(expectedStatus);
    });
  
  
})
