import ApiClient from "./ApiClient";

// export const __GetProfile = async (user_id) => {
//     console.log('UserService, __GETPROFILE:',user_id)
//   try {
//     const res = await ApiClient.get(`/accounts/${user_id}`);
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const __RegisterUser = async (formData) => {
    console.log("UserService, __RegisterUser:", formData);
  try {
    const res = await ApiClient.post(`/signup`, formData);
    console.log('__RegisterUser res:', res)
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __LoginUser = async (userData) => {
    console.log("UserService, __LoginUser:", userData);
  try {
    const res = await ApiClient.post(`/signin`, userData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
