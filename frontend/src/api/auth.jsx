import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post(`${baseURL}/login`, formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};
