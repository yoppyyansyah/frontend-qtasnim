import axios from 'axios';

const getAllTransactions= async (params) => {
  try {
    const response = await axios.get(`http://localhost:3001/transactions?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error get All:', error);
    throw error;
  }
};

const getCompareData= async (params) => {
  try {
    const response = await axios.get(`http://localhost:3001/transactions/compare-data?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error get All:', error);
    throw error;
  }
};

const createTransactions= async (data) => {
  try {
    const response = await axios.post(`http://localhost:3001/transactions`, data);
    return response.data;
  } catch (error) {
    console.error('Error create:', error);
    throw error;
  }
};

export { 
    getAllTransactions,
    createTransactions,
    getCompareData
};
