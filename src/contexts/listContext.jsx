import React, { useState } from "react";

export const ListContext = React.createContext(null);

export default function ListContextProvider({ children }) {
  const [contextList, setContextList] = useState(
    JSON.parse(localStorage.getItem("list"))
  );

  return (
    <ListContext.Provider
      value={{
        contextList,
        setContextList
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
