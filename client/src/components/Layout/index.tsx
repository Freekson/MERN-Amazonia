import Header from "../Header";
import styles from "./Layout.module.scss";

type TProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Layout;
