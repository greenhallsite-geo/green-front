import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CompanyPage.css';
import Header from './Header';

function CompanyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://green-back-wgz9.onrender.com";

  useEffect(() => {
    // Check if company data was passed via navigation state
    if (location.state?.company) {
      setCompany(location.state.company);
      setLoading(false);
    } else {
      // If no company data in state, redirect back to portfolio
      navigate('/portfolio');
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate('/portfolio');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main id="main">
          <div className="company-container">
            <p>Loading company information...</p>
          </div>
        </main>
      </>
    );
  }

  if (!company) {
    return (
      <>
        <Header />
        <main id="main">
          <div className="company-container">
            <p>Company not found.</p>
            <button className="back-button" onClick={handleBack}>
              Back to Portfolio
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main">
        <div className="company-container">
          {/* Back Button */}
          <button className="back-button" onClick={handleBack}>
            ← Back to Portfolio
          </button>

          {/* Company Header */}
          <div className="company-header">
            <div className="company-logo">
              {company.logoUrl ? (
                <img 
                  src={company.logoUrl} 
                  alt={company.companyName}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="company-logo-placeholder">${company.companyName}</div>`;
                  }}
                />
              ) : (
                <div className="company-logo-placeholder">
                  {company.companyName}
                </div>
              )}
            </div>
            <h1 className="company-name">{company.companyName}</h1>
          </div>

          {/* Company Description */}
          {company.description && (
            <div className="company-description">
              <p>{company.description}</p>
            </div>
          )}

          {/* Company Details */}
          <div className="company-details-grid">
            {company.industry && (
              <div className="company-detail-item">
                <span className="detail-label">Industry:</span>
                <span className="detail-value">{company.industry}</span>
              </div>
            )}

            {company.initialInvestment && (
              <div className="company-detail-item">
                <span className="detail-label">Initial Investment:</span>
                <span className="detail-value">
                  {new Date(company.initialInvestment).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
            )}

            {company.headquarters && (
              <div className="company-detail-item">
                <span className="detail-label">Headquarters:</span>
                <span className="detail-value">{company.headquarters}</span>
              </div>
            )}

            {company.acquisitions !== undefined && (
              <div className="company-detail-item">
                <span className="detail-label">Acquisitions:</span>
                <span className="detail-value">{company.acquisitions}</span>
              </div>
            )}

            {company.status && (
              <div className="company-detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{company.status}</span>
              </div>
            )}

            {company.fund && (
              <div className="company-detail-item">
                <span className="detail-label">Fund:</span>
                <span className="detail-value">{company.fund}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default CompanyPage;