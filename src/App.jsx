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
                {/* <Route path="/myOrganization" element={<MyOrganization />} /> */}
                <Route path="/*" element={<NotFound />} />
            </Route>
        </>
    )
);
// function App() {
//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <RouterProvider router={router} />
//             <BrowserRouter>
//                 <Footer />
//             </BrowserRouter>
//         </ThemeProvider>
//     );
// }

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

const GOOGLE_CLIENT_ID =
    "967690221322-dsvnfd0q6b0o3tk6m3akq59nteidgaqd.apps.googleusercontent.com";
function App() {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: GOOGLE_CLIENT_ID,
                scope: "",
            });
        }

        gapi.load("client:auth2", start);
    });
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<Login />} />

                        {/* <Route path="register5" element={<Register />} />
          <Route path="register2" element={<RegisterAcademicStep2 />} />
          <Route path="register1" element={<FirstRegistrationStep />} />
          <Route path="register3" element={<RegisterAcademicStep3 />} /> */}
                        <Route path="settings" element={<Settings />} />
                        <Route
                            path="register"
                            element={<RegistrationProcess />}
                        />
                        <Route path="logo" element={<AuthPagesHeader />} />
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
