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
import { FaArrowRightLong } from "react-icons/fa6";

const navLinks = ['Home', 'Features', 'How It Works', 'FAQ']

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
          <Button variant="white">Get Started <span><FaArrowRightLong /></span></Button>
        </div>
        <div className="hero-dashboard motion-float">
          <div className="dash-mockup">
            {/* Browser chrome */}
            <div className="dash-chrome">
              <span className="dash-dot" style={{background:'#ff5f57'}}/>
              <span className="dash-dot" style={{background:'#febc2e'}}/>
              <span className="dash-dot" style={{background:'#28c840'}}/>
              <div className="dash-url-bar">firstclient.app/discover</div>
            </div>

            {/* App shell: sidebar + main */}
            <div className="dash-shell">

              {/* Blue sidebar */}
              <aside className="dash-sidebar">
                {/* Logo */}
                <div className="dash-logo">
                  <div style={{width:'22px',height:'22px',borderRadius:'6px',background:'rgba(255,255,255,0.25)'}}/>
                  <div style={{width:'52px',height:'8px',background:'rgba(255,255,255,0.6)',borderRadius:'3px'}}/>
                </div>
                {/* Nav items */}
                <nav className="dash-sidenav">
                  {[['🔍','Discover',true],['📊','Analytics',false],['⚙️','Settings',false]].map(([icon,label,active],i)=>(
                    <div key={i} className={`dash-navitem ${active?'dash-navitem-active':''}`}>
                      <span>{icon}</span>
                      <span className="dash-navlabel">{label}</span>
                    </div>
                  ))}
                </nav>
                <div className="dash-logout">↩ Logout</div>
              </aside>

              {/* Main area */}
              <div className="dash-main">
                {/* 2-col grid: left panel + right map/assessment */}
                <div className="dash-layout">

                  {/* LEFT: search panel + results */}
                  <div className="dash-left">
                    {/* Panel header */}
                    <div className="dash-panelhead">
                      <div style={{width:'55%',height:'9px',background:'#222',borderRadius:'3px',fontWeight:700}}/>
                      <div style={{width:'75%',height:'7px',background:'#ccc',borderRadius:'3px',marginTop:'5px'}}/>
                    </div>
                    {/* Search form */}
                    <div className="dash-form">
                      <div className="dash-form-row">
                        <div className="dash-pill-input"/>
                        <div className="dash-pill-input"/>
                      </div>
                      <div className="dash-pill-input" style={{width:'100%'}}/>
                      {/* Website filter */}
                      <div className="dash-wfilter">
                        <div className="dash-wf-btn dash-wf-active">🌐 All</div>
                        <div className="dash-wf-btn">✅ Has Site</div>
                        <div className="dash-wf-btn">🚫 No Site</div>
                      </div>
                      <div className="dash-submit">🔎 Find Opportunities</div>
                    </div>
                    {/* Results list */}
                    <div className="dash-results">
                      <div className="dash-results-label">OPPORTUNITIES (12)</div>
                      {[
                        {name:'Bella Cucina', cat:'Restaurants', addr:'14 Crown St', has:true, active:false},
                        {name:'The Coffee Loft', cat:'Cafes', addr:'22 Baker Ave', has:false, active:true},
                        {name:'GreenLeaf Pharmacy', cat:'Pharmacy', addr:'5 High St', has:true, active:false},
                        {name:'Studio Nova', cat:'Salons', addr:'88 King Rd', has:false, active:false},
                      ].map((b,i)=>(
                        <div key={i} className={`dash-bcard ${b.active?'dash-bcard-active':''}`}>
                          <div className="dash-bind" style={{background: b.has?'#e2f0fd':'#fff3cd'}}>
                            <span style={{fontSize:'9px'}}>{b.has?'🌐':'📍'}</span>
                          </div>
                          <div style={{flex:1,overflow:'hidden'}}>
                            <div className="dash-bname">{b.name}</div>
                            <div className="dash-bcat">{b.cat}</div>
                            <div className="dash-baddr">📍 {b.addr}</div>
                          </div>
                          {!b.has && <div className="dash-badge">No Site</div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: map + assessment */}
                  <div className="dash-right">
                    {/* Map */}
                    <div className="dash-map">
                      <div className="dash-map-bg">
                        <div className="dash-map-grid"/>
                        {[
                          {top:'28%',left:'40%',active:false},{top:'44%',left:'56%',active:true},
                          {top:'36%',left:'33%',active:false},{top:'58%',left:'50%',active:false},
                          {top:'22%',left:'62%',active:false},{top:'50%',left:'38%',active:false},
                        ].map((p,i)=>(
                          <div key={i} className={`dash-pin ${p.active?'dash-pin-active':''}`} style={{top:p.top,left:p.left}}/>
                        ))}
                        {/* Leaflet-style attribution */}
                        <div className="dash-attrib">© OpenStreetMap</div>
                      </div>
                    </div>

                    {/* AI Assessment panel */}
                    <div className="dash-assess">
                      <div className="dash-assess-head">
                        <div>
                          <div style={{width:'70%',height:'9px',background:'#222',borderRadius:'3px'}}/>
                          <div style={{width:'50%',height:'7px',background:'#aaa',borderRadius:'3px',marginTop:'5px'}}/>
                        </div>
                        <div className="dash-assess-badge">No Website</div>
                      </div>
                      <div className="dash-assess-row">
                        <div className="dash-assess-chip" style={{background:'#fff3cd',color:'#b07d00'}}>⚠️ No Website</div>
                        <div className="dash-assess-chip" style={{background:'#d4edda',color:'#1a7a3a'}}>✅ Has Phone</div>
                        <div className="dash-assess-chip" style={{background:'#f4f4f4',color:'#888'}}>📍 Listed</div>
                      </div>
                      <div className="dash-assess-text"/>
                      <div className="dash-assess-text" style={{width:'80%'}}/>
                      <div className="dash-assess-actions">
                        <div className="dash-action-btn">📞 Copy Phone</div>
                        <div className="dash-action-btn">🗺️ Open OSM</div>
                        <div className="dash-action-btn dash-action-primary">⭐ Pitch AI</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
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

const COUNTRY_CITIES = {
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Dallas', 'Miami'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool'],
  'Nigeria': ['Lagos', 'Abuja', 'Enugu', 'Port Harcourt', 'Kano', 'Ibadan'],
  'South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra'],
  'Germany': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart'],
  'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes'],
  'Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa'],
  'Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte'],
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata']
}

