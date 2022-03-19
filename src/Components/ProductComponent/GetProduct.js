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

function GetProduct() {
  const [productDetails, setProductDetails] = useState({
    productId: 0,
    successful: false,
    message: "",
  });

  const [fetchedProductDetails, setFetchedProductDetails] = useState({});
  const [checkBtn, setCheckBtn] = useState();
  const [form, setform] = useState();

  const history = useHistory();

  const onChangeProductId = (e) => {
    setProductDetails({ ...productDetails, productId: e.target.value });
  };

  const productHandler = () => {
    history.push("/getProduct");
    window.location.reload();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length === 0) {
      UserService.getProduct(productDetails.productId)
        .then((response) => {
          setFetchedProductDetails(response.data);
          setProductDetails({
            ...productDetails,
            message: "Product fetched successfully",
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
        <h3>Get the product details</h3>
        <Form
          onSubmit={handleFormSubmit}
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
                  Get product details
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
          <Form>
            <div>
              <div className="form-group">
                <label htmlFor="productname">Product Name:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="productname"
                  value={fetchedProductDetails.productname}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="productbrand">Product Brand:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="productbrand"
                  value={fetchedProductDetails.brand}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="price"
                  value={fetchedProductDetails.price}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">description:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={fetchedProductDetails.description}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageFileName">imageFileName:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="imageFileName"
                  value={fetchedProductDetails.imageFileName}
                  readOnly
                />
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={productHandler}
              >
                Get more product
              </button>
            </div>
          </Form>
        ) : null}
      </header>
    </div>
  );
}

export default GetProduct;
