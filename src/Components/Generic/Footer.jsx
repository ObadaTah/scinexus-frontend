import ASSETS from "../../assets/Assets";
import styles from "./footer.module.css";
function Footer() {
    return (
        <footer
            id="footer"
            className={(styles.background, "row")}
            style={{
                backgroundImage: `url(${ASSETS.footerBackground})`,
            }}
        >
            <div className="col">
                <h1 className={styles.footerHeader}>SciNexus</h1>
                <p className={styles.footerText}>Science Made for Everyone</p>
            </div>
            <img
                id="spine"
                className={(styles.spine, "col")}
                src={ASSETS.spine}
                alt=""
            />
            <div className={styles.lowerSection}>
                <p>© 2021 - All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
