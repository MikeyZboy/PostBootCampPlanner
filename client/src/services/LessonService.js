import ApiClient from "./ApiClient";

const setLocalAccountId = (account_id) => {
  localStorage.setItem("account_id", account_id);
};

export const __GetLessons = async (accountId) => {
  try {
    const res = await ApiClient.get(`/lessons/view/${accountId}`)
    return res.data;
  } catch (error) {
    throw error;
  }
};
// /accounts/${accountId}
export const __CreateLesson = async (formData) => {
  try {
    const res = await ApiClient.post(`/lessons/`, formData);
    console.log('res.data return:', res.data)
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpdateLesson = async (id, formData) => {
  try {
    const res = await ApiClient.put(`/lessons/${id}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// try this if the above func doesn't work
// export const __UpdateGoal = async (userData) => {
//   const accountId = localStorage.getItem("account_id");
//   try {
//     const updatedGoal = await ApiClient.put(`/accounts/${accountId}`, userData);
//     return updatedGoal;
//   } catch (error) {
//     throw error;
//   }
// };

export const __DeleteLesson = async (id) => {
  try {
    const res = await ApiClient.delete(`/lessons/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
