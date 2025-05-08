import axios from "axios";
import { baseUrl } from "../config";

export const getAllWorksAPI = async () => {
  try {
    const response = await axios.get(`${baseUrl}/contractor/getallworks`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getOneWorksAPI = async (id) => {
  try {
    // console.log(id);
    
    const response = await axios.post(`${baseUrl}/contractor/getonework`, id);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const newTendorsAPI = async () => {
  try {
    const response = await axios.get(`${baseUrl}/contractor/getnewTendors`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const handleSubmitBidAPI = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(
      `${baseUrl}/contractor/counter-bid`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getBidAmountsAPI = async (id) => {
  try {
    // console.log(id);
    const response = await axios.post(
      `${baseUrl}/contractor/getBidAmounts`,
      id
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getLaboursAPI = async () => {
  try {
    const response = await axios.get(`${baseUrl}/contractor/getLabours`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const handleSubmitCartAPI = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(
      `${baseUrl}/contractor/addtocart`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getCartAPI = async (data) => {
  try {
    // console.log(data);
    const response = await axios.post(
      `${baseUrl}/contractor/getCart`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const updateCartAPI = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/contractor/updateCart`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const NewofferLetterAPI = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/contractor/sendOfferLetter`,data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProductsAPI = async () => {
  try {
    const response = await axios.post(`${baseUrl}/contractor/getProducts`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const progressUpdatesAPI = async (formData) => {
  try {
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const response = await axios.post(
      `${baseUrl}/contractor/updateworkstatus`,
      formData
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getWorkAPI = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/contractor/getwork`,id);

    return response;
  } catch (error) {
    console.error(error);
  }
};