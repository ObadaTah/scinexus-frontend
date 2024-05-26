// SimilarItemsCard.js
import React from "react";
import { Box, Card, CardContent, Typography, Avatar, Button } from "@mui/joy";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  marginTop: "32px",
  marginBottom: "20px",
  boxShadow: "var(--joy-shadow-sm)",
});

const SimilarItem = ({ name, sharedSkills, imgSrc, type, linked }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
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
  </Box>
);

const ViewMoreButton = styled(Button)({
  marginTop: "10px",
  display: "block",
  width: "100%",
});

const SimilarItemsCard = ({ title, items, type }) => (
  <StyledCard variant="outlined">
    <CardContent>
      <Typography level="h6" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      {items.map((item, index) => (
        <div>
          <SimilarItem
            key={index}
            name={item.name}
            sharedSkills={item.sharedSkills}
            linked={item.linked}
            imgSrc={item.imgSrc}
            type={type}
          />
        </div>
      ))}
      <ViewMoreButton variant="soft" color="primary">
        View more
      </ViewMoreButton>
    </CardContent>
  </StyledCard>
);

export default SimilarItemsCard;
