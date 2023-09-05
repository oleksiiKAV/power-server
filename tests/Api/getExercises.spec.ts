import { test, expect } from '@playwright/test'
const fs = require("fs/promises");
import path from "path";
import { singnUpValidBody } from "../testData/signUp"

import { UserData, signUpAndLogin, deleteUser } from "../helpers/actions"
const savedRandom = singnUpValidBody

test.describe.parallel('Get exercises information', () => {
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
  // const baseUrl = 'http://localhost:3000/api'
  test.only(`Get all exercises`, async ({ request }) => {
    const userData: UserData = singnUpValidBody.userData;
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    try {
      const respGet = await request.get(`${baseUrl}/exercises`,
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
  test.only(`Get all Bodypart`, async ({ request }) => {
    const userData: UserData = singnUpValidBody.userData;
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    const fileBodypart = path.join(__dirname, "../../data/bodyparts.json");
    const fileContent = await fs.readFile(fileBodypart);
    try {
      const respGet = await request.get(`${baseUrl}/exercises/bodyparts`,
        {
          headers: { "Authorization": `Bearer ${token}` },
        });
      expect(respGet.status()).toBe(200);
      const respGetBody = JSON.parse(await respGet.text())
      expect(respGetBody.length).not.toBe(0);

      const fileContentArray = JSON.parse(fileContent);
      const sortedRespGetBody = respGetBody.slice().sort();
      const sortedFileContentArray = fileContentArray.slice().sort();

      expect(sortedRespGetBody).toEqual(sortedFileContentArray);
    }
    finally {
      const deleteResponse = await deleteUser(request, token);
      expect(deleteResponse.status()).toBe(200);
    }
  });
  test.only(`Get all Equipments`, async ({ request }) => {
    const userData: UserData = singnUpValidBody.userData;
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    const fileEquipments = path.join(__dirname, "../../data/equipments.json");
    const fileContent = await fs.readFile(fileEquipments);
    try {
      const respGet = await request.get(`${baseUrl}/exercises/equipments`,
        {
          headers: { "Authorization": `Bearer ${token}` },
        });
      expect(respGet.status()).toBe(200);
      const respGetBody = JSON.parse(await respGet.text())
      expect(respGetBody.length).not.toBe(0);

      const fileContentArray = JSON.parse(fileContent);
      const sortedRespGetBody = respGetBody.slice().sort();
      const sortedFileContentArray = fileContentArray.slice().sort();

      expect(sortedRespGetBody).toEqual(sortedFileContentArray);
    }
    finally {
      const deleteResponse = await deleteUser(request, token);
      expect(deleteResponse.status()).toBe(200);
    }
  });
  test.only(`Get all Muscles`, async ({ request }) => {
    const userData: UserData = singnUpValidBody.userData;
    const responseBody = await signUpAndLogin(request, userData);
    const token = responseBody.token;
    const fileMuscles = path.join(__dirname, "../../data/muscles.json");
    const fileContent = await fs.readFile(fileMuscles);
    try {
      const respGet = await request.get(`${baseUrl}/exercises/muscles`,
        {
          headers: { "Authorization": `Bearer ${token}` },
        });
      expect(respGet.status()).toBe(200);
      const respGetBody = JSON.parse(await respGet.text())
      expect(respGetBody.length).not.toBe(0);

      const fileContentArray = JSON.parse(fileContent);
      const sortedRespGetBody = respGetBody.slice().sort();
      const sortedFileContentArray = fileContentArray.slice().sort();

      expect(sortedRespGetBody).toEqual(sortedFileContentArray);
    }
    finally {
      const deleteResponse = await deleteUser(request, token);
      expect(deleteResponse.status()).toBe(200);
    }
  });
})
