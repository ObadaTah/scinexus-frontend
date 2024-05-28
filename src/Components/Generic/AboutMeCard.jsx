import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  IconButton,
  Input,
  Textarea,
  Select,
  Option,
  Alert,
} from "@mui/joy";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LanguageIcon from "@mui/icons-material/Language";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CheckCricleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import { useUser } from "../contexts/UserContext";
import { string } from "yup"; // Import Yup for schema validation
import { useAuth } from "../contexts/AuthContext";

const emailSchema = string()
  .matches(
    /^[a-zA-Z0-9]+[._-]*[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
    "Invalid email address"
  )
  .required();

const phoneSchema = string()
  .matches(
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
    "Phone number is not valid"
  )
  .required();

function AboutMeCard({ userProfile }) {
  const { updateUser } = useUser();

  const user = userProfile || useUser().user;
  const { jwtToken } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [emailValid, setEmailValid] = useState(false); // State for email validation
  const [phoneValid, setPhoneValid] = useState(false); // State for phone validation
  const [onSave, setOnSave] = useState(false); // State for save button
  const [aboutMeData, setAboutMeData] = useState({
    introduction:
      user.bio ||
      "Add an introduction with your research focus and interests to help others understand your work.",
    languages: user.languages || [],
    email: user.contactEmail || "",
    phoneNumber: user.contactPhoneNumber || "",
  });

  useEffect(() => {
    setAboutMeData({
      introduction:
        user.bio ||
        "Add an introduction with your research focus and interests to help others understand your work.",
      languages: user.languages || [],
      email: user.contactEmail || "",
      phoneNumber: user.contactPhoneNumber || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutMeData({
      ...aboutMeData,
      [name]: value,
    });
    if (name === "email") {
      setEmailValid(emailSchema.isValidSync(value));
    } else if (name === "phoneNumber") {
      setPhoneValid(phoneSchema.isValidSync(value));
    }
  };

  const handleLanguageChange = (event, newValue) => {
    setAboutMeData({
      ...aboutMeData,
      languages: newValue,
    });
  };

  const toggleEditMode = () => {
    if (userProfile) return;

    setEditMode(!editMode);
  };

  const handleSave = () => {
    console.log(emailValid, phoneValid);
    if (!emailValid || !phoneValid) {
      return;
    }
    updateUser({
      ...user,
      bio: aboutMeData.introduction,
      languages: aboutMeData.languages,
      contactEmail: aboutMeData.email,
      contactPhoneNumber: aboutMeData.phoneNumber,
    });
    toggleEditMode();
    setOnSave(true);
  };

  useEffect(() => {
    if (!onSave) return;

    async function saveData() {
      try {
        const response = await fetch(`http://localhost:8080/users`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            bio: aboutMeData.introduction,
            languages: aboutMeData.languages,
            contactEmail: aboutMeData.email,
            contactPhoneNumber: aboutMeData.phoneNumber,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("User updated successfully:", data);
        updateUser(data);
        setEditMode(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setOnSave(false);
      }
    }

    saveData();
  }, [onSave, jwtToken, updateUser]);

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "20px auto",
        mt: 4,
        textAlign: "left",
        padding: 2,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            level="h5"
            fontWeight="bold"
            sx={{ color: "primary.main" }}
          >
            About Me
          </Typography>
          {!userProfile && (
            <IconButton variant="outlined" color="primary" size="sm">
              {editMode ? (
                <SaveIcon onClick={handleSave} />
              ) : (
                <EditIcon onClick={toggleEditMode} />
              )}
            </IconButton>
          )}
        </Box>

        <Section
          title="Introduction"
          buttonText="Introduce your research"
          description="Add an introduction with your research focus and interests to help others understand your work."
          content={aboutMeData.introduction}
          editMode={editMode}
          name="introduction"
          placeholder="Enter your introduction"
          handleInputChange={handleInputChange}
          icon={<AddCircleIcon />}
          multiline
          userProfile={userProfile}
        />

        <Section
          title="Languages"
          buttonText="Add your languages"
          description="Make it easier for people to contact you by listing the languages you speak."
          content={aboutMeData.languages}
          editMode={editMode}
          name="languages"
          handleInputChange={handleInputChange}
          handleLanguageChange={handleLanguageChange}
          icon={<LanguageIcon />}
          select
          userProfile={userProfile}
        />

        <Section
          title="Contact Information"
          buttonText="Add your contact information"
          description="Include your email address and phone number so your connections can contact you and track your updates."
          note="Note: Your email address and phone number will only be visible to your mutual followers."
          content={{
            email: aboutMeData.email,
            phoneNumber: aboutMeData.phoneNumber,
          }}
          editMode={editMode}
          name="contactInformation"
          placeholder={{
            email: "Enter your email",
            phoneNumber: "Enter your phone number",
          }}
          handleInputChange={handleInputChange}
          icon={<ContactMailIcon />}
          contact
          userProfile={userProfile}
        />

        {editMode && !emailValid && (
          <Alert
            sx={{ height: "40px", fontSize: "15px" }}
            variant="soft"
            color="warning"
            startDecorator={<WarningIcon />}
          >
            Email is not valid.
          </Alert>
        )}

        {editMode && emailValid && (
          <Alert
            sx={{ height: "40px", fontSize: "15px" }}
            variant="soft"
            color="success"
            startDecorator={<CheckCricleIcon />}
          >
            Email is valid.
          </Alert>
        )}
        {editMode && !phoneValid && (
          <Alert
            sx={{ height: "40px", fontSize: "15px" }}
            variant="soft"
            color="warning"
            startDecorator={<WarningIcon />}
          >
            Phone Number is not valid.
          </Alert>
        )}

        {editMode && phoneValid && (
          <Alert
            sx={{ height: "40px", fontSize: "15px" }}
            variant="soft"
            color="success"
            startDecorator={<CheckCricleIcon />}
          >
            Phone Number is valid.
          </Alert>
        )}

        <Divider sx={{ my: 2, backgroundColor: "primary.main" }} />
      </CardContent>
    </Card>
  );
}

function Section({
  title,
  buttonText,
  description,
  note,
  content,
  icon,
  editMode,
  name,
  placeholder,
  handleInputChange,
  handleLanguageChange,
  multiline,
  select,
  contact,
  userProfile,
}) {
  const isContentEmpty = contact
    ? !content.email && !content.phoneNumber
    : !content.length; // Check for array length for languages

  return (
    <Box mb={2}>
      <Box display="flex" alignItems="center">
        {icon && <Box mr={1}>{icon}</Box>}
        <Typography level="body2" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      {editMode ? (
        <>
          {multiline ? (
            <Textarea
              variant="outlined"
              name={name}
              placeholder={placeholder}
              value={content}
              onChange={handleInputChange}
              minRows={4}
              sx={{ mt: 1 }}
            />
          ) : select ? (
            <>
              <Typography level="body2" sx={{ mt: 1 }}>
                {description}
              </Typography>
              <Select
                multiple
                value={content}
                onChange={handleLanguageChange}
                placeholder="Select languages"
                sx={{ mt: 1 }}
              >
                <Option value="English">English</Option>
                <Option value="French">French</Option>
                <Option value="Spanish">Spanish</Option>
                <Option value="German">German</Option>
                <Option value="Chinese">Chinese</Option>
                <Option value="Arabic">Arabic</Option>
              </Select>
            </>
          ) : contact ? (
            <>
              <Typography level="body2" sx={{ mt: 1 }}>
                {description}
              </Typography>
              <Input
                variant="outlined"
                name="email"
                placeholder={placeholder.email}
                value={content.email}
                onChange={handleInputChange}
                fullWidth
                sx={{ mt: 1 }}
              />
              <Input
                variant="outlined"
                name="phoneNumber"
                placeholder={placeholder.phoneNumber}
                value={content.phoneNumber}
                onChange={handleInputChange}
                fullWidth
                sx={{ mt: 1 }}
              />
            </>
          ) : (
            <Input
              variant="outlined"
              name={name}
              placeholder={placeholder}
              value={content}
              onChange={handleInputChange}
              fullWidth
              sx={{ mt: 1 }}
            />
          )}
        </>
      ) : isContentEmpty && userProfile == undefined ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          border="1px dashed grey"
          borderRadius="4px"
          p={2}
          mt={1}
          sx={{ backgroundColor: "background.paper" }}
        >
          <Box>
            <Typography level="body2" fontWeight="bold" color="primary">
              {buttonText}
            </Typography>
            <Typography level="body2">{description}</Typography>
            {note && (
              <Typography level="body2" color="textSecondary" sx={{ mt: 1 }}>
                {note}
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <>
          {typeof content === "string" ? (
            <Typography level="body2" sx={{ mt: 1 }}>
              {content}
            </Typography>
          ) : (
            <>
              {content.email && (
                <Typography level="body2" sx={{ mt: 1 }}>
                  {content.email}
                </Typography>
              )}
              {content.phoneNumber && (
                <Typography level="body2" sx={{ mt: 1 }}>
                  {content.phoneNumber}
                </Typography>
              )}
              {Array.isArray(content) &&
                content.map((item, index) => (
                  <Typography key={index} level="body2" sx={{ mt: 1 }}>
                    {item}
                  </Typography>
                ))}
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default AboutMeCard;
