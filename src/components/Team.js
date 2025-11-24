import React, { useState, useRef, useEffect } from 'react';
import '../styles/Team.css';

function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const wrapperRef = useRef(null);

  const API_BASE_URL = "https://green-back-wgz9.onrender.com";

  const categoryLinks = [
    { text: 'Investment Team', category: 'investment-team' },
    { text: 'Industry Specialists', category: 'industry-specialists' },
    { text: 'Investment Committee', category: 'investment-committee' },
    { text: 'Business Operations', category: 'business-operations' }
  ];

  // Fetch team members from backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/team`);
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setTeamMembers(data.teamMembers || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slidesPerView = isMobile ? 1 : 2;
  const maxIndex = Math.max(0, teamMembers.length - slidesPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const translateX = -(currentIndex * (100 / slidesPerView));

  // Show loading state
  if (loading) {
    return (
      <div className="team-slider" id="team">
        <div className="team-slider__wrapper">
          <strong className="team-slider__heading">team</strong>
          <div className="team-slider__inner">
            <div className="team-slider__content">
              <h2 className="team-slider__title">Transportation Specialists</h2>
              <p className="team-slider__text">Loading team members...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="team-slider" id="team">
      <div className="team-slider__wrapper">
        <strong className="team-slider__heading">Our Team</strong>
        
        <div className="team-slider__inner">
          <div className="team-slider__content">
            <h2 className="team-slider__title">Investment Specialists</h2>
            <p className="team-slider__text">
              The principals involved have over 20 years combined experience in managing portfolio investments and generating value for investors.
            </p>
          </div>

          <div className="team-slider__team">
            <div className="team-slider__navigation">
              <button 
                className="team-slider__prev" 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous slide"
              />
              <button 
                className="team-slider__next" 
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next slide"
              />
            </div>

            <div className="team-slider__slider">
              <div 
                className="swiper-wrapper"
                ref={wrapperRef}
                style={{ transform: `translateX(${translateX}%)` }}
              >
                {teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <a 
                      href={`/team?person=${member._id}/`}
                      className="team-slider__slide"
                      key={member._id}
                    >
                      <div className="team-slider__face">
                        <img 
                          src={member.imageUrl}
                          alt={member.name}
                          title={member.name}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="team-slider__info">
                        <span className="team-slider__name">{member.name}</span>
                        <p className="team-slider__position">
                          {member.position || member.role || 'Team Member'}
                        </p>
                        <span className="team-slider__arrows">
                          <span></span>
                        </span>
                      </div>
                    </a>
                  ))
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
                    <p>No team members found. Add team members in the admin panel.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="team-slider__links">
            {categoryLinks.map((link, index) => (
              <a 
                href={`/team?category=${link.category}`}
                className="team-slider__link"
                key={index}
              >
                <div className="team-slider__link-content">
                  <span className="team-slider__link-text">{link.text}</span>
                  <span className="team-slider__link-arrows">
                    <span></span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;