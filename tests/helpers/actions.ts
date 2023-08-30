export interface UserData {
    name: string;
    email: string;
    password: string;
  }
  const baseUrl = 'https://powerpulse-y0gd.onrender.com/api'

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