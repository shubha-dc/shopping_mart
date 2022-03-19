import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

import UserService from "../services/user.service";
import TablePendingRequest from "../Components/ApprovalComponent/TablePendingRequest";

function BoardAdmin() {
  const [successful, setsuccessful] = useState();

  const [requests, setrequests] = useState([]);

  useEffect(() => {
    setrequests(JSON.parse(localStorage.getItem("requestItems")));
  }, []);

  return (
    <div className="jumbotron">
      <h3>Supplier access request</h3>
      {requests.length ? (
        <table>
          {requests.length
            ? requests.map((product) => (
                <SupplieRequest key={product} request={product} />
              ))
            : null}
        </table>
      ) : (
        <h2>no pending requests</h2>
      )}
    </div>
  );
}

export default BoardAdmin;

const SupplieRequest = (props) => {
  const [succesful, setsuccesful] = useState();
  const [isDiclined, setIsDeclined] = useState();

  const approveHandler = () => {
    let cartItems = JSON.parse(localStorage.getItem("requestItems"));
    authService.addSupplierRole(props.request);
    for (let i = 0; i < cartItems.length; i++) {
      if (props.request == cartItems[i]) {
        var index = cartItems.indexOf(cartItems[i]);
        cartItems.splice(index, 1);
        localStorage.setItem("requestItems", JSON.stringify(cartItems));
        break;
      }
    }

    setsuccesful(true);
  };

  const declinHandler = () => {
    let cartItems = JSON.parse(localStorage.getItem("requestItems"));

    for (let i = 0; i < cartItems.length; i++) {
      if (props.request == cartItems[i]) {
        var index = cartItems.indexOf(cartItems[i]);
        cartItems.splice(index, 1);
        localStorage.setItem("requestItems", JSON.stringify(cartItems));
        break;
      }
    }

    setIsDeclined(true);
  };

  return (
    <>
      <tr key={props.key}>
        <td>user Id: {props.request} is requested for Supplier Access</td>
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
