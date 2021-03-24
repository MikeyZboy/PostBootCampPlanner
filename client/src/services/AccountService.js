import ApiClient from './ApiClient'

export const __GetProfile = async (account_id) => {
  try {
    const res = await ApiClient.get(`/accounts/${account_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpdateGoal = async (userData) => {
  const accountId = localStorage.getItem("account_id");
  try {
    const res = await ApiClient.put(
      `/accounts/${accountId}`,
      userData
    );
    return res.data[1].goal;
  } catch (error) {
    throw error;
  }
};

export const __SignOutUser = () => {
  localStorage.clear("account_id");
};