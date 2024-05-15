import FirstRegistrationStep from "../../Components/Generic/FirstRegistrationStep";
import { useState } from "react";
import Register from "./Register";
import RegisterAcademicStep2 from "../../Components/Generic/RegisterAcademicStep2";
import RegisterAcademicStep3 from "../../Components/Generic/RegisterAcademicStep3";
import RegisterOrganizationStep2 from "../../Components/Generic/RegisterOrganizationStep2";
import RegisterOrganizationStep3 from "../../Components/Generic/RegisterOrganizationStep3";
import EmailConfirmation from "../../Components/Generic/EmailConfirmation";
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

  const [education, setEducation] = useState([]);
  const [isEducationMenuLoading, setIsEducationMenuLoading] = useState(false);
  const [isEducationMenuOpen, setEducationMenuOpen] = useState(false);
  useState(false);

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
    console.log("education:", education);
    console.log("isClicked:", isClicked);
  }

  return (
    <div>
      {step === 1 && (
        <FirstRegistrationStep
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
      {step === 3 && role === "ACADEMIC" && (
        <RegisterAcademicStep2 step={step} setStep={setStep} />
      )}
      {step === 3 && role === "ORGANIZATION" && (
        <RegisterOrganizationStep2 step={step} setStep={setStep} />
      )}
      {step === 4 && role === "ACADEMIC" && (
        <RegisterAcademicStep3
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
          education={education}
          setEducation={setEducation}
          isEducationMenuLoading={isEducationMenuLoading}
          setIsEducationMenuLoading={setIsEducationMenuLoading}
          isEducationMenuOpen={isEducationMenuOpen}
          setEducationMenuOpen={setEducationMenuOpen}
          isFieldOfWorkMenuOpen={isFieldOfWorkMenuOpen}
          setFieldOfWorkMenuOpen={setFieldOfWorkMenuOpen}
          isFieldOfWorkMenuLoading={isFieldOfWorkMenuLoading}
          setIsFieldOfWorkMenuLoading={setIsFieldOfWorkMenuLoading}
        />
      )}
      {step === 4 && role === "ORGANIZATION" && (
        <RegisterOrganizationStep3
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
          isFieldOfWorkMenuOpen={isFieldOfWorkMenuOpen}
          setFieldOfWorkMenuOpen={setFieldOfWorkMenuOpen}
          isFieldOfWorkMenuLoading={isFieldOfWorkMenuLoading}
          setIsFieldOfWorkMenuLoading={setIsFieldOfWorkMenuLoading}
        />
      )}
    </div>
  );
}

export default RegistrationProcess;
