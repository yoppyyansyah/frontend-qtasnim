import axios from 'axios';

const getAllItems= async (params) => {
  try {
    const response = await axios.get(`http://localhost:3001/items?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error get All:', error);
    throw error;
  }
};

const createItems= async (data) => {
  try {
    const response = await axios.post(`http://localhost:3001/items`, data);
    return response.data;
  } catch (error) {
    console.error('Error create:', error);
    throw error;
  }
};

const updateItems= async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/items/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error create:', error);
    throw error;
  }
};

const deleteItems= async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error create:', error);
    throw error;
  }
};

export { 
    getAllItems,
    createItems,
    updateItems,
    deleteItems
};
