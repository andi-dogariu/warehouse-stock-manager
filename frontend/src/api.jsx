import axios from 'axios';

//const API_BASE_URL = 'http://localhost:3001/api'; // Your backend API base URL
const API_BASE_URL = 'http://34.173.243.69/api'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define functions to interact with your backend APIs
const api = {
  getProducts: () => axiosInstance.get('/products'),
  getProductById: (id) => axiosInstance.get(`/products/${id}`),
  createProduct: (productData) => axiosInstance.post('/products', productData),
  updateProduct: (id, productData) => axiosInstance.put(`/products/${id}`, productData),
  deleteProduct: (id) => axiosInstance.delete(`/products/${id}`),
  getStockItems: () => axiosInstance.get('/stockItems'),
  getStockItemById: (id) => axiosInstance.get(`/stockItems/${id}`),
  createStockItem: (stockItemData) => axiosInstance.post('/stockItems', stockItemData),
  updateStockItem: (id, stockItemData) => axiosInstance.put(`/stockItems/${id}`, stockItemData),
  deleteStockItem: (id) => axiosInstance.delete(`/stockItems/${id}`),
  signup: (userData) => axiosInstance.post('/signup', userData),
  login: (userData) => axiosInstance.post('/login', userData),
  getUserDetails: (config) => axiosInstance.get('/user-details', config),
};

export default api;
