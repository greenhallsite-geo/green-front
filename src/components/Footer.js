import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Footer.css';
const logo = `${process.env.PUBLIC_URL}/l4.png`;
const pic = `${process.env.PUBLIC_URL}/gr6.png`;

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // Handle Portfolio page navigation
    if (href === '/portfolio') {
      navigate('/portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Handle Login page navigation
    if (href === '/login') {
      navigate('/login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Handle Terms and Privacy pages
    if (href === '/terms-of-service' || href === '/privacy-policy') {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Handle home page with hash links
    if (href.startsWith('/#') || href.startsWith('#')) {
      const hash = href.replace('/#', '').replace('#', '');
      
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // We're already on home page, just scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }
  };

  return (
    <footer className="footer" id="contacts">
      <div className="footer__wrapper">
        <div className="footer__top">
          <div className="container">
            <div className="footer__contacts">
              <h2 className="footer__title anim-text _anim-items _active">
                Connect with Greenhall
              </h2>
              <div className="footer__links">
                <a href="mailto:info.dc@greenhallcapital.com" className="footer__email anim-text _anim-items _active">
                  <span>info.dc@greenhallcapital.com</span>
                </a>
                <a href="https://www.linkedin.com/company/greenhall-capital/" className="footer__socials anim-text _anim-items _active" target="_blank" rel="noopener noreferrer">
                  <img src="https://durationcapitalpartners.com/wp-content/uploads/2024/07/linkedin-2.svg" alt="linkedin" title="linkedin" />
                  <span className="footer__socials-text">LinkedIn</span>
                </a>
              </div>
              <div className="footer__address">
                <a href="https://maps.google.com/?q=1900+M+St+NW+Suite+550+Washington+DC+20036" className="footer__address-link" target="_blank" rel="noopener noreferrer">
                  <h3 className="footer__address-city anim-text _anim-items _active">
                    Washington, DC
                  </h3>
                  <div className="footer__address-all anim-text _anim-items _active">
                    <p>1900 M St., NW, Suite 550<br />
                    Washington, DC 20036<br />
                    202-765-3077</p>
                  </div>
                </a>
                <a href="https://maps.google.com/?q=1230+Rosecrans+Avenue+Suite+610+Manhattan+Beach+CA+90266" className="footer__address-link" target="_blank" rel="noopener noreferrer">
                  <h3 className="footer__address-city anim-text _anim-items _active">
                    Los Angeles
                  </h3>
                  <div className="footer__address-all anim-text _anim-items _active">
                    <p>1230 Rosecrans Avenue, Suite 610<br />
                    Manhattan Beach, California 90266<br />
                    202-765-3077</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="footer__info">
              <div className="footer__image anim-text _anim-items _active">
                <img 
                  width="799" 
                  height="762" 
                  src={pic} 
                  className="attachment-full size-full" 
                  alt="road" 
                  title="road" 
                  decoding="async" 
                  loading="lazy" 
                  sizes="auto, (max-width: 799px) 100vw, 799px"
                />
              </div>
              <div className="footer__actions anim-text _anim-items _active">
                <a href="/login" onClick={(e) => handleNavClick(e, '/login')} className="footer__investor">
                  <div className="footer__investor-content">
                    <span className="footer__investor-text">Investor Login</span>
                    <span className="footer__investor-arrows">
                      <span></span>
                    </span>
                  </div>
                  <div className="footer__tooltip" style={{ visibility: 'hidden', opacity: 0 }}>
                    <p>Access the investor portal to view your investment information and reports.</p>
                  </div>
                </a>
                <button className="footer__button" id="footer__button" onClick={handleBackToTop}>
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom anim-text _anim-items _active">
          <div className="container">
            <img 
              src={logo} 
              className="custom-logo" 
              alt="greenhall" 
              decoding="async"
            />
            <nav className="footer__navigation">
              <ul className="footer__navigation-list">
                <li className="menu-item"><a href="/#firm" onClick={(e) => handleNavClick(e, '/#firm')}>Firm</a></li>
                <li className="menu-item"><a href="/#approach" onClick={(e) => handleNavClick(e, '/#approach')}>Approach</a></li>
                <li className="menu-item"><a href="/portfolio" onClick={(e) => handleNavClick(e, '/portfolio')}>Portfolio</a></li>
                <li className="menu-item"><a href="/#team" onClick={(e) => handleNavClick(e, '/#team')}>Team</a></li>
                <li className="menu-item"><a href="/#responsibility" onClick={(e) => handleNavClick(e, '/#responsibility')}>Responsibility</a></li>
                <li className="menu-item"><a href="#contacts" onClick={(e) => handleNavClick(e, '#contacts')}>Contact</a></li>
              </ul>
            </nav>
            <div className="footer__additional">
              <span>©2026 Greenhall Capital Partners</span>
              <div className="footer__additional-links">
                <a href="/terms-of-service" onClick={(e) => handleNavClick(e, '/terms-of-service')}>Terms of service</a>
                <a href="/privacy-policy" onClick={(e) => handleNavClick(e, '/privacy-policy')}>Privacy</a>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </footer>
  );
}

export default Footer;