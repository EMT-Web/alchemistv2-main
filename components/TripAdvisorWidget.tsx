import React from 'react';

/**
 * TripAdvisor Call-to-Action Component
 * Links to your TripAdvisor page: https://www.tripadvisor.com/Attraction_Review-g293732-d18453425
 */
function TripAdvisorWidget() {
  return (
    <div className="tripadvisor-widget-wrapper">
      {/* Beautiful Call-to-Action Card */}
      <div className="tripadvisor-cta-card">
        <div className="cta-content">
          <div className="cta-icon">
            <span className="fa fa-tripadvisor"></span>
          </div>
          <h3>Read Our Latest TripAdvisor Reviews</h3>
          <p>See what our customers are saying about their Morocco tour experience - updated daily with new reviews!</p>
          <a 
            href="https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            <span className="fa fa-external-link mr-2"></span>
            View All Reviews on TripAdvisor
          </a>
          <div className="trust-badges mt-4">
            <div className="badge-item">
              <span className="fa fa-star"></span>
              <span>Excellent Ratings</span>
            </div>
            <div className="badge-item">
              <span className="fa fa-users"></span>
              <span>Verified Reviews</span>
            </div>
            <div className="badge-item">
              <span className="fa fa-certificate"></span>
              <span>Certificate of Excellence</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tripadvisor-widget-wrapper {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }

        .tripadvisor-cta-card {
          background: linear-gradient(135deg, #00af87 0%, #00d3a0 100%);
          border-radius: 20px;
          padding: 50px 30px;
          margin: 10px auto 40px auto;
          max-width: 800px;
          box-shadow: 0 20px 60px rgba(0, 175, 135, 0.3);
          text-align: center;
          color: white;
        }

        .cta-icon {
          font-size: 64px;
          color: white;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .cta-content h3 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 15px;
          color: white;
        }

        .cta-content p {
          font-size: 18px;
          margin-bottom: 30px;
          opacity: 0.95;
          color: white;
        }

        .cta-content .btn {
          background: white;
          color: #00af87;
          border: none;
          padding: 15px 40px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .cta-content .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          background: #f8f9fa;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .badge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: white;
        }

        .badge-item .fa {
          font-size: 28px;
          margin-bottom: 5px;
        }

        .badge-item span:last-child {
          font-size: 14px;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .tripadvisor-cta-card {
            padding: 40px 20px;
          }

          .cta-content h3 {
            font-size: 24px;
          }

          .cta-content p {
            font-size: 16px;
          }

          .trust-badges {
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default TripAdvisorWidget;

