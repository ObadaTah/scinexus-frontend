import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import ReactionButton from "../Components/ReactionButton";
import OpinionBar from "./OpinionBar";
import { useAuth } from "../../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon
import { Textarea } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useUser } from "../../contexts/UserContext";
function Opinion(props) {
  const { jwtToken } = useAuth();
  async function updateOpinion(content, id) {
    const response = await fetch(`http://localhost:8080/opinions/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        content: content,
        journalId: null,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  }

  async function deleteOpinion(id) {
    const response = await fetch(`http://localhost:8080/opinions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response.ok) {
      console.log(props.opinions);
      // Remove the opinion from the state
      let newOpinions = [];
      props.opinions.map((opinion) => {
        if (opinion.id == id) {
          return;
        }
        let newSubOpinions = [];
        opinion.subOpinions.map((subOpinion) => {
          if (subOpinion.id != id) newSubOpinions.push(subOpinion);
        });
        opinion.subOpinions = newSubOpinions;
        newOpinions.push(opinion);
      });
      console.log(newOpinions);
      props.setOpinions(newOpinions);
      // props.setOpinions((prevOpinions) =>
      //     prevOpinions.filter((opinion) => opinion.id !== id)
      // );

      props.setOpinionCountState(props.opinionCountState - 1);
    }
  }

  const { user } = useUser();
  const [isEditing, setIsEditing] = React.useState(false);
  const [opinionContent, setOpinionContent] = React.useState(props.content);
  // Function to handle edit click
  const handleEdit = () => {
    setIsEditing(!isEditing);
    updateOpinion(opinionContent, props.id);
    setOpinionContent(opinionContent);
    console.log("Edit button clicked for opinion ID:", props.id);
  };

  const handleDelete = () => {
    deleteOpinion(props.id);
    console.log("Delete button clicked for opinion ID:", props.id);
  };

  return (
    <>
      <Card
        // size="sm"
        style={{
          paddingBottom: "0px",
          marginBottom: "10px",
        }}
        sx={{
          // mb: 1,
          width: props.papaOpinion == null ? "100%" : "90%",
          "--Card-radius": (theme) => "15px",
        }}
      >
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                background:
                  "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              },
            }}
          >
            <Avatar
              size="sm"
              src={
                props.opinionOwner.profilePicture != null
                  ? props.opinionOwner.profilePicture.fileName
                  : null
              }
              sx={{
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </Box>
          <Typography fontWeight="lg">
            {props.opinionOwner.firstName + " " + props.opinionOwner.lastName}
          </Typography>
          {props.opinionOwner.email === user.email && (
            <>
              <IconButton
                variant="outlined"
                color="primary"
                size="sm"
                onClick={handleEdit}
                sx={{ ml: "auto" }}
              >
                {isEditing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
              <IconButton
                variant="outlined"
                color="danger"
                size="sm"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </CardContent>
        {isEditing ? (
          <Textarea
            onChange={(e) => setOpinionContent(e.target.value)}
            value={opinionContent}
            required
            sx={{ mb: 1 }}
          />
        ) : (
          <Typography
            style={{
              flexWrap: "wrap",
              wordWrap: "break-word",
            }}
          >
            {opinionContent}
          </Typography>
        )}
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", mx: -1 }}
        >
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="md">
              <ReactionButton reactToId={props.id} reactionFromType="opinion" />
            </IconButton>
          </Box>
        </CardContent>
        {props.papaOpinion == null ? (
          <OpinionBar
            setOpinions={props.setOpinions}
            opinions={props.opinions}
            opinionTo={props.id}
            opinionCountState={props.opinionCountState}
            setOpinionCountState={props.setOpinionCountState}
            type="opinion"
          />
        ) : null}
        <CardContent style={{ alignItems: "center" }}>
          {props.subOpinions != null
            ? props.subOpinions.map((opinion, index) => (
                <Opinion
                  key={opinion.id}
                  {...opinion}
                  setOpinions={props.setOpinions}
                  opinions={props.opinions}
                  opinionCountState={props.opinionCountState}
                  setOpinionCountState={props.setOpinionCountState}
                  papaOpinion={props.id}
                />
              ))
            : null}
        </CardContent>
      </Card>
    </>
  );
}

export default Opinion;
