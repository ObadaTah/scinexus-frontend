/* eslint-disable jsx-a11y/anchor-is-valid */

import OpinionsContainer from "../Opinion/OpinionsContainer";

import { DialogContent, DialogTitle, Modal, ModalDialog } from "@mui/joy";
// import * as React from "react";
import { Transition } from "react-transition-group";

export default function OpinionsModal(props) {
    return (
        <Transition in={props.open} timeout={400}>
            {(state) => (
                <Modal
                    keepMounted
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
                                        opacity: 1,
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
                        sx={{
                            opacity: 0,
                            transition: `opacity 300ms`,
                            ...{
                                entering: { opacity: 1 },
                                entered: { opacity: 1 },
                            }[state],
                        }}
                    >
                        <DialogTitle>Opinions</DialogTitle>
                        <DialogContent></DialogContent>
                    </ModalDialog>
                </Modal>
            )}
        </Transition>
    );
}
