import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validator from "validator";

import { useHistory } from "react-router-dom";
import userService from "../../services/user.service";
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

const vfirstname = (value) => {
  if (value.length < 4 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The firstname must be between 5 and 20 characters.
      </div>
    );
  }
};
const vlastname = (value) => {
  if (value.length < 5 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The lastname must be between 6 and 20 characters.
      </div>
    );
  }
};

const vaddressline = (value) => {
  if (value.length < 5 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        The Address must be between 6 and 30 characters.
      </div>
    );
  }
};

const vpincode = (value) => {
  if (value.length < 5 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        The Pincode must be between 6 and 10 characters.
      </div>
    );
  }
};

const vmobileNumber = (value) => {
  if (!validator.isMobilePhone(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        The mobile number is invalid.
      </div>
    );
  }
  if (value.length < 10 || value.length > 11) {
    return (
      <div className="alert alert-danger" role="alert">
        The Mobile number must be number of 10 digit.
      </div>
    );
  }
};

function AddAddress() {
  const [addressData, setAddressData] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    alternateContactNumber: "",
    successful: false,
    message: "",
  });

  const [checkBtn, setCheckBtn] = useState();
  const [form, setform] = useState();
  const history = useHistory();

  const onChangeFirstname = (e) => {
    setAddressData({ ...addressData, firstname: e.target.value });
  };
  const onChangeLastname = (e) => {
    setAddressData({ ...addressData, lastname: e.target.value });
  };

  const onChangeAddress = (e) => {
    setAddressData({ ...addressData, address: e.target.value });
  };

  const onChangePincode = (e) => {
    setAddressData({ ...addressData, pincode: e.target.value });
  };

  const onChangeMobileNumber = (e) => {
    setAddressData({ ...addressData, mobileNumber: e.target.value });
  };
  const onChangeAlternateContactNumber = (e) => {
    setAddressData({ ...addressData, alternateContactNumber: e.target.value });
  };

  const addAddressHandler = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length === 0) {
      userService
        .addAddress(
          authService.getCurrentUser().id,
          addressData.firstname,
          addressData.lastname,
          addressData.address,
          addressData.pincode,
          addressData.mobileNumber,
          addressData.alternateContactNumber
        )
        .then((response) => {
          setAddressData({
            ...addressData,
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

          setAddressData({
            ...addressData,
            successful: false,
            message: resMessage,
          });
        });
    }
  };

  return !addressData.successful ? (
    <div className="jumbotron">
      <h3>Please fill below details to place order</h3>
      <Form
        onSubmit={addAddressHandler}
        ref={(c) => {
          setform(c);
        }}
      >
        <div className="form-group">
          <label htmlFor="firstname">firstname:</label>
          <Input
            type="text"
            className="form-control"
            name="firstname"
            value={addressData.firstname}
            onChange={onChangeFirstname}
            validations={[required, vfirstname]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">lastname:</label>
          <Input
            type="text"
            className="form-control"
            name="lastname"
            value={addressData.lastname}
            onChange={onChangeLastname}
            validations={[required, vlastname]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address line:</label>
          <Input
            type="text"
            className="form-control"
            name="address"
            value={addressData.address}
            onChange={onChangeAddress}
            validations={[required, vaddressline]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <Input
            type="text"
            className="form-control"
            name="pincode"
            value={addressData.pincode}
            onChange={onChangePincode}
            validations={[required, vpincode]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <Input
            type="mobileNumber"
            className="form-control"
            name="mobileNumber"
            value={addressData.mobileNumber}
            onChange={onChangeMobileNumber}
            validations={[required, vmobileNumber]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="alternateContactNumber">
            Alternate Contact Number:
          </label>
          <Input
            type="mobileNumber"
            className="form-control"
            name="alternateContactNumber"
            value={addressData.alternateContactNumber}
            onChange={onChangeAlternateContactNumber}
            validations={[required, vmobileNumber]}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block">Add Address</button>
        </div>
        {addressData.message && (
          <div className="form-group">
            <div
              className={
                addressData.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {addressData.message}
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
    </div>
  ) : (
    <div className="jumbotron">
      <div
        className={
          addressData.successful ? "alert alert-success" : "alert alert-danger"
        }
        role="alert"
      >
        {addressData.message}
      </div>
      <button
        className="btn btn-primary btn-block"
        onClick={() => history.goBack()}
      >
        Okay
      </button>
    </div>
  );
}

export default AddAddress;
