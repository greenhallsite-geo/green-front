import React from 'react';
import '../styles/History.css';
const pic = `${process.env.PUBLIC_URL}/gr5.png`;

function History() {
  return (
    <section className="our-history">
      <div className="container">
        <div className="our-history__wrapper anim-text _anim-items _active">
          <div className="our-history__content">
            <div className="our-history__title">
              <h2>Our History</h2>
            </div>
            <div className="our-history__text">
              <p>
              Greenhall’s foundation and guiding principles were first shaped during an early
discussion over light fare atop the Hay-Adams Hotel in Washington, D.C. From that
moment, our mission was clear: to deliver superior returns for our investors, exceptional
service to our portfolio companies and meaningful growth opportunities for our people.
              </p>
              <p>
             What began as a simple yet ambitious vision has become the cornerstone of our firm.
These principles continue to guide our expansion and reinforce our long-term
commitment to disciplined stewardship, partnership and value creation for the future.
              </p>
            </div>
          </div>
          <div className="our-history__visual">
            <img 
              width="1063" 
              height="762" 
              src={pic} 
              className="attachment-full size-full" 
              alt="Our History" 
              title="Our History" 
              loading="lazy" 
              decoding="async" 
           
              sizes="auto, (max-width: 1063px) 100vw, 1063px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default History;