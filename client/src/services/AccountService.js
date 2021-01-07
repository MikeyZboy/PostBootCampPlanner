import ApiClient from './ApiClient'

const setLocalAccountId = (account_id) => {
  localStorage.setItem("account_id", account_id);
};

export const __GetProfile = async (account_id) => {
  console.log("UserService, __GETPROFILE:", account_id);
  try {
    const res = await ApiClient.get(`/accounts/${account_id}`);
    // setLocalAccountId(res.data.id);
    // console.log('__GetProfile res:',res.data)
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