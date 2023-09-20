import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Header: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    isMounted.current = true;
  }, [cartItems]);
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
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
