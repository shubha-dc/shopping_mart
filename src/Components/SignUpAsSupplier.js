import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import authService from "../services/auth.service";

function SignUpAsSupplier() {
  const history = useHistory();
  const [successful, setsuccessful] = useState();
  let list = [];

  const sendRequestHandler = () => {
    localStorage.setItem("requestedUsedId", authService.getCurrentUser().id);
    addRequest();
    setsuccessful(true);
  };

  function addRequest() {
    list = JSON.parse(localStorage.getItem("requestItems")) || [];

    list.push(authService.getCurrentUser().id);
    localStorage.setItem("requestItems", JSON.stringify(list));
    setsuccessful(true);
  }

  return (
    <div className="jumbotron">
      <h2>Sign up as Supplier</h2>
      <p>The Request will be sent to admin for approval</p>
      {!successful ? (
        <>
          <button
            class="btn btn-success btn-lg float-left"
            onClick={sendRequestHandler}
          >
            send request
          </button>
          <button
            class="btn btn-danger btn-lg float-left"
            onClick={() => history.goBack()}
          >
            cancel
          </button>
        </>
      ) : (
        <h3 className="alert alert-success" role="alert">
          Request sent to admin successfullly
        </h3>
      )}
    </div>
  );
}

export default SignUpAsSupplier;
