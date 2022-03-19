import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import CartTable from "./CartTable";

import "./../Table.css";
import authService from "../services/auth.service";

import { Link, useHistory } from "react-router-dom";
import OrderSummaryTable from "./OrderSummaryTable";

function Cart(props) {
  const [products, setproducts] = useState([]);
  const [grandTotalPrice, setGrandTotalPrice] = useState([]);
  const history = useHistory();

  const addressId = props.addressId;

  let Price = 0;
  const getTotalPrice = (price) => {
    Price = Price + price;
    setGrandTotalPrice(Price);
    sessionStorage.setItem("grandTotal", Price);
  };

  const checkOutHandler = () => {
    if (authService.isUserLoggedIn() == "true") {
      history.push("/ordersummary");
      window.location.reload();
    } else {
      history.push("/login");
      window.location.reload();
    }
  };

  const goToHomeHandler = () => {
    history.push("/");
    window.location.reload();
  };

  const placeOrderHandler = () => {
    products.map((product) => {
      userService
        .placeOrder(
          product.productId,
          product.quantity,
          addressId,
          product.price,
          product.userId
        )
        .then(
          console.log("Product ordered quantity" + product.quantity),
          console.log(product),
          userService.reduceQuantityForProduct(
            product.productId,
            product.quantity
          ),

          userService
            .EmptyCartForCurrentUser()
            .then()
            .catch((err) => {
              console.log(err);
            })
        );
    });
    history.push("/ordersuccess");
    window.location.reload();
  };

  useEffect(() => {
    if (authService.isUserLoggedIn() == "true") {
      userService
        .getCartProducts()
        .then((response) => {
          console.log(response.data);
          setproducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setproducts(JSON.parse(localStorage.getItem("cartItems")) || []);
    }
  }, []);
  let imageFilePath = `./productimages/noItemsFound.jpg`;

  return (
    <div className="jumbotron">
      {props.readOnly ? (
        <div>
          <h2>Order deatils</h2>
          <table className="table">
            <thead>
              <tr>
                <td>Sl No</td>
                <td>Product Name</td>
                <td>Brand</td>
                <td>Price</td>
                <td>quantity</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <OrderSummaryTable
                  key={product.id}
                  cartId={product.id}
                  productname={product.productname}
                  brand={product.brand}
                  quantity={product.quantity}
                  price={product.price}
                />
              ))}
            </tbody>
          </table>

          <h3>Grand total: {sessionStorage.getItem("grandTotal")} &#8377;</h3>

          <button
            onClick={placeOrderHandler}
            class="btn btn-success btn-lg float-right"
            type="submit"
          >
            placeOrder
          </button>
        </div>
      ) : products.length ? (
        <div>
          <h2>Cart Items</h2>
          <table className="table">
            <thead>
              <tr>
                <td>Sl No</td>
                <td>Product Name</td>
                <td>Brand</td>
                <td>Price</td>
                <td>quantity</td>
                <td>Total</td>
                <td>items</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <CartTable
                  key={product.id}
                  cartId={product.id}
                  productname={product.productname}
                  brand={product.brand}
                  quantity={product.quantity}
                  price={product.price}
                  handleChange={getTotalPrice}
                />
              ))}
            </tbody>
          </table>

          <h3>Grand total:{grandTotalPrice} &#8377;</h3>

          <button
            onClick={checkOutHandler}
            class="btn btn-success btn-lg float-right"
            type="submit"
          >
            Check Out
          </button>
        </div>
      ) : (
        <div className="jumbotron">
          <img src={imageFilePath} alt="NO PRODIUCTS EMPTY CART"></img>
          <button
            onClick={goToHomeHandler}
            class="btn btn-success btn-lg float-center"
            type="submit"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
