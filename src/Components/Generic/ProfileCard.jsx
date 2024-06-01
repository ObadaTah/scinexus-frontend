import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
  Chip,
  Input,
  Button,
  Select,
  Option,
  Autocomplete,
  CircularProgress,
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import { useUser } from "../contexts/UserContext"; // Adjust the import path as needed
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth context
import AutocompleteOption from "@mui/joy/AutocompleteOption";

const academicOptions = [
  { label: "Academic researcher", value: "RESEARCHER" },
  { label: "Academic faculty member", value: "PROFESSOR" },
  { label: "Retired academic", value: "POSTDOC" },
  { label: "Self-employed professional", value: "LECTURER" },
  {
    label: "Academic affiliated with an organization",
    value: "ASSOCIATE_PROFESSOR",
  },
  { label: "Graduate student", value: "GRADUATE_STUDENT" },
  { label: "Undergraduate student", value: "UNDERGRADUATE_STUDENT" },
];

const organizationOptions = [
  { label: "Business", value: "BUSINESS" },
  { label: "Non Profit", value: "NON_PROFIT" },
  { label: "Educational", value: "EDUCATIONAL" },
  { label: "Governmental", value: "GOVERNMENT" },
  { label: "Professional Association", value: "PROFESSIONAL_ASSOCIATION" },
  { label: "Community Group", value: "COMMUNITY_GROUP" },
  { label: "Media", value: "MEDIA" },
  { label: "Religious", value: "RELIGIOUS" },
  { label: "Sports", value: "SPORTS" },
];

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

const getPositionValue = (label, role) => {
  const options = role === "ACADEMIC" ? academicOptions : organizationOptions;
  const option = options.find((opt) => opt.label === label);
  return option ? option.value : label;
};

const getPositionLabel = (value, role) => {
  const options =
    role === "ACADEMIC" || role === "ADMIN"
      ? academicOptions
      : organizationOptions;
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};

