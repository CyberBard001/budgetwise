import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ResourcesPage from "./pages/ResourcesPage"; // Create this file/component
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resources" element={<ResourcesPage />} />
        {/* Add more routes like: <Route path="/savings" element={<SavingsPage />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