const CATEGORIES = [
  'Restaurants',
  'Cafes',
  'Hotels',
  'Salons',
  'Barbershops',
  'Bakeries',
  'Pharmacies',
  'Schools',
  'Hospitals',
  'Gyms',
  'Real Estate Agencies',
  'Supermarkets',
  'Electronics Stores',
  'Boutiques',
  'Auto Repair Shops',
  'Dentists',
  'Law Firms',
  'Accounting Firms',
  'Beauty Spas',
  'Pet Stores'
]

function SearchableDropdown({ label, placeholder, options, value, onChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('')
    }
  }, [isOpen])

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="searchable-dropdown" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <span className="dropdown-label" style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: '#555' }}>
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={isOpen ? searchTerm : (value || '')}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => { if (!disabled) setIsOpen(true); }}
        disabled={disabled}
        className="dropdown-input"
        style={{
          width: '100%',
          height: '42px',
          border: '1px solid #e2e2e2',
          background: disabled ? '#f5f5f5' : '#f4f4f4',
          borderRadius: '999px',
          padding: '0 20px',
          fontSize: '14px',
          color: '#333',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      />
      {isOpen && (
        <ul className="dropdown-list" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          maxHeight: '200px',
          overflowY: 'auto',
          background: '#fff',
          border: '1px solid #e2e2e2',
          borderRadius: '12px',
          marginTop: '6px',
          padding: '6px 0',
          listStyle: 'none',
          zIndex: 1000,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
        }}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt)
                  setIsOpen(false)
                }}
                className={`dropdown-item ${opt === value ? 'selected' : ''}`}
                style={{
                  padding: '8px 20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: opt === value ? '#55aee5' : '#333',
                  background: opt === value ? 'rgba(85, 174, 229, 0.08)' : 'transparent',
                  fontWeight: opt === value ? '600' : 'normal'
                }}
              >
                {opt}
              </li>
            ))
          ) : (
            <li style={{ padding: '8px 20px', fontSize: '14px', color: '#999' }}>No results found</li>
          )}
        </ul>
      )}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="skeleton-card" style={{
      padding: '14px',
      border: '1px solid #e2e2e2',
      borderRadius: '12px',
      background: '#fff',
      marginBottom: '12px',
      display: 'flex',
      gap: '14px',
      animation: 'pulse 1.5s infinite ease-in-out'
    }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e9e9e9', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: '14px', width: '60%', background: '#e9e9e9', borderRadius: '4px', marginBottom: '8px' }} />
        <div style={{ height: '11px', width: '30%', background: '#e9e9e9', borderRadius: '4px', marginBottom: '8px' }} />
        <div style={{ height: '11px', width: '80%', background: '#f4f4f4', borderRadius: '4px', marginBottom: '12px' }} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <div style={{ height: '24px', width: '70px', background: '#e9e9e9', borderRadius: '6px' }} />
          <div style={{ height: '24px', width: '70px', background: '#e9e9e9', borderRadius: '6px' }} />
        </div>
      </div>
    </div>
  )
}

