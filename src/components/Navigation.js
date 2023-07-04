import React from 'react';
import { NavLink } from 'react-router-dom';
import logoIcon from '../assets/wave-sound.png';

function Navigation() {
  return (
    <nav>
      <div className="div-logo">
        <img className="logo-img" src={logoIcon} alt="App Icon" />
        <span className="logo">thatSound</span>
      </div>
      <ul className="navbar">
        <li>
          <NavLink to="/Sounds" className="menu-item" activeclassname="active">Sounds</NavLink>
        </li>
        <li>
          <NavLink to="/Details" className="menu-item" activeclassname="active">Details</NavLink>
        </li>
        <li>
          <NavLink to="/About" className="menu-item" activeclassname="active">About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
