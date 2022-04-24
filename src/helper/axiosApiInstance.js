const axios = require('axios');
const axiosApiInstance = axios.create();


axiosApiInstance.interceptors.request.use(
  async config => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      config.headers = {
        'Authorization': `Bearer ${user.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });


export const axiosIntercepter = axiosApiInstance;
