import axios from "axios";

const URL = "https://mtrn9p-8081.csb.app/api/";

const getAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const postAPI = async (endpoint, data) => {
  try {
    const response = await axios.post(`${URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

const putAPI = async (endpoint, data) => {
  try {
    const response = await axios.put(`${URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

const deleteAPI = async (endpoint) => {
  try {
    const response = await axios.delete(`${URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export { getAPI, postAPI, putAPI, deleteAPI };
