import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

const logo = `${process.env.PUBLIC_URL}/l3.png`;
const video = `${process.env.PUBLIC_URL}/video2.mp4`;

function Landing() {
  const navigate = useNavigate();

  const handleDiscoverClick = (e) => {
    e.preventDefault();
    // Scroll down smoothly
    window.scrollBy({
      top: window.innerHeight * 0.8, // Scroll down about 80% of viewport height
      behavior: 'smooth'
    });
  };

  const handlePortfolioClick = (e) => {
    e.preventDefault();
    // Navigate to portfolio page
    navigate('/portfolio');
  };

  return (
    <div className='landing-body'>
      <div className="container1">
        <div className="landing-head">
          <div className="logo-container">
            <img src={logo} alt="Greenhall Capital Partners" className="logo-image" />
          </div>
        </div>
        <div className="landing-content">
          <div className="landing-main-content">
            <h3 className='landing-title'>
  Investing in Essential Onsite Services. <br />
  Building for Generations.
</h3>
          </div>
          <div className="landing-secondary-content">
            <p className='landing-second-title'>Greenhall Capital Partners is an operationally focused control buyout investment firm that acquires mission critical and essential onsite services companies in the middle market.</p>
          </div>
        </div>
      </div>
      <div className="container2">
        <video className="container2-video" autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
        </video>
        <div className="container2-overlay"></div>
        <div className="container2-content">
          {/* Your content here */}
        </div>
      </div>
      {/* Bottom Cubes */}
      <div className="hero-home__links">
        <a href="#firm" className="hero-home__link" onClick={handleDiscoverClick}>
          <div className="hero-home__link-content">
            <span className="hero-home__link-text">Discover Greenhall</span>
            <span className="hero-home__link-arrows">
              <span></span>
            </span>
          </div>
        </a>
        <a href="/portfolio" className="hero-home__link" onClick={handlePortfolioClick}>
          <div className="hero-home__link-content">
            <span className="hero-home__link-text">Our Portfolio</span>
            <span className="hero-home__link-arrows">
              <span></span>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Landing;