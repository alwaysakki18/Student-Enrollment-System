import React from 'react';
import '../styles/About.css';

const About = ({ developer }) => {
  return (
    <div className="tab-content">
      <h2>About the Developer</h2>
      <div className="about-container">
        <div className="developer-card">
          <div className="developer-image">
            <img src={developer.photo} alt={developer.name} />
          </div>
          <div className="developer-info">
            <h3>{developer.name}</h3>
            <p><strong>Address:</strong> {developer.address}</p>
            <p><strong>Education:</strong> {developer.education}</p>
            
            <div className="social-links">
              <a href={developer.social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href={developer.social.github} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> GitHub
              </a>
              <a href={developer.social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href={developer.social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href={developer.social.email}>
                <i className="fas fa-envelope"></i> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;