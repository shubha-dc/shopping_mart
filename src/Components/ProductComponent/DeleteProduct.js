import React, { useState } from "react";

import UserService from "../../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { useHistory } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function DeleteProduct() {
  const [productDetails, setProductDetails] = useState({
    productId: 0,
    successful: false,
    message: "",
  });
  const [checkBtn, setCheckBtn] = useState();
  const [form, setform] = useState();

  const history = useHistory();

  const onChangeProductId = (e) => {
    setProductDetails({ ...productDetails, productId: e.target.value });
  };

  const productHandler = () => {
    history.push("/deleteProduct");
    window.location.reload();
  };

  const handleRegister = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length === 0) {
      UserService.deleteProduct(productDetails.productId)
        .then((response) => {
          setProductDetails({
            ...productDetails,
            message: response.data.message,
            successful: true,
          });
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setProductDetails({
            ...productDetails,
            successful: false,
            message: resMessage,
          });
        });
    }
  };
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Delete product from application</h3>
        <Form
          onSubmit={handleRegister}
          ref={(c) => {
            setform(c);
          }}
        >
          {!productDetails.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="productId">Enter Product ID:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="productId"
                  value={productDetails.productId}
                  onChange={onChangeProductId}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Delete product
                </button>
              </div>
            </div>
          )}
          {productDetails.message && (
            <div className="form-group">
              <div
                className={
                  productDetails.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {productDetails.message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              setCheckBtn(c);
            }}
          />
        </Form>

        {productDetails.successful ? (
          <div>
            <button
              className="btn btn-primary btn-block"
              onClick={productHandler}
            >
              Delete more product
            </button>
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default DeleteProduct;
