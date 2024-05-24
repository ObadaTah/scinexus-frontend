import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import OpinionBar from "./OpinionBar";
import OpinionButton from "./OpinionButton";
import ReactionButton from "../Components/ReactionButton";

function Opinion(props) {
    return (
        <>
            <Card
                sx={{
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
                                // p: 0.5,
                                border: "2px solid",
                                borderColor: "background.body",
                            }}
                        />
                    </Box>
                    <Typography fontWeight="lg">
                        {props.opinionOwner.firstName +
                            " " +
                            props.opinionOwner.lastName}
                    </Typography>
                    {/* <IconButton
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ ml: "auto" }}
                    >
                        <MoreHoriz />
                    </IconButton> */}
                </CardContent>
                <Typography
                    style={{
                        flexWrap: "wrap",
                        wordWrap: "break-word",
                    }}
                >
                    {props.content}
                </Typography>
                <CardContent
                    orientation="horizontal"
                    sx={{ alignItems: "center", mx: -1 }}
                >
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton variant="plain" color="neutral" size="md">
                            <ReactionButton journalId={props.journalId} />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mx: "auto",
                        }}
                    ></Box>
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
            </Card>

            {props.subOpinions != null
                ? props.subOpinions.map((opinion, index) => {
                      //   if (opinion.papaOpinion == props.id) {
                      return (
                          <CardContent key={index}>
                              <Opinion
                                  key={opinion.id}
                                  {...opinion}
                                  setOpinions={props.setOpinions}
                                  opinions={props.opinions}
                                  opinionCountState={props.opinionCountState}
                                  setOpinionCountState={
                                      props.setOpinionCountState
                                  }
                                  papaOpinion={null}
                              />
                          </CardContent>
                      );
                      //   }
                      return null;
                  })
                : null}
        </>
    );
}
export default Opinion;