function ProfileCard({ userProfile }) {
  const { jwtToken } = useAuth();
  const { updateUser } = useUser();
  const user = userProfile || useUser().user;

  const [isSaved, setIsSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: `${user.firstName} ${user.lastName}`,
    fieldOfWork: user.fieldOfWork || "",
    education: user.education || "",
    position: user.position || "",
    skills: user.skills || [],
  });

  const [educationValue, setEducationValue] = useState("");
  const [education, setEducation] = useState([]);
  const [isEducationMenuLoading, setIsEducationMenuLoading] = useState(false);
  const [isEducationMenuOpen, setEducationMenuOpen] = useState(false);
  const [isPostitionMenuOpen, setIsPositionMenuOpen] = useState(false);
  const [isPostitionMenuLoading, setIsPositionMenuLoading] = useState(false);
  const [isFieldOfWorkMenuOpen, setIsFieldOfWorkMenuOpen] = useState(false);

  useEffect(() => {
    setProfileData({
      name: `${user.firstName} ${user.lastName}`,
      fieldOfWork: user.fieldOfWork || "",
      education: user.education || "",
      position: user.position || "",
      skills: user.skills || [],
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSkillChange = (event, newValue) => {
    setProfileData({ ...profileData, skills: newValue });
  };

  const toggleEditMode = () => {
    if (userProfile) return;
    console.log("Toggling edit mode:", !editMode);
    setEditMode(!editMode);
  };

  const handleSave = () => {
    const filteredSkills = profileData.skills.filter(
      (skill) => skill.trim() !== ""
    );
    const [firstName, lastName] = profileData.name.split(" ");

    console.log("Saving profile data:", profileData);

    updateUser({
      firstName,
      lastName,
      fieldOfWork: profileData.fieldOfWork,
      education: profileData.education,
      position: getPositionValue(profileData.position, user.role), // Save the value instead of the label
      skills: filteredSkills,
    });
    setIsSaved(true);

    toggleEditMode();
  };

  useEffect(() => {
    if (!isSaved) return;

    async function patchData() {
      try {
        const response = await fetch(`http://localhost:8080/users`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            fieldOfWork: profileData.fieldOfWork,
            education: profileData.education,
            position: getPositionValue(profileData.position, "ACADEMIC"), // Use appropriate role
            skills: profileData.skills,
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
        setIsSaved(false);
      }
    }

    patchData();
  }, [isSaved, jwtToken, profileData, updateUser]);

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

    fetchEducation();
  }, [educationValue, url]);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // Create a preview URL for the selected image
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);

    try {
      const response = await fetch(
        "http://localhost:8080/users/profilePicture",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      updateUser(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

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
          <div></div>
          {!userProfile && (
            <IconButton
              variant="outlined"
              color="primary"
              size="sm"
              onClick={toggleEditMode}
            >
              {editMode ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          )}
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            onClick={() => {
              if (editMode) {
                document.getElementById("profilePictureInput").click();
              }
            }}
            src={
              user.profilePicture
                ? `http://localhost:8080/medias/${user.profilePicture.id}/files`
                : "/path/to/default-picture.jpg"
            }
            alt="Profile Picture"
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          {editMode && (
            <IconButton
              onClick={() => {
                if (editMode) {
                  document.getElementById("profilePictureInput").click();
                }
              }}
              color="primary"
              sx={{
                position: "relative",
                bottom: -30,
                right: 50,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            >
              <EditIcon />
            </IconButton>
          )}
          <input
            type="file"
            id="profilePictureInput"
            style={{ display: "none" }}
            onChange={handleProfilePictureChange}
          />
          <Box sx={{ width: "100%" }}>
            {editMode ? (
              <>
                <Input
                  variant="outlined"
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <Autocomplete
                  sx={{ mb: 1 }}
                  placeholder="Type To Search Field Of Work"
                  open={isFieldOfWorkMenuOpen}
                  onOpen={() => {
                    setIsFieldOfWorkMenuOpen(true);
                  }}
                  onClose={() => {
                    setIsFieldOfWorkMenuOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) => option === value}
                  getOptionLabel={(option) => option}
                  options={fieldOfWorkOptions}
                  renderOption={(props, option) => (
                    <AutocompleteOption key={option} {...props}>
                      {option}
                    </AutocompleteOption>
                  )}
                  onInputChange={(event, value) => {
                    console.log("Field of work:", value);
                    setProfileData({
                      ...profileData,
                      fieldOfWork: value,
                    });
                  }}
                />

                {user.role === "ACADEMIC" || user.role === "ADMIN" ? (
                  <Autocomplete
                    name="education"
                    placeholder="Enter your institution and department"
                    open={isEducationMenuOpen}
                    sx={{ mb: 1 }}
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
                    onInputChange={(event, value) => {
                      setProfileData({
                        ...profileData,
                        education: value,
                      });
                      setEducationValue(value);
                    }}
                    renderOption={(props, option) => (
                      <AutocompleteOption key={option.name} {...props}>
                        {option.name}
                      </AutocompleteOption>
                    )}
                    endDecorator={
                      isEducationMenuLoading ? (
                        <CircularProgress
                          size="sm"
                          sx={{ bgcolor: "background.surface" }}
                        />
                      ) : null
                    }
                  />
                ) : null}
                <Autocomplete
                  sx={{ mb: 1 }}
                  placeholder="Type To Search Position"
                  open={isPostitionMenuOpen}
                  onOpen={() => {
                    setIsPositionMenuOpen(true);
                  }}
                  onClose={() => {
                    setIsPositionMenuOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) => option === value}
                  getOptionLabel={(option) => option}
                  options={
                    user.role === "ACADEMIC" || user.role === "ADMIN"
                      ? academicOptions.map((option) => option.label)
                      : organizationOptions.map((option) => option.label)
                  }
                  loading={isPostitionMenuLoading}
                  onInputChange={(event, value) => {
                    setProfileData({
                      ...profileData,
                      position: value,
                    });
                  }}
                  renderOption={(props, option) => {
                    const { key, ...otherProps } = props;
                    return (
                      <AutocompleteOption key={option} {...otherProps}>
                        {option}
                      </AutocompleteOption>
                    );
                  }}
                  endDecorator={
                    isPostitionMenuLoading ? (
                      <CircularProgress
                        size="sm"
                        sx={{ bgcolor: "background.surface" }}
                      />
                    ) : null
                  }
                />
              </>
            ) : (
              <>
                <Typography
                  level="h5"
                  fontWeight="bold"
                  sx={{ color: "primary.main" }}
                >
                  {profileData.name}
                </Typography>
                <Typography level="body2">
                  {profileData.fieldOfWork} ·{" "}
                  {getPositionLabel(user.position, user.role)}
                </Typography>
                <Typography level="body2" fontWeight={600}>
                  Institution and Department
                </Typography>
                <Typography
                  level="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SchoolIcon sx={{ mr: 1 }} />
                  {profileData.education}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Typography
          level="body2"
          fontWeight="bold"
          sx={{ mt: 2, display: "flex", alignItems: "center" }}
        >
          <BuildIcon sx={{ mr: 1 }} />
          Skills
        </Typography>
        <Box mt={1}>
          {editMode ? (
            <Select
              multiple
              value={profileData.skills}
              onChange={handleSkillChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                  {selected.map((selectedOption, index) => (
                    <Chip key={index} variant="soft" color="primary">
                      {selectedOption}
                    </Chip>
                  ))}
                </Box>
              )}
              sx={{
                minWidth: "15rem",
              }}
              slotProps={{
                listbox: {
                  sx: {
                    width: "100%",
                  },
                },
              }}
            >
              {skillOptions.map((skill, index) => (
                <Option key={index} value={skill}>
                  {skill}
                </Option>
              ))}
            </Select>
          ) : (
            profileData.skills.map((skill, index) => (
              <Chip
                key={index}
                color="primary"
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              >
                {skill}
              </Chip>
            ))
          )}
        </Box>
        {editMode && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
