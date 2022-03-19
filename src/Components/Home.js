import React, { useState, useEffect } from "react";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";

import UserService from "../services/user.service";
import SimpleImageSlider from "react-simple-image-slider";
import Product from "./Product";

let folderName = "sliderimages/";
const images = [
  { url: folderName + "fruits.jpg" },
  { url: folderName + "grocery.jpg" },
  { url: folderName + "dairy.jpg" },
  { url: folderName + "slider.jpg" },
  { url: folderName + "slider2.jpg" },
  { url: folderName + "slider3.jpg" },
];

function Home() {
  const [content, setContent] = useState("");

  const [products, setProducts] = useState([]);

  const [inputSearchValue, setinputSearchValue] = useState("");

  const [filterFlag, setfilterFlag] = useState();

  let [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    UserService.getProducts()
      .then((response) => {
        setProducts(response.data);
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

  const onChangeSearchBar = (e) => {
    setinputSearchValue(e.target.value);
  };

  const filterSubmitHandler = (e) => {
    e.preventDefault();
    console.log("on change search bar value is " + inputSearchValue);
    setFilteredProducts(
      products.filter((product) => {
        return product.productname
          .toLowerCase()
          .includes(inputSearchValue.toLowerCase());
      })
    );

    console.log("filteredItems" + filteredProducts);
    setfilterFlag(true);
    if (inputSearchValue === "") {
      console.log("inside false if");
      setfilterFlag(false);
    }
  };

  return (
    <div className="jumbotron">
      <div>
        <SimpleImageSlider
          showNavs="true"
          showBullets="true"
          width={1050}
          height={350}
          images={images}
          slideDuration={1.0}
        />
      </div>
      <br></br>
      <form onSubmit={filterSubmitHandler}>
        <div class="form-inline">
          <div class="form-group mb-2">
            <label class="form-control-plaintext">
              <b>Search by Name</b>
            </label>
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <input
              onChange={onChangeSearchBar}
              className="form-control"
              for="search"
              type="text"
            />
          </div>
          <br></br>
          <button type="submit" class="btn btn-primary mb-2">
            search
          </button>
        </div>
      </form>
      <div className="products">
        {!filterFlag ? (
          products.length ? (
            products.map((product) => (
              <Product
                key={product.id}
                productId={product.id}
                productname={product.productname}
                brand={product.brand}
                imageFileName={product.imageFileName}
                price={product.price}
                description={product.description}
                originalQuantity={product.quantity}
              />
            ))
          ) : (
            <div className="jumbotron">
              <h1>NO products found</h1>
            </div>
          )
        ) : filteredProducts.length ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              productId={product.id}
              productname={product.productname}
              brand={product.brand}
              imageFileName={product.imageFileName}
              price={product.price}
              description={product.description}
              originalQuantity={product.quantity}
            />
          ))
        ) : (
          <div className="jumbotron">
            {console.log(filteredProducts)}
            <h1>filtered product not available</h1>
            <h1>NO products found</h1>
          </div>
        )}

        {content.message}
      </div>
    </div>
  );
}

export default Home;
