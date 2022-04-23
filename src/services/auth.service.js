import axios from "axios";
import { axiosIntercepter } from "../helper/axiosApiInstance";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.token)
          localStorage.setItem("user", JSON.stringify(response.data));

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    return Promise.resolve(null);
  }

  profile(){
    return axiosIntercepter.get('http://localhost:8080/users/profile')
    .then((res) => {
      
      return res.data;
    })
  }
}

export default new AuthService();