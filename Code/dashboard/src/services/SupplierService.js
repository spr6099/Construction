import axios from "axios";
import { baseUrl } from "../config";

export const addProducts = async (data) => {
  try {
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    const response = await axios.post(`${baseUrl}/supplier/addProduct`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/supplier/getProduct`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/supplier/updateProduct`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
// export const updateProduct = async (data) => {
//   try {
//     const response = await axios.post(
//       `${baseUrl}/supplier/updateProduct`,
//       data,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const deleteProduct = (id) => {
  console.log(id);

  return axios.post(`${baseUrl}/supplier/deleteproducts`, id);
};
