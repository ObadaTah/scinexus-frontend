import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StyledEngineProvider } from "@mui/joy/styles";
import "bootstrap/dist/css/bootstrap.min.css";
window.global = window;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);
