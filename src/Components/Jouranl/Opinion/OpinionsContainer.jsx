import { Typography } from "@mui/material";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ModalClose from "@mui/joy/ModalClose";

import Opinion from "./Opinion";
import { helix } from "ldrs";
import { DialogContent, DialogTitle, Modal, ModalDialog } from "@mui/joy";
import { Transition } from "react-transition-group";
import { useAuth } from "../../contexts/AuthContext";
import SkeletonLoader from "../Post/SkeletonLoader";

helix.register();

const dummyOpinions = [
  // Your dummy opinions data
];

function OpinionsContainer(props) {
  const [isLoading, setIsLoading] = useState("block");
  const { jwtToken } = useAuth();

  useEffect(() => {
    async function getAllOpinions() {
      if (!props.open) return;

      const response = await fetch(
        `http://localhost:8080/journals/${props.journalId}/opinions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        if (data["_embedded"] !== undefined) {
          const opinions = data["_embedded"].opinionList;

          const nestedOpinions = opinions.reduce((acc, opinion) => {
            if (opinion.papaOpinion == null) {
              acc.push({ ...opinion, subOpinions: [] });
            } else {
              const parentOpinion = acc.find(
                (op) => op.id === opinion.papaOpinion.id
              );
              if (parentOpinion) {
                parentOpinion.subOpinions.push(opinion);
              }
            }
            return acc;
          }, []);

          props.setOpinions(nestedOpinions);
        } else {
          props.setOpinions([]);
        }
      } else {
        props.setOpinions(dummyOpinions);
      }
      setIsLoading("none");
    }

    getAllOpinions();
  }, [props.open]);

  return (
    <div>
      <Transition
        in={props.open}
        timeout={400}
        style={{
          display: isLoading,
        }}
      >
        {(state) => (
          <Modal
            open={!["exited", "exiting"].includes(state)}
            onClose={() => props.setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: {
                      opacity: 1,
                      backdropFilter: "blur(8px)",
                    },
                    entered: {
                      opacity: 0.8,
                      backdropFilter: "blur(8px)",
                    },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              layout="center"
              size="sm"
              style={{ width: "50%" }}
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 0.7 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <ModalClose />
              <DialogTitle>Opinions</DialogTitle>
              <DialogContent
                style={{
                  alignItems: "center",
                }}
              >
                <SkeletonLoader isLoading={isLoading}></SkeletonLoader>
                {/* <l-helix
                                    size="45"
                                    speed="2.5"
                                    color="black"
                                    style={{
                                        display: isLoading,
                                        position: "center",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                    }}
                                /> */}

                <Typography
                  style={{
                    paddingTop: "20px",
                    display: props.opinions.length > 0 ? "none" : "block",
                    position: "center",
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  There are no opinions yet, be the first to share your Opinion
                </Typography>
                <Container>
                  <List>
                    {props.opinions.map((opinion, index) => (
                      <ListItem
                        key={index}
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "right",
                        }}
                      >
                        <Opinion
                          setOpinions={props.setOpinions}
                          opinions={props.opinions}
                          setOpinionCountState={props.setOpinionCountState}
                          opinionCountState={props.opinionCountState}
                          {...opinion}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Container>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </div>
  );
}

export default OpinionsContainer;
