import AuthPagesHeader from "./AuthPagesHeader";
import styles from "./RegisterStep2.module.css";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import Button from "@mui/joy/Button";

function RegisterStep2({
  role,
  academicOptions,
  organizationOptions,
  step,
  setStep,
  selectedOption,
  setSelectedOption,
  position,
  setPosition,
  oAuthProvider,
}) {
  const [occupationOptions, setOccupationOptions] = useState([]);

  useEffect(() => {
    if (role === "ACADEMIC") {
      setOccupationOptions(academicOptions);
    } else if (role === "ORGANIZATION") {
      setOccupationOptions(organizationOptions);
    }
  }, [role, academicOptions, organizationOptions]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setPosition(occupationOptions[option].value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AuthPagesHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <Typography className={styles.typography} level="h2">
            Questions to Create your profile
          </Typography>
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

          <div className={styles.footer}>
            <Button
              onClick={() =>
                setStep((step) => (oAuthProvider ? step - 2 : step - 1))
              }
              sx={{
                width: "100px",
                borderRadius: "3px",
                backgroundColor: "white",
                color: "#e60b2f",
                border: "1px solid #e60b2f",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#e60b2f",
                  border: "1px solid #e60b2f",
                },
              }}
            >
              &larr; Back
            </Button>
            <Button
              type="submit"
              sx={{ width: "100px", borderRadius: "3px" }}
              onClick={() => setStep((step) => step + 1)}
            >
              Next &rarr;
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function OccupationOptionCard({ label, isSelected, onSelect, img, alt }) {
  return (
    <li
      className={`${styles.option} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
      role="button"
      tabIndex="0"
      aria-pressed={isSelected}
    >
      <img src={img} alt={alt} style={{ width: "40px", height: "40px" }} />
      <Typography>{label}</Typography>
    </li>
  );
}

export default RegisterStep2;
