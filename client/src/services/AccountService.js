import ApiClient from './ApiClient'

const setLocalAccountId = (account_id) => {
  localStorage.setItem("account_id", account_id);
};

export const __GetProfile = async (user_id) => {
  console.log("UserService, __GETPROFILE:", user_id);
  try {
    const res = await ApiClient.get(`/accounts/${user_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __CheckSession = async () => {
  try {
    const res = await ApiClient.get("/accounts/refresh/session");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpdateGoal = async (userData) => {
  const accountId = localStorage.getItem("account_id");
  try {
    const updatedGoal = await ApiClient.put(
      `/accounts/${accountId}`,
      userData
    );
    return updatedGoal;
  } catch (error) {
    throw error;
  }
};

export const _SignOutUser = () => {
  localStorage.clear("account_id");
};