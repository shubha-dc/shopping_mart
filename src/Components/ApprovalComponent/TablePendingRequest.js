import React, { useState } from "react";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "./../../Table.css";
import form from "react-validation/build/form";

const TablePendingRequest = (props) => {
  const [newQuant, setnewQuant] = useState(0);
  const [successful, setsuccessful] = useState();
  const [isDiclined, setIsDeclined] = useState();
  const [checkBtn, setCheckBtn] = useState();
  const [message, setmessage] = useState("");

  const UpdateQuantity = (e) => {
    setnewQuant(e.target.value);
  };

  let list = [];

  const sendRequestHandler = () => {
    addRequest();
  };

  const declinHandler = () => {
    userService
      .deletePendingRequest(props.requestId)
      .then(setIsDeclined(true))
      .catch((err) => console.log(err));
  };

  function addRequest() {
    if (newQuant !== 0) {
      list = JSON.parse(localStorage.getItem("requestedSupplierId")) || [];

      console.log("retrived list in addrequest" + list);
      console.log("new quantity" + newQuant);

      list.push({
        supplierId: authService.getCurrentUser().id,
        productId: props.productId,
        newQuant,
        requestId: props.requestId,
      });
      console.log("after adding push list in addrequest" + list);
      localStorage.setItem("requestedSupplierId", JSON.stringify(list));
      setsuccessful(true);
    } else {
      setmessage("Quantity cannot be 0");
    }
  }

  return (
    <tr key={props.key}>
      <td>{props.requestId}</td>
      <td>{props.productId}</td>
      <td>{props.productname}</td>
      {!successful ? (
        <>
          <td>
            <Form>
              <Input
                required="true"
                type="number"
                className="form-control"
                onChange={UpdateQuantity}
                value={newQuant}
                placeholder="enter the quantity"
              ></Input>
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  setCheckBtn(c);
                }}
              />
            </Form>
          </td>

          <td>
            <button
              onClick={sendRequestHandler}
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
        </>
      ) : null}
      {successful ? (
        <span className="alert alert-success" role="alert">
          <p>
            Request sent to Manager for approvalPlease wait will let u know by
            email once request is approved
          </p>
        </span>
      ) : isDiclined ? (
        <span className="alert alert-danger" role="alert">
          Request Declined
          {window.location.reload()}
        </span>
      ) : (
        <> {message} </>
      )}
    </tr>
  );
};

export default TablePendingRequest;
