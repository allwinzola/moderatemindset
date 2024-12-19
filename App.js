import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./MenNavBar/MenNavBar"; 
import Login from "./MenLogin/MenLogin"; 
import CheckInForm from "./CheckInForm/CheckInForm"; 
import Dashboard from "./Dashboard/Dashboard"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/checkin" element={<CheckInForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
