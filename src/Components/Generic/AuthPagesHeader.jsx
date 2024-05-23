import { Header } from "antd/es/layout/layout";
import styles from "./AuthPagesHeader.module.css";

import Logo from "/src/assets/svg/logo.svg"; // Correct import

function AuthPagesHeader() {
  return (
    <Header className={styles.header}>
      <div>
        <img src={Logo} alt="logo" className={styles.logo} />
      </div>
    </Header>
  );
}

export default AuthPagesHeader;
