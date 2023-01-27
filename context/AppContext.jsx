import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export function Wrapper({ children }) {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");

  return (
    <Context.Provider value={{ currency, setCurrency, symbol, setSymbol }}>
      {children}
    </Context.Provider>
  );
}

export function useAppContext() {
  return useContext(Context);
}
