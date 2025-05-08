import axios from "axios";
import { baseUrl } from "../config";

export const getAlluserDatas = async () => {
  try {
    const response = await axios.post(`${baseUrl}/admin/getalluserdata`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

// export const getuserDatas = async (status) => {
//   try {
//     const response = await axios.post(`${baseUrl}/admin/getuserdata`, status);

//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const deleteUser = async (id) => {
  try {
    // console.log(id);

    const res = await axios.post(`${baseUrl}/admin/deleteUser`, { id });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const approveUser = async (updateData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/admin/updateUser`,
      updateData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
