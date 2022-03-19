import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";

function OrderConfirmed() {
  const [products, setproducts] = useState([]);
  const [address, setaddress] = useState({});

  useEffect(() => {
    userService.getMyOrders().then((response) => {
      setproducts(response.data);
      setaddress(response.data[0].address);
    });
  }, []);

  return (
    <div className="jumbotron">
      <h3>Thank you for shopping with us!</h3>
      <h2> Order placed successfully</h2>

      <h4>Address:</h4>
      <p>
        {address.firstname} {address.lastname},<br /> {address.address},<br />
        {address.pincode}
        <br />
        mobileNumber: {address.mobileNumber}
        <br />
        alternate ContactNumber: {address.alternateContactNumber}
      </p>
      <table className="table">
        <thead>
          <tr>
            <td>Product ID</td>
            <td>Product Name</td>
            <td>Brand</td>
            <td>Price</td>
            <td>quantity</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((orderedProduct) => (
              <OrderTable
                key={orderedProduct.id}
                product={orderedProduct}
              ></OrderTable>
            ))
          ) : (
            <h1>No products found</h1>
          )}
        </tbody>
      </table>
      <h3>Grand total: {sessionStorage.getItem("grandTotal")} &#8377;</h3>
    </div>
  );
}

export default OrderConfirmed;

const OrderTable = (props) => {
  return (
    <tr key={props.product.id}>
      <td>{props.product.id}</td>
      <td>{props.product.product.productname}</td>
      <td>{props.product.product.brand}</td>
      <td>{props.product.product.price}</td>
      <td>{props.product.quantity}</td>
      <td>{props.product.product.price * props.product.quantity}</td>
    </tr>
  );
};
