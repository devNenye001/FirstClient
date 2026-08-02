import { useEffect, useRef, useState } from 'react'
import { api, authStore } from './lib/api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import { 
  FiMapPin, 
  FiGlobe, 
  FiPhone, 
  FiMail, 
  FiStar, 
  FiSearch, 
  FiLogOut 
} from 'react-icons/fi'

const navLinks = ['Home', 'Features', 'Pricing', 'How It Works', 'FAQ']

function Logo({ light = false, src }) {
  return (
    <a className={`logo ${light ? 'logo--light' : ''}`} href="/">
      <img src={src || (light ? '/logo.png' : '/logo-black.png')} alt="FirstClient" />
    </a>
  )
}

function Button({ children, href = '/dashboard', variant = 'primary' }) {
  return <a className={`button button--${variant}`} href={href}>{children}</a>
}

function Header({ light = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`site-header ${light ? 'site-header--light' : ''} ${menuOpen ? 'site-header--open' : ''}`}>
      <Logo light={light} />
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a
            key={link}
            href={link === 'Home' ? '/' : `/#${link.toLowerCase().replaceAll(' ', '-')}`}
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <Button variant={light ? 'white' : 'primary'}>Get Started</Button>
      </nav>
      <span className="header-action"><Button variant={light ? 'white' : 'primary'}>Get Started</Button></span>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cta">
        <h2>Ready to land your next client?</h2>
        <Button>Get Started</Button>
      </div>
      <div className="footer__divider" />
      <div className="footer__grid">
        <Logo light />
        <div>
          <h3>PRODUCT</h3>
          <a href="/#features">Features</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#faq">FAQ</a>
        </div>
        <div>
          <h3>LEGAL</h3>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
        <div>
          <h3>CONTACT</h3>
          <p>📞 Call Us: +234 813 606 1304</p>
          <p>📨 Email: firstClient@gmail.com</p>
        </div>
      </div>
      <p className="footer__copy">© 2026 FirstClient. All rights reserved.</p>
    </footer>
  )
}

function SimplePage({ eyebrow, title, body, children }) {
  return (
    <main className="plain-page">
      <Header />
      <section className="simple-page reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
        {children}
      </section>
      <Footer />
    </main>
  )
}

function PrivacyPage() {
  return (
    <SimplePage
      eyebrow="PRIVACY"
      title="Privacy Policy"
      body="FirstClient only asks for the information needed to create your account, improve search results, and keep your workspace useful. We do not sell your personal data."
    >
      <div className="simple-grid">
        <article><h2>Account data</h2><p>Your email and profile details are used to sign you in and keep your saved opportunities connected to you.</p></article>
        <article><h2>Search activity</h2><p>Searches and saved leads help FirstClient improve recommendations and show more relevant businesses.</p></article>
        <article><h2>Contact</h2><p>For privacy requests, email firstClient@gmail.com and include the email linked to your account.</p></article>
      </div>
    </SimplePage>
  )
}

function TermsPage() {
  return (
    <SimplePage
      eyebrow="LEGAL"
      title="Terms of Service"
      body="Use FirstClient responsibly: verify business information before outreach, respect local laws, and avoid spammy or misleading messages."
    >
      <div className="simple-grid">
        <article><h2>Your account</h2><p>You are responsible for keeping login details secure and for the activity that happens under your account.</p></article>
        <article><h2>Business data</h2><p>Lead information may come from public sources and can change, so confirm details before contacting a business.</p></article>
        <article><h2>Fair use</h2><p>Do not scrape, resell, overload, or misuse the platform in ways that harm FirstClient or other users.</p></article>
      </div>
    </SimplePage>
  )
}

function ForgotPasswordPage() {
  return (
    <SimplePage
      eyebrow="ACCOUNT"
      title="Reset your password"
      body="Enter the email connected to your account and we will help you get back in."
    >
      <form className="simple-form">
        <label>Email Address<input placeholder="you@example.com" type="email" required /></label>
        <Button href="/dashboard">Back to Dashboard</Button>
      </form>
    </SimplePage>
  )
}

