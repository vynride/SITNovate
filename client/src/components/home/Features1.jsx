import React from 'react';


const Features1 = () => {
  return (
    <div className="features1-wrapper">
      <div className="thq-section-padding features1root-class-name">
        <div className="features1-container2 thq-section-max-width">
          <div className="features1-image-container">
            <img
              alt="Output Options Image"
              src="/public/Placeholders/web_photo_editor-1400w.jpg"
              className="features1-image1 thq-img-ratio-16-9"
            />
          </div>
          <div className="features1-tabs-menu">
            <div className="features1-tab-horizontal1">
              <div className="features1-divider-container1">
                <div className="features1-container3"></div>
              </div>
              <div className="features1-content1">
                <h2 className="features1-feature1-title thq-heading-2">
                  1. Upload & Select Your Preferences
                </h2>
                <span className="thq-body-small">
                  Begin by adding your document or pasting text. Select a category that best fits your needs. 
                  Our AI adapts to your selection, ensuring the most relevant and accurate output for your specific use case.
                </span>
              </div>
            </div>
            {/* Additional feature tabs */}
            {/* ...existing code... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features1;
