import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Amazonia</Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