function HomePage() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <Header light />
        <div className="hero-copy motion-rise">
          <h1>Stop Looking for Jobs. Start<br />Finding <span className="borel">Clients</span></h1>
          <p>FirstClient helps freelancers, developers, designers, and agencies uncover real opportunities so you can spend less time searching and more time getting paid.</p>
          <Button variant="white">Sign Up <span>→</span></Button>
        </div>
        <img className="hero-dashboard motion-float" src="/hero-image.png" alt="FirstClient dashboard preview" />
      </section>

      <section className="section map-section reveal">
        <h2>Thousands of businesses are still waiting for the <span className="borel">right</span> digital solution.</h2>
        <p>Every day, businesses around the world miss opportunities because they lack the right website or digital tools. FirstClient helps you discover them first.</p>
        <img src="/landing-page-map.png" alt="World map" />
      </section>

      <section className="section process-section reveal" id="how-it-works">
        <h2>The internet is full of clients. Most people just don’t know <span className="borel">where</span> to look.</h2>
        <p>Instead of spending hours jumping between Google Maps, Instagram, TikTok, Facebook, and business directories, FirstClient does the heavy lifting for you.</p>
        <div className="mini-cards">
          {[
            ['Find businesses', '/find-business.png'],
            ['Analyze opportunities', '/analyze-opportunities.png'],
            ['Reach out with confidence', '/reach-out-with-confidence.png'],
            ['Win more clients', '/win-more-clients.png'],
          ].map(([title, image]) => <article key={title}><h3>{title}</h3><img src={image} alt="" /></article>)}
        </div>
      </section>

      <section className="section timeline-section reveal">
        <h2>From searching to sending your first pitch in <span className="borel">minutes.</span></h2>
        <div className="timeline">
          {[
            ['Choose a Location', 'Search businesses from anywhere in the world.'],
            ['Pick an Industry', 'Restaurants, salons, gyms, pharmacies, schools, hotels, real estate, and more.'],
            ['Discover Opportunities', 'Instantly see businesses that could benefit from your services.'],
            ['Reach Out', 'Use a good outreach messages to start conversations that convert.'],
          ].map(([title, body], index) => (
            <div className="timeline__item" key={title}>
              <span className={index === 0 ? 'active' : ''} />
              <div><h3>{title}</h3><p>{body}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section feature-section reveal" id="features">
        <h2>Everything you need to find your <span className="borel">next client.</span></h2>
        <div className="feature-grid">
          {[
            ['Smart business discovery', '/small-business.png'],
            ['Website detection', '/website-detection.png'],
            ['Contact information', '/contact-information.png'],
            ['Powerful search filters', '/powerful-search-filters.png'],
          ].map(([title, image]) => <article key={title}><h3>{title}</h3><img src={image} alt="" /></article>)}
        </div>
      </section>

      <section className="section laptop-section reveal">
        <h2>Imagine opening your laptop and already knowing who to <span className="borel">contact</span> today.</h2>
        <img src="/Imagine opening your laptop and already knowing who to contact today.gif" alt="Laptop" />
        <div className="kinetic-lines" aria-label="No guessing. No endless scrolling. No wasted hours.">
          <strong>No guessing.</strong>
          <strong>No endless scrolling.</strong>
          <strong>No wasted hours.</strong>
        </div>
        
      </section>

      <section className="section faq-section reveal" id="faq">
        <h2>Frequently asked <span className="borel">questions.</span></h2>
        <div className="faq-list">
          {[
            ['What is FirstClient?', 'FirstClient helps freelancers discover businesses that may need websites or digital tools.'],
            ['Does FirstClient contact businesses for me?', 'No. FirstClient is not an outreach platform. You choose how to contact leads outside the app.'],
            ['How does website detection work?', 'The app checks public business data and shows whether a business already has a website.'],
            ['Can I search businesses anywhere?', 'Yes. You can search by country, state, city, and business category.'],
          ].map(([question, answer]) => (
            <details className="faq-item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}

function LoginPage() {
  return <ForgotPasswordPage />
}

function DashboardLayout({ children }) {
  function logout(event) {
    event.preventDefault()
    authStore.clear()
    window.location.href = '/'
  }

  return (
    <main className="dashboard-page interactive-dashboard">
      <header className="dashboard-header">
        <Logo light={false} />
        <a className="logout-btn" href="/" onClick={logout}>
          <FiLogOut style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Logout
        </a>
      </header>

      <section className="dashboard-layout-container">
        {children}
      </section>
    </main>
  )
}

function DiscoverPage() {
  const [city, setCity] = useState('London')
  const [country, setCountry] = useState('United Kingdom')
  const [filter, setFilter] = useState('restaurants')
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [recLoading, setRecLoading] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState({ field: '', message: '' })

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    handleSearch()
  }, [])

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    if (businesses.length === 0) return

    const latLns = []

    const customPinIcon = L.divIcon({
      html: `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 5px rgba(0,0,0,0.3));">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#55aee5"/>
        </svg>
      `,
      className: 'custom-map-pin',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })

    businesses.forEach(b => {
      if (b.latitude && b.longitude) {
        const marker = L.marker([b.latitude, b.longitude], { icon: customPinIcon })
          .addTo(mapRef.current)
          .bindPopup(`
            <div style="font-family: sans-serif; padding: 2px;">
              <h4 style="margin: 0 0 4px 0; color: #202020;">${b.name}</h4>
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #666;">${b.category}</p>
              <button id="pop-btn-${b.id}" style="background: #55aee5; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;">Assess Lead</button>
            </div>
          `)
        
        marker.on('popupopen', () => {
          const btn = document.getElementById(`pop-btn-${b.id}`)
          if (btn) {
            btn.onclick = () => {
              handleSelectBusiness(b)
            }
          }
        })
        
        marker.on('click', () => {
          handleSelectBusiness(b)
        })

        markersRef.current.push(marker)
        latLns.push([b.latitude, b.longitude])
      }
    })

    if (latLns.length > 0) {
      const bounds = L.latLngBounds(latLns)
      mapRef.current.fitBounds(bounds, { padding: [30, 30] })
    }
  }, [businesses])

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    if (!city.trim() || !country.trim()) {
      setSearchError('City and Country are required')
      return
    }

    setSearchError('')
    setLoading(true)
    setSelectedBusiness(null)
    setRecommendation(null)
    setHasSearched(false)

    api(`/search?city=${encodeURIComponent(city.trim())}&country=${encodeURIComponent(country.trim())}&category=${encodeURIComponent(filter)}`)
      .then((data) => {
        setBusinesses(data || [])
        setHasSearched(true)
      })
      .catch((err) => {
        console.error('Search failed:', err)
        setSearchError(err.message || 'Search failed. Please ensure the backend is running.')
        setBusinesses([])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSelectBusiness = (business) => {
    setSelectedBusiness(business)
    setRecommendation(null)
    api(`/business/${business.id}`).catch(() => {})

    if (mapRef.current && business.latitude && business.longitude) {
      mapRef.current.setView([business.latitude, business.longitude], 16)
    }
  }

  const handleGetRecommendation = () => {
    if (!selectedBusiness) return
    setRecLoading(true)
    setRecommendation(null)

    api('/recommendations', {
      method: 'POST',
      body: JSON.stringify({ businessId: selectedBusiness.id })
    })
      .then((data) => {
        setRecommendation(data)
      })
      .catch((err) => {
        console.error('Failed to generate assessment:', err)
      })
      .finally(() => {
        setRecLoading(false)
      })
  }

  const handleCopyText = (text, field) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyFeedback({ field, message: 'Copied!' })
        setTimeout(() => setCopyFeedback({ field: '', message: '' }), 2000)

        api(`/business/${selectedBusiness.id}/copy`, {
          method: 'POST',
          body: JSON.stringify({ copiedField: field })
        }).catch(() => {})
      })
      .catch((err) => console.error('Failed to copy:', err))
  }

  return (
    <DashboardLayout>
      <section className="dashboard-layout">
        {/* Search Panel (Column 1, Row 1) */}
        <div className="directory-panel">
          <header className="panel-header">
            <h2>Lead Finder</h2>
            <p>Uncover digital opportunities near you</p>
          </header>

          <form onSubmit={handleSearch} className="directory-search-form">
            <div className="form-group-row">
              <label>
                <span>City</span>
                <input 
                  type="text" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  placeholder="e.g. London" 
                  required 
                />
              </label>
              <label>
                <span>Country</span>
                <input 
                  type="text" 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)} 
                  placeholder="e.g. United Kingdom" 
                  required 
                />
              </label>
            </div>
            
            <div className="form-group">
              <label>
                <span>Target Focus</span>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="restaurants">🍔 Mainly Restaurants & Cafes</option>
                  <option value="all">🏢 All Nearby Businesses</option>
                </select>
              </label>
            </div>

            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Find Opportunities ⌕'}
            </button>

            {searchError && <p className="search-error">{searchError}</p>}
          </form>
        </div>

        {/* Directory results (Column 1, Row 2) */}
        <div className="directory-results">
          <h3>Opportunities ({businesses.length})</h3>
          
          {loading ? (
            <div className="loader-box"><div className="loader"></div></div>
          ) : businesses.length === 0 ? (
            <p className="empty-results">
              {hasSearched ? 'No businesses found in this location.' : 'No leads loaded. Submit a city search to scan raw map data.'}
            </p>
          ) : (
            <div className="results-list">
              {businesses.map((b) => (
                <article 
                  key={b.id} 
                  className={`business-item-card ${selectedBusiness?.id === b.id ? 'active' : ''}`}
                  onClick={() => handleSelectBusiness(b)}
                >
                  <div className="card-indicator" style={{ background: b.websiteExists ? '#e2f0fd' : '#fff3cd' }}>
                    {b.websiteExists ? <FiGlobe style={{ color: '#55aee5' }} /> : <FiMapPin style={{ color: '#ffc107' }} />}
                  </div>
                  <div className="card-details">
                    <h4>{b.name}</h4>
                    <p className="b-cat">{b.category}</p>
                    <p className="b-addr">📍 {b.address || 'Address not listed'}</p>
                    <div className="card-tags">
                      {!b.websiteExists && <span className="tag tag-warn">No Website</span>}
                      {b.phone && <span className="tag">📞 Phone</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Map View Wrapper (Column 2, Row 1) */}
        <div className="map-view-wrapper">
          <div ref={mapContainerRef} className="interactive-leaflet-map" id="map"></div>
        </div>

        {/* Assessment Card Wrapper (Column 2, Row 2) */}
        <div className="assessment-wrapper">
          {selectedBusiness ? (
            <div className="business-assessment-card reveal is-visible">
              <div className="assessment-header">
                <div>
                  <span className="eyebrow">{selectedBusiness.category.toUpperCase()}</span>
                  <h3>{selectedBusiness.name}</h3>
                  <p className="address-text">📍 {selectedBusiness.address}</p>
                </div>
                <div className="website-badge-section">
                  {selectedBusiness.websiteExists ? (
                    <a href={selectedBusiness.website} target="_blank" rel="noopener noreferrer" className="badge badge-site">
                      <FiGlobe style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Visit Website
                    </a>
                  ) : (
                    <span className="badge badge-no-site">⚠️ Missing Website</span>
                  )}
                </div>
              </div>

              <div className="contact-details-row">
                <div className="contact-item">
                  <span className="label">Phone</span>
                  {selectedBusiness.phone ? (
                    <div className="copy-action-box">
                      <strong>{selectedBusiness.phone}</strong>
                      <button 
                        onClick={() => handleCopyText(selectedBusiness.phone, 'PHONE')} 
                        className="copy-icon-btn"
                        title="Copy Phone"
                      >
                        {copyFeedback.field === 'PHONE' ? '✓ Copied' : '🗎 Copy'}
                      </button>
                    </div>
                  ) : (
                    <span className="not-available">Not available</span>
                  )}
                </div>
                <div className="contact-item">
                  <span className="label">Email</span>
                  {selectedBusiness.email ? (
                    <div className="copy-action-box">
                      <strong>{selectedBusiness.email}</strong>
                      <button 
                        onClick={() => handleCopyText(selectedBusiness.email, 'EMAIL')} 
                        className="copy-icon-btn"
                        title="Copy Email"
                      >
                        {copyFeedback.field === 'EMAIL' ? '✓ Copied' : '🗎 Copy'}
                      </button>
                    </div>
                  ) : (
                    <span className="not-available">Not available</span>
                  )}
                </div>
              </div>

              <div className="ai-recommendation-section">
                <h4>AI Opportunity Assessment</h4>
                
                {recLoading ? (
                  <div className="loader-box-inline">
                    <div className="loader"></div>
                    <span>Generating Digital Assessment...</span>
                  </div>
                ) : recommendation ? (
                  <div className="recommendation-content">
                    <div className="score-pill-container">
                      <div className="score-ring" style={{ 
                        borderImage: `linear-gradient(to right, #55aee5, ${recommendation.opportunityScore > 75 ? '#28a745' : '#ffc107'}) 1`
                      }}>
                        <span className="score-num">{recommendation.opportunityScore}</span>
                        <span className="score-lbl">Score</span>
                      </div>
                      <div className="service-rec">
                        <span className="rec-eyebrow">RECOMMENDED SOLUTION</span>
                        <h5>{recommendation.service}</h5>
                      </div>
                    </div>
                    <div className="reasoning-box">
                      <p><strong>Rationale:</strong> {recommendation.reason}</p>
                      <small className="ai-model-tag">Generated via: {recommendation.model}</small>
                    </div>
                  </div>
                ) : (
                  <div className="generate-cta-box">
                    <p>Analyze this business's digital gaps and generate recommended freelance pitches.</p>
                    <button onClick={handleGetRecommendation} className="button button--primary run-rec-btn">
                      Generate Digital Assessment ⭐
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="select-lead-placeholder">
              <span className="star-icon">★</span>
              <h3>Select a Lead for Assessment</h3>
              <p>Click on a map pin or directory card to view contact information, ratings, and execute the AI digital gap analysis.</p>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  )
}

function NotFoundPage() {
  return (
    <main className="plain-page">
      <Header />
      <section className="not-found">
        <h1>404</h1>
        <h2>Page not Found</h2>
        <p>This page cant be transcribed. It looks like this page has left the meeting - or maybe it never joined.</p>
        <Button href="/">Go Home</Button>
      </section>
      <Footer />
    </main>
  )
}

function App() {
  useScrollReveal()
  const path = window.location.pathname
  if (path === '/') return <HomePage />
  if (path === '/get-started' || path === '/login') return <LoginPage />
  if (path === '/dashboard' || path === '/discover') return <DiscoverPage />
  if (path === '/privacy') return <PrivacyPage />
  if (path === '/terms') return <TermsPage />
  if (path === '/forgot-password') return <ForgotPasswordPage />
  return <NotFoundPage />
}

export default App

function useScrollReveal() {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    const elements = document.querySelectorAll('.reveal, .mini-cards article, .feature-grid article, .opportunity-card, .faq-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 },
    )
    elements.forEach((element, index) => {
      element.style.setProperty('--delay', `${Math.min(index * 55, 360)}ms`)
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])
}
