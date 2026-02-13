import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./css/index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster richColors position="top-center" />

    <App />
  </StrictMode>,
);
