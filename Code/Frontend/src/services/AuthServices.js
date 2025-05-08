import axios from "axios";
import { baseUrl } from "../config";

export const registerUser = async (formdata) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;

    // for (let pair of userData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }
  } catch (error) {
    console.error("Registration Error:", error);

    // Optional: Return only the error response if available
    if (error) {
      return { success: false, data: error.response.data.message };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};


export const loginUser = async (logdata) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, logdata);

    return response;
  } catch (error) {
    console.error(error.response.data.message);
    alert(error.response.data.message);
    // console.log(error.response.data.message);
    // console.log(error.response.data.error);
  }
};
