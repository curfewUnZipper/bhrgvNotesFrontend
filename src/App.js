import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Alert from "./Components/Alert";
import Signup from './Components/Signup';
import Login from './Components/Login';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NoteState from "./Context/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert message=" This Application is under Development" />
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
