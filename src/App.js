import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./menu.scss";

import AuthService from "./services/auth.service";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import BoardUser from "./Components/BoardUser";
import BoardManager from "./Components/BoardManager";
import BoardAdmin from "./Components/BoardAdmin";
import BoardSupplier from "./Components/BoardSupplier";
import AddProduct from "./Components/ProductComponent/AddProduct";
import DeleteProduct from "./Components/ProductComponent/DeleteProduct";
import UpdateProduct from "./Components/ProductComponent/UpdateProduct";
import GetProduct from "./Components/ProductComponent/GetProduct";
import Cart from "./Components/Cart";

import AddAddress from "./Components/OrderComponent/AddAddress";
import OrderSummary from "./Components/OrderComponent/OrderSummary";
import SelectAddress from "./Components/OrderComponent/SelectAddress";
import OrderConfirmed from "./Components/OrderComponent/OrderConfirmed";
import SignUpAsSupplier from "./Components/SignUpAsSupplier";

function App() {
  const [appState, setAppState] = useState({
    showManagerBoard: false,
    showAdminBoard: false,
    showStorekeeperBoard: false,
    showSupplierBoard: false,
    currentUser: undefined,
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setAppState({
        currentUser: user,
        showManagerBoard: user.roles.includes("ROLE_MANAGER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),

        showSupplierBoard: user.roles.includes("ROLE_SUPPLIER"),
      });
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Infostretch
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {appState.showManagerBoard && (
              <li className="nav-item">
                <Link to={"/manager"} className="nav-link">
                  Manager Board
                </Link>
              </li>
            )}

            {appState.showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {appState.showSupplierBoard && (
              <li className="nav-item">
                <Link to={"/supplier"} className="nav-link">
                  Supplier Board
                </Link>
              </li>
            )}
          </div>

          {appState.currentUser ? (
            <div className="navbar-nav ml-auto">
              {appState.showSupplierBoard ? null : (
                <li className="nav-item">
                  <Link to={"/signUpAsSupplier"} className="nav-link">
                    sign up as supplier
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to={"/cart"} className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {appState.currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/cart"} className="nav-link">
                  Cart
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </header>
      <body>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home", "/products"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/manager" component={BoardManager} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/supplier" component={BoardSupplier} />

            <Route path="/addProduct" component={AddProduct} />
            <Route path="/updateProduct" component={UpdateProduct} />
            <Route path="/deleteProduct" component={DeleteProduct} />
            <Route path="/getProduct" component={GetProduct} />
            <Route path="/cart" component={Cart} />
            <Route
              exact
              path="/ordersummary/addAddress"
              component={AddAddress}
            />
            <Route exact path="/ordersummary" component={OrderSummary} />

            <Route
              exact
              path="/ordersummary/selectAddress"
              component={SelectAddress}
            />
            <Route exact path="/ordersuccess" component={OrderConfirmed} />
            <Route
              exact
              path="/signUpAsSupplier"
              component={SignUpAsSupplier}
            />
          </Switch>
        </div>
      </body>
    </div>
  );
}

export default App;
