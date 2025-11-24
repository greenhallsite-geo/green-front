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
                Greenhall's foundation and guiding principles were established over light fare on the roof of the Hay-Adams hotel in downtown Washington, DC. Our journey began with a simple yet ambitious goal: to deliver superior returns for our investors, exceptional service to our clients, and ample growth opportunities for our employees. This vision, established at our inception, continues to drive our expansion and underpins our unwavering commitment to valued management for the future.
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