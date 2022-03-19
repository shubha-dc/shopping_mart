import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import RequestTable from "./ApprovalComponent/RequestTable";
import MenuContainer from "./MenuContainer";

function BoardSupplier() {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getSupplierBoard()
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.log(error);
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <MenuContainer></MenuContainer>
        <br></br>
        <RequestTable></RequestTable>
      </header>
    </div>
  );
}

export default BoardSupplier;
