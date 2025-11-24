import React, { useEffect, useRef, useState } from 'react'
import '../styles/Firm.css'

const craneLeft = `${process.env.PUBLIC_URL}/firm2.jpg`;
const craneRight = `${process.env.PUBLIC_URL}/firm.jpg`;
const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function Firm() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate 4.1B
            animateValue(setCount1, 0, 4.1, 2000, true);
            
            // Animate 17
            animateValue(setCount2, 0, 17, 2000);
            
            // Animate 21
            animateValue(setCount3, 0, 21, 2000);
            
            // Animate 15
            animateValue(setCount4, 0, 15, 2000);

            // Immediately disconnect after first trigger
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

  const animateValue = (setter, start, end, duration, isBillion = false) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setter(isBillion ? '4.1B' : Math.round(end));
        clearInterval(timer);
      } else {
        setter(isBillion ? `${current.toFixed(1)}B` : Math.round(current));
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
                At Greenhall Capital, we are dedicated to providing our 
                clients with innovative investment solutions. We combine 
                strategic insight with a commitment to exceptional client 
                service to meet the unique needs of each individual and institution
                we serve.
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
                ${count1}
              </p>
              <div className="firm-card-text" style={{color: '#ffffff'}}>
                <p>Assets Under</p>
                <p>Management</p>
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
                {count4}
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