import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext"; // Adjust the path according to your project structure

// Define the initial state
const initialState = {
  id: null,
  createDateTime: null,
  updateDateTime: null,
  firstName: "",
  status: null,
  lastName: "",
  username: "",
  email: "",
  profilePicture: null,
  profileCover: null,
  bio: null,
  phoneNumber: "",
  fieldOfWork: null,
  locked: null,
  enabled: null,
  userSettings: null,
  role: "",
  badge: null,
  education: null,
  position: null,
  type: "",
  verified: null,
  languages: [],
  contactEmail: null,
  contactPhoneNumber: null,
  authorities: [],
  accountNonLocked: true,
  skills: [],
};

// Define action types
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

// Define the reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case UPDATE_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Create the UserContext with an undefined initial value
const UserContext = createContext(undefined);

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const { jwtToken } = useAuth();
  const [user, dispatch] = useReducer(userReducer, initialState);

  const setUser = (userData) => {
    console.log("USER DATA FROM SETTER", userData);
    dispatch({ type: SET_USER, payload: userData });
  };

  const updateUser = (updatedData) => {
    dispatch({ type: UPDATE_USER, payload: updatedData });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/users/userinfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        console.log("USER DATA FROM FETCH BEFORE", userData);
        if (userData.profilePicture)
          userData.profilePicture = `http://localhost:8080/medias/${userData.profilePicture.id}/files`;

        console.log("USER DATA FROM FETCH AFTER", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (jwtToken) {
      fetchUserData();
    }
  }, [jwtToken]);

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {console.log("User From Context:", user)}
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
