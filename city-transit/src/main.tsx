import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { StopsProvider } from "./context/StopsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StopsProvider>
        <App />
      </StopsProvider>
    </BrowserRouter>
  </StrictMode>
);