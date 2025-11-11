import React from 'react'
import '../styles/Landing.css'

const video = `${process.env.PUBLIC_URL}/video.mp4`;

function Landing() {
  return (
    <div className='landing-body'>
      <div className="container1">
        <div className="landing-head">
          <div className="logo1">
            <h1>GCP</h1>
          </div>
          <div className="logo2">
            <h1>Greenhall</h1>
            <p>capital partners</p>
          </div>
        </div>
        <div className="landing-content">
          <div className="landing-main-content">
            <h3 className='landing-title'>Valued Management for the Future</h3>
          </div>
          <div className="landing-secondary-content">
            <p className='landing-second-title'>Greenhall Capital Partners is an operationally focused control buyout platform that invests in mission critical and essential services companies in the middle market.</p>
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
  <a href="#firm" className="hero-home__link">
    <div className="hero-home__link-content">
      <span className="hero-home__link-text">Discover GCP</span>
      <span className="hero-home__link-arrows">
        <span></span>
      </span>
    </div>
  </a>
  
  <a href="/portfolio" className="hero-home__link">
    <div className="hero-home__link-content">
      <span className="hero-home__link-text">Our Portfolio</span>
      <span className="hero-home__link-arrows">
        <span></span>
      </span>
    </div>
  </a>
</div>
    </div>
  )
}

export default Landing