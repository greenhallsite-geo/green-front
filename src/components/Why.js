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
  <p>Our firm is committed to delivering healthy returns on invested capital and providing unique solutions to the challenges our clients face.</p>
  <p>We understand that trust is paramount in our industry, and we work diligently to earn and maintain that trust by delivering results and exceeding expectations.</p>
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