import axios from "../utils/axios-customize.js";

export const callLogin = async (data) => {
  return await axios.post("/auth/login", data);
};

export const callRegister = async (data) => {
  return await axios.post("/auth/register", data);
};

export const callLogout = async () => {
  return await axios.post("/auth/logout");
};

export const callFetchAccount = async () => {
  return await axios.get("/auth/account");
};

export const callRefresh = async () => {
  return await axios.get("/auth/refresh");
};

/**
 * nếu upload thì truyền vào fileImg, sửa ảnh thì truyền vào oldImg để server không bị rác
 * @param fileImg
 * @returns
 */
export const callUploadImgHat = async (fileImg) => {
  const formData = new FormData();
  formData.append("fileImg", fileImg);
  return axios({
    url: "file/upload",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "hat",
    },
  });
};

// ADMIN ROUTES 👇
export const callFetchProduct = async (page, pageSize) => {
  return await axios.get(`/product?page=${page}&pageSize=${pageSize}`);
};

export const callDeleteProduct = async (id) => {
  return await axios.delete(`/product/${id}`);
};

export const callCreateProduct = async (data) => {
  return await axios.post("/product", data);
};

export const callUpdateProduct = async (id, data) => {
  return await axios.put(`/product/${id}`, data);
};
