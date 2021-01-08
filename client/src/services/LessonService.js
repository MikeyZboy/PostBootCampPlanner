import ApiClient from "./ApiClient";

const setLocalAccountId = (account_id) => {
  localStorage.setItem("account_id", account_id);
};

export const __GetLessons = async (accountId) => {
  try {
    const res = await ApiClient.get(`/lessons/view/${accountId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __CreateLesson = async (formData) => {
  try {
    const res = await ApiClient.post(`/lessons/`, formData);
    console.log("res.data return:", res.data);
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

export const __DeleteLesson = async (id) => {
  console.log('__DeleteLesson id:', id)
  try {
    const res = await ApiClient.delete(`/lessons/${id}`);
    return res.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};