import React from 'react'
import '../styles/Why.css'

const weldingImage = `${process.env.PUBLIC_URL}/why.png`;

function Why() {
  return (
    <section className='why-body'>
      <div className="container">
        <div className="why-wrapper">
          <div className="why-content">
            <div className="why-title">
              <h2>Why We Do It</h2>
            </div>
            
           <div className="why-text">
  <p>Our firm is grounded in a differentiated investment mandate—combining a top-down,
thesis-driven approach with direct, proactive bottom-up sourcing and an operationally
focused buy-and-build strategy. This integrated model enables us to identify high-
conviction themes, originate proprietary opportunities, and create value through
disciplined execution.</p>
  <p>We recognize that trust is the foundation of every successful partnership. Greenhall
Capital is committed to earning and upholding that trust by operating with integrity,
maintaining transparency, and consistently delivering results that meet or exceed
expectations.</p>
</div>
          </div>
          
          <div className="why-visual">
            <img src={weldingImage} alt="Why We Do It" />
          </div>  
        </div>
      </div>
    </section>
  )
}

export default Why