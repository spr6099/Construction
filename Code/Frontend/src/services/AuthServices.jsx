import axios from "axios";
import { baseUrl } from "../config";

export const registerUser = async () => {
  try {
    const response = await axios(`${baseUrl}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
