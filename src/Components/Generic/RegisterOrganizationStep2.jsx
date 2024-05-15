import AuthPagesHeader from "./AuthPagesHeader";
import styles from "./RegisterAcademicStep2.module.css";
import styles2 from "./Register.module.css";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import Button from "@mui/joy/Button";
const organizationOptions = [
  {
    label: "Business",
    value: "BUSINESS",
    src: "/business.png", // Assuming you have an image for business
    alt: "Business",
  },
  {
    label: "Non Profit ",
    value: "NON_PROFIT",
    src: "/ngo.png", // Assuming you have an image for non-profit
    alt: "Non-Profit",
  },
  {
    label: "Educational",
    value: "EDUCATIONAL",
    src: "/educational.png", // Assuming you have an image for educational
    alt: "Educational",
  },
  {
    label: "Governmental",
    value: "GOVERNMENT",
    src: "/government.png", // Assuming you have an image for government
    alt: "Government",
  },
  {
    label: "Professional Association",
    value: "PROFESSIONAL_ASSOCIATION",
    src: "/professional-association.png", // Assuming you have an image for professional association
    alt: "Professional Association",
  },
  {
    label: "Community Group",
    value: "COMMUNITY_GROUP",
    src: "/community-group.png", // Assuming you have an image for community group
    alt: "Community Group",
  },
  {
    label: "Media",
    value: "MEDIA",
    src: "/media.png", // Assuming you have an image for media
    alt: "Media",
  },
  {
    label: "Religious",
    value: "RELIGIOUS",
    src: "/religious.png", // Assuming you have an image for religious
    alt: "Religious",
  },
  {
    label: "Sports",
    value: "SPORTS",
    src: "/sports.png", // Assuming you have an image for sports
    alt: "Sports",
  },
];

function RegisterOrganizationStep2({ step, setStep }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  function incrementStep() {
    setStep((step) => 4);
  }
  console.log(selectedOption);
  return (
    <>
      <AuthPagesHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <Typography level="h2">Questions to Create your profile</Typography>
          <br />
          <Typography level="h3">What is your organization Types?</Typography>

          <ul className={styles.optionContainer}>
            {organizationOptions.map((option, index) => (
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

          <Button
            size="lg"
            disabled={!selectedOption == null}
            onClick={incrementStep}
          >
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

export default RegisterOrganizationStep2;
