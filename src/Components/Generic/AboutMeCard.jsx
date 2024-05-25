import React, { useState } from "react";
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
} from "@mui/joy";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LanguageIcon from "@mui/icons-material/Language";
import ContactMailIcon from "@mui/icons-material/ContactMail";

function AboutMeCard() {
  const [editMode, setEditMode] = useState(false);
  const [aboutMeData, setAboutMeData] = useState({
    introduction:
      "Add an introduction with your research focus and interests to help others understand your work.",
    languages: [],
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutMeData({
      ...aboutMeData,
      [name]: value,
    });
  };

  const handleLanguageChange = (event, newValue) => {
    setAboutMeData({
      ...aboutMeData,
      languages: newValue,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Implement save functionality here, e.g., make an API call to save the data
    toggleEditMode();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: "62%",
        minWidth: "350px",

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
          <IconButton
            variant="outlined"
            color="primary"
            size="sm"
            onClick={toggleEditMode}
          >
            {editMode ? <SaveIcon /> : <EditIcon />}
          </IconButton>
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
        />

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
}) {
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
              fullWidth
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
      ) : content && content.length > 0 ? (
        Array.isArray(content) ? (
          <Typography level="body2" sx={{ mt: 1 }}>
            {content.join(" · ")}
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
          </>
        )
      ) : (
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
      )}
    </Box>
  );
}

export default AboutMeCard;
