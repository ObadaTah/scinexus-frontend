import { Outlet } from "react-router-dom";
import Navbar from "../Generic/Navbar";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

function AppLayout() {
  return (
    <div>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Navbar />
        <Outlet />
      </CssVarsProvider>
    </div>
  );
}

export default AppLayout;
