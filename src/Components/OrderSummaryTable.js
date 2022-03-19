import React, { useState } from "react";

import "./../Table.css";

const OrderSummaryTable = (props) => {
  return (
    <tr key={props.cartId}>
      <td>{props.cartId}</td>
      <td>{props.productname}</td>
      <td>{props.brand}</td>
      <td>{props.price}</td>
      <td>{props.quantity}</td>
      <td>{props.price * props.quantity}</td>
    </tr>
  );
};

export default OrderSummaryTable;
