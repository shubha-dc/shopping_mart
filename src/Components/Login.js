import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { useHistory } from "react-router-dom";

import AuthService from "../services/auth.service";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    loading: false,
    message: "",
  });

  const [form, setForm] = useState();
  const [checkBtn, setCheckBtn] = useState();
  const history = useHistory();
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const onChangeUsername = (e) => {
    setLoginDetails({ ...loginDetails, username: e.target.value });
  };

  const onChangePassword = (e) => {
    setLoginDetails({ ...loginDetails, password: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoginDetails({ ...loginDetails, message: "", loading: true });

    //this.form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      AuthService.login(loginDetails.username, loginDetails.password).then(
        () => {
          history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoginDetails({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      setLoginDetails({
        loading: false,
      });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={loginDetails.username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={loginDetails.password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={loginDetails.loading}
            >
              {loginDetails.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {loginDetails.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {loginDetails.message}
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
    </div>
  );
}

export default Login;
