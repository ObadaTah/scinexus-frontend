// ColorSchemeToggle.js
import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton } from "@mui/joy";
const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();

  const toggleColorScheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    console.log(`Current mode: ${mode}`); // Log current mode
    console.log(`Switching to: ${newMode}`); // Log new mode
    // setMode(newMode);
  };

  return (
    <IconButton onClick={toggleColorScheme}>
      {/* Toggle to {mode === "dark" ? "Light" : "Dark"} Mode */}
      {mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
    </IconButton>
  );
};

export default ColorSchemeToggle;
