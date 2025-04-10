// UserInputContext.js
import React, { createContext, useState } from 'react';

export const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  const [userInputs, setUserInputs] = useState({});

  return (
    <UserInputContext.Provider value={{ userInputs, setUserInputs }}>
      {children}
    </UserInputContext.Provider>
  );
};