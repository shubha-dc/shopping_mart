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

function UpdateProduct() {
  const [productDetails, setProductDetails] = useState({
    productId: 0,
    successful: false,
    message: "",
  });
  const [checkBtn, setCheckBtn] = useState();
  const [form, setform] = useState();
  const [fetchedProductDetails, setFetchedProductDetails] = useState({});
  const [updatedProductDeatils, setUpdatedProductDetails] = useState({
    productname: "",
    brand: "",
    price: "",

    description: "",
    imageFileName: "",
    successful: false,
  });

  const history = useHistory();

  const onChangeProductId = (e) => {
    setProductDetails({ ...productDetails, productId: e.target.value });
  };
  const onChangeProductname = (e) => {
    setUpdatedProductDetails({
      ...updatedProductDeatils,
      productname: e.target.value,
    });
  };
  const onChangeProductbrand = (e) => {
    setUpdatedProductDetails({
      ...updatedProductDeatils,
      brand: e.target.value,
    });
  };
  const onChangePrice = (e) => {
    setUpdatedProductDetails({
      ...updatedProductDeatils,
      price: e.target.value,
    });
  };

  const onChangeDescription = (e) => {
    setUpdatedProductDetails({
      ...updatedProductDeatils,
      description: e.target.value,
    });
  };
  const onChangeImageFileName = (e) => {
    setUpdatedProductDetails({
      ...updatedProductDeatils,
      imageFileName: e.target.value,
    });
  };

  const productHandler = () => {
    history.push("/updateProduct");
    window.location.reload();
  };

  const getProductSubmit = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length === 0) {
      UserService.getProduct(productDetails.productId)
        .then((response) => {
          setFetchedProductDetails(response.data);
          setUpdatedProductDetails({
            ...updatedProductDeatils,
            productname: response.data.productname,
            brand: response.data.brand,
            price: response.data.price,

            description: response.data.description,
            imageFileName: response.data.imageFileName,
          });
          console.log(response.data);
          console.log(updatedProductDeatils);
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

  const updateProductHandler = (e) => {
    e.preventDefault();

    form.validateAll();

    UserService.updateProduct(
      productDetails.productId,
      updatedProductDeatils.productname,
      updatedProductDeatils.brand,
      updatedProductDeatils.price,
      updatedProductDeatils.description,
      updatedProductDeatils.imageFileName
    )
      .then((response) => {
        setProductDetails({
          ...productDetails,
          message: "Product Updated successfully",
          successful: true,
        });

        setUpdatedProductDetails({
          ...updatedProductDeatils,
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

        setUpdatedProductDetails({
          ...updatedProductDeatils,
          successful: false,
          message: resMessage,
        });
      });
  };
  return (
    <div className="container">
      <header className="jumbotron">
        <h2>Update product in application</h2>

        <Form
          onSubmit={getProductSubmit}
          ref={(c) => {
            setform(c);
          }}
        >
          {!productDetails.successful && (
            <div>
              <h4>Get the product details</h4>
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

        {updatedProductDeatils.successful && (
          <div>
            <button
              className="btn btn-primary btn-block"
              onClick={productHandler}
            >
              Update more product
            </button>
          </div>
        )}

        {!updatedProductDeatils.successful && productDetails.successful && (
          <Form onSubmit={updateProductHandler}>
            <h4>Edit the required product details Data</h4>
            <div className="form-group">
              <label htmlFor="productname">Id:</label>
              <Input
                type="text"
                className="form-control"
                name="productid"
                value={fetchedProductDetails.id}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="productname">Product Name:</label>
              <Input
                type="text"
                className="form-control"
                name="productname"
                value={updatedProductDeatils.productname}
                onChange={onChangeProductname}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productbrand">Product Brand:</label>
              <Input
                type="text"
                className="form-control"
                name="productbrand"
                value={updatedProductDeatils.brand}
                onChange={onChangeProductbrand}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <Input
                type="text"
                className="form-control"
                name="price"
                value={updatedProductDeatils.price}
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
                value={updatedProductDeatils.description}
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
                value={updatedProductDeatils.imageFileName}
                onChange={onChangeImageFileName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">
                Update product
              </button>
            </div>
          </Form>
        )}
      </header>
    </div>
  );
}

export default UpdateProduct;
