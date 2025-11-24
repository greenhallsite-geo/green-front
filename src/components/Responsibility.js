import React from 'react'
import '../styles/Responsibility.css'

function Responsibility() {
  return (
    <div className="four-blocks" id="responsibility">
      <div className="container">
        <div className="four-blocks__wrapper">
          <strong className="four-blocks__heading anim-text _anim-items _active">
            COMMITMENT
          </strong>
          
          <div className="four-blocks__cards">
            <div className="four-blocks__content">
              <h2 className="four-blocks__title section-title anim-text _anim-items _active">
                Partnering for Growth and Value Creation
              </h2>
              <div className="four-blocks__text anim-text _anim-items _active">
                <div className="four-blocks__text-left">
                  <p>
                    Greenhall Capital Partners is committed to working closely with management teams to execute strategic plans that drive growth and success. Our approach involves identifying and optimizing core competencies by leveraging our deep industry knowledge and extensive experience across business cycles.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 1 - Generational Capital */}
            <div 
              className="four-blocks__card four-blocks__card--type3 anim-text _anim-items _active" 
              style={{ backgroundColor: 'rgba(0, 27, 34, 1)' }}
            >
              <p className="four-blocks__card-number" style={{ color: '#ffffff' }}>
                01
              </p>
              <div className="four-blocks__card-text" style={{ color: '#ffffff' }}>
                <p>Generational</p>
                <p>Capital</p>
              </div>
            </div>
            
            {/* Card 2 - Business Continuity */}
            <div 
              className="four-blocks__card four-blocks__card--type3 anim-text _anim-items four-blocks__card--border-top _active" 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
            >
              <p className="four-blocks__card-number" style={{ color: '#000000' }}>
                02
              </p>
              <div className="four-blocks__card-text" style={{ color: '#000000' }}>
                <p>Business</p>
                <p>Continuity</p>
              </div>
            </div>
            
            {/* Card 3 - Advisor Group */}
            <div 
              className="four-blocks__card four-blocks__card--type3 anim-text _anim-items _active" 
              style={{ backgroundColor: 'rgba(83, 118, 137, 0.3)' }}
            >
              <p className="four-blocks__card-number" style={{ color: '#000000' }}>
                03
              </p>
              <div className="four-blocks__card-text" style={{ color: '#000000' }}>
                <p>Value Add</p>
                <p>Advisor Group</p>
              </div>
            </div>
            
            {/* Card 4 - Collaboration */}
            <div 
              className="four-blocks__card four-blocks__card--type3 anim-text _anim-items four-blocks__card--border-top _active" 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
            >
              <p className="four-blocks__card-number" style={{ color: '#000000' }}>
                04
              </p>
              <div className="four-blocks__card-text" style={{ color: '#000000' }}>
                <p>Collaboration</p>
                <p>& Execution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Responsibility