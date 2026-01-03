import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TeamPage.css';
import Header from './Header';

function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamFilter, setTeamFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

  const navigate = useNavigate();
  const API_BASE_URL = "https://green-back-wgz9.onrender.com";

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
        
        // Data is already sorted by order from backend (ascending: 1, 2, 3...)
        const members = data.teamMembers || [];
        setTeamMembers(members);
        setFilteredMembers(members);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setTeamMembers([]);
        setFilteredMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Apply team filter
  useEffect(() => {
    let filtered = [...teamMembers];

    if (teamFilter !== 'all') {
      filtered = filtered.filter(member => {
        const memberTeam = member.team?.toLowerCase() || '';
        return memberTeam.includes(teamFilter.toLowerCase());
      });
    }

    // Maintain order sorting after filtering (already sorted from backend)
    // No need to re-sort as backend provides sorted data
    
    setFilteredMembers(filtered);
    setVisibleCount(9);
  }, [teamFilter, teamMembers]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  const handleTeamFilter = (team) => {
    setTeamFilter(team);
  };

  const handleMemberClick = (member) => {
    navigate('/team-member', { state: { member: member } });
  };

  const visibleMembers = filteredMembers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMembers.length;

  return (
    <>
      <Header />
      <main id="main">

        {/* Hero Section - Split Screen */}
        <div className="hero-team">
          <div className="hero-team__left">
            <h1 className="hero-team__title">Team</h1>
          </div>
          <div className="hero-team__right">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" 
              alt="Team"
              className="hero-team__image"
            />
          </div>
        </div>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            
            {/* Team Filter */}
            <div className="team-filters">
              <button 
                className={`filter-button ${teamFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleTeamFilter('all')}
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}
              >
                All
              </button>
              <button 
                className={`filter-button ${teamFilter === 'investment' ? 'active' : ''}`}
                onClick={() => handleTeamFilter('investment')}
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}
              >
                Investment Team
              </button>
              <button 
                className={`filter-button ${teamFilter === 'operations' ? 'active' : ''}`}
                onClick={() => handleTeamFilter('operations')}
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}
              >
                Operations Team
              </button>
              <button 
                className={`filter-button ${teamFilter === 'advisory' ? 'active' : ''}`}
                onClick={() => handleTeamFilter('advisory')}
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}
              >
                Advisory Board
              </button>
            </div>

            {/* Team Grid */}
            {loading ? (
              <div className="team-skeleton-grid">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="team-skeleton-card">
                    <div className="team-skeleton-card__image" />
                    <div className="team-skeleton-card__info">
                      <div className="team-skeleton-card__name" />
                      <div className="team-skeleton-card__position" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="team-grid">
                  {visibleMembers.length > 0 ? (
                    visibleMembers.map((member) => (
                      <article 
                        key={member._id}
                        className="team-card"
                        onClick={() => handleMemberClick(member)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="team-card__image">
                          {member.imageUrl ? (
                            <img 
                              src={member.imageUrl} 
                              alt={member.name}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="team-card__placeholder">
                              {member.name}
                            </div>
                          )}
                        </div>
                        <div className="team-card__info">
                          <h3 className="team-card__name">{member.name}</h3>
                          {member.position && (
                            <p className="team-card__position">{member.position}</p>
                          )}
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="team-empty">
                      <p>No team members found matching your filters.</p>
                    </div>
                  )}
                </div>
                
                {hasMore && (
                  <div className="team-more-wrapper">
                    <button 
                      className="team-more-button" 
                      onClick={handleLoadMore}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default TeamPage;