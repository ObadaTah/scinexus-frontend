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
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home";
import MyLinks from "./Pages/MyLinks";
import MyProfile from "./Pages/MyProfile";
import NotFound from "./Pages/NotFound";
import Settings from "./Pages/Settings";
import { AuthProvider } from "./Components/contexts/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import RegistrationProcess from "./Pages/Auth/RegistrationProcess";
import AuthPagesHeader from "./Components/Generic/AuthPagesHeader";
import { Box } from "@mui/system";
import AppLayout from "./Components/layouts/AppLayout";
import AdminAppLayout from "./Components/layouts/AdminAppLayout";
import Sidebar from "./Components/Chatting/Components/Sidebar";
import Header from "./Components/Chatting/Components/Header";
import { UserProvider } from "./Components/contexts/UserContext";
import UserProfile from "./Pages/UserProfile";
import AdminDashboard from "./Components/Generic/AdminDashboard";
import MyMessages from "./Components/Chatting/Components/MyMessages";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import ChatLayout from "./Components/layouts/ChatLayout";
import ResearchPaperPage from "./Pages/ResearchPaperPage";
import ArticlePage from "./Pages/ArticlePage";
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
            path="/"
            element={
              <ProtectedRoute>
                <UserProvider>
                  <ChatLayout />
                </UserProvider>
              </ProtectedRoute>
            }
          >
            <Route
              path="chatting"
              element={
                <CssVarsProvider disableTransitionOnChange>
                  <CssBaseline />
                  <Box sx={{ display: "flex", minHeight: "100dvh" }}>
                    <Sidebar />
                    <Header />
                    <Box
                      component="main"
                      className="MainContent"
                      sx={{ flex: 1 }}
                    >
                      <MyMessages />
                    </Box>
                  </Box>
                </CssVarsProvider>
              }
            />
          </Route>
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
                    <Route path="nav" element={<Navbar />} />
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
                        <Route
                            path="research-paper"
                            element={<ResearchPaperPage />}
                        />
                        <Route path="article" element={<ArticlePage />} />

                        <Route path="myLinks" element={<MyLinks />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
