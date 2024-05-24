import { createContext, useContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
// import { useLocation } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  jwtToken: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        jwtToken: action.payload.jwtToken,
      };
    case "logout":
      Cookies.remove("JWT_TOKEN");
      return { ...state, user: null, isAuthenticated: false, jwtToken: null };
    default:
      throw new Error("Unknown action");
  }
}

const USER = {
  name: "Obada",
  email: "obada@gmail.com",
  password: "Mohammed1234!",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, jwtToken }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const token = Cookies.get("JWT_TOKEN");

  useEffect(() => {
    console.log("Token: ", token);
    if (!token) return;

    async function verifiyToken() {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/verify-token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data["isVerified"]) {
        console.log("Token is valid.");
        dispatch({ type: "login", payload: { USER, jwtToken: token } });
      } else {
        Cookies.remove("JWT_TOKEN");
        throw new Error("Token is not valid");
      }
    }
    verifiyToken();
  }, [token]);

  async function login(email, password) {
    try {
      const jwtToken = await authenticate(email, password);

      if (jwtToken) {
        dispatch({ type: "login", payload: { USER, jwtToken } });
        console.log("Logged in successfully.", isAuthenticated);
      }
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  async function authenticate(email, password) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        // Check if the response status is not in the range 200-299 (success)
        if (response.status === 404) {
          // Handle user not found error
          throw new Error("User not found.");
        } else if (response.status === 401) {
          throw new Error("Invalid credentials.");
        } else {
          // Handle other HTTP errors
          throw new Error("Failed to authenticate. Server error.");
        }
      }
      const data = await response.json();
      return data["jwtToken"];
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, jwtToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
