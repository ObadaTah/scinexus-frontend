// SimilarItemsCard.js
import React from "react";
import { Box, Card, CardContent, Typography, Avatar, Button } from "@mui/joy";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  marginTop: "32px",
  marginBottom: "20px",
  boxShadow: "var(--joy-shadow-sm)",
});

const SimilarItem = ({ name, sharedSkills, imgSrc }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
    <Box display="flex" alignItems="center">
      <Avatar src={imgSrc} alt={name} sx={{ mr: 2 }} />
      <Box>
        <Typography level="body1" fontWeight="bold">
          {name}
        </Typography>
        <Typography level="body2" color="neutral">
          {sharedSkills} shared skills
        </Typography>
      </Box>
    </Box>
    <Button variant="outlined" color="primary" size="sm">
      Follow
    </Button>
  </Box>
);

const ViewMoreButton = styled(Button)({
  marginTop: "10px",
  display: "block",
  width: "100%",
});

const SimilarItemsCard = ({ title, items }) => (
  <StyledCard variant="outlined">
    <CardContent>
      <Typography level="h6" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      {items.map((item, index) => (
        <SimilarItem
          key={index}
          name={item.name}
          sharedSkills={item.sharedSkills}
          imgSrc={item.imgSrc}
        />
      ))}
      <ViewMoreButton variant="soft" color="primary">
        View more
      </ViewMoreButton>
    </CardContent>
  </StyledCard>
);

export default SimilarItemsCard;
