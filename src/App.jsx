import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import Header from "./components/Header"; // ✅
import Auth from "./pages/Auth";


const App = () => {
  return (
    <Router>
      <Header /> {/* ✅ Виводимо шапку всюди */}
      <Routes>
      <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;