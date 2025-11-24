import React from 'react';
import '../styles/Values.css';

function Values() {
  const valuesData = [
    {
      name: 'Valued',
      color: '#ffffff',
      backgroundColor: 'rgba(83,118,137,0.4)',
      description: 'We begin by undertaking a comprehensive evaluation of business operations. Our aim is to ensure alignment with industry best practices and identify areas for potential improvement.'
    },
    {
      name: 'Management',
      color: '#ffffff',
      backgroundColor: '#537689',
      description: 'Our management approach focuses on driving business efficiency through targeted enhancements in four key areas: business processes, operations, technology, and sales & marketing.'
    },
    {
      name: 'Future',
      color: '#000000',
      backgroundColor: 'rgb(255,255,255)',
      description: 'Greenhall significantly enhances the future of the business through both organic growth strategies and targeted M&A opportunities.'
    },
    {
      name: 'Innovation',
      color: '#000000',
      backgroundColor: 'rgb(222,229,226)',
      description: 'Our philosophy centers on innovation, integrity and collaboration. We believe these principles are essential for building strong partnerships and driving impactful solutions.'
    },
    {
      name: 'Collaboration',
      color: '#ffffff',
      backgroundColor: '#073E56',
      description: 'We prioritize strategic insight and transparency in all our endeavors. When it comes to investing, we believe that Collaboration, Alignment and Execution matters.'
    }
  ];

  return (
    <div className="values">
      <div className="container">
        <div className="values__wrapper">
          <div className="values__content anim-text _anim-items _active">
            <h2 className="values__title section-title">
              Our Philosophy
            </h2>
            <div className="values__text">
              <p>We believe in delivering superior returns for our investors, exceptional service to our clients, and ample growth opportunities for our employees.</p>
            </div>
          </div>
          {valuesData.map((value, index) => (
            <div key={index} className="values__card anim-text _anim-items _active">
              <h3 
                className="values__name" 
                style={{ 
                  color: value.color, 
                  backgroundColor: value.backgroundColor 
                }}
              >
                {value.name}
              </h3>
              <div className="values__description">
                <p>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Values;