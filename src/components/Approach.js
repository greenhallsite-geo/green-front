import React from 'react'
import '../styles/Approach.css'

const approachBg = process.env.PUBLIC_URL + '/approach.png';

function Approach() {
  return (
    <section className='approach-body' id="approach">
      <div className="approach-background">
        <div className="approach-background-image">
          <img src={approachBg} alt="approach" className='approach-image' />
        </div>
      </div>
      <div className="container">
        <div className="approach-wrapper">
          <div className="approach-cards">
            {/* Header Content */}
            <div className="approach-content">
              <strong className="approach-heading">Approach</strong>
              <h2 className="approach-title">
                A Strategic Approach to Building Exceptional Platforms
              </h2>
            </div>

            {/* Card 1 - Market Analysis */}
            <div className="approach-card" style={{backgroundColor: 'rgba(7, 62, 86, 1)'}}>
              <div className="approach-card-text" style={{color: '#ffffff'}}>
                Focused
              </div>
              <p className="approach-card-number" style={{color: '#ffffff'}}>
                01
              </p>
              <div className="approach-card-text" style={{color: '#ffffff'}}>
                <p>Market Analysis</p>
              </div>
            </div>

            {/* Card 2 - Investment Planning */}
            <div className="approach-card" style={{backgroundColor: 'rgba(83, 119, 136, 1)'}}>
              <div className="approach-card-text" style={{color: '#ffffff'}}>
                Strategic
              </div>
              <p className="approach-card-number" style={{color: '#ffffff'}}>
                02
              </p>
              <div className="approach-card-text" style={{color: '#ffffff'}}>
                <p>Investment Planning</p>
              </div>
            </div>

            {/* Card 3 - Operational Excellence */}
            <div className="approach-card" style={{backgroundColor: 'rgba(0, 27, 34, 1)'}}>
              <div className="approach-card-text" style={{color: '#ffffff'}}>
                Operational
              </div>
              <p className="approach-card-number" style={{color: '#ffffff'}}>
                03
              </p>
              <div className="approach-card-text" style={{color: '#ffffff'}}>
                <p>Excellence</p>
              </div>
            </div>

            {/* Card 4 - Partnerships */}
            <div className="approach-card" style={{backgroundColor: 'rgba(255, 255, 255, 1)'}}>
              <div className="approach-card-text" style={{color: '#000000'}}>
                Value-Driven
              </div>
              <p className="approach-card-number" style={{color: '#000000'}}>
                04
              </p>
              <div className="approach-card-text" style={{color: '#000000'}}>
                <p>Partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Approach