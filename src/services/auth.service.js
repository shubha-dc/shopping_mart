import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("cartItems");
  }

  register(username, firstname, lastname, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      firstname,
      lastname,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isUserLoggedIn() {
    return localStorage.getItem("isLoggedIn");
  }

  addSupplierRole(userId) {
    return axios
      .put(
        API_URL + "addsupplier/" + userId,
        {},
        {
          headers: authHeader(),
        }
      )
      .then()
      .catch();
  }
}

export default new AuthService();
