import React, { useState } from 'react';
import '../styles/Value2.css';

const pic1 = `${process.env.PUBLIC_URL}/gr1.png`;
const pic2 = `${process.env.PUBLIC_URL}/gr2.png`;
const pic3 = `${process.env.PUBLIC_URL}/gr8.png`;
const pic4 = `${process.env.PUBLIC_URL}/gr4.png`;

function Value2() {
  const [openCard, setOpenCard] = useState(null);

  const cards = [
    {
      id: 1,
      image: pic4,
      heading: 'Organizational Enhancements',
      items: [
        'Conduct data-driven operational assessments to ensure alignment with best practices and strategic priorities',
        'Support high-caliber management teams focused on sustained performance and operational discipline',
        'Enhance organizational processes and structures to improve efficiency and scalability',
        'Execute disciplined investment initiatives that drive growth and strengthen competitive positioning',
        'Build collaborative, value-driven partnerships with stakeholders to support long-term success'
      ]
    },
    {
      id: 2,
      image: pic2,
      heading: 'Operational Improvements',
      items: [
        'Partner with management to strengthen and operationalize core competencies',
        'Implement focused operational improvements to enhance efficiency and performance',
        'Execute disciplined add-on acquisitions and integration to build scalable platforms',
        'Leverage deep sector expertise across cycles to inform strategy and drive value',
        'Advance organic growth initiatives and targeted performance enhancements'
      ]
    },
    {
      id: 3,
      image: pic3,
      heading: 'Capital Strategy',
      items: [
        'Formulate disciplined investment strategies aligned with long-term value creation',
        'Target mission-critical, essential services businesses within the North American middle market',
        'Build durable platforms through a balanced approach to organic expansion and targeted M&amp;A',
        'Structure capital solutions with flexibility to support growth, resilience, and strategic optionality',
        'Maintain a patient, long-term investment horizon focused on sustainable performance over years—not cycles'
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
              <p>Greenhall Capital Partners has established enduring partnerships with business
owners, management teams, industry leaders, and professional investors by focusing
on essential services companies that underpin the broader economy.</p>

            </div>
            <div className="values-cards__text-right">
              <p>Our Portfolio Resource Group, the Greenhall Operating Advisory Team (G.O.A.T.), partners closely with management to enhance strategic, operational and commercial capabilities. This dedicated team ensures that every portfolio company is positioned to capitalize on growth opportunities and achieve sustained long-term performance.</p>
             
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