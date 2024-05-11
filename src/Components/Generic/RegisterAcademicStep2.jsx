import AuthPagesHeader from "./AuthPagesHeader";
import styles from "./RegisterAcademicStep2.module.css";
import styles2 from "./Register.module.css";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import Button from "@mui/joy/Button";
const occupationOptions = [
  {
    label: "Academic researcher",
    value: "ACADEMIC",
    src: "/academic.png", // Corrected path
    alt: "Academic researcher",
  },
  {
    label: "Academic faculty member",
    value: "ACADEMIC",
    src: "/book.png", // Corrected path
    alt: "Academic faculty member",
  },
  {
    label: "Retired academic",
    value: "ACADEMIC",
    src: "/knowledge.png", // Corrected path
    alt: "Retired academic",
  },
  {
    label: "Self-employed professional",
    value: "ACADEMIC",
    src: "/research-paper.png", // Corrected path
    alt: "Self-employed professional",
  },
  {
    label: "Academic affiliated with an organization",
    value: "ORGANIZATION",
    src: "/research.png", // Corrected path
    alt: "Academic affiliated with an organization",
  },
];

function RegisterAcademicStep2() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  console.log(selectedOption);
  return (
    <>
      <AuthPagesHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <Typography level="h2">Questions to Create your profile</Typography>
          <br />
          <Typography level="h3">What is your occupation?</Typography>

          <ul className={styles.optionContainer}>
            {occupationOptions.map((option, index) => (
              <OccupationOptionCard
                key={index}
                label={option.label}
                isSelected={selectedOption === index}
                onSelect={() => handleOptionSelect(index)}
                img={option.src}
                alt={option.alt}
              />
            ))}
          </ul>

          <Button size="lg" disabled={!selectedOption}>
            Next &rarr;
          </Button>
        </div>
      </main>
    </>
  );
}

function OccupationOptionCard({ label, isSelected, onSelect, img, alt }) {
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

export default RegisterAcademicStep2;
