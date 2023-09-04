import { singnUpValidBody } from "../testData/signUp"

export interface UserData {
  name: string;
  email: string;
  password: string;
}
export interface BodyData {
  height: number,
    currentWeight: number,
    desiredWeight: number,
    birthday: Date,
    blood: number,
    sex: string,
    levelActivity: number
}


const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'
// const baseUrl = 'http://localhost:3000/api'

export const signUpAndLogin = async (request: any, userData: UserData) => {
  await request.post(`${baseUrl}/users/signup`, { data: userData });
  const response = await request.post(`${baseUrl}/users/signin`, {
    data: {
      email: userData.email,
      password: userData.password,
    },
  });
  return JSON.parse(await response.text());
};

export const deleteUser = async (request: any, token: string) => {
  const deleteResponse = await request.delete(`${baseUrl}/users/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return deleteResponse;
};
export const addUserBody = async (request: any, token: string, bodyData: any) => {
      const respAddBody = await request.post(`${baseUrl}/users/body`,
      {
        headers: { "Authorization": `Bearer ${token}` },
        data: bodyData,
      });
    // return JSON.parse(await respAddBody.text());
    return respAddBody;
  };
