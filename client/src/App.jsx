import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Blog from "./components/Blog";
import About from "./components/About";
import Profile from "./components/Profile";
import Journal from './pages/Journal';
import Appointments from './pages/Appointments'
import Community from './pages/Community'
import Medications from './pages/Medications'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/journal" element={<Journal />} />
        <Route exact path="/appointments" element={<Appointments />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/medications" element={<Medications />} />
      </Routes>
    </Router>
  );
}

export default App;
