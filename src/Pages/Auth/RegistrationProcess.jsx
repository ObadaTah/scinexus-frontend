import FirstRegistrationStep from "../../Components/Generic/FirstRegistrationStep";
import { useEffect, useState } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

import RegisterStep3 from "../../Components/Generic/RegisterStep3";
import RegisterStep2 from "../../Components/Generic/RegisterStep2";
import Alert from "@mui/joy/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import { useSearchParams } from "react-router-dom";
const academicOptions = [
  {
    label: "Academic researcher",
    value: "RESEARCHER",
    src: "/academic.png",
    alt: "Academic researcher",
  },
  {
    label: "Academic faculty member",
    value: "PROFESSOR",
    src: "/book.png",
    alt: "Academic faculty member",
  },
  {
    label: "Retired academic",
    value: "POSTDOC",
    src: "/knowledge.png",
    alt: "Retired academic",
  },
  {
    label: "Self-employed professional",
    value: "LECTURER",
    src: "/research-paper.png",
    alt: "Self-employed professional",
  },
  {
    label: "Academic affiliated with an organization",
    value: "ASSOCIATE_PROFESSOR",
    src: "/research.png",
    alt: "Academic affiliated with an organization",
  },
  {
    label: "Graduate student",
    value: "GRADUATE_STUDENT",
    src: "/graduation-cap.png", // Assuming you have an image for graduate student
    alt: "Graduate student",
  },
  {
    label: "Undergraduate student",
    value: "UNDERGRADUATE_STUDENT",
    src: "/undergraduate.png", // Assuming you have an image for undergraduate student
    alt: "Undergraduate student",
  },
];
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

const BACKEND_AUTHENTICATION_URL = "http://localhost:8080/api/v1/auth";
function RegistrationProcess() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [badge, setBadge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFieldOfWorkMenuOpen, setFieldOfWorkMenuOpen] = useState(false);
  const [isFieldOfWorkMenuLoading, setIsFieldOfWorkMenuLoading] =
    useState(false);
  const [fieldOfWork, setFieldOfWork] = useState("");
  const [educationValue, setEducationValue] = useState("");

  const [education, setEducation] = useState([]);
  const [isEducationMenuLoading, setIsEducationMenuLoading] = useState(false);
  const [isEducationMenuOpen, setEducationMenuOpen] = useState(false);
  useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [position, setPosition] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [oAuthProvider, setoAuthProvider] = useState("");

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const nameParam = params.get("name");
    if (nameParam) {
      const combinedName = decodeURIComponent(nameParam).split(" ");
      setEmail(decodeURIComponent(params.get("email") || ""));
      setFirstName(combinedName[0] || "");
      setLastName(combinedName[1] || "");
      setoAuthProvider(decodeURIComponent(params.get("provider") || ""));
    }
  }, [params]);

  console.log(
    "email " + email,
    "first name " + firstName,
    "lastName" + lastName,
    "provider " + oAuthProvider
  );

  if (isClicked) {
    console.log("role:", role);
    console.log("firstName:", firstName);
    console.log("lastName:", lastName);
    console.log("password:", password);
    console.log("username:", username);
    console.log("email:", email);
    console.log("badge:", badge);
    console.log("bio:", bio);
    console.log("phoneNumber:", phoneNumber);
    console.log("step:", step);
    console.log("fieldOfWork:", fieldOfWork);
    console.log("education:", educationValue);
    console.log("position:", position);
  }

  useEffect(() => {
    if (!isClicked) return;

    let registerEndpoint = `${BACKEND_AUTHENTICATION_URL}`;
    console.log(
      "OAuth provider is " +
        (oAuthProvider === "github" || oAuthProvider === "google")
    );
    if (oAuthProvider === "github" || oAuthProvider === "google") {
      registerEndpoint = `${BACKEND_AUTHENTICATION_URL}/oauth2/register`;
    } else {
      registerEndpoint = `${BACKEND_AUTHENTICATION_URL}/register`;
    }

    console.log("this is register endp oint " + registerEndpoint);
    async function registerUser() {
      const response = await fetch(registerEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
          bio,
          phoneNumber,
          fieldOfWork,
          role,
          educationValue,
          badge,
          position,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/login", { replace: true });
      } else {
        setIsClicked(false);

        if (data.message == "Vaildation Constraint Violation") {
          console.log("Hello");
          const validationErrorMessages = Object.entries(data.validationError)
            .map(
              ([field, errors]) =>
                `${field.charAt(0).toUpperCase() + field.slice(1)}: ${
                  Array.isArray(errors) ? errors.join(". ") : errors
                }.`
            )
            .join("\n");
          console.log(validationErrorMessages);

          setResponseMessage(`${data.message}:\n${validationErrorMessages}`);
        } else {
          setResponseMessage(data.message.substring(0, 100));
        }
      }
    }
    registerUser();
  });

  return (
    <div>
      {step === 1 && (
        <FirstRegistrationStep
          oAuthProvider={oAuthProvider}
          step={step}
          setStep={setStep}
          selectedOption={role}
          setSelectedOption={setRole}
        />
      )}
      {step === 2 && (
        <Register
          step={step}
          setStep={setStep}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isInputFocused={isInputFocused}
          setIsInputFocused={setIsInputFocused}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      )}

      {step === 3 && (
        <RegisterStep2
          role={role}
          academicOptions={academicOptions}
          organizationOptions={organizationOptions}
          step={step}
          setStep={setStep}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          position={position}
          setPosition={setPosition}
        />
      )}
      {/* {step === 3 && role === "ORGANIZATION" && (
        <RegisterStep2
          occupationOptions={organizationOptions}
          step={step}
          setStep={setStep}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )} */}

      {step === 4 && (
        <RegisterStep3
          educationValue={educationValue}
          setEducationValue={setEducationValue}
          step={step}
          setStep={setStep}
          role={role}
          fieldOfWork={fieldOfWork}
          setFieldOfWork={setFieldOfWork}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          email={email}
          username={username}
          setUsername={setUsername}
          bio={bio}
          setBio={setBio}
          badge={badge}
          setBadge={setBadge}
          isInputFocused={isInputFocused}
          setIsInputFocused={setIsInputFocused}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isEducationMenuLoading={isEducationMenuLoading}
          setIsEducationMenuLoading={setIsEducationMenuLoading}
          isEducationMenuOpen={isEducationMenuOpen}
          setEducationMenuOpen={setEducationMenuOpen}
          isFieldOfWorkMenuOpen={isFieldOfWorkMenuOpen}
          setFieldOfWorkMenuOpen={setFieldOfWorkMenuOpen}
          isFieldOfWorkMenuLoading={isFieldOfWorkMenuLoading}
          setIsFieldOfWorkMenuLoading={setIsFieldOfWorkMenuLoading}
        >
          {responseMessage && (
            <Alert
              sx={{ minHeight: "40px", fontSize: "10px" }}
              variant={"soft"}
              color="danger"
              startDecorator={<WarningIcon />}
            >
              {responseMessage}
            </Alert>
          )}
        </RegisterStep3>
      )}
    </div>
  );
}

export default RegistrationProcess;
