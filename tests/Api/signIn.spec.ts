import { test, expect } from '@playwright/test'
import { singnUpValidBody } from "../testData/signUp"
import { singnInIncorrectBody, singnInInvalidEmailOrPassword } from "../testData/signIn"
const savedRandom = singnUpValidBody

test.describe.parallel('User Sign Up API Testing', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
  // const baseUrl = 'http://localhost:3000/api'

  test('User registration - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
    const expectedMessage = "Not Found";
    expect(response.status()).toBe(404)
    expect(response.statusText()).toBe(expectedMessage);
  })

  for (const testCase of singnInIncorrectBody) {
    test(`User Login  - wrong body data: ${JSON.stringify(testCase.userData)}. Expected message: "${testCase.expectedMessage}"}`, async ({ request }) => {
      const resp = await request.post(`${baseUrl}/users/signin`, { data: testCase.userData });
      const expectedStatus = 400;
      const expectedMessage = "Bad Request";
      const responseBody = JSON.parse(await resp.text());
      expect(resp.status()).toBe(expectedStatus);
      expect(resp.statusText()).toBe(expectedMessage);
      expect(responseBody.message).toBe(testCase.expectedMessage);
    });
  }
  test(`User Login - valid body data. Create user, login and delete.`, async ({ request }) => {
    await request.post(`${baseUrl}/users/signup`, { data: singnUpValidBody.userData })
    const response = await request.post(`${baseUrl}/users/signin`, { 
      data: {
        email:singnUpValidBody.userData.email,
        password:singnUpValidBody.userData.password,
      } })    
    const responseBody = JSON.parse(await response.text())
    const expectedStatus = 200;
    expect(response.status()).toBe(expectedStatus);

    const token = responseBody.token;
    
    expect(responseBody).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      token: expect.any(String),
    });
    expect(responseBody.token).toBeTruthy()
    const deleteResponse = await request.delete(`${baseUrl}/users/delete`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    expect(deleteResponse.status()).toBe(200);
  });

  test(`User Login - unregister email.`, async ({ request }) => {
    const response = await request.post(`${baseUrl}/users/signin`, { 
      data: {
        email:singnInInvalidEmailOrPassword.userData.email,
        password:singnUpValidBody.userData.password,
      } })    
    const responseBody = JSON.parse(await response.text())
    const expectedStatus = 401;
    expect(response.status()).toBe(expectedStatus);
    const expectedMessage = "Unauthorized";
    expect(response.statusText()).toBe(expectedMessage);
    expect(responseBody.message).toBe(singnInInvalidEmailOrPassword.expectedMessage);
  });

  test(`User Login - incorrect password. Create user, try to login and delete.`, async ({ request }) => {
    const respCreate = await request.post(`${baseUrl}/users/signup`, { data: singnUpValidBody.userData })
    
    const response = await request.post(`${baseUrl}/users/signin`, { 
      data: {
        email:singnUpValidBody.userData.email,
        password:singnInInvalidEmailOrPassword.userData.password,
      } })    
    const responseBody = JSON.parse(await response.text())
    const expectedStatus = 401;
    expect(response.status()).toBe(expectedStatus);
    const expectedMessage = "Unauthorized";
    expect(response.statusText()).toBe(expectedMessage);
    expect(responseBody.message).toBe(singnInInvalidEmailOrPassword.expectedMessage);

    
    const token = JSON.parse(await respCreate.text()).token;
        
    const deleteResponse = await request.delete(`${baseUrl}/users/delete`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    expect(deleteResponse.status()).toBe(200);
  });

})
