import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import of the components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";


const App = () => {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home/>} />
          <Route  exact path="/about" element={<About/>} />
        </Routes>
      </BrowserRouter>
     
    </>
  );
};

export default App;
