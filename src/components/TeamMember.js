import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/TeamMemberPage.css';
import Header from './Header';

function TeamMember() {
  const location = useLocation();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://green-back-wgz9.onrender.com";

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Check if member data was passed via navigation state
    if (location.state?.member) {
      setMember(location.state.member);
      setLoading(false);
    } else {
      // If no member data in state, redirect back to team page
      navigate('/team');
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate('/team');
  };

  // Helper function to split name into first and last
  const getNameParts = (member) => {
    if (member.firstName && member.lastName) {
      return { firstName: member.firstName, lastName: member.lastName };
    }
    // Fallback: split the full name
    const parts = (member.name || '').trim().split(' ');
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';
    return { firstName, lastName };
  };

  if (loading) {
    return (
      <>
        <Header />
        <main id="main">
          <div className="member-container">
            <p>Loading team member information...</p>
          </div>
        </main>
      </>
    );
  }

  if (!member) {
    return (
      <>
        <Header />
        <main id="main">
          <div className="member-container">
            <p>Team member not found.</p>
            <button className="back-button" onClick={handleBack}>
              ← Back to Team
            </button>
          </div>
        </main>
      </>
    );
  }

  const { firstName, lastName } = getNameParts(member);

  return (
    <>
      <Header />
      <main id="main">
        <div className="member-container">
          {/* Back Button */}
          <button className="back-button" onClick={handleBack}>
            ← Back to Team
          </button>

          {/* Member Content Layout */}
          <div className="member-content-wrapper">
            {/* Left Side: Photo and Info Box */}
            <div className="member-left-section">
              {/* Photo */}
              <div className="member-photo">
                {member.imageUrl ? (
                  <img 
                    src={member.imageUrl} 
                    alt={`${firstName} ${lastName}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="member-photo-placeholder">${firstName} ${lastName}</div>`;
                    }}
                  />
                ) : (
                  <div className="member-photo-placeholder">
                    {firstName} {lastName}
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="member-info-box">
                <h1 className="member-first-name">{firstName}</h1>
                <h2 className="member-last-name">{lastName}</h2>
                {member.position && (
                  <p className="member-position">{member.position.toUpperCase()}</p>
                )}
              </div>
            </div>

            {/* Right Side: Biography/Summary */}
            <div className="member-right-section">
              {member.information ? (
                <div className="member-biography">
                  <p>{member.information}</p>
                </div>
              ) : (
                <p className="no-biography">No biography available.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TeamMember;