import AuthPagesHeader from "./AuthPagesHeader";
import styles from "./RegisterStep2.module.css";
import styles2 from "./Register.module.css";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import Button from "@mui/joy/Button";

import RegistrationOptionCard from "./RegistrationOptionCard";

function FirstRegistrationStep({
  step,
  setStep,
  selectedOption,
  setSelectedOption,
  oAuthProvider,
}) {
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  function incrementStep() {
    console.log("provider is " + oAuthProvider);
    if (oAuthProvider === "google" || oAuthProvider === "github")
      setStep((step) => 3);
    else setStep((step) => 2);
  }
  return (
    <>
      <main className={styles.main}>
        <AuthPagesHeader />
        <div className={styles.container}>
          <Typography level="h2">Create your profile</Typography>
          <br />
          <Typography level="h3">
            What best describes you or your affiliation?
          </Typography>

          <ul className={styles.optionContainer}></ul>
          <RegistrationOptionCard
            label="Academic"
            isSelected={selectedOption === "ACADEMIC"}
            onSelect={() => handleOptionSelect("ACADEMIC")}
            img="/knowledge.png"
            alt="Academic researcher"
          />
          <RegistrationOptionCard
            label="Organization"
            isSelected={selectedOption === "ORGANIZATION"}
            onSelect={() => handleOptionSelect("ORGANIZATION")}
            img="/organization.png"
            alt="Academic researcher"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ width: "100px", borderRadius: "3px" }}
              disabled={!selectedOption}
              onClick={incrementStep}
            >
              Next &rarr;
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default FirstRegistrationStep;
