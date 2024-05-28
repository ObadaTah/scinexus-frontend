import { createContext, useContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  jwtToken: null,
  isLoading: true, // Add loading state
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role,
        isAuthenticated: true,
        jwtToken: action.payload.jwtToken,
        isLoading: false, // Set loading to false on login
      };
    case "logout":
      Cookies.remove("JWT_TOKEN");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        jwtToken: null,
        isLoading: false,
      }; // Set loading to false on logout
    case "loading":
      return { ...state, isLoading: true }; // Handle loading state
    case "stop-loading":
      return { ...state, isLoading: false }; // Stop loading state
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
  const [{ user, isAuthenticated, role, jwtToken, isLoading }, dispatch] =
    useReducer(reducer, initialState);
  const token = Cookies.get("JWT_TOKEN");

  useEffect(() => {
    if (!token) {
      dispatch({ type: "stop-loading" }); // Stop loading if no token
      return;
    }

    async function verifyToken() {
      dispatch({ type: "loading" }); // Start loading
      try {
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
          dispatch({
            type: "login",
            payload: { user: USER, jwtToken: token, role: data["role"] },
          });
        } else {
          Cookies.remove("JWT_TOKEN");
          dispatch({ type: "logout" });
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        Cookies.remove("JWT_TOKEN");
        dispatch({ type: "logout" });
      } finally {
        dispatch({ type: "stop-loading" }); // Stop loading after verification
      }
    }
    verifyToken();
  }, [token]);

  async function login(email, password) {
    try {
      const { jwtToken, role } = await authenticate(email, password);
      if (jwtToken) {
        dispatch({ type: "login", payload: { user: USER, jwtToken, role } });
        Cookies.set("JWT_TOKEN", jwtToken);
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
            email,
            password,
          }),
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found.");
        } else if (response.status === 401) {
          throw new Error("Invalid credentials.");
        } else {
          throw new Error("Failed to authenticate. Server error.");
        }
      }
      const data = await response.json();
      return { jwtToken: data["jwtToken"], role: data["role"] };
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role,
        login,
        jwtToken,
        logout,
        isLoading,
      }}
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
