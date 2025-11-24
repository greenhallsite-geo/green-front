import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PortfolioPage.css';
import Header from './Header';


function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectorFilter, setSectorFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

  const navigate = useNavigate();
  const API_BASE_URL = "https://green-back-wgz9.onrender.com";

  // Fetch portfolio items from backend
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/portfolio`);
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }
        const data = await response.json();
        setPortfolioItems(data.portfolio || []);
        setFilteredItems(data.portfolio || []);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setPortfolioItems([]);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Apply sector filter
  useEffect(() => {
    let filtered = [...portfolioItems];

    if (sectorFilter !== 'all') {
      filtered = filtered.filter(item => {
        const industry = item.industry.toLowerCase();
        if (sectorFilter === 'business') {
          return industry.includes('business') || industry.includes('service');
        } else if (sectorFilter === 'industrials') {
          return industry.includes('industrial') || industry.includes('manufacturing') || industry.includes('energy');
        } else if (sectorFilter === 'tech') {
          return industry.includes('technology') || industry.includes('telecommunication') || industry.includes('telecom') || industry.includes('tech');
        }
        return true;
      });
    }

    setFilteredItems(filtered);
    setVisibleCount(9);
  }, [sectorFilter, portfolioItems]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  const handleSectorFilter = (sector) => {
    setSectorFilter(sector);
  };

  const handleCompanyClick = (item) => {
    navigate('/company', { state: { company: item } });
  };

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <>
      <Header />
      <main id="main">

        {/* Hero Section - Split Screen */}
        <div className="hero-portfolio">
          <div className="hero-portfolio__left">
            <h1 className="hero-portfolio__title">Portfolio</h1>
          </div>
          <div className="hero-portfolio__right">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80" 
              alt="Portfolio"
              className="hero-portfolio__image"
            />
          </div>
        </div>

        {/* Portfolio Section */}
        <section className="portfolio-section">
          <div className="container">
            
            {/* Sector Filter */}
            <div className="portfolio-filters">
              <button 
                className={`filter-button ${sectorFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleSectorFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-button ${sectorFilter === 'business' ? 'active' : ''}`}
                onClick={() => handleSectorFilter('business')}
              >
                Business Services
              </button>
              <button 
                className={`filter-button ${sectorFilter === 'industrials' ? 'active' : ''}`}
                onClick={() => handleSectorFilter('industrials')}
              >
                Industrials
              </button>
              <button 
                className={`filter-button ${sectorFilter === 'tech' ? 'active' : ''}`}
                onClick={() => handleSectorFilter('tech')}
              >
                Technology / Telecommunications
              </button>
            </div>

            {/* Portfolio Grid */}
            {loading ? (
              <div className="portfolio-loading">
                <p>Loading portfolio companies...</p>
              </div>
            ) : (
              <>
                <div className="portfolio-grid">
                  {visibleItems.length > 0 ? (
                    visibleItems.map((item) => (
                      <article 
                        key={item._id}
                        className="portfolio-card"
                        onClick={() => handleCompanyClick(item)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="portfolio-card__image">
                          {item.logoUrl ? (
                            <img 
                              src={item.logoUrl} 
                              alt={item.companyName}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="portfolio-card__placeholder">
                              {item.companyName}
                            </div>
                          )}
                        </div>
                        <div className="portfolio-card__info">
                          <span className="portfolio-card__name">{item.companyName}</span>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="portfolio-empty">
                      <p>No portfolio companies found matching your filters.</p>
                    </div>
                  )}
                </div>
                
                {hasMore && (
                  <div className="portfolio-more-wrapper">
                    <button 
                      className="portfolio-more-button" 
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

export default PortfolioPage;