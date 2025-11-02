import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Only run on client-side after mount to prevent hydration mismatch
    setMounted(true)
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after 1 second delay
      setTimeout(() => {
        setShowBanner(true)
      }, 1000)
    } else if (cookieConsent === 'accepted') {
      // Enable analytics if accepted
      enableAnalytics()
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
    enableAnalytics()
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowBanner(false)
    // Disable analytics
    disableAnalytics()
  }

  const enableAnalytics = () => {
    // Enable Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  const disableAnalytics = () => {
    // Disable Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }

  // Prevent hydration mismatch - only render on client after mount
  if (!mounted || !showBanner) return null

  return (
    <>
      <div className="cookie-banner-overlay" onClick={() => {}} />
      <div className="cookie-banner">
        <div className="cookie-banner-content">
          <div className="cookie-icon">
            🍪
          </div>
          <div className="cookie-text">
            <h3>We Value Your Privacy</h3>
            <p>
              We use cookies to enhance your browsing experience, serve personalized content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <p className="cookie-small">
              <a href="/privacy-policy" target="_blank" style={{ color: '#f15d30', textDecoration: 'underline' }}>
                Learn more about our Privacy Policy
              </a>
            </p>
          </div>
        </div>
        <div className="cookie-buttons">
          <button onClick={handleReject} className="btn-reject">
            Reject All
          </button>
          <button onClick={handleAccept} className="btn-accept">
            Accept All
          </button>
        </div>
      </div>

      <style jsx>{`
        .cookie-banner-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 9998;
          animation: fadeIn 0.3s ease-in;
        }

        .cookie-banner {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          width: 90%;
          padding: 25px;
          z-index: 9999;
          animation: slideUp 0.4s ease-out;
        }

        .cookie-banner-content {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .cookie-icon {
          font-size: 40px;
          flex-shrink: 0;
        }

        .cookie-text h3 {
          margin: 0 0 10px 0;
          font-size: 20px;
          color: #333;
          font-weight: 600;
        }

        .cookie-text p {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        .cookie-small {
          font-size: 12px !important;
          margin: 5px 0 0 0 !important;
        }

        .cookie-buttons {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .cookie-buttons button {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-reject {
          background: #f5f5f5;
          color: #666;
        }

        .btn-reject:hover {
          background: #e0e0e0;
          color: #333;
        }

        .btn-accept {
          background: #f15d30;
          color: white;
        }

        .btn-accept:hover {
          background: #d94d20;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(241, 93, 48, 0.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            bottom: -100px;
            opacity: 0;
          }
          to {
            bottom: 20px;
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .cookie-banner {
            bottom: 10px;
            width: 95%;
            padding: 20px;
          }

          .cookie-banner-content {
            flex-direction: column;
            gap: 15px;
          }

          .cookie-icon {
            font-size: 30px;
          }

          .cookie-text h3 {
            font-size: 18px;
          }

          .cookie-text p {
            font-size: 13px;
          }

          .cookie-buttons {
            flex-direction: column-reverse;
            gap: 10px;
          }

          .cookie-buttons button {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