function DiscoverPage() {
  const [city, setCity] = useState('London')
  const [country, setCountry] = useState('United Kingdom')
  const [filter, setFilter] = useState('Restaurants')
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [recLoading, setRecLoading] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState({ id: '', field: '', message: '' })
  const [websiteFilter, setWebsiteFilter] = useState('all') // 'all' | 'with' | 'without'

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const markerMapRef = useRef(new Map())
  const searchTimeoutRef = useRef(null)

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    if (!city || !country) {
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

  // Debounced auto-search trigger
  useEffect(() => {
    if (!city || !country || !filter) return

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)

    searchTimeoutRef.current = setTimeout(() => {
      handleSearch()
    }, 600)

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [city, country, filter])

  // Immediate search on submit button click
  const triggerSearch = (e) => {
    if (e) e.preventDefault()
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    handleSearch()
  }

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
    markerMapRef.current.clear()

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
        const popupHtml = `
          <div style="font-family: 'DM Sans', sans-serif; padding: 4px; min-width: 180px;">
            <h4 style="margin: 0 0 4px 0; color: #202020; font-size: 13px; font-weight: 600;">${b.name}</h4>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #9c9c9c;">${b.category}</p>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #444;">📍 ${b.address || 'No address'}</p>
            ${b.phone ? `<p style="margin: 0 0 6px 0; font-size: 11px; color: #444;">📞 ${b.phone}</p>` : ''}
            ${b.website ? `<p style="margin: 0 0 6px 0; font-size: 11px;"><a href="${b.website}" target="_blank" rel="noopener noreferrer" style="color: #55aee5; text-decoration: underline;">🌐 Website</a></p>` : ''}
            <button id="pop-rec-btn-${b.id}" style="background: #55aee5; color: white; border: none; padding: 6px 12px; border-radius: 999px; font-size: 11px; cursor: pointer; font-weight: 500; width: 100%; text-align: center; margin-top: 4px;">Get Recommendation</button>
          </div>
        `

        const marker = L.marker([b.latitude, b.longitude], { icon: customPinIcon })
          .addTo(mapRef.current)
          .bindPopup(popupHtml)
        
        marker.on('popupopen', () => {
          const recBtn = document.getElementById(`pop-rec-btn-${b.id}`)
          if (recBtn) {
            recBtn.onclick = (e) => {
              e.stopPropagation()
              handleSelectBusiness(b)
              handleGetRecommendation(b)
            }
          }
          
          // Scroll corresponding business card into view
          const cardEl = document.getElementById(`card-${b.id}`)
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        })
        
        marker.on('click', () => {
          handleSelectBusiness(b)
        })

        markerMapRef.current.set(b.id, marker)
        latLns.push([b.latitude, b.longitude])
      }
    })

    if (latLns.length > 0) {
      const bounds = L.latLngBounds(latLns)
      mapRef.current.fitBounds(bounds, { padding: [30, 30] })
    }
  }, [businesses])

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize()
      }, 250)
    }
  }, [businesses, selectedBusiness])

  const handleSelectBusiness = (business) => {
    setSelectedBusiness(business)
    setRecommendation(null)
    api(`/business/${business.id}`).catch(() => {})

    if (mapRef.current && business.latitude && business.longitude) {
      mapRef.current.setView([business.latitude, business.longitude], 16)
    }

    const marker = markerMapRef.current.get(business.id)
    if (marker && mapRef.current) {
      marker.openPopup()
    }
  }

  const handleGetRecommendation = (business = selectedBusiness) => {
    const targetBusiness = business || selectedBusiness
    if (!targetBusiness) return
    setSelectedBusiness(targetBusiness)
    setRecLoading(true)
    setRecommendation(null)

    api('/recommendations', {
      method: 'POST',
      body: JSON.stringify({ businessId: targetBusiness.id })
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

  const handleCopyText = (text, field, businessId) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyFeedback({ id: businessId, field, message: 'Copied!' })
        setTimeout(() => setCopyFeedback({ id: '', field: '', message: '' }), 2000)

        api(`/business/${businessId}/copy`, {
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
            <p>Uncover digital opportunities near you and globally</p>
          </header>

          <form onSubmit={triggerSearch} className="directory-search-form" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group-row">
              <SearchableDropdown
                label="Country"
                placeholder="Search Country..."
                options={Object.keys(COUNTRY_CITIES)}
                value={country}
                onChange={(val) => {
                  setCountry(val)
                  setCity('') // Reset city when country changes
                }}
              />
              <SearchableDropdown
                label="City"
                placeholder={country ? "Search City..." : "Select country first..."}
                options={country ? COUNTRY_CITIES[country] || [] : []}
                value={city}
                onChange={setCity}
                disabled={!country}
              />
            </div>
            
            <div className="form-group">
              <SearchableDropdown
                label="Business Category"
                placeholder="Search Category..."
                options={CATEGORIES}
                value={filter}
                onChange={setFilter}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>Website Filter</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[['all', '🌐 All'], ['with', '✅ Has Website'], ['without', '🚫 No Website']].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setWebsiteFilter(val)}
                    style={{
                      flex: 1,
                      padding: '7px 6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '8px',
                      border: '1.5px solid',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      borderColor: websiteFilter === val ? 'var(--blue)' : '#e2e2e2',
                      background: websiteFilter === val ? 'rgba(85,174,229,0.1)' : '#fff',
                      color: websiteFilter === val ? 'var(--blue)' : '#666',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="search-btn" disabled={loading} style={{ height: '42px', marginTop: '8px' }}>
              {loading ? 'Searching...' : '🔎 Find Opportunities'}
            </button>

            {searchError && <p className="search-error">{searchError}</p>}
          </form>
        </div>

        {/* Directory results (Column 1, Row 2) */}
        <div className="directory-results">
          {(() => {
            const filtered = businesses.filter(b => {
              if (websiteFilter === 'with') return b.websiteExists
              if (websiteFilter === 'without') return !b.websiteExists
              return true
            })
            return <h3>Opportunities ({filtered.length}{filtered.length !== businesses.length ? ` of ${businesses.length}` : ''})</h3>
          })()}
          
          {loading ? (
            <div className="results-list">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : businesses.length === 0 ? (
            <div className="empty-results-box" style={{ textAlign: 'center', padding: '40px 20px', color: '#9c9c9c' }}>
              <span style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }}>🔍</span>
              <h4>No Leads Found</h4>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>
                {hasSearched 
                  ? 'No businesses found in this location. Try another category.' 
                  : 'Submit a location search to scan raw map data.'}
              </p>
            </div>
          ) : (
            <div className="results-list">
              {businesses
                .filter(b => {
                  if (websiteFilter === 'with') return b.websiteExists
                  if (websiteFilter === 'without') return !b.websiteExists
                  return true
                })
                .map((b) => (
                <article 
                  key={b.id} 
                  id={`card-${b.id}`}
                  className={`business-item-card ${selectedBusiness?.id === b.id ? 'active' : ''}`}
                  onClick={() => handleSelectBusiness(b)}
                  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div className="card-indicator" style={{ background: b.websiteExists ? '#e2f0fd' : '#fff3cd' }}>
                      {b.websiteExists ? <FiGlobe style={{ color: '#55aee5' }} /> : <FiMapPin style={{ color: '#ffc107' }} />}
                    </div>
                    <div className="card-details" style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 2px 0' }}>{b.name}</h4>
                      <p className="b-cat" style={{ margin: '0 0 4px 0' }}>{b.category}</p>
                      <p className="b-addr" style={{ margin: '0 0 4px 0' }}>📍 {b.address || 'Address not listed'}</p>
                      {b.distance !== undefined && (
                        <p className="b-dist" style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
                          📐 {b.distance} km from city center
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="card-actions" style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                    {b.phone && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleCopyText(b.phone, 'PHONE', b.id); }} 
                        className="btn-card-action"
                      >
                        {copyFeedback.id === b.id && copyFeedback.field === 'PHONE' ? '✓ Copied' : '📞 Copy Phone'}
                      </button>
                    )}
                    {b.website && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleCopyText(b.website, 'WEBSITE', b.id); }} 
                        className="btn-card-action"
                      >
                        {copyFeedback.id === b.id && copyFeedback.field === 'WEBSITE' ? '✓ Copied' : '🌐 Copy Web'}
                      </button>
                    )}
                    <a 
                      href={b.googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()} 
                      className="btn-card-action"
                    >
                      🗺️ Open OSM
                    </a>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSelectBusiness(b); handleGetRecommendation(b); }} 
                      className="btn-card-action btn-recommend"
                    >
                      ⭐ Pitch AI
                    </button>
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
                        onClick={() => handleCopyText(selectedBusiness.phone, 'PHONE', selectedBusiness.id)} 
                        className="copy-icon-btn"
                        title="Copy Phone"
                      >
                        {copyFeedback.id === selectedBusiness.id && copyFeedback.field === 'PHONE' ? '✓ Copied' : '🗎 Copy'}
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
                        onClick={() => handleCopyText(selectedBusiness.email, 'EMAIL', selectedBusiness.id)} 
                        className="copy-icon-btn"
                        title="Copy Email"
                      >
                        {copyFeedback.id === selectedBusiness.id && copyFeedback.field === 'EMAIL' ? '✓ Copied' : '🗎 Copy'}
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
                    <button onClick={() => handleGetRecommendation(selectedBusiness)} className="button button--primary run-rec-btn">
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
