import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { Typography, CircularProgress, Divider } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

function PdfSummarizerModal({ open, setOpen, summarizedText }) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(5px)",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: {
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "50%",
          },
          height: "70%",
          borderRadius: "20px",
          p: 3,
          boxShadow: "lg",
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
          backgroundColor: "#f0f0f0",
          overflow: "hidden",
        }}
      >
        <ModalClose
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
            cursor: "pointer",
          }}
        />
        {summarizedText ? (
          <>
            <div
              style={{
                height: "20%",
                padding: "24px",
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <SummarizeOutlinedIcon
                sx={{
                  width: "30px",
                  height: "30px",
                }}
              />

              <Typography
                level="h3"
                sx={{
                  fontSize: "24px",
                  color: "#333",
                }}
              >
                Summary
              </Typography>
            </div>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ backgroundColor: "#000" }}
            />
            <div
              style={{
                padding: "16px",
                overflowY: "auto",
                maxHeight: "80%",
                display: "flex",
                gap: "16px",
              }}
            >
              <ArticleOutlinedIcon
                sx={{ marginBottom: "8px", width: "30px", height: "30px" }}
              />

              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#666",
                }}
              >
                {summarizedText}
              </Typography>
            </div>
          </>
        ) : (
          <CircularProgress
            sx={{
              margin: "auto",
            }}
          />
        )}
      </Sheet>
    </Modal>
  );
}

export default PdfSummarizerModal;
