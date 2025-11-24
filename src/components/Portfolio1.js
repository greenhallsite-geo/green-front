import React from 'react'
import '../styles/Portfolio1.css'

function Portfolio1() {
  return (
    <div className="six-blocks" id="Portfolio">
      <div className="container">
        <div className="six-blocks__wrapper">
          <strong className="six-blocks__heading">
            Investment Strategy
          </strong>
          
          <div className="six-blocks__cards">
            {/* Content Section */}
            <div className="six-blocks__content">
              <h2 className="six-blocks__title">
                Transforming Vision into Value
              </h2>
              <p className="six-blocks__text">
                Our vision and strategy is centered around identifying transformative opportunities and driving sustainable growth. We focus on aligning our strategic objectives with market trends and industry dynamics to create lasting value.
              </p>
            </div>
            
            {/* Card 1 - $1B+ Market */}
            <div className="six-blocks__card six-blocks__card--type3" style={{backgroundColor: 'rgba(53, 86, 59, 1)'}}>
              <p className="six-blocks__card-number" style={{color: '#ffffff'}}>
                $1B+
              </p>
              <div className="six-blocks__card-text" style={{color: '#ffffff'}}>
                <p>Total Addressable</p>
                <p>Market</p>
              </div>
            </div>

            {/* Card 2 - EBITDA Range */}
            <div className="six-blocks__card six-blocks__card--type3 six-blocks__card--border-top" style={{backgroundColor: 'rgba(255, 255, 255, 1)'}}>
              <p className="six-blocks__card-number" style={{color: '#000000'}}>
                $9-24M
              </p>
              <div className="six-blocks__card-text" style={{color: '#000000'}}>
                <p>Target</p>
                <p>EBITDA</p>
              </div>
            </div>

            {/* Card 3 - Gross Margins */}
            <div className="six-blocks__card six-blocks__card--type3" style={{backgroundColor: 'rgba(0, 27, 34, 1)'}}>
              <p className="six-blocks__card-number" style={{color: '#ffffff'}}>
                30%+
              </p>
              <div className="six-blocks__card-text" style={{color: '#ffffff'}}>
                <p>Gross</p>
                <p>Margins</p>
              </div>
            </div>

            {/* Card 4 - EBITDA Margins */}
            <div className="six-blocks__card six-blocks__card--type3 six-blocks__card--border-top" style={{backgroundColor: 'rgba(255, 255, 255, 1)'}}>
              <p className="six-blocks__card-number" style={{color: '#000000'}}>
                10%+
              </p>
              <div className="six-blocks__card-text" style={{color: '#000000'}}>
                <p>EBITDA</p>
                <p>Margins</p>
              </div>
            </div>

            {/* Card 5 - FCF Conversion */}
            <div className="six-blocks__card six-blocks__card--type3" style={{backgroundColor: 'rgba(86, 127, 109, 0.2)'}}>
              <p className="six-blocks__card-number" style={{color: '#000000'}}>
                90%+
              </p>
              <div className="six-blocks__card-text" style={{color: '#000000'}}>
                <p>FCF</p>
                <p>Conversion</p>
              </div>
            </div>

            {/* Card 6 - Geography */}
            <div className="six-blocks__card six-blocks__card--type3 six-blocks__card--border-top" style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>
              <p className="six-blocks__card-number" style={{color: '#000000'}}>
                US/CA
              </p>
              <div className="six-blocks__card-text" style={{color: '#000000'}}>
                <p>United States &</p>
                <p>Canada Focus</p>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div className="six-blocks__footnote">
            <p>Our proven approach is designed to build and develop scalable platforms for growth through add-on acquisitions, efficient integration, organic growth initiatives and performance improvements. When it comes to investing, we believe that Collaboration, Alignment and Execution matters.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio1;