import React, { useEffect, useRef, useState } from 'react'
import '../styles/Firm.css'

const craneLeft = `${process.env.PUBLIC_URL}/firm2.jpg`;
const craneRight = `${process.env.PUBLIC_URL}/firm.jpg`;
const logo = `${process.env.PUBLIC_URL}/l1.png`;

function Firm() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const sectionRef = useRef(null);

  // SET YOUR SPEED HERE (in milliseconds)
  // 2000 = 2 seconds (Fast)
  // 4000 = 4 seconds (Slow)
  const ANIMATION_DURATION = 4000; 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. Firm Founded (2018)
            animateValue(setCount1, 2000, 2018, ANIMATION_DURATION, true);
            
            // 2. Team Members (6)
            animateValue(setCount2, 0, 8, ANIMATION_DURATION);
            
            // 3. Industry Specialists (9)
            animateValue(setCount3, 0, 9, ANIMATION_DURATION);
            
            // 4. Investments (12)
            animateValue(setCount4, 0, 12, ANIMATION_DURATION);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const animateValue = (setter, start, end, duration, isYear = false) => {
    const range = end - start;
    // 16ms is approximately 1 frame (60fps)
    // We calculate how much to add per frame
    const totalFrames = duration / 16; 
    const increment = range / totalFrames; 
    
    let current = start;

    const timer = setInterval(() => {
      current += increment;

      if (current >= end) {
        // Ensure we land exactly on the end number
        setter(Math.round(end));
        clearInterval(timer);
      } else {
        // Update state
        setter(Math.round(current));
      }
    }, 16);
  };

  return (
    <div className='firm-body' id="firm" ref={sectionRef}>
      <div className="container">
        <div className="firm-wrapper">
          <strong className="firm-heading">firm</strong>
          
          <div className="firm-cards">
            {/* What We Do - Text Block */}
            <div className="firm-content firm-content--border">
              <h2 className="firm-title">What We Do</h2>
              <p className="firm-text">
               At Greenhall Capital, we make control investments in leading North American middle
market business services companies, executing a disciplined buy-and-build strategy to
accelerate growth and scale. Our differentiated model combines sector-focused
expertise across technology, telecommunications, and industrial services with
thematic investment insights and a rigorous approach to value creation.
              </p>
            </div>
            
            {/* Image Card 1 */}
            <div className="firm-card firm-card--type1">
              <div className="firm-card-image">
                <img src={craneLeft} alt="crane left" />
              </div>
            </div>
            
            {/* Image Card 2 with Logo */}
            <div className="firm-card firm-card--type2">
              <div className="firm-card-image">
                <img src={craneRight} alt="crane right" />
              </div>
              <div className="firm-card-logo">
                <img src={logo} alt="logo" />
              </div>
            </div>
            
            {/* Stats Card 1 - Black */}
            <div className="firm-card firm-card--type3" style={{backgroundColor: '#000000'}}>
              <p className="firm-card-number" style={{color: '#ffffff'}}>
                {count1}
              </p>
              <div className="firm-card-text" style={{color: '#ffffff'}}>
                <p>Firm Founded</p>
              </div>
            </div>
            
            {/* Stats Card 2 - White */}
            <div className="firm-card firm-card--type3" style={{backgroundColor: '#ffffff'}}>
              <p className="firm-card-number" style={{color: '#000000'}}>
                {count2}
              </p>
              <div className="firm-card-text" style={{color: '#000000'}}>
                <p>Team</p>
                <p>Members</p>
              </div>
            </div>
            
            {/* Stats Card 3 - Light Green */}
            <div className="firm-card firm-card--type3" style={{backgroundColor: 'rgba(86, 127, 109, 0.2)'}}>
              <p className="firm-card-number" style={{color: '#000000'}}>
                {count3}
              </p>
              <div className="firm-card-text" style={{color: '#000000'}}>
                <p>Industry</p>
                <p>Specialists</p>
              </div>
            </div>
            
            {/* Stats Card 4 - White with border */}
            <div className="firm-card firm-card--type3 firm-card--border-bottom" style={{backgroundColor: '#ffffff'}}>
              <p className="firm-card-number" style={{color: '#000000'}}>
                {count4} +
              </p>
              <div className="firm-card-text" style={{color: '#000000'}}>
                <p>Investments</p>
                <p>to Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Firm