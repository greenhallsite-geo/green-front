import React from 'react'
import '../styles/Partners.css'

function Partners() {
  return (
    <div className="our-partners">
      <div className="container">
        <div className="our-partners__wrapper">
          <h3 className="our-partners__title anim-text _anim-items _active">
            Partnered with Leading Responsible Investment Organizations
          </h3>
          
          <div className="our-partners__list">
            <div className="our-partners__item anim-text _anim-items _active">
              <div className="our-partners__logo">
                <img 
                  width="351" 
                  height="66" 
                  src="https://durationcapitalpartners.com/wp-content/uploads/2024/06/Principles_for_Respo.svg" 
                  className="attachment-full size-full" 
                  alt="Principles for Respo" 
                  title="Principles for Respo" 
                  decoding="async"
                />
              </div>
            </div>
            
            <div className="our-partners__item anim-text _anim-items _active">
              <div className="our-partners__logo">
                <img 
                  width="228" 
                  height="163" 
                  src="https://durationcapitalpartners.com/wp-content/uploads/2024/06/gresb-infrastructure.svg" 
                  className="attachment-full size-full" 
                  alt="gresb infrastructure" 
                  title="gresb infrastructure" 
                  decoding="async"
                />
              </div>
            </div>
          </div>
          
          <div className="our-partners__footnote anim-text _anim-items _active">
            <p>
              Third-party logos included herein are provided for illustrative purposes only. 
              Inclusion of such logos does not imply affiliation with or endorsement by such firms or businesses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partners;