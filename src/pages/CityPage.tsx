import React from "react";
import { Link } from "react-router-dom";

const CityPage: React.FC = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This app is built with React + TypeScript + React Router.</p>
      <Link to="/">Back to Start Page</Link>
    </div>
  );
};

export default CityPage;