import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";

function BoardManager() {
  const [requests, setrequests] = useState([]);

  useEffect(() => {
    console.log(
      "use effect data" + localStorage.getItem("requestedSupplierId")
    );
    setrequests(JSON.parse(localStorage.getItem("requestedSupplierId")) || []);
  }, []);

  return (
    <div className="jumbotron">
      <h3>Supplier updating product quantity request</h3>
      {console.log("The data before sending to child" + requests)}

      {requests.length ? (
        <table>
          {requests.map((product) => (
            <SupplieRequest key={product.supplierId} request={product} />
          ))}
        </table>
      ) : (
        <h2>no pending requests</h2>
      )}
    </div>
  );
}

export default BoardManager;

const SupplieRequest = (props) => {
  const [succesful, setsuccesful] = useState();
  const [isDiclined, setIsDeclined] = useState();

  console.log("The data which was stored" + props.request);

  const approveHandler = () => {
    let cartItems = JSON.parse(localStorage.getItem("requestedSupplierId"));

    userService
      .addQuantityForProduct(props.request.productId, props.request.newQuant)
      .then((res) => {
        userService
          .deletePendingRequest(props.request.requestId)
          .then((res) => {
            for (let i = 0; i < cartItems.length; i++) {
              if (props.request.productId == cartItems[i].productId) {
                var index = cartItems.indexOf(cartItems[i]);
                cartItems.splice(index, 1);
                localStorage.setItem(
                  "requestedSupplierId",
                  JSON.stringify(cartItems)
                );
                break;
              }
            }

            setsuccesful(true);
          })
          .catch((err) => console.log(err));
      });
  };

  const declinHandler = () => {
    let cartItems = JSON.parse(localStorage.getItem("requestedSupplierId"));

    userService
      .deletePendingRequest(props.request.requestId)
      .then((res) => {
        for (let i = 0; i < cartItems.length; i++) {
          if (props.request.productId == cartItems[i].productId) {
            var index = cartItems.indexOf(cartItems[i]);
            cartItems.splice(index, 1);
            localStorage.setItem(
              "requestedSupplierId",
              JSON.stringify(cartItems)
            );
            break;
          }
        }

        setIsDeclined(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <tr key={props.key}>
        <td>
          <p1>
            Supplier Id: <b>{props.request.supplierId}</b> is requested for
            Updating quantity
          </p1>
        </td>
        <td>
          productId: <b> {props.request.productId}</b>
        </td>
        <td>
          Quantity by: <b>{props.request.newQuant}</b>
        </td>
        <td>
          <button
            onClick={approveHandler}
            class="btn btn-success btn-lg float-right"
          >
            approve
          </button>
        </td>
        <td>
          <button
            onClick={declinHandler}
            class="btn btn-danger btn-lg float-right"
          >
            decline
          </button>
        </td>
        {succesful ? (
          <span className="alert alert-success" role="alert">
            Request approved
            {window.location.reload()}
          </span>
        ) : isDiclined ? (
          <span className="alert alert-danger" role="alert">
            Request Declined
            {window.location.reload()}
          </span>
        ) : null}
      </tr>
    </>
  );
};
