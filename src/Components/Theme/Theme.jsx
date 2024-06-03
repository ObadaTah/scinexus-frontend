// theme.js
import { createTheme } from "@mui/material/styles";
import { extendTheme } from "@mui/joy/styles";

// Create Material-UI theme
const materialTheme = createTheme({
  //   palette: {
  //     light: {
  //       primary: {
  //         main: "#1976d2",
  //       },
  //       background: {
  //         default: "#fff",
  //         paper: "#f5f5f5",
  //         nav: "#ffffff", // Define navbar background for light mode
  //       },
  //       text: {
  //         primary: "#000",
  //       },
  //     },
  //     dark: {
  //       primary: {
  //         main: "#90caf9",
  //       },
  //       background: {
  //         default: "#121212",
  //         paper: "#424242",
  //         nav: "#333333", // Define navbar background for dark mode
  //       },
  //       text: {
  //         primary: "#fff",
  //       },
  //     },
  //   },
  //   typography: {
  //     fontSize: 14,
  //     pxToRem: (size) => `${size / 16}rem`,
  //   },
  //   components: {
  //     MuiBox: {
  //       styleOverrides: {
  //         root: ({ theme, ownerState }) => ({
  //           ...(ownerState.customVariant === "navbar" && {
  //             backgroundColor: theme.palette.background.nav,
  //           }),
  //         }),
  //       },
  //     },
  //   },
});

// Extend the Material-UI theme to Joy theme
const joyTheme = extendTheme(materialTheme, {
  //   colorSchemes: {
  //     light: {
  //       palette: {
  //         primary: {
  //           main: "#1976d2",
  //         },
  //         background: {
  //           default: "#fff",
  //           paper: "#f5f5f5",
  //           nav: "#ffffff", // Define navbar background for light mode
  //         },
  //         text: {
  //           primary: "#000",
  //         },
  //       },
  //     },
  //     dark: {
  //       palette: {
  //         primary: {
  //           main: "#90caf9",
  //         },
  //         background: {
  //           default: "#121212",
  //           paper: "#121212",
  //           nav: "#333333", // Define navbar background for dark mode
  //         },
  //         text: {
  //           primary: "#fff",
  //         },
  //       },
  //     },
  //   },
  //   typography: {
  //     fontSize: 14,
  //     pxToRem: (size) => `${size / 16}rem`,
  //   },
  //   components: {
  //     MuiBox: {
  //       styleOverrides: {
  //         root: ({ theme, ownerState }) => ({
  //           ...(ownerState.customVariant === "navbar" && {
  //             backgroundColor: theme.palette.background.nav,
  //           }),
  //         }),
  //       },
  //     },
  //     JoyBox: {
  //       styleOverrides: {
  //         root: ({ theme, ownerState }) => ({
  //           ...(ownerState.customVariant === "navbar" && {
  //             backgroundColor: theme.palette.background.nav,
  //           }),
  //         }),
  //       },
  //     },
  //   },
});

export default joyTheme;
