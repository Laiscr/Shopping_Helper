// ValorContext.js
import React, { createContext, useContext, useState } from 'react';

const ValorContext = createContext();

export function useValor() {
  return useContext(ValorContext);
}

export function ValorProvider({ children }) {
  const [valorInserido, setValorInserido] = useState('');

  return (
    <ValorContext.Provider value={{ valorInserido, setValorInserido }}>
      {children}
    </ValorContext.Provider>
  );
}
