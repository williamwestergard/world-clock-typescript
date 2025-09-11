import './App.css'
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import TimeAndCity from "./components/ChooseCity";
import CityPage from "./pages/CityPage";
import FavoritesPage from "./pages/FavoritesPage"
import Footer from "./components/Footer";

function App() {
  return (
    <Router basename="/world-clock-typescript/">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<StartPage />} />
         <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/city-page" element={<CityPage />} />
        <Route path="/city/:cityName" element={<CityPage />} />
        <Route path="*" element={<TimeAndCity />} /> 
      </Routes>
       <Footer />
    </Router>
   
  );
}

export default App;