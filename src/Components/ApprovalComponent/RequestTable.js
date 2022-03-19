import React, { useState, useEffect } from "react";
import userService from "../../services/user.service";
import TablePendingRequest from "./TablePendingRequest";

function RequestTable() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    userService
      .getPendingRequests()
      .then((res) => setproducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Please validate and approve the restock requests</h2>
      <table className="table">
        <thead>
          <tr>
            <td>Request ID</td>
            <td>Product ID</td>
            <td>Product Name</td>
            <td>quantity</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => (
              <TablePendingRequest
                key={product.id}
                requestId={product.id}
                productId={product.product.id}
                productname={product.product.productname}
                quantity={product.product.quantity}
              />
            ))
          ) : (
            <td>
              {" "}
              <p>No pending requests</p>{" "}
            </td>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestTable;
