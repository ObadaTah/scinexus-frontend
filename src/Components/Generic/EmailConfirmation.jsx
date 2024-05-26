import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import { Link } from "react-router-dom";

function EmailConfirmation({ email, open, setOpen }) {
<<<<<<< Updated upstream
    return (
        <div>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
=======
  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: "650px",
            height: 400,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 2,
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <img
            src="public\inbox.png"
            alt="email confirmation"
            width={100}
            height={100}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            fontSize={32}
          >
            Email Confirmation
          </Typography>
          <Typography
            id="modal-desc"
            textColor="text.tertiary"
            sx={{ textAlign: "center", maxWidth: 400 }}
          >
            We've sent an email to {email} for you to confirm your email
            address. Just click the link in the email to complete your
            registration. Check your inbox{" "}
            <Link
              to="http://localhost:1080/#/"
              style={{ color: "#3aa0ed", textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
>>>>>>> Stashed changes
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: "650px",
                        height: 400,
                        // borderRadius: "md",
                        p: 3,
                        boxShadow: "lg",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        rowGap: 2,
                        borderRadius: "20px",
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <img
                        src="public\inbox.png"
                        alt="email confirmation"
                        width={100}
                        height={100}
                    />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                        fontSize={32}
                    >
                        Email Confirmation
                    </Typography>
                    <Typography
                        id="modal-desc"
                        textColor="text.tertiary"
                        sx={{ textAlign: "center", maxWidth: 400 }}
                    >
                        We've sent an email to {email} for you to confirm your
                        email address. Just click the link in the email to
                        complete your registration. Check your inbox{" "}
                        <Link
                            to="http://localhost:1080/#/"
                            style={{ color: "#3aa0ed", textDecoration: "none" }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            here!
                        </Link>
                    </Typography>

                    <Grid
                        xs={2}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Divider
                            sx={{
                                backgroundColor: "#544541",
                                width: "450%",
                            }}
                        />
                    </Grid>

                    <Typography sx={{ fontSize: "80%" }}>
                        if you not get any mail{" "}
                        <Link
                            to="http://localhost:1080/#/"
                            style={{ color: "#3aa0ed", textDecoration: "none" }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Resend Email Verification
                        </Link>
                    </Typography>
                </Sheet>
            </Modal>
        </div>
    );
}

export default EmailConfirmation;
