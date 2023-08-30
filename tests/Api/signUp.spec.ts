import { test, expect } from '@playwright/test'
import { singnUpIncorrectBody, singnUpValidBody } from "../testData/signUp"
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

  for (const testCase of singnUpIncorrectBody) {
    test(`User registration  - wrong body data: ${JSON.stringify(testCase.userData)}. Expected message: "${testCase.expectedMessage}"}`, async ({ request }) => {
      const resp = await request.post(`${baseUrl}/users/signup`, { data: testCase.userData });
      const expectedStatus = 400;
      const expectedMessage = "Bad Request";
      const responseBody = JSON.parse(await resp.text());
      expect(resp.status()).toBe(expectedStatus);
      expect(resp.statusText()).toBe(expectedMessage);
      expect(responseBody.message).toBe(testCase.expectedMessage);
    });
  }
  test.only(`User registration  - valid body data. Checking existing users with the same email.`, async ({ request }) => {
    const response = await request.post(`${baseUrl}/users/signup`, { data: singnUpValidBody.userData })
    const responseBody = JSON.parse(await response.text())
    const expectedStatus = 201;
    expect(response.status()).toBe(expectedStatus);
    expect(responseBody).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      token: expect.any(String),
    });
    expect(responseBody.token).toBeTruthy()

    const token = responseBody.token;

    const responseExist = await request.post(`${baseUrl}/users/signup`, { data: savedRandom.userData })
    const responseBodyExist = JSON.parse(await responseExist.text())
    const expectedExistStatus = 409;
    expect(responseExist.status()).toBe(expectedExistStatus);
    expect(responseBodyExist.message).toBe(savedRandom.expectedMessage)

    const deleteResponse = await request.delete(`${baseUrl}/users/delete`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    expect(deleteResponse.status()).toBe(200);
  });



})
