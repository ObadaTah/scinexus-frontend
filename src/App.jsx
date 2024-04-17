import { createTheme } from "@mui/material/styles";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./Components/Generic/Navbar";
import Notifications from "./Components/Generic/Notifications";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import MyProfile from "./Pages/MyProfile";
import Home from "./Pages/Home";
import MyLinks from "./Pages/MyLinks";
import NotFound from "./Pages/NotFound";
import Settings from "./Pages/Settings";

const defaultTheme = createTheme();
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/myLinks" element={<MyLinks />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/myProfile" element={<MyProfile />} />
            {/* <Route path="/myOrganization" element={<MyOrganization />} /> */}
            <Route path="/*" element={<NotFound />} />
        </Route>
    )
);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
