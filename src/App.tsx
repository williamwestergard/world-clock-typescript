import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import CityClock from "./components/ChooseCity";
import StartPage from "./pages/StartPage";
import CityPage from "./pages/CityPage";
import TimeList from "./components/TimeList";


const App: React.FC = () => {
  return (
    <> <CityClock   />
         <TimeList />
    <Router basename="/world-clock-typescript">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/city-page" element={<CityPage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App


