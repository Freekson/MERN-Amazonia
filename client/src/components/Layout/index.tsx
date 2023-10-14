import { Container, Nav } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./Layout.module.scss";
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { getError } from "../../utils/getError";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchCategories } from "../../redux/category/slice";
import { useSelector } from "react-redux";

type TProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TProps> = ({ children }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state.category);
  categories.map((item) => console.log(item));

  useEffect(() => {
    try {
      dispatch(fetchCategories());
    } catch (err) {
      console.log(getError(err));
    }
  }, [dispatch]);
  return (
    <div
      className={
        sidebarIsOpen ? styles.active_container : styles.site_container
      }
    >
      <Header
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <div
        className={
          sidebarIsOpen
            ? "active_nav side_navbar d-flex justify-content-between flex-wrap flex-column"
            : "side_navbar d-felx justify-content-between flex-wrap flex-column"
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong className="mt-3">Categories</strong>
          </Nav.Item>
          {categories.map((item, index) => (
            <Nav.Item key={index}>
              <LinkContainer
                to={{
                  pathname: "/search",
                  search: `?category=${item}`,
                }}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>{String(item)}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <Container className={styles.main}>
        <main>{children}</main>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
