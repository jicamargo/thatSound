import React from 'react';
import { FaGithub } from 'react-icons/fa';
import '../css/About.css';
import logoImg from '../assets/thatsoundlogo.png';

const About = () => (
  <section className="about-page_main">
    <section className="about-page__info">
      <div className="about-page__logo">
        <img className="about-page__logo-img" src={logoImg} alt="app logo" />
      </div>
      <div className="about-page__description">
        <p>This app allows you to explore and download sounds from Freesound.org.</p>
      </div>
      <div className="about-page__instructions">
        <h2>Instructions</h2>
        <ul>
          <li>Search for sounds using the search bar</li>
          <li>Click on a sound card to view details</li>
          <li>Download sounds by clicking the download button</li>
          <li>Use the audio player to listen to the sound previews</li>
        </ul>
      </div>
      <div className="about-page__credits">
        <h2>About the Developer</h2>
        <p>Jorge Camargo</p>
        <a href="https://github.com/jicamargo" className="github_link" rel="noopener noreferrer">
          <FaGithub className="github-icon" />
          {' '}
          Visit my GitHub
        </a>
      </div>
      <div className="about-page__freesound-credits">
        <h2>Credits</h2>
        <p>Sounds provided by Freesound.org</p>
      </div>
    </section>
  </section>
);

export default About;
