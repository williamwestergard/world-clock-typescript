import React from "react";
import { Link } from "react-router-dom";
import CityClock from "../components/ChooseCity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const Navbar: React.FC = () => {
  return (
    <section className="navbar-container">
      <article className="logo-container">
        <FontAwesomeIcon icon={faClock} className="logo-clock-icon"/>
        <h1>World Clock</h1>
        <p>The time around the world</p>
      </article>


      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

   
      <CityClock />

    </section>
  );
};

export default Navbar;
