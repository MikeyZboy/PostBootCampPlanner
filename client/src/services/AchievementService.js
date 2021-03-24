import ApiClient from "./ApiClient";

export const __GetAchievements = async () => {
  try {
    const res = await ApiClient.get("/achievements");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __CreateAchievement = async (formData) => {
  try {
    const res = await ApiClient.post("/achievements", formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DeleteAchievement = async (id) => {
  try {
    const res = await ApiClient.delete(`/achievements/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}