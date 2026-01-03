import React from 'react'
import '../styles/Title.css'

function Title() {
  return (
    <div className="title_text">
      <div className="container">
        <div className="title_text__wrapper">
          <div className="title_text__content">
            <h2 className="title_text__title section-title anim-text _anim-items _active">
              Partnering for Impact and Growth
            </h2>
           <p className="title_text__text anim-text _anim-items _active">
  These affiliations reflect our commitment to responsible stewardship, inclusive
  leadership, and continuous improvement across our organization.
  For more information on our ESG policy, please visit:{' '}
  <a 
    href="https://www.greenhallcapital.com/esg-policy" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ color: '#007bff', textDecoration: 'underline' }}
  >
    https://www.greenhallcapital.com/esg-policy
  </a>
</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Title