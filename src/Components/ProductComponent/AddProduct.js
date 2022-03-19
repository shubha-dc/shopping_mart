import React, { useState } from "react";

import UserService from "../../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { useHistory } from "react-router-dom";
import authService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vproductname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The product name must be between 3 and 20 characters.
      </div>
    );
  }
};

function AddProduct() {
  const [productDetails, setProductDetails] = useState({
    productname: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
    imageFileName: "",
    successful: false,
    message: "",
  });

  const [checkBtn, setCheckBtn] = useState();
  const [form, setform] = useState();
  const history = useHistory();

  const onChangeProductname = (e) => {
    setProductDetails({ ...productDetails, productname: e.target.value });
  };
  const onChangeProductbrand = (e) => {
    setProductDetails({ ...productDetails, brand: e.target.value });
  };
  const onChangePrice = (e) => {
    setProductDetails({ ...productDetails, price: e.target.value });
  };

  const onChangeDescription = (e) => {
    setProductDetails({ ...productDetails, description: e.target.value });
  };
  const onChangeImageFileName = (e) => {
    setProductDetails({ ...productDetails, imageFileName: e.target.value });
  };
  const onChangeQuantity = (e) => {
    setProductDetails({ ...productDetails, quantity: e.target.value });
  };

  const productHandler = () => {
    history.push("/addProduct");
    window.location.reload();
  };

  const addProductHandler = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length === 0) {
      UserService.addProducts(
        productDetails.productname,
        productDetails.brand,
        productDetails.price,
        productDetails.quantity,
        productDetails.description,
        productDetails.imageFileName,
        authService.getCurrentUser().id
      )
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
    <div>
      <header className="jumbotron">
        <h3>Add product to application</h3>
        <Form
          onSubmit={addProductHandler}
          ref={(c) => {
            setform(c);
          }}
        >
          {!productDetails.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="productname">Product Name:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="productname"
                  value={productDetails.productname}
                  onChange={onChangeProductname}
                  validations={[required, vproductname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productbrand">Product Brand:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="productbrand"
                  value={productDetails.brand}
                  onChange={onChangeProductbrand}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">quantity:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="quantity"
                  value={productDetails.quantity}
                  onChange={onChangeQuantity}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="price"
                  value={productDetails.price}
                  onChange={onChangePrice}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">description:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={productDetails.description}
                  onChange={onChangeDescription}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageFileName">imageFileName:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="imageFileName"
                  value={productDetails.imageFileName}
                  onChange={onChangeImageFileName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Add product
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
              Add more product
            </button>
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default AddProduct;
