import axios from 'axios';

const getAllCategories = async (params) => {
  try {
    const response = await axios.get(`http://localhost:3001/categories?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error get All:', error);
    throw error;
  }
};

const createCategories = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3001/categories`, data);
    return response.data;
  } catch (error) {
    console.error('Error create:', error);
    throw error;
  }
};

const updateCategories = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/categories/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error create:', error);
    throw error;
  }
};

const deleteCategories = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error create:', error);
    throw error;
  }
};

export { 
    getAllCategories,
    createCategories,
    updateCategories,
    deleteCategories
};
