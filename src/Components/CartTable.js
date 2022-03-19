import React, { useState } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";

import "./../Table.css";

const CartTable = (props) => {
  const [quant, setquant] = useState(props.quantity);

  const delteItemHandler = () => {
    if (authService.isUserLoggedIn() == "true") {
      userService
        .deleteCartItem(props.cartId)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));

      for (let i = 0; i < cartItems.length; i++) {
        if (props.productname === cartItems[i].productname) {
          var index = cartItems.indexOf(cartItems[i]);
          cartItems.splice(index, 1);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          break;
        }
      }

      window.location.reload(false);
    }
  };

  const incrementQuantity = () => {
    if (quant < 10) {
      setquant(quant + 1);
    }
  };

  const decrementQuantity = () => {
    if (quant < 2) {
      delteItemHandler();
    } else {
      setquant(quant - 1);
    }
  };

  const updateTotal = () => {
    userService.updateCartQuantity(quant, props.cartId);
    props.handleChange(props.price * quant);
  };

  const updateQuantity = () => {
    props.handleQuantity(quant);
  };

  return (
    <tr key={props.cartId}>
      <td>{props.cartId}</td>
      <td>{props.productname}</td>
      <td>{props.brand}</td>
      <td>{props.price}</td>
      <td>{quant}</td>
      <td className="product-total-amount">
        <input
          readOnly
          onChange={updateTotal(quant * props.price)}
          value={props.price * quant}
        ></input>
      </td>
      <td>
        <button className="btn btn-primary" onClick={incrementQuantity}>
          +
        </button>

        <b>{quant}</b>
        <button className="btn btn-primary" onClick={decrementQuantity}>
          -
        </button>
      </td>
      <td>
        <button key={props.cartId} onClick={delteItemHandler}>
          removeItem
        </button>
      </td>
    </tr>
  );
};

export default CartTable;
