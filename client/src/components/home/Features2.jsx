import React from 'react';


const Features2 = () => {
  return (
    <div className="features2-wrapper">
      <div className="thq-section-padding">
        <div className="features2-container2 thq-section-max-width">
          <div className="features2-tabs-menu">
            <div className="features2-tab-horizontal1">
              <div className="features2-divider-container1">
                <div className="features2-container3"></div>
              </div>
              <div className="features2-content1">
                <h2 className="features2-feature1-title thq-heading-2">
                  1. Multiple Output Formats for Seamless Use
                </h2>
                <span className="features2-feature1-description thq-body-small">
                  Save and share your summaries effortlessly with support for various file formats.
                </span>
              </div>
            </div>
            {/* Additional feature tabs */}
            {/* ...existing code... */}
          </div>
          <div className="features2-image-container">
            <img
              alt="feature 1"
              src="/public/Placeholders/logo-1400w.png"
              className="features2-image1 thq-img-ratio-16-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features2;
