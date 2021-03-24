import ApiClient from "./ApiClient";

export const __GetResources = async (accountId) => {
  try {
    const res = await ApiClient.get(`/resources/view/${accountId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __CreateResource = async (formData) => {
  try {
    const res = await ApiClient.post(`/resources`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DeleteResource = async (id) => {
  try {
    const res = await ApiClient.delete(`/resources/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
