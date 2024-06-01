const fieldOfWorkOptions = [
  "Accounting",
  "Aerospace Engineering",
  "Agriculture",
  "Anthropology",
  "Architecture",
  "Artificial Intelligence",
  "Astrophysics",
  "Biochemistry",
  "Biology",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computer Science",
  "Cybersecurity",
  "Dentistry",
  "Economics",
  "Education",
  "Electrical Engineering",
  "Environmental Science",
  "Finance",
  "Genetics",
  "Geology",
  "Graphic Design",
  "History",
  "Human Resources",
  "Information Technology",
  "International Relations",
  "Journalism",
  "Law",
  "Linguistics",
  "Management",
  "Marketing",
  "Mathematics",
  "Mechanical Engineering",
  "Medicine",
  "Neuroscience",
  "Nursing",
  "Occupational Therapy",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Political Science",
  "Psychology",
  "Public Health",
  "Robotics",
  "Social Work",
  "Sociology",
  "Software Engineering",
  "Statistics",
  "Supply Chain Management",
  "Telecommunications",
  "Urban Planning",
  "Veterinary Medicine",
  "Web Development",
  "Actuarial Science",
  "Advertising",
  "Agronomy",
  "Anatomy",
  "Animal Science",
  "Anthropometry",
  "Aquaculture",
  "Arboriculture",
  "Archaeology",
  "Art",
  "Astronomy",
  "Astrobiology",
  "Astrogeology",
  "Astrology",
  "Bioinformatics",
  "Biomechanics",
  "Biophysics",
  "Botany",
  "Cartography",
  "Ceramics",
  "Climatology",
  "Cognitive Science",
  "Criminology",
  "Cryptography",
  "Dermatology",
  "Ecology",
  "Embryology",
  "Entomology",
  "Epidemiology",
  "Ethnography",
  "Ethology",
  "Forensic Science",
  "Genomics",
  "Gerontology",
  "Horticulture",
  "Hydrology",
  "Immunology",
  "Kinesiology",
  "Lepidopterology",
  "Meteorology",
  "Microbiology",
  "Mycology",
  "Nanotechnology",
  "Oceanography",
  "Ornithology",
  "Paleontology",
  "Parapsychology",
  "Pharmacology",
  "Photography",
  "Radiology",
  "Semiotics",
  "Sociobiology",
  "Speleology",
  "Taxonomy",
  "Toxicology",
  "Urology",
  "Virology",
  "Zoology",
];
import AuthPagesHeader from "../../Components/Generic/AuthPagesHeader";
import styles from "../../Components/Generic/Register.module.css";
import st from "../../Components/Generic/RegisterAcademicStep3.module.css";
import { useEffect, useState } from "react";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Key from "@mui/icons-material/Key";
import { Link } from "react-router-dom";
import Textarea from "@mui/joy/Textarea";
const excludedCountries = ["US", "CA", "AU"]; // Example of countries to exclude
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Autocomplete from "@mui/joy/Autocomplete";
import CircularProgress from "@mui/joy/CircularProgress";
import EmailConfirmation from "./EmailConfirmation";
import Alert from "@mui/joy/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCricleIcon from "@mui/icons-material/CheckCircle";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
const schema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
      "Phone number is not valid"
    ),
  // ...other fields
});
function RegisterStep3({
  step,
  setStep,
  role,
  email,
  isClicked,
  setIsClicked,
  username,
  setUsername,
  bio,
  setBio,
  badge,
  setBadge,
  isInputFocused,
  setIsInputFocused,
  phoneNumber,
  setPhoneNumber,

  isEducationMenuLoading,
  setIsEducationMenuLoading,
  isEducationMenuOpen,
  setEducationMenuOpen,
  isFieldOfWorkMenuOpen,
  setFieldOfWorkMenuOpen,
  isFieldOfWorkMenuLoading,
  setIsFieldOfWorkMenuLoading,
  fieldOfWork,
  setFieldOfWork,
  educationValue,
  setEducationValue,
  children,
}) {
  const minLength = 12;

  const [education, setEducation] = useState("");

  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handleChange = (newphoneNumber) => {
    setPhoneNumber(newphoneNumber);
  };
  const inputStyle = {
    "--Input-radius": "3px",
    height: "50px",
  };

  useEffect(() => {
    setIsPhoneValid(schema.isValidSync({ phoneNumber }));
  }, [phoneNumber]);
  console.log(isPhoneValid);
  // Example of countries to exclude
  const url = `http://universities.hipolabs.com/search?name=${educationValue}&limit=10`;

  useEffect(() => {
    async function fetchEducation() {
      setIsEducationMenuLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setEducation(data);
        setIsEducationMenuLoading(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchEducation(); // Call the fetchEducation function
  }, [educationValue]); // Ensure the dependency array is closed properly

  function handleSubmit(event) {
    event.preventDefault();
    setUsername(username);
    setBadge(badge);
    setBio(bio);
    setPhoneNumber(phoneNumber);
    setEducation(education);
    setFieldOfWork(fieldOfWork);
    setIsClicked(true);
  }

  console.log(step);

  return (
    <div className={styles.container}>
      <main
        className={styles.main}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
          backgroundColor: "#ffffff",
        }}
      >
        <AuthPagesHeader
          bgColor={"#ffffff"}
          style={{
            backgroundColor: "#ffffff",
          }}
        />

        <form
          className={styles.form}
          style={{
            bgcolor: "#ffffff",
          }}
          onSubmit={handleSubmit}
        >
          <Stack spacing={2} direction="column">
            <div>
              <label htmlFor="username">Username</label>
              <Input
                placeholder="Username"
                required
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                sx={{
                  ...inputStyle,
                  width: "100%",
                  backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                  transition: "background-color 0.2s ease-in-out",
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </div>

            <div>
              <label htmlFor="badge">Badge</label>
              <Input
                placeholder="Badge"
                required
                name="badge"
                value={badge}
                onChange={(event) => setBadge(event.target.value)}
                sx={{
                  ...inputStyle,
                  width: "100%",
                  backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                  transition: "background-color 0.2s ease-in-out",
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </div>
            <div>
              <label htmlFor="bio">Bio</label>
              <Textarea
                placeholder="Bio"
                required
                name="bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                sx={{
                  ...inputStyle,
                  width: "100%",
                  height: "100px",
                  backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                  transition: "background-color 0.2s ease-in-out",
                  textAlign: "top", // Align text to the top
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </div>

            <label htmlFor="PhoneNumber">Phone Number</label>
            <MuiTelInput
              required
              name="PhnoneNumber"
              className={isInputFocused ? st.phoneInput : st.phoneInputFocused}
              excludedCountries={["IL"]}
              defaultCountry="PS"
              value={phoneNumber}
              onChange={handleChange}
            />
            {phoneNumber.length >= 1 && !isPhoneValid && (
              <Alert
                sx={{ height: "40px", fontSize: "10px" }}
                variant={"soft"}
                color="warning"
                startDecorator={<WarningIcon />}
              >
                Phone Number is not valid.
              </Alert>
            )}
            {phoneNumber.length >= 1 && isPhoneValid && (
              <Alert
                sx={{ height: "40px", fontSize: "10px" }}
                variant={"soft"}
                color="success"
                startDecorator={<CheckCricleIcon />}
              >
                Phone Number is valid.
              </Alert>
            )}

            {role === "ACADEMIC" && (
              <FormControl id="asynchronous-demo" className={st.formControl}>
                <div>
                  <FormLabel>Education</FormLabel>
                  <Autocomplete
                    required
                    sx={{
                      height: "50px",
                      backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                    }}
                    placeholder="Type To Search Education"
                    open={isEducationMenuOpen}
                    onOpen={() => {
                      setEducationMenuOpen(true);
                    }}
                    onClose={() => {
                      setEducationMenuOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    getOptionLabel={(education) => education.name}
                    options={education}
                    loading={isEducationMenuLoading}
                    onInputChange={(event, value) => setEducationValue(value)}
                    endDecorator={
                      isEducationMenuLoading ? (
                        <CircularProgress
                          size="sm"
                          sx={{ bgcolor: "background.surface" }}
                        />
                      ) : null
                    }
                  />
                </div>
              </FormControl>
            )}
            <FormControl id="asynchronous-demo1" className={st.formControl}>
              <div>
                <FormLabel>Field Of Work</FormLabel>
                <Autocomplete
                  required
                  sx={{
                    height: "50px",
                    backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                  }}
                  placeholder="Type To Search Field Of Work"
                  open={isFieldOfWorkMenuOpen}
                  onOpen={() => {
                    setFieldOfWorkMenuOpen(true);
                  }}
                  onClose={() => {
                    setFieldOfWorkMenuOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  getOptionLabel={(option) => option}
                  options={fieldOfWorkOptions}
                  loading={isFieldOfWorkMenuLoading}
                  onInputChange={(event, value) => setFieldOfWork(value)}
                  endDecorator={
                    isFieldOfWorkMenuLoading ? (
                      <CircularProgress
                        size="sm"
                        sx={{ bgcolor: "background.surface" }}
                      />
                    ) : null
                  }
                />
              </div>
            </FormControl>
          </Stack>
          <div></div>

          <div className={styles.footer}>
            <Button
              onClick={() => {
                setStep((step) => step - 1);
              }}
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
              disabled={!isPhoneValid}
            >
              Sign Up
            </Button>
          </div>
          {children}
          <EmailConfirmation
            email={email}
            open={isClicked}
            setOpen={setIsClicked}
          />
        </form>
      </main>
    </div>
  );
}

export default RegisterStep3;
