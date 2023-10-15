import {
  Badge,
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RootState, useAppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { signOut } from "../../redux/user/slice";
import { clear } from "../../redux/cart/slice";
import SearchBox from "../SearchBox";

type TProps = {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (isOpen: boolean) => void;
};

const Header: React.FC<TProps> = ({ sidebarIsOpen, setSidebarIsOpen }) => {
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    isMounted.current = true;
  }, [cartItems]);

  const singoutHandler = () => {
    dispatch(signOut());
    dispatch(clear());
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userShippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/singin";
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className="header-logo">
          <Button
            variant="dark"
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          >
            <i className="fas fa-bars"></i>
          </Button>
          <LinkContainer to="/">
            <Navbar.Brand>Amazonia</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="me-auto w-100 justify-content-end">
              <Link to="/cart" className="nav-link">
                Cart{" "}
                {cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {user ? (
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <hr className="dropdown-hr" />

                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={singoutHandler}
                  >
                    Sing Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/singin">
                  Sing in
                </Link>
              )}
              {user && user.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
