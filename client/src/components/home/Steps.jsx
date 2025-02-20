import React from 'react';


const Steps = () => {
  return (
    <div className="steps-wrapper">
      <div className="steps-container1 thq-section-padding">
        <div className="steps-max-width thq-section-max-width">
          <div className="steps-container2 thq-grid-2">
            <div className="steps-section-header">
              <h2 className="thq-heading-2">
                Discover the Power of Our Products
              </h2>
              <p className="thq-body-large">
                Experience cutting-edge innovation designed to simplify your workflow, 
                enhance productivity, and deliver exceptional results.
              </p>
              <div className="steps-actions">
                <button className="steps-button thq-button-filled thq-button-animated">
                  Its Showtime !!
                </button>
              </div>
            </div>
            <div className="steps-container3">
              {/* Step cards */}
              <div className="steps-container4 thq-card">
                {/* ...existing step card content... */}
              </div>
              {/* ...more step cards... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
