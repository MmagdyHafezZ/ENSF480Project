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
import FlightsPage from "./pages/Flights/FlightsPage.jsx";
import TicketDetails from "./pages/TicketDetails/TicketDetails.jsx";
import AllReservations from "./Components/Profile/AllReservations.jsx";
import MembershipBenefits from "./Components/Profile/MembershipBenefits.jsx";
import SystemAdmin from "./pages/SystemAdmin/SystemAdmin.jsx";
import AboutPage from "./Components/About/About.jsx";
import OffersPage from "./Components/Offers/Offers.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="561701800707-oiljspvu920o0pfkavpfiedsu7sbrfgj.apps.googleusercontent.com">
    <BrowserRouter>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<Sign />} />
          <Route path="/seats" element={<SeatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/tickets" element={<TicketDetails />} />
          <Route path="/reservations" element={<AllReservations />} />
          <Route path="/membership" element={<MembershipBenefits />} />
          <Route path="/admin" element={<SystemAdmin />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/offers" element={<OffersPage />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
