import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Placeholder.css';

function Placeholder() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('investorAuth');
    const authTime = localStorage.getItem('investorAuthTime');
    const currentTime = Date.now();
    const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    // Check if not authenticated or session expired (2 hours)
    if (!isAuth || !authTime || (currentTime - parseInt(authTime)) > twoHours) {
      localStorage.removeItem('investorAuth');
      localStorage.removeItem('investorAuthTime');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('investorAuth');
    localStorage.removeItem('investorAuthTime');
    navigate('/');
  };

  return (
    <>
      <Header />
      <main id="main">
        <div className="placeholder-container">
          <div className="placeholder-header">
            <h1>Investor Portal</h1>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>

          <div className="placeholder-content">
            <div className="placeholder-box">
              <h2>Third-Party Integration Placeholder</h2>
              <p>This section will be replaced with a third-party investor portal integration.</p>
              <div className="placeholder-instructions">
                <h3>Integration Notes:</h3>
                <ul>
                  <li>Authentication is handled via localStorage</li>
                  <li>Session expires after 2 hours of inactivity</li>
                  <li>Users can logout using the button above</li>
                  <li>Insert third-party embed code or iframe below</li>
                </ul>
              </div>
              <div className="placeholder-embed-area">
                {/* Third-party integration will go here */}
                <p className="embed-placeholder-text">
                  [ Third-Party Content Area ]<br/>
                  Insert iframe, script, or embed code here
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Placeholder;