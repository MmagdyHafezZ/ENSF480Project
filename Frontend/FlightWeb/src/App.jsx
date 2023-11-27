import React from 'react'
import Home from './Components/Home/Home.jsx'
import Navbar from './Components/Navbar/Navbar'
import Search from './Components/Search/Search'
import Support from './Components/Support/Support'
import Info from './Components/Info/Info'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <>
      <Navbar />
      <Home/>
      <Search/>
      {/* <Support/>
      <Info/>
      <Footer/> */}
    </>

  )
}
export default App
