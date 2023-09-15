import { Container } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./Layout.module.scss";

type TProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <div className={styles.site_container}>
      <Header />
      <Container className={styles.main}>
        <main>{children}</main>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
