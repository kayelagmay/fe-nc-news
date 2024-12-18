import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://nc-news-zelj.onrender.com/api/'
});
  
export function get(url, params = {}) {
    return apiClient
      .get(url, { params })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`GET request to ${url} failed:`, error.message);
        throw error;
      });
  };