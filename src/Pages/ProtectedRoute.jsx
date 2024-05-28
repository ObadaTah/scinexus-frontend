import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/contexts/AuthContext";
import { CircularProgress } from "@mui/joy";
function ProtectedRoute({ children }) {
  const { isAuthenticated, role, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {" "}
        <CircularProgress />
      </div>
    ); // Display a loading indicator while verifying token
  }

  if (!isAuthenticated) {
    return navigate("/login");
  }

  return children;
  // useEffect(
  //   function () {
  //     console.log("isAuthenticated", isAuthenticated);
  //     if (!isAuthenticated) navigate("/login");
  //   },
  //   [isAuthenticated, navigate]
  // );

  // return isAuthenticated ? children : null;
}

export default ProtectedRoute;
