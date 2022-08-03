import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import ListContextProvider from "./contexts/listContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ListContextProvider>
      <App />
    </ListContextProvider>
  </StrictMode>
);
