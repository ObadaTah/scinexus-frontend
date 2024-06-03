import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { Button, Box, Grid, Link } from "@mui/joy";
import { Col, Container, Row } from "react-bootstrap";

function getTimeDifference(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate - date;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Yesterday";
  } else {
    return `${daysDifference} Days Ago`;
  }
}

export default function Article(props) {
  const [fullBrief, setFullBrief] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        "--Card-radius": "10px",
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
        position: "relative",
        mb: 2, // Add margin-bottom for spacing between articles
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="2">
          {(props.medias !== undefined) & (props.medias.length > 0) ? (
            <img
              src={`http://localhost:8080/medias/${props.medias[0].id}/files`}
              alt=""
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fHww"
              alt=""
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          )}
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography
          level="h6"
          fontSize="md"
          fontWeight={"bold"}
          sx={{ mb: 0.5 }}
        >
          {props.title}
        </Typography>
        {!fullBrief ? (
          <Typography level="body2" sx={{ mb: 1 }}>
            {props.brief.slice(0, 200) + "... "}
            <Link
              onClick={() => {
                setFullBrief(!fullBrief);
              }}
              style={{
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Read More
            </Link>
          </Typography>
        ) : (
          <Typography>
            {props.brief + " "}
            <Link
              style={{
                color: "blue",
                textDecoration: "underline",
              }}
              onClick={() => {
                setFullBrief(!fullBrief);
              }}
            >
              Show Less
            </Link>
          </Typography>
        )}
      </CardContent>
      <CardOverflow variant="soft">
        <Divider />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Container>
            <Row>
              <Col>
                <Typography level="body2">{props.viewsCount} Views</Typography>
                <Typography level="body2">
                  Published {getTimeDifference(props.createDateTime)}
                </Typography>
              </Col>
              <Col
                style={{
                  alignContent: "center",
                }}
                md={{ span: 4 }}
              >
                <Button
                  variant="solid"
                  size="sm"
                  onClick={() =>
                    navigate("/article", {
                      state: { ...props },
                    })
                  }
                >
                  View Full Article
                </Button>
              </Col>
            </Row>
          </Container>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
