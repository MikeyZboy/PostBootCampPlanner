import ApiClient from "./ApiClient";

const setLocalAccountId = (account_id) => {
  localStorage.setItem("account_id", account_id);
};

export const __RegisterUser = async (formData) => {
    console.log("UserService, __RegisterUser:", formData);
  try {
    const res = await ApiClient.post(`/signup`, formData);
    setLocalAccountId(res.data.id)
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
    setLocalAccountId(res.data.id);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __CheckSession = async () => {
  try {
    console.log("__CheckSession HIT");
    const res = await ApiClient.get("/refresh/session");
    return res.data;
  } catch (error) {
    throw error;
  }
};
