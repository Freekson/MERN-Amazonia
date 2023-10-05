import { Badge, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RootState, useAppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { signOut } from "../../redux/user/slice";

const Header: React.FC = () => {
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
    localStorage.removeItem("user");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Amazonia</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
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
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
