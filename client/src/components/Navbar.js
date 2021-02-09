import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { AppContext } from "../context/globalContext";

const NavbarComponent = () => {
  const cart = useContext(CartContext);
  const app = useContext(AppContext);

  const cartState = cart[0];
  const cartDispatch = cart[1];

  const appState = app[0];
  const appDispatch = app[1];

  console.log({
    cartState,
  });

  const handleLogOut = () => {
    appDispatch({
      type: "LOGOUT",
    });
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Dumbways.id {appState.user.email}
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link to="/home" as={Link}>
          Home
        </Nav.Link>
        <Nav.Link to="/cart" as={Link} className="font-weight-bold text-white">
          Cart | {cartState.carts.length}
        </Nav.Link>
        <Nav.Link to="/post" as={Link}>
          Post
        </Nav.Link>
        <Nav.Link to="/post-react-query" as={Link}>
          Post React-Query
        </Nav.Link>
        <Nav.Link to="/post-multer" as={Link}>
          Post Multer
        </Nav.Link>
        <Nav.Link onClick={handleLogOut}>LogOut</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
