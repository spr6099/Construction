import axios from "axios";
import { baseUrl } from "../config";

export const addworks = async (formdata) => {
  try {
    const response = await axios.post(
      `${baseUrl}/consultancy/addwork`,
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

export const getnewWorks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/consultancy/getNewWorks`,);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateWorks = async (id,formData) => {
  try {
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    const response = await axios.post(
      `${baseUrl}/consultancy/updatework`,
      data
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const sendCounterOfferAPI = async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/consultancy/counter-offer`,
      data
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};
export const handleSubmitBidAPI = async (data) => {
  try {
    // console.log(data);
    const response = await axios.post(
      `${baseUrl}/consultancy/counter-bid`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getBidAmountsAPI = async (id) => {
  try {
    const response = await axios.post(
      `${baseUrl}/consultancy/getBidAmounts`,
      id
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};