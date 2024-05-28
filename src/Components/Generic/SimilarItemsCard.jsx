import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/joy";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)({
  marginTop: "32px",
  marginBottom: "20px",
  boxShadow: "var(--joy-shadow-sm)",
});

const SimilarItemContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
  },
});

const SimilarItem = ({ name, sharedSkills, imgSrc, type, linked, onClick }) => (
  <SimilarItemContainer onClick={onClick}>
    <Box display="flex" alignItems="center">
      <Avatar src={imgSrc} alt={name} sx={{ mr: 2 }} />
      <Box>
        <Typography level="body1" fontWeight="bold">
          {name}
        </Typography>
        {type === "people" ? (
          <Typography level="body3" color="neutral">
            {sharedSkills} shared skills
          </Typography>
        ) : null}
      </Box>
    </Box>
    {type === "people" && linked ? null : (
      <Button variant="outlined" color="primary" size="sm">
        Follow
      </Button>
    )}
  </SimilarItemContainer>
);

function SimilarItemsCard({ title, items, type, isLoading }) {
  const navigate = useNavigate();

  function onClick(id) {
    if (!id) return;
    console.log("Clicked on item with id:", id);
    if (type === "people") {
      navigate(`/profile/${id}`);
    } else {
      navigate(`/organization/${id}`);
    }
  }

  return (
    <StyledCard variant="outlined">
      <CardContent>
        <Typography level="h6" fontWeight="bold" mb={2}>
          {title}
        </Typography>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          items.map((item, index) => (
            <div key={index}>
              <SimilarItem
                name={item.name}
                sharedSkills={item.sharedSkills}
                linked={item.linked}
                imgSrc={item.imgSrc}
                type={type}
                onClick={() => onClick(item.id)}
              />
            </div>
          ))
        )}
      </CardContent>
    </StyledCard>
  );
}

export default SimilarItemsCard;
