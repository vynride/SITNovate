import React from 'react';

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-header78 heroroot-class-name">
        <div className="hero-column thq-section-max-width">
          <div className="hero-content1">
            <h1 className="hero-text1 thq-heading-1">
              <span>
                <span>Sum-</span>
                <span>AI</span>
                <span>-Rize</span>
                <br />
                <span>Your Documents With Us</span>
              </span>
            </h1>
            <p className="hero-text2 thq-body-large">
              <span>
                Presenting Sum-AI-Rize, the one-of-a-kind all-round document and data summarizer!
                Summarize and condense your data to its core with multiple input and output formats.
                Enjoy endless customization and choices to make your data more accurate and to the point.
              </span>
            </p>
          </div>
          <div className="hero-actions">
            <button className="thq-button-filled hero-button1">
              Get Started
            </button>
            <button className="thq-button-outline hero-button2">
              Our Plans
            </button>
          </div>
        </div>
        {/* Image rows section */}
        <div className="hero-content2">
          {/* First row of images */}
          <div className="hero-row-container1 thq-mask-image-horizontal thq-animated-group-container-horizontal">
            {/* Add image elements here */}
          </div>
          {/* Second row of images */}
          <div className="hero-row-container2 thq-mask-image-horizontal thq-animated-group-container-horizontal">
            {/* Add image elements here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
