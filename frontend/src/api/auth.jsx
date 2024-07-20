import axios from "axios";

const baseURL = "http://localhost:5000/api/auth";

export const loginUser = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post(`${baseURL}/login`, formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};
