import axios from "axios";
import { baseUrl } from "../config";

export const getconsultancys = () => {
  try {
    const response = axios.get(`${baseUrl}/client/getconsultancys`);
    return response;
  } catch (error) {
    console.error("Registration Error:", error);

    // Optional: Return only the error response if available
    if (error) {
      return { success: false, data: error.response.data.message };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};

export const userRequire = (data) => {
  try {
    for (let pair of data.entries()) {
          console.log(`${pair[0]}:`, pair[1]);
        }
    const response = axios.post(`${baseUrl}/client/userWork`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error("Registration Error:", error);

    // Optional: Return only the error response if available
    if (error) {
      return { success: false, data: error.response.data.message };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};


export const handleAcceptAPI = (data) => {
  try {
    console.log(data);
    
    const response = axios.post(`${baseUrl}/client/accept-counter `, data);
    return response;
  } catch (error) {
    console.error("Registration Error:", error);

    // Optional: Return only the error response if available
    if (error) {
      return { success: false, data: error.response.data.message };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};

export const getworksStatus = (data) => {
  try {
    const response = axios.post(`${baseUrl}/client/getworkStatus`, data);
    return response;
  } catch (error) {
    console.error("Registration Error:", error);

    // Optional: Return only the error response if available
    if (error) {
      return { success: false, data: error.response.data.message };
    }

    return { success: false, message: "An unexpected error occurred." };
  }
};
