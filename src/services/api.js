import axios from "../utils/axios-customize.js";

export const callLogin = async (data) => {
  return await axios.post("/user/login", data);
};

export const callRegister = async (data) => {
  return await axios.post("/user/register", data);
};

export const callLogout = async () => {
  return await axios.post("/user/logout");
};
