import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import GoToTop from './components/GoToTop';
import Main from "./pages/Main";
import Profile from './pages/UserProfile'; // Ensure this matches your file name, typically UserProfile.js
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Developers from './pages/Developers';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BMICalculator from './pages/BMICalculator';
import ExercisePredictor from './pages/ExercisePredictor';
import GymEquipments from './pages/GymEquipments'; // Assuming you have a GymEquipments.js
import FitnessPlanner from './pages/FitnessPlanner';
import Dashboard from "./pages/Dashboard";

const App = () => {
  const location = useLocation();

  // Footer visible on all except Main, Login, Signup
  const shouldShowFooter = !(
    location.pathname === '/' ||
    location.pathname === '/main' ||
    location.pathname === '/login' ||
    location.pathname === '/signup'
  );

  return (
    <>
      {/* Header always visible. It handles its own display logic based on current path */}
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/exercise-predictor" element={<ExercisePredictor />} />
        <Route path="/equipment" element={<GymEquipments />} /> {/* Route for GymEquipments */}
        <Route path="/fitness-planner" element={<FitnessPlanner />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <GoToTop />
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default App;