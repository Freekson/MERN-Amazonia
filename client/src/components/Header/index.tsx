import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__link}>
        Amazonia
      </Link>
    </header>
  );
};

export default Header;
