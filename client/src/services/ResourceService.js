import ApiClient from "./ApiClient";

export const __GetResources = async (accountId) => {
  try {
    const res = await ApiClient.get(`/resources/view/${accountId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const __CreateResource = async (formData) => {
  console.log("__CreateResource formData:", formData);
  try {
    const res = await ApiClient.post(`/resources`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const __DeleteResource = async (id) => {
  console.log('__DeleteResource hit: "id"', id)
  try {
    const res = await ApiClient.delete(`/resources/${id}`);
    console.log('__DeleteResource, res.data', res.data)
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
