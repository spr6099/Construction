import axios from "axios";
import { baseUrl } from "../config";

export const labourSkills = async (formdata) => {
  try {
    // for (let pair of formdata.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    const response = await axios.post(
      `${baseUrl}/labour/add_skills`,
      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getlabourSkills = async (id) => {
  try {
    const response = await axios.post(`${baseUrl}/labour/getskills`, id);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updatelabourSkills = async (formdata) => {
  try {
    // for (let pair of formdata.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    const response = await axios.post(
      `${baseUrl}/labour/update_skills`,
      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getOfferLettersAPI = async (id) => {
  try {
    const response = await axios.post(`${baseUrl}/labour/getOfferLetters`, id);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateOfferLetterAPI = async (data) => {
  try {
    console.log(data);

    const response = await axios.post(
      `${baseUrl}/labour/offerLetterUpdate`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getWorkersAPI = async () => {
  try {
    const response = await axios.post(`${baseUrl}/labour/getWorkers`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

