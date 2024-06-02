import { Avatar, Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { CsvToHtmlTable } from "react-csv-to-table";
import { useLocation } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { pdfjs } from "react-pdf";
import { Container } from "react-bootstrap";

import PdfSummrizerModal from "../Components/Generic/PdfSummrizerModal";
pdfjs.GlobalWorkerOptions.workerSrc = `../../../src/pdf.worker.min.mjs`;
import { Client } from "@octoai/client";

const client = new Client(process.env.REACT_APP_OCTOAI_TOKEN);

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

function ResearchPaperPage() {
  const [summarize, setSummarize] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const [csvData, setCsvData] = useState("");
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState("");
  const [completionText, setCompletionText] = useState("");

  useEffect(() => {
    if (!summarize) return;

    async function getPdfText() {
      try {
        const pdfMedia = location.state.medias.find(
          (media) => media.type === "application/pdf"
        );
        if (!pdfMedia) {
          console.error("No PDF media found");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/medias/${pdfMedia.id}/files`
        );
        const buffer = await response.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: buffer }).promise;
        const numPages = pdf.numPages;

        let text = "";
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          text += strings.join(" ");
        }

        setNumPages(numPages);
        setPdfText(text);
        // console.log("PDF TEXT:", text);
      } catch (error) {
        console.error("Error extracting text:", error);
      }
    }

    getPdfText();
  }, [location.state.medias, summarize]);

  useEffect(() => {
    async function fetchCompletion() {
      const contextLimit = 8192;
      const maxTokens = 512;

      let truncatedText = pdfText;

      // Ensure the length of the prompt + max_tokens does not exceed the context limit
      if (pdfText.length + maxTokens > contextLimit) {
        const availableTokens = contextLimit - maxTokens;
        truncatedText = pdfText.slice(0, availableTokens);
      }

      try {
        const completion = await client.chat.completions.create({
          model: "llama-2-13b-chat-fp16",
          messages: [
            {
              role: "system",
              content:
                "Hello, I am a friendly AI assistant, how can I help you today?",
            },
            {
              role: "user",
              content: `Can you summarize this research paper for me? ${truncatedText}`,
            },
          ],
          max_tokens: maxTokens,
        });

        setCompletionText(completion.choices[0].message.content);
        // console.log("OCTO AI:", completion.choices[0].message.content);
      } catch (error) {
        console.error("Error creating completion:", error);
      }
    }

    if (pdfText) {
      fetchCompletion();
    }
  }, [pdfText]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Box sx={{ m: 4 }}>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h4" component="h1" gutterBottom>
              {location.state.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {location.state.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {getTimeDifference(location.state.createDateTime)} | {numPages}{" "}
              Pages | {location.state.medias.length} File
            </Typography>
            <Button
              onClick={() => {
                setSummarize(true);
                setOpenModal(true);
              }}
            >
              Summarize Research Paper
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                About Author
              </Typography>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Grid item>
                  <Avatar
                    src={
                      location.state.publisher.profilePicture?.path !==
                      "autogenerated"
                        ? `http://localhost:8080/medias/${location.state.publisher.profilePicture?.id}/files`
                        : location.state.publisher.profilePicture?.fileName
                    }
                    alt="Author"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {location.state.publisher.firstName +
                      " " +
                      location.state.publisher.lastName}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" color="textSecondary">
                {location.state.publisher.bio} |
                {location.state.publisher.position}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ my: 4 }}>
            {location.state.medias.map((media) => {
              // console.log(media);
              if (media.type === "application/pdf") {
                return (
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Original PDF
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: " 100vh",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      <iframe
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        src={`http://localhost:8080/medias/${media.id}/files`}
                      ></iframe>
                    </Box>
                  </Paper>
                );
              }
              if (media.type === "text/csv") {
                const [csvData, setCsvData] = useState("");

                fetch(`http://localhost:8080/medias/${media.id}/files`)
                  .then((response) => response.body.getReader().read())
                  .then((responseText) => {
                    setCsvData(
                      new TextDecoder("utf-8").decode(responseText.value)
                    );
                  });

                return (
                  <Box
                    sx={{
                      my: 4,
                      border: "5px groove #b0b0af",
                      height: " 100vh",
                      backgroundColor: "#f0f0f0",
                      overflow: "auto",
                      width: "90vw",
                    }}
                  >
                    <CsvToHtmlTable
                      id="csv"
                      data={csvData}
                      csvDelimiter=","
                      tableClassName="table table-striped table-hover box"
                    />
                  </Box>
                );
              }
            })}
          </Grid>
        </Grid>
      </Box>

      <PdfSummrizerModal
        open={openModal}
        setOpen={setOpenModal}
        summarizedText={completionText}
      />
    </>
  );
}

export default ResearchPaperPage;
