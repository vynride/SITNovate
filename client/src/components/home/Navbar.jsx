import React, { useState } from 'react';


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="navbar-wrapper">
      <header className="navbar-container">
        <nav className="navbar-navbar-interactive">
          <img
            alt="logo"
            src="/public/Placeholders/logo-cropped-1400w.jpg"
            className="navbar-image1"
          />
          <div className="navbar-desktop-menu">
            <nav className="navbar-links1">
              <span className="thq-link thq-body-small">Home</span>
              <span className="thq-link thq-body-small">About</span>
              <span className="thq-link thq-body-small">Pricing</span>
              <span className="thq-link thq-body-small">Contact Us</span>
            </nav>
            <div className="navbar-buttons1">
              <button className="navbar-action11 thq-button-filled thq-button-animated">
                Login
              </button>
              <button className="navbar-action21 thq-button-outline thq-button-animated">
                Sign Up
              </button>
            </div>
          </div>
          <div
            className="navbar-burger-menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg viewBox="0 0 1024 1024" className="navbar-icon1">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z" />
            </svg>
          </div>
          {mobileMenuOpen && (
            <div className="navbar-mobile-menu">
              <div className="navbar-nav">
                <div className="navbar-top">
                  <img
                    alt="logo"
                    src="/public/Placeholders/logo-cropped-1400w.jpg"
                    className="navbar-logo"
                  />
                  <div
                    className="navbar-close-menu"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg viewBox="0 0 1024 1024" className="navbar-icon3">
                      <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z" />
                    </svg>
                  </div>
                </div>
                <nav className="navbar-links2">
                  <span className="thq-link thq-body-small">Home</span>
                  <span className="thq-link thq-body-small">About</span>
                  <span className="thq-link thq-body-small">Pricing</span>
                  <span className="thq-link thq-body-small">Contact Us</span>
                </nav>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
