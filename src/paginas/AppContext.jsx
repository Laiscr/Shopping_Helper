import React, { createContext, useContext, useReducer } from 'react';

// Defina o contexto
const AppContext = createContext();

// Defina o provedor de contexto
export const AppProvider = ({ initialState, reducer, children }) => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
);

// Crie um gancho personalizado para acessar o estado do contexto
export const useAppContext = () => useContext(AppContext);
