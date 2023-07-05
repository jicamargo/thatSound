import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__links">
        <Link to="/sounds" className="footer__link">
          Sounds
        </Link>
        <Link to="/Details" className="footer__link">
          Details
        </Link>
        <Link to="/about" className="footer__link">
          About
        </Link>
      </div>
      <p className="footer__text">© 2023 JIC Software | All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
