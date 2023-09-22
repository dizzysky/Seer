import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">© 2023 Sanjid Dewan</p>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/sanjiddewan/" className="footer-link">LinkedIn</a>
        <a href="https://github.com/dizzysky" className="footer-link">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
