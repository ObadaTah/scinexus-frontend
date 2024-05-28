import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "react-bootstrap";
import {
  BrowserRouter,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./Components/Generic/Navbar";
import Notifications from "./Components/Generic/Notifications";
import Footer from "./Components/Generic/Footer";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home";
import MyLinks from "./Pages/MyLinks";
import MyProfile from "./Pages/MyProfile";
import NotFound from "./Pages/NotFound";
import Settings from "./Pages/Settings";
import { AuthProvider } from "./Components/contexts/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import RegistrationProcess from "./Pages/Auth/RegistrationProcess";
import AuthPagesHeader from "./Components/Generic/AuthPagesHeader";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";

import { gapi } from "gapi-script";
import AppLayout from "./Components/layouts/AppLayout";
import AdminAppLayout from "./Components/layouts/AdminAppLayout";

import { UserProvider } from "./Components/contexts/UserContext";
import UserProfile from "./Pages/UserProfile";
import AdminLogin from "./Pages/Auth/AdminLogin";
import AdminDashboard from "./Components/Generic/AdminDashboard";
const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d2191c",
    },
    secondary: {
      main: "#1c24de",
    },
  },
});
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationProcess />} />

        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/myLinks" element={<MyLinks />} />
        <Route path="/myProfile" element={<MyProfile />} />

        <Route path="/*" element={<NotFound />} />
      </Route>
    </>
  )
);
// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />

          <Route path="settings" element={<Settings />} />
          <Route path="register" element={<RegistrationProcess />} />
          <Route path="logo" element={<AuthPagesHeader />} />

          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <UserProvider>
                  <AdminAppLayout />
                </UserProvider>
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UserProvider>
                  <AppLayout />
                </UserProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="profile/:userId" element={<UserProfile />} />{" "}
            <Route path="myLinks" element={<MyLinks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
