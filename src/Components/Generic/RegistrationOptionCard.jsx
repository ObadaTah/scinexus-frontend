import styles from "./RegisterAcademicStep2.module.css";
import Typography from "@mui/joy/Typography";

function RegistrationOptionCard({ label, isSelected, onSelect, img, alt }) {
  return (
    <li
      className={`${styles.option} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <img src={img} alt={alt} style={{ width: "40px", height: "40px" }} />
      <Typography>{label}</Typography>
    </li>
  );
}
export default RegistrationOptionCard;
