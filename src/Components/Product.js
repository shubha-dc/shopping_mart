import React, { useState } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import style from "./../recipe.module.css";

let id = 0;

const Product = ({
  productId,
  productname,
  brand,
  price,
  description,
  imageFileName,
  originalQuantity,
}) => {
  const [addedProduct, setaddedProduct] = useState({});
  const [successful, setsuccessful] = useState();
  const [quantity, setquantity] = useState(1);
  let list = [];
  const addtocartHandler = () => {
    if (authService.isUserLoggedIn() == "true") {
      const userId = authService.getCurrentUser().id;
      userService
        .addToKart(userId, productname, brand, productId, price, quantity)
        .then((response) => {
          setaddedProduct(response.data);
          setsuccessful(true);
        })
        .catch((error) => {
          console.log(error);
          setsuccessful(false);
          setaddedProduct(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          );
        });
    } else {
      addProductToCart();
    }
  };

  function generateRequest(productId) {
    userService.addAdminRestockRequest(productId);
  }

  function addProductToCart() {
    list = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (list.length !== 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].productname === productname) {
          setaddedProduct({ message: "Already added to Cart" });
          setsuccessful(true);
          return;
        }
      }
      if (!successful) {
        id = list.length + 1;
        list.push({ id, productname, brand, productId, price, quantity });
        localStorage.setItem("cartItems", JSON.stringify(list));
        setaddedProduct({ message: "Added to Cart" });
        setsuccessful(true);
      }
    }
    if (list.length == 0) {
      id = id + 1;
      list.push({ id, productname, brand, productId, price, quantity });
      localStorage.setItem("cartItems", JSON.stringify(list));
      setaddedProduct({ message: "Added to Cart" });
      setsuccessful(true);
    }
  }
  let imageFilePath = `./productimages/${imageFileName}`;
  return (
    <div className={style.product}>
      {originalQuantity >= 1 ? (
        <div>
          <img className={style.images} src={imageFilePath} alt="no image" />
          <h2>
            {brand} {productname}
          </h2>
          <h3>{price} &#8377;</h3>

          <p>{description}</p>
          {!successful ? (
            <button
              className="alert alert-success"
              key={productId}
              onClick={addtocartHandler}
            >
              Add to cart
            </button>
          ) : null}
          {successful ? (
            <p
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {addedProduct.message}
            </p>
          ) : null}
        </div>
      ) : (
        <div>
          <img
            className={style.bluredImages}
            src={imageFilePath}
            alt="no image"
          />
          <h2 className="productName">
            {productname} {brand}
          </h2>
          <h3> &#8377; {price}</h3>

          <p>{description}</p>
          {generateRequest(productId)}
          {!successful ? (
            <button
              className="alert alert-danger"
              disabled="true"
              key={productId}
            >
              Out Of Stock
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Product;
