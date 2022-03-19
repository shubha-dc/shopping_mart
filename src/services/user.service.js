import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";

const API_URL = "http://localhost:8080/api/test/";

const API_URL1 = "http://localhost:8080/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getManagerBoard() {
    return axios.get(API_URL + "manager", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getStoreKeeperBoard() {
    return axios.get(API_URL + "storekeeper", { headers: authHeader() });
  }

  getSupplierBoard() {
    return axios.get(API_URL + "supplier", { headers: authHeader() });
  }

  getProducts() {
    return axios.get(API_URL1 + "products");
  }

  addProducts(
    productname,
    brand,
    price,
    quantity,
    description,
    imageFileName,
    userId
  ) {
    return axios.post(
      API_URL1 + "addproduct",
      {
        productname,
        brand,
        quantity,
        price,
        user: { id: userId },
        description,
        imageFileName,
      },
      { headers: authHeader() }
    );
  }

  updateProduct(
    productId,
    productname,
    brand,
    price,

    description,
    imageFileName
  ) {
    return axios.put(
      API_URL1 + "product/" + productId,
      {
        productname,
        brand,
        price,
        description,
        imageFileName,
      },
      { headers: authHeader() }
    );
  }

  deleteProduct(productId) {
    return axios.delete(API_URL1 + "product/" + productId, {
      headers: authHeader(),
    });
  }
  getProduct(productId) {
    return axios.get(API_URL1 + "product/" + productId, {
      headers: authHeader(),
    });
  }

  addToKart(userId, productname, brand, productId, price, quantity = 1) {
    return axios.post(
      API_URL1 + `cart/addtocart`,
      {
        productname,
        brand,
        userId,
        productId,
        quantity,
        price,
      },
      { headers: authHeader() }
    );
  }

  getCartProducts() {
    return axios.get(
      API_URL1 + "cart/products/" + authService.getCurrentUser().id
    );
  }

  getCartProduct(cartId) {
    return axios.get(API_URL1 + "cart/product/" + cartId);
  }

  deleteCartItem(cartId) {
    return axios.delete(API_URL1 + "cart/product/" + cartId);
  }

  //ADRESS APIS

  addAddress(
    userId,
    firstname,
    lastname,
    address,
    pincode,
    mobileNumber,
    alternateContactNumber
  ) {
    return axios.post(
      API_URL1 + `address/addAddress`,
      {
        userId,
        firstname,
        lastname,
        address,
        pincode,
        mobileNumber,
        alternateContactNumber,
      },
      { headers: authHeader() }
    );
  }

  getUserAddresses() {
    return axios.get(
      API_URL1 + "address/allAddress/" + authService.getCurrentUser().id,
      { headers: authHeader() }
    );
  }

  placeOrder(productId, quantity, addressId, totalAmount, userId) {
    return axios.post(
      API_URL1 + "orderdetails/addproduct",
      {
        product: { id: productId },
        quantity,
        address: { id: addressId },
        totalAmount,
        user: { id: userId },
      },
      {
        headers: authHeader(),
        "Content-Type": "multipart/form-data",
      }
    );
  }

  getMyOrders() {
    return axios.get(
      API_URL1 + "orderdetails/products/" + authService.getCurrentUser().id,
      { headers: authHeader() }
    );
  }

  getAllPlacedOrders() {
    return axios.get(API_URL1 + "/orderdetails/products", {
      headers: authHeader(),
    });
  }

  updateCartQuantity(quantity, cartId) {
    return axios.post(
      API_URL1 + `cart/updatecart/quantity=${quantity}/id=${cartId}`,

      {
        headers: authHeader(),
      }
    );
  }

  EmptyCartForCurrentUser() {
    return axios.delete(
      API_URL1 + `cart/removeall/` + authService.getCurrentUser().id,

      {
        headers: authHeader(),
      }
    );
  }

  reduceQuantityForProduct(productId, quantity) {
    return axios.post(
      API_URL1 + `product/${productId}/quantityby/${quantity}`,
      {},
      {
        headers: authHeader(),
      }
    );
  }

  addAdminRestockRequest(productId) {
    return axios.post(
      API_URL1 + `pendingRequests/addRequest`,
      {
        product: { id: productId },
      },
      {
        headers: authHeader(),
      }
    );
  }

  getPendingRequests() {
    return axios.get(API_URL1 + "pendingRequests/all", {
      headers: authHeader(),
    });
  }

  deletePendingRequest(productId) {
    return axios.delete(
      API_URL1 + `pendingRequests/product/${productId}`,

      {
        headers: authHeader(),
      }
    );
  }

  addQuantityForProduct(productId, quantity) {
    return axios.post(
      API_URL1 + `product/${productId}/quantity/${quantity}`,
      {},
      {
        headers: authHeader(),
      }
    );
  }
}

export default new UserService();
