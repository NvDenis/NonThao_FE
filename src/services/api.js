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

export const callCreateCategory = async (data) => {
  return await axios.post("/category", data);
};

export const callGetCategories = async () => {
  return await axios.get("/category");
};

export const callGetDetailCategory = async (id) => {
  return await axios.get("/category/" + id);
};

export const callDeleteCategory = async (id) => {
  return await axios.delete("/category/" + id);
};

export const callUpdateCategory = async (_id, data) => {
  return await axios.put(`/category/${_id}`, data);
};

export const callGetProductByCategory = async (id) => {
  return await axios.get(`/product/category/${id}`);
};

export const callGetProductByLink = async (link) => {
  return await axios.get(`/product/link/${link}`);
};

export const callAddToCart = async (data) => {
  return await axios.post("/user/cart", data);
};

export const callRemoveCartItem = async (id) => {
  return await axios.delete(`/user/cart/${id}`);
};

export const callUpdateCartItem = async (id, data) => {
  return await axios.put(`/user/cart/${id}`, data);
};

/**
 * nếu upload thì truyền vào fileImg, sửa ảnh thì truyền vào oldImg để server không bị rác
 * @param fileImg
 * @returns
 */
export const callUploadImg = async (fileImg, uploadType) => {
  console.log("upload", uploadType);
  const formData = new FormData();
  formData.append("fileImg", fileImg);
  return axios({
    url: "file/uploads",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": uploadType,
    },
  });
};

// ADMIN ROUTES 👇
export const callFetchProduct = async (current, pageSize) => {
  return await axios.get(`/product/data?current=${current}&pageSize=${pageSize}`);
};

export const callDeleteProduct = async (id) => {
  return await axios.delete(`/product/data/${id}`);
};

export const callCreateProduct = async (data) => {
  return await axios.post("/product/data", data);
};

export const callUpdateProduct = async (id, data) => {
  return await axios.put(`/product/data/${id}`, data);
};
