import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sign from "./Components/Sign/Sign.jsx";
import SeatsPage from "./pages/SeatsPage/SeatsPage.jsx";
import ProfilePage from "./Components/Profile/Profile.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="561701800707-oiljspvu920o0pfkavpfiedsu7sbrfgj.apps.googleusercontent.com">
    <BrowserRouter>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<Sign />} />
          <Route path="/seats" element={<SeatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
