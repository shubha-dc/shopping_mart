import React from "react";
import { useHistory } from "react-router-dom";

const menuItemsOptions = [
  { text: "Add Product" },
  { text: "Get Product" },
  { text: "Update Product" },
  { text: "Delete Product" },
];

function MenuContainer() {
  const [activeItem, setActiveItem] = React.useState("");
  const [activeItemPos, setActiveItemPos] = React.useState(0);
  const [activeItemColor, setActiveItemColor] = React.useState("");
  const history = useHistory();

  const createClickHandler = (activeItem) => (e) => {
    e.preventDefault();

    setActiveItem(activeItem);
    setActiveItemPos(document.getElementById(activeItem).offsetTop);
    setActiveItemColor(
      window
        .getComputedStyle(document.getElementById(activeItem))
        .getPropertyValue("background-color")
    );
    switch (activeItem) {
      case "Add Product":
        history.push("/addProduct");
        window.location.reload();
        break;
      case "Update Product":
        history.push("/updateProduct");
        window.location.reload();
        break;
      case "Delete Product":
        history.push("/deleteProduct");
        window.location.reload();
        break;
      case "Get Product":
        history.push("/getProduct");
        window.location.reload();
        break;
    }
  };

  const menuItems = menuItemsOptions.map((item) => (
    <MenuItem item={item} createClickHandler={createClickHandler} />
  ));

  return (
    <div className="menu-container">
      <span
        className="menu-item--active"
        style={{ top: activeItemPos, backgroundColor: activeItemColor }}
      />
      {menuItems}
    </div>
  );
}

///////////////////
// MenuItem      //
///////////////////
function MenuItem({ createClickHandler, item }) {
  const clickHandler = createClickHandler(item.text);

  return (
    <div className="menu-item" id={item.text} onClick={clickHandler}>
      {item.text.toUpperCase()}
    </div>
  );
}

export default MenuContainer;
