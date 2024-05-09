import { Header } from "antd/es/layout/layout";
import styles from "./AuthPagesHeader.module.css";
function AuthPagesHeader() {
  return (
    <Header className={styles.header}>
      <h1>SCINEXUS</h1>
    </Header>
  );
}

export default AuthPagesHeader;
