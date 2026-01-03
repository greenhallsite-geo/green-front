import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
const logo = `${process.env.PUBLIC_URL}/l3.png`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle navigation for all links
  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // Close menu if it's open
    if (menuOpen) {
      setMenuOpen(false);
    }
    
    // Handle Portfolio page navigation
    if (href === '/portfolio') {
      navigate('/portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Handle Team page navigation
    if (href === '/team') {
      navigate('/team');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Handle Contact Form page navigation
    if (href === '/contact') {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Handle Terms and Privacy pages
    if (href === '/terms' || href === '/privacy') {
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
    
    // Handle home page navigation
    if (href === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  // Handle scrolling on page load if there's a hash in the URL
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      {/* Main Header - Right Side Only */}
      <header className="header">
        <div className="header__wrapper">
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li className="menu-item">
                <a href="/#firm" onClick={(e) => handleNavClick(e, '/#firm')}>Firm</a>
              </li>
              <li className="menu-item">
                <a href="/#approach" onClick={(e) => handleNavClick(e, '/#approach')}>Approach</a>
              </li>
              <li className="menu-item">
                <a href="/portfolio" onClick={(e) => handleNavClick(e, '/portfolio')}>Portfolio</a>
              </li>
              <li className="menu-item">
                <a href="/team" onClick={(e) => handleNavClick(e, '/team')}>Team</a>
              </li>
              <li className="menu-item">
                <a href="/#responsibility" onClick={(e) => handleNavClick(e, '/#responsibility')}>Responsibility</a>
              </li>
              <li className="menu-item">
                <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')}>Contact</a>
              </li>
            </ul>
          </nav>
          <div className="header__button header__button--open" onClick={toggleMenu}>
            <div className="header__button-burger">
              <div className="header__button-square"></div>
              <div className="header__button-square"></div>
              <div className="header__button-square"></div>
              <div className="header__button-square"></div>
              <div className="header__button-square"></div>
              <div className="header__button-square"></div>
              <div className="header__button-square"></div>
              <div className="header__button-square"></div>
              <div className="header__button-square"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Burger Menu */}
      <div className={`header-burger ${menuOpen ? 'header-burger--show' : ''}`}>
        <div className="header-burger__wrapper">
          <div className="header-burger__top">
            <a href="/" onClick={(e) => handleNavClick(e, '/')} className="custom-logo-link">
              <img src={logo} className="custom-logo" alt="logo" />
            </a>
            <div className="header-burger__close" onClick={toggleMenu}>
              <div className="header-burger__burger">
                <div className="header__button-square"></div>
                <div className="header__button-square"></div>
                <div className="header__button-square"></div>
                <div className="header__button-square"></div>
                <div className="header__button-square"></div>
                <div className="header__button-square"></div>
                <div className="header__button-square"></div>
                <div className="header__button-square"></div>
                <div className="header__button-square"></div>
              </div>
            </div>
          </div>
          <ul className="header-burger__menu">
            <li>
              <a href="/#firm" onClick={(e) => handleNavClick(e, '/#firm')}>
                <span className="burger-menu-triangle"></span>
                Firm
              </a>
            </li>
            <li>
              <a href="/#approach" onClick={(e) => handleNavClick(e, '/#approach')}>
                <span className="burger-menu-triangle"></span>
                Approach
              </a>
            </li>
            <li>
              <a href="/portfolio" onClick={(e) => handleNavClick(e, '/portfolio')}>
                <span className="burger-menu-triangle"></span>
                Portfolio
              </a>
            </li>
            <li>
              <a href="/team" onClick={(e) => handleNavClick(e, '/team')}>
                <span className="burger-menu-triangle"></span>
                Team
              </a>
            </li>
            <li>
              <a href="/#responsibility" onClick={(e) => handleNavClick(e, '/#responsibility')}>
                <span className="burger-menu-triangle"></span>
                Responsibility
              </a>
            </li>
            <li>
              <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')}>
                <span className="burger-menu-triangle"></span>
                Contact
              </a>
            </li>
            <li className="header-burger__menu-links">
              <a href="/terms" onClick={(e) => handleNavClick(e, '/terms')}>Terms of service</a>
              <a href="/privacy" onClick={(e) => handleNavClick(e, '/privacy')}>Privacy</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;