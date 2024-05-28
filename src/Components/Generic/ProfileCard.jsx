const skillOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Django",
  "Java",
  "Spring Boot",
  "C++",
  "C#",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "SQL",
  "NoSQL",
  "HTML",
  "CSS",
  "Sass",
  "Less",
  "Bootstrap",
  "Tailwind CSS",
  "RESTful APIs",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Data Analysis",
  "Data Visualization",
  "Pandas",
  "NumPy",
  "SciPy",
  "TensorFlow",
  "PyTorch",
  "Tableau",
  "Power BI",
  "Excel",
  "MATLAB",
  "Simulink",
  "R",
  "SPSS",
  "Stata",
  "SAS",
  "Business Intelligence",
  "Scrum",
  "Agile",
  "Kanban",
  "JIRA",
  "Confluence",
  "Git",
  "GitHub",
  "Bitbucket",
  "CI/CD",
  "Jenkins",
  "Travis CI",
  "CircleCI",
  "Project Management",
  "Time Management",
  "Communication",
  "Team Collaboration",
  "Problem Solving",
  "Critical Thinking",
  "Creative Thinking",
  "Technical Writing",
  "Public Speaking",
  "Leadership",
  "Negotiation",
  "Conflict Resolution",
  "Customer Service",
  "Sales",
  "Marketing",
  "SEO",
  "Content Creation",
  "Copywriting",
  "Digital Marketing",
  "Social Media Marketing",
  "Email Marketing",
  "Affiliate Marketing",
  "Product Management",
  "Financial Analysis",
  "Accounting",
  "Bookkeeping",
  "Risk Management",
  "Investment Strategies",
  "Cryptocurrency",
  "Blockchain",
  "Cybersecurity",
  "Penetration Testing",
  "Network Security",
  "Ethical Hacking",
  "Internet of Things (IoT)",
  "Researcher",
  "Augmented Reality (AR)",
  "Virtual Reality (VR)",
  "Game Development",
  "UI/UX Design",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Figma",
  "Sketch",
  "Human Resources",
  "Recruitment",
  "Talent Management",
  "Employee Relations",
  "Training and Development",
  "Compensation and Benefits",
  "Payroll",
  "Legal",
  "Contracts",
  "Intellectual Property",
  "Litigation",
  "Corporate Law",
  "Environmental Law",
  "Family Law",
  "Real Estate",
  "Architecture",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Aerospace Engineering",
  "Automotive Engineering",
  "Industrial Engineering",
  "Operations Management",
  "Supply Chain Management",
  "Logistics",
  "Procurement",
  "Inventory Management",
  "Manufacturing",
  "Lean Manufacturing",
  "Six Sigma",
  "Quality Control",
  "Health and Safety",
  "Environmental Health",
  "Public Health",
  "Epidemiology",
  "Biostatistics",
  "Clinical Research",
  "Pharmaceuticals",
  "Biotechnology",
  "Genetics",
  "Bioinformatics",
  "Neuroscience",
  "Psychology",
  "Sociology",
  "Anthropology",
  "Political Science",
  "Economics",
  "International Relations",
  "History",
  "Philosophy",
  "Literature",
  "Linguistics",
  "Education",
  "Teaching",
  "Curriculum Development",
  "Instructional Design",
  "Educational Technology",
  "E-Learning",
  "Library Science",
  "Museum Studies",
  "Art",
  "Music",
  "Theater",
  "Film",
  "Photography",
  "Creative Writing",
  "Journalism",
  "Public Relations",
  "Advertising",
  "Brand Management",
  "Event Planning",
  "Customer Service",
  "Retail",
  "Hospitality",
  "Tourism",
  "Travel",
  "Real Estate",
  "Property Management",
  "Construction",
  "Urban Planning",
  "Interior Design",
  "Fashion",
  "Textiles",
  "Apparel Design",
  "Merchandising",
  "Sales",
  "Account Management",
  "Business Development",
  "Entrepreneurship",
  "Startups",
  "Venture Capital",
  "Private Equity",
  "Investment Banking",
  "Asset Management",
  "Wealth Management",
  "Financial Planning",
  "Consulting",
  "Advisory",
  "Strategy",
  "Change Management",
  "Organizational Development",
  "Culture",
  "Diversity and Inclusion",
  "Corporate Social Responsibility",
  "Sustainability",
  "Renewable Energy",
  "Environmental Science",
  "Climate Change",
  "Ecology",
  "Conservation",
  "Agriculture",
  "Horticulture",
  "Forestry",
  "Fisheries",
  "Wildlife Management",
  "Veterinary Medicine",
  "Animal Science",
  "Zoology",
  "Marine Biology",
  "Oceanography",
  "Geology",
  "Geography",
  "Astronomy",
  "Astrophysics",
  "Space Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Statistics",
  "Actuarial Science",
  "Operations Research",
  "Game Theory",
  "Quantum Computing",
  "Nanotechnology",
  "Robotics",
  "Automation",
  "Control Systems",
  "Embedded Systems",
  "Internet of Things",
  "Sensors",
  "Wearable Technology",
  "Augmented Reality",
  "Virtual Reality",
  "3D Printing",
  "Cryptocurrency",
  "Smart Contracts",
  "NFT",
  "Metaverse",
  "Artificial General Intelligence",
  "Ethics in AI",
  "AI Governance",
  "Human-Computer Interaction",
  "User Experience",
  "User Interface",
  "Design Thinking",
  "Prototyping",
  "Wireframing",
  "A/B Testing",
  "Usability Testing",
  "Customer Experience",
  "Customer Journey",
  "Service Design",
  "Product Design",
  "Go-to-Market Strategy",
  "Growth Hacking",
  "Analytics",
  "Data Analysis",
  "Data Mining",
  "Predictive Analytics",
  "Prescriptive Analytics",
  "Business Analysis",
  "Competitive Analysis",
  "Market Research",
  "Survey Design",
  "Quantitative Research",
  "Qualitative Research",
  "Ethnography",
  "Case Study",
  "Focus Groups",
  "Interviews",
  "Observational Research",
  "Experimental Research",
  "Psychometrics",
  "Scale Development",
  "Survey Analysis",
  "Coding",
  "Thematic Analysis",
  "Content Analysis",
  "Grounded Theory",
  "Discourse Analysis",
  "Narrative Analysis",
  "Phenomenology",
  "Hermeneutics",
  "Action Research",
  "Participatory Research",
  "Community-Based Research",
  "Mixed Methods",
  "Research Design",
  "Proposal Writing",
  "Grant Writing",
  "Research Ethics",
  "Institutional Review Board",
  "Informed Consent",
  "Confidentiality",
  "Anonymity",
  "Data Management",
  "Data Security",
  "Data Privacy",
  "Data Governance",
  "Open Science",
  "Reproducibility",
  "Replication",
  "Peer Review",
  "Publishing",
  "Open Access",
  "Journal Impact Factor",
  "Citation Analysis",
  "H-Index",
  "Altmetrics",
  "Science Communication",
  "Public Engagement",
  "Policy Impact",
  "Knowledge Translation",
  "Knowledge Mobilization",
  "Knowledge Brokering",
  "Innovation",
  "Technology Transfer",
  "Commercialization",
  "Patent Law",
  "Patent Writing",
  "Trademark",
  "Copyright",
  "Licensing",
  "Spin-Offs",
  "Start-Ups",
  "Incubators",
  "Accelerators",
  "Crowdfunding",
  "Pitching",
  "Business Plans",
  "Market Analysis",
  "Financial Modeling",
  "Valuation",
  "Due Diligence",
  "Mergers and Acquisitions",
  "Exit Strategy",
  "Corporate Strategy",
  "Business Strategy",
  "Competitive Strategy",
  "Disruptive Innovation",
  "Sustainable Innovation",
  "Social Innovation",
  "Inclusive Innovation",
  "Frugal Innovation",
  "Open Innovation",
  "User Innovation",
  "Lean Startup",
  "Agile Development",
  "Scrum",
  "Kanban",
  "SAFe",
  "XP",
  "Continuous Integration",
  "Continuous Deployment",
  "Test-Driven Development",
  "Behavior-Driven Development",
  "Infrastructure as Code",
  "Cloud Computing",
  "Serverless Architecture",
  "Containerization",
  "Virtualization",
  "Edge Computing",
  "Fog Computing",
  "Grid Computing",
  "High-Performance Computing",
  "AI",
  "Machine Learning",
  "Deep Learning",
  "Reinforcement Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Speech Recognition",
  "Chatbots",
  "Robotics",
  "Automation",
  "Autonomous Vehicles",
  "Smart Cities",
  "Smart Homes",
  "Smart Grid",
  "Wearable Technology",
  "Internet of Things",
  "Augmented Reality",
  "Virtual Reality",
  "Mixed Reality",
  "Holography",
  "3D Printing",
  "Nanotechnology",
  "Biotechnology",
  "Synthetic Biology",
  "Genomics",
  "Proteomics",
  "Metabolomics",
  "Epigenetics",
  "Stem Cell Research",
  "Gene Editing",
  "CRISPR",
  "Pharmacogenomics",
  "Personalized Medicine",
  "Precision Medicine",
  "Telemedicine",
  "E-Health",
  "M-Health",
  "Health Informatics",
  "Digital Health",
  "Public Health",
  "Epidemiology",
  "Infectious Diseases",
  "Non-Communicable Diseases",
  "Mental Health",
  "Global Health",
  "Health Policy",
  "Health Economics",
  "Health Promotion",
  "Health Communication",
  "Health Education",
  "Environmental Health",
  "Occupational Health",
  "Health Equity",
  "Social Determinants of Health",
  "Health Systems",
  "Primary Care",
  "Universal Health Coverage",
  "Health Financing",
  "Health Governance",
  "Health Workforce",
  "Health Information Systems",
  "Health Technology Assessment",
  "Health Research",
  "Health Innovation",
  "Health Security",
  "Emergency Preparedness",
  "Disaster Risk Reduction",
  "Climate Change and Health",
  "Sustainable Development Goals",
  "One Health",
  "Planetary Health",
  "Humanitarian Health",
  "Health Diplomacy",
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
  }, [isSaved]);

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
            src={
              user.profilePicture
                ? user.profilePicture.url
                : "/path/to/default-picture.jpg"
            }
            alt="Profile Picture"
            sx={{ width: 80, height: 80, mr: 2 }}
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
                      {selectedOption.label}
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
