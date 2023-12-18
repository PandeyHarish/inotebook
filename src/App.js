import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import of the components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NotesState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";


const App = () => {
  

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
};

export default App;
