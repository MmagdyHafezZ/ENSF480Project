import React from "react";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar";
import Search from "./Components/HomeComponents/Search/Search";
import Hero from "./Components/HomeComponents/Hero/Hero.jsx";
import Support from "./Components/Support/Support";
import Info from "./Components/Info/Info";
import Footer from "./Components/HomeComponents/Footer/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Search />
      <Hero />
      <Footer />
      {/* <Support/>
      <Info/>
      <Footer/> */}
    </>
  );
};
export default App;
