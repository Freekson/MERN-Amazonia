import { Container } from "react-bootstrap";
import Header from "../Header";

type TProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column site-container">
      <Header />
      <Container>
        <main className="main">{children}</main>
        <footer className="text-center footer">All rigths reserved</footer>
      </Container>
      <></>
    </div>
  );
};

export default Layout;
