import React from "react";
import { Link } from "react-router-dom";

const StartPage: React.FC = () => {
  return (
    <div>
      <h1>Start Page</h1>
      <p>Welcome to the app 🚀</p>
      <Link to="/city-page">Go to About Page</Link>
    </div>
  );
};

export default StartPage;