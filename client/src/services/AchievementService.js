import ApiClient from "./ApiClient";

export const GetPeople = async () => {
  try {
    const res = await ApiClient.get("/people");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const CreatePerson = async (formData) => {
  try {
    const res = await ApiClient.post("/people", formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
