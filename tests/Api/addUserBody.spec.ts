import { test, expect } from '@playwright/test'
import { singnUpValidBody } from "../testData/signUp"
import { addIncorrectBody } from "../testData/body"
import { bodyData } from "../testData/body"
import { UserData, signUpAndLogin, deleteUser } from "../helpers/actions"
const savedRandom = singnUpValidBody

test.describe.parallel('User add users body information', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
  // const baseUrl = 'http://localhost:3000/api'


  for (const testCase of addIncorrectBody) {

    test.only(`User Login  - wrong body data: ${JSON.stringify(testCase.bodyData)}. Expected message: "${testCase.expectedMessage}"}`, async ({ request }) => {
      const userData: UserData = singnUpValidBody.userData;
      const responseBody = await signUpAndLogin(request, userData);
      const token = responseBody.token;
      console.log(testCase)
      console.log(testCase.expectedMessage)
      try {
        const respAddBody = await request.post(`${baseUrl}/users/body`, { headers: { "Authorization": `Bearer ${token}` }, data: testCase.bodyData, })

        const expectedStatus = 400;
        const expectedMessage = "Bad Request";

        const responseBodyError = JSON.parse(await respAddBody.text())

        expect(respAddBody.status()).toBe(expectedStatus);
        expect(respAddBody.statusText()).toBe(expectedMessage);
        expect(responseBodyError.message).toBe(testCase.expectedMessage);
      } finally {
        const deleteResponse = await deleteUser(request, token);
        expect(deleteResponse.status()).toBe(200);
      }

    });
  }
  test(`User add user information - valid body data. Create user, login, add body and delete.`, async ({ request }) => {
    const userData: UserData = singnUpValidBody.userData;
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    const respAddBody = await request.post(`${baseUrl}/users/body`,
      {
        headers: { "Authorization": `Bearer ${token}` },
        data: bodyData.body,
      });
    // expect(responseBody).toMatchObject({
    //   name: expect.any(String),
    //   email: expect.any(String),
    //   token: expect.any(String),
    // });
    expect(respAddBody.status()).toBe(200);

    // Удаление пользователя
    const deleteResponse = await deleteUser(request, token);
    expect(deleteResponse.status()).toBe(200);
  });



})
