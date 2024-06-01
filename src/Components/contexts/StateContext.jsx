import React, { createContext, useState, useContext } from "react";

// Create a context
const StateContext = createContext();

// Create a provider component
export const StateProvider = ({ children }) => {
  const [journalModalOpen, setJournalModalOpen] = useState(false);

  return (
    <StateContext.Provider value={{ journalModalOpen, setJournalModalOpen }}>
      {children}
    </StateContext.Provider>
  );
};

// Create a custom hook to use the StateContext
export const useStateContext = () => {
  return useContext(StateContext);
};
