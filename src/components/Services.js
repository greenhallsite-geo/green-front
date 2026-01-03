import React from 'react'
import '../styles/Services.css'

function Services() {
  return (
    <div className="service-blocks" id="Services">
      <div className="service-container">
        <div className="service-blocks__wrapper">
          <strong className="service-blocks__heading">
            Criteria
          </strong>
          
          <div className="service-blocks__cards">
            {/* Content Section (Spans 2 columns) */}
            <div className="service-blocks__content">
              <h2 id='service-title'>
               Essential Onsite Services
              </h2>
              <p className="service-blocks__text">
                We rigorously validate every investment thesis, engage deeply with market participants and partner only with top-tier operators. Our disciplined process and certainty of execution drive consistently strong results.
              </p>
            </div>
            
            {/* Card 1 - Transaction Size */}
            <div className="service-blocks__card service-blocks__card--type3" style={{backgroundColor: 'rgba(53, 86, 59, 1)'}}>
              <p className="service-subtitle" style={{color: '#ffffff'}}>
               Transaction Size
              </p>
              <div className="service-blocks__card-text" style={{color: '#ffffff'}}>
                <p>Enterprise value of $50 to $500 million</p>
                <p>EBITDA of at least $10 million</p>
              </div>
            </div>

            {/* Card 2 - Equity Check */}
            <div className="service-blocks__card service-blocks__card--type3 service-blocks__card--border-top" style={{backgroundColor: 'rgba(255, 255, 255, 1)'}}>
              <p className="service-subtitle" style={{color: '#000000'}}>
                Equity Check <br/> $35M – $150M
              </p>
            </div>

            {/* Card 3 - Deal Type */}
            <div className="service-blocks__card service-blocks__card--type3" style={{backgroundColor: 'rgba(0, 27, 34, 1)'}}>
              <p className="service-subtitle" style={{color: '#ffffff'}}>
               Deal Type
              </p>
              <div className="service-blocks__card-text" style={{color: '#ffffff'}}>
                <p>Control buyouts and leveraged recapitalizations</p>
                <p>Strategic add-on acquisitions</p>
              </div>
            </div>

            {/* Card 4 - Company Characteristics */}
            <div className="service-blocks__card service-blocks__card--type3 service-blocks__card--border-top" style={{backgroundColor: 'rgba(255, 255, 255, 1)'}}>
              <p className="service-subtitle" style={{color: '#000000'}}>
                Company Characteristics
              </p>
              <div className="service-blocks__card-text" style={{color: '#000000'}}>
                <p>Recurring Revenues</p>
                <p>Scalable Margins</p>
                <p>High Switching Costs</p>
                <p>Low Capital Intensity</p>
              </div>
            </div>

            {/* Card 5 - Technology */}
            <div className="service-blocks__card service-blocks__card--type3" style={{backgroundColor: 'rgba(86, 127, 109, 0.2)'}}>
              <p className="service-subtitle" style={{color: '#000000'}}>
               Technology / Telecom
              </p>
              <div className="service-blocks__card-text" style={{color: '#000000'}}>
                <p>Infrastructure Services</p>
                <p>Payments</p>
                <p>IT & Tech-Enabled Svcs</p>
                <p>MRO Services</p>
              </div>
            </div>

            {/* Card 6 - Industrials */}
            <div className="service-blocks__card service-blocks__card--type3 service-blocks__card--border-top" style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>
              <p className="service-subtitle" style={{color: '#000000'}}>
                Industrials
              </p>
              <div className="service-blocks__card-text" style={{color: '#000000'}}>
                <p>Gov, State & Local</p>
                <p>Residential & Commercial</p>
                <p>Testing & Inspection</p>
                <p>Distribution & Logistics</p>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div className="service-blocks__footnote">
            <p>Our proven approach is designed to build and develop scalable platforms for growth through add-on acquisitions, efficient integration, organic growth initiatives and performance improvements.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services;