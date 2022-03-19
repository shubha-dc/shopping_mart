import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/user.service";
import Cart from "../Cart";
function OrderSummary() {
  const [addresses, setaddresses] = useState([]);

  useEffect(() => {
    userService
      .getUserAddresses()
      .then((res) => setaddresses(res.data))
      .catch();
  }, []);

  const rid = localStorage.getItem("addressId");

  return (
    <div className="jumbotron">
      <input type="radio" value="selectedAddress" name="address" checked />
      {addresses.map((add) =>
        add.id == rid ? (
          <p>
            {" "}
            {add.firstname} {add.lastname},<br /> {add.address},<br />
            {add.pincode}
            <br />
            mobileNumber: {add.mobileNumber}
            <br />
            alternate ContactNumber: {add.alternateContactNumber}
          </p>
        ) : null
      )}

      <Link to="/ordersummary/selectAddress">
        Select different address from existing
      </Link>
      <br />
      <Link to="/ordersummary/addAddress">Add New address</Link>
      <br />
      <br />

      <Cart readOnly="true" addressId={rid}></Cart>
    </div>
  );
}

export default OrderSummary;
