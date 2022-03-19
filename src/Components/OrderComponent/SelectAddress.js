import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/user.service";

import { useHistory } from "react-router-dom";

function SelectAddress() {
  const [addresses, setaddresses] = useState([]);
  const [setAddress, setsetAddress] = useState();
  const history = useHistory();

  useEffect(() => {
    userService
      .getUserAddresses()
      .then((response) => {
        setaddresses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      });
  }, []);

  const addressSelectorHandler = (id) => {
    console.log("Parent property" + id);
    setsetAddress(id);
    localStorage.setItem("addressId", id);
  };

  return (
    <div className="jumbotron">
      {addresses.length ? (
        <div>
          <h2>Please select the Required Address</h2>
          <table className="table">
            <tbody>
              {addresses.map((address) => (
                <AddressTable
                  id={address.id}
                  firstname={address.firstname}
                  lastname={address.lastname}
                  useraddress={address.address}
                  pincode={address.pincode}
                  mobileNumber={address.mobileNumber}
                  alternateContactNumber={address.alternateContactNumber}
                  addressSelector={addressSelectorHandler}
                ></AddressTable>
              ))}
            </tbody>
          </table>
          <button onClick={() => history.goBack()}>SELECT ADDRESS</button>
        </div>
      ) : (
        <div>
          <h1>Unable to find any addres please add new address</h1>
          <Link to="/ordersummary/addAddress">Add new Address</Link>
        </div>
      )}
    </div>
  );
}

export default SelectAddress;

const AddressTable = (props) => {
  const [selectedAddress, setselectedAddress] = useState({});

  const radioButtonHandler = () => {
    console.log("child prop id" + props.id);
    props.addressSelector(props.id);
  };

  return (
    <tr key={props.id} for={props.id}>
      <td>
        <input
          onChange={radioButtonHandler}
          type="radio"
          value={props.id}
          id={props.id}
        />
        {props.firstname} {props.lastname},<br /> {props.useraddress},<br />
        {props.pincode}
        <br />
        mobileNumber: {props.mobileNumber}
        <br />
        alternate ContactNumber: {props.alternateContactNumber}
      </td>
    </tr>
  );
};
