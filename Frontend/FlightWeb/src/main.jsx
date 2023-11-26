import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sign from "./Components/Sign/Sign.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="561701800707-oiljspvu920o0pfkavpfiedsu7sbrfgj.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
