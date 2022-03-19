import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

function Profile() {
  const [profileDetails, setProfileDetails] = useState({
    redirect: null,
    userReady: false,
    currentUser: { username: "" },
  });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser)
      setProfileDetails({ ...profileDetails, redirect: "/home" });
    setProfileDetails({
      ...profileDetails,
      currentUser: currentUser,
      userReady: true,
    });
  }, []);

  if (profileDetails.redirect) {
    return <Redirect to={profileDetails.redirect} />;
  }

  const { currentUser } = profileDetails;

  return (
    <div className="container">
      {profileDetails.userReady ? (
        <div>
          <header className="jumbotron">
            <h3>
              Username: <strong>{currentUser.username}</strong>
            </h3>
            {currentUser.id}
            <p>
              <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}
              {currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>FirstName:</strong> {currentUser.firstname}
            </p>
            <p>
              <strong>LastName:</strong> {currentUser.lastname}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </header>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
