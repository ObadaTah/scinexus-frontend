import { Header } from "antd/es/layout/layout";
import styles from "./AuthPagesHeader.module.css";

import Logo from "/src/assets/svg/logoText.svg"; // Correct import

function AuthPagesHeader({ bgColor, paddingBottom }) {
  return (
    <Header
      className={styles.header}
      style={{ backgroundColor: bgColor, paddingBottom: paddingBottom }}
    >
      <div>
        <img src={Logo} alt="logo" className={styles.logo} />
      </div>
    </Header>
  );
}

export default AuthPagesHeader;
