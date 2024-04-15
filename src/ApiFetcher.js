import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Function to get data from the API
export const getData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching data:', error);
        throw error;
    }
};

// Function to post data to the API
export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error while posting data:', error);
        throw error;
    }
};

// Function to update data using PUT method
export const putData = async (endpoint, data) => {
    try {
        const response = await axios.put(`${API_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error while updating data:', error);
        throw error;
    }
};

// Function to update data using PATCH method
export const patchData = async (endpoint, data) => {
    try {
        const response = await axios.patch(`${API_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error while updating data:', error);
        throw error;
    }
};

// Function to delete data from the API
export const deleteData = async (endpoint) => {
    try {
        const response = await axios.delete(`${API_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error while deleting data:', error);
        throw error;
    }
};