import React, { useState } from 'react';
import '../styles/Value2.css';

const pic1 = `${process.env.PUBLIC_URL}/gr1.png`;
const pic2 = `${process.env.PUBLIC_URL}/gr2.png`;
const pic3 = `${process.env.PUBLIC_URL}/gr3.png`;
const pic4 = `${process.env.PUBLIC_URL}/gr4.png`;

function Value2() {
  const [openCard, setOpenCard] = useState(null);

  const cards = [
    {
      id: 1,
      image: pic4,
      heading: 'Organizational Enhancements',
      items: [
        'Comprehensive evaluation of business operations aligned with industry best practices',
        'Build experienced management teams to drive long-term performance and operational excellence',
        'Assess business operations and align with industry best practices',
        'Implement strategic investment plans designed to maximize growth and value creation',
        'Foster strong, value-driven partnerships with stakeholders, including industry experts and business leaders'
      ]
    },
    {
      id: 2,
      image: pic2,
      heading: 'Operational Improvements',
      items: [
        'Work closely with management teams to identify and optimize core competencies',
        'Implement operational improvement plans focused on driving business efficiency',
        'Execute add-on acquisitions and efficient integration strategies to build scalable platforms',
        'Leverage deep industry knowledge and experience across diverse business cycles',
        'Drive organic growth initiatives and performance improvements'
      ]
    },
    {
      id: 3,
      image: pic3,
      heading: 'Capital Strategy',
      items: [
        'Develop strategic investment plans aligned with long-term objectives',
        'Focus on mission-critical and essential services companies in the middle market',
        'Build robust platforms through both organic growth and targeted M&A opportunities',
        'Optimize capital structure with flexible investment approaches',
        'Maintain long-term investment perspective measured in years rather than months'
      ]
    }
  ];

  const handleCardClick = (cardId) => {
    setOpenCard(openCard === cardId ? null : cardId);
  };

  const getCardClass = (cardId) => {
    if (openCard === null) return 'values-cards__card';
    if (openCard === cardId) return 'values-cards__card values-cards__card--open';
    return 'values-cards__card values-cards__card--hide';
  };

  return (
    <div className="values-cards">
      <div className="container">
        <div className="values-cards__wrapper">
          <h2 className="values-cards__title section__title">
            Building Enduring Value
          </h2>
          <div className="values-cards__text">
            <div className="values-cards__text-left">
              <p>Greenhall Capital Partners has built strong relationships with key stakeholders ranging from business owners and management teams to distinguished industry leaders and professional investors, by partnering with essential services companies.</p>
            </div>
            <div className="values-cards__text-right">
              <p>We seek to leverage the vantage points and resources of these relationships to create and pursue collaborative investment opportunities that drive sustainable growth and value creation.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="values-cards__slider values-cards__slider--3">
        {cards.map((card) => (
          <div 
            className={getCardClass(card.id)}
            key={card.id}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Card clicked:', card.id);
              handleCardClick(card.id);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="values-cards__image">
              <img 
                src={card.image}
                alt={card.heading}
                title={card.heading}
                loading="lazy"
              />
            </div>
            <div className="values-cards__inner">
              <h3 className="values-cards__heading">{card.heading}</h3>
              <div className="values-cards__info">
                <ol>
                  {card.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Value2;