import React from 'react';
import { Link } from 'react-router-dom'; // optional if you want the logo to be clickable

function Logo({ width = "100px" }) {
  return (
    <Link to="/" className="inline-block">
      <img
        src="https://images.pexels.com/photos/33157947/pexels-photo-33157947.jpeg" // Replace with your actual logo path
        alt="Logo"
        width={width}
        className="object-contain"
      />
    </Link>
  );
}

export default Logo;
