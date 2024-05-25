import React, { useState } from "react";
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
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";

function ProfileCard() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Mohammed Sowaity",
    department: "Software Engineering",
    position: "Researcher",
    institution: "Bethlehem University",
    skills: [
      "Machine Learning",
      "Neural Networks",
      "Artificial Intelligence",
      "Classification",
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSkillChange = (e, index) => {
    const newSkills = [...profileData.skills];
    newSkills[index] = e.target.value;
    setProfileData({ ...profileData, skills: newSkills });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Remove empty skills before saving
    const filteredSkills = profileData.skills.filter(
      (skill) => skill.trim() !== ""
    );
    setProfileData({
      ...profileData,
      skills: filteredSkills,
    });
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
          {editMode ? (
            <Input
              variant="outlined"
              label="Name"
              name="name"
              placeholder="Enter your name"
              value={profileData.name}
              onChange={handleInputChange}
              sx={{ width: "30%" }}
            />
          ) : (
            <Typography
              level="h5"
              fontWeight="bold"
              sx={{ color: "primary.main" }}
            >
              {profileData.name}
            </Typography>
          )}
          <IconButton
            variant="outlined"
            color="primary"
            size="sm"
            onClick={toggleEditMode}
          >
            {editMode ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src="/path/to/profile-picture.jpg" // Replace with actual path
            alt="Profile Picture"
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            {editMode ? (
              <>
                <Input
                  variant="outlined"
                  label="Department"
                  name="department"
                  placeholder="Enter your department"
                  value={profileData.department}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <Input
                  variant="outlined"
                  label="Position"
                  name="position"
                  placeholder="Enter your position"
                  value={profileData.position}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <Input
                  variant="outlined"
                  label="Institution"
                  name="institution"
                  placeholder="Enter your institution"
                  value={profileData.institution}
                  onChange={handleInputChange}
                  fullWidth
                />
              </>
            ) : (
              <>
                <Typography
                  level="body2"
                  fontWeight="bold"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SchoolIcon sx={{ mr: 1 }} />
                  {profileData.department}
                </Typography>
                <Typography level="body2">{profileData.position}</Typography>
                <Typography level="body2">{profileData.institution}</Typography>
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
            <>
              {profileData.skills.map((skill, index) => (
                <Input
                  key={index}
                  variant="outlined"
                  label={`Skill ${index + 1}`}
                  value={skill}
                  onChange={(e) => handleSkillChange(e, index)}
                  fullWidth
                  sx={{ mb: 1 }}
                />
              ))}
            </>
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
