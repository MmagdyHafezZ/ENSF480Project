import React from "react";
import Home from "./pages/Home/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import SeatsPage from "./pages/SeatsPage/SeatsPage.jsx";
import Sign from "./pages/Sign/Sign.jsx";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/seats" element={<SeatsPage />} />
      </Routes>
    </>
  );
};
export default App;
