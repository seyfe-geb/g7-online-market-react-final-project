const axios = require('axios');
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.id + "");
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
