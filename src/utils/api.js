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

  export function patch(url, body) {
    return apiClient
      .patch(url, body)
      .then((res) => res.data)
      .catch((error) => {
        console.error(`PATCH request to ${url} failed:`, error.message);
        throw error;
      });
  };

  export function post(url, body) {
    return apiClient
      .post(url, body)
      .then((res) => res.data)
      .catch((error) => {
        console.log(`POST request to ${url} failed:`, error.message)
        throw error;
      });
  };