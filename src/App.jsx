import { useEffect, useRef, useState } from 'react'
import { api, authStore } from './lib/api'
import './App.css'

const navLinks = ['Home', 'Features', 'Pricing', 'How It Works', 'FAQ']

const demoOpportunities = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: 'Mama Mia Restaurant',
  location: 'Texas',
  website: 'No Website',
  phone: '+1 xxx xxx xxx',
  email: 'hello@email.com',
  recommendation: 'Food Ordering Web.',
}))

function Logo({ light = false, src }) {
  return (
    <a className={`logo ${light ? 'logo--light' : ''}`} href="/">
      <img src={src || (light ? '/logo.png' : '/logo-black.png')} alt="FirstClient" />
    </a>
  )
}

function Button({ children, href = '/get-started', variant = 'primary' }) {
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
        <Button href="/login">Back to Login</Button>
      </form>
    </SimplePage>
  )
}

function DiscoverPage() {
  return (
    <SimplePage
      eyebrow="DISCOVER"
      title="Discover Leads"
      body="Search by location, industry, and digital opportunity to find businesses that are ready for a better online presence."
    >
      <div className="simple-grid simple-grid--features">
        <article><h2>Location search</h2><p>Find businesses in the city, state, or country you want to target.</p></article>
        <article><h2>Opportunity signals</h2><p>Prioritize leads missing websites, ordering flows, booking tools, or clear contact paths.</p></article>
        <article><h2>Outreach prep</h2><p>Review phone, email, and recommendations before sending your next message.</p></article>
      </div>
      <Button href="/dashboard">Open Dashboard</Button>
    </SimplePage>
  )
}

function SettingsPage() {
  return (
    <SimplePage
      eyebrow="SETTINGS"
      title="Workspace Settings"
      body="Manage your profile preferences and keep your FirstClient workspace tuned for the type of clients you want."
    >
      <div className="settings-list">
        {['Profile details', 'Search preferences', 'Notification settings'].map((item) => (
          <label key={item}>
            <span>{item}</span>
            <input placeholder="Coming soon" disabled />
          </label>
        ))}
      </div>
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

      <section className="section process-section reveal">
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

      <section className="section timeline-section reveal" id="how-it-works">
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
        <p className="kinetic-caption">Just qualified opportunities waiting for your next message.</p>
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const session = await api('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name: 'Rosemary' }) })
      authStore.setSession(session)
      window.location.href = '/dashboard'
    } catch {
      try {
        const session = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
        authStore.setSession(session)
        window.location.href = '/dashboard'
      } catch (loginError) {
        setError(loginError.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Logo light />
        <img src="/login-picture.png" alt="Freelancer working on laptop" />
      </section>
      <form className="auth-form" aria-labelledby="auth-title" onSubmit={handleSubmit}>
        <p className="eyebrow">GET STARTED</p>
        <h1 id="auth-title">Welcome Back!</h1>
        <button className="google-button" type="button"><span>G</span>Continue with Google</button>
        <p className="or">or</p>
        <label>Email Address<input placeholder="yourexample4@gmail.com" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>
          Password
          <span className="password-field">
            <input placeholder="............" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} minLength="8" required />
            <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="3" />
                {showPassword ? <path className="eye-slash" d="M4 4l16 16" /> : null}
              </svg>
            </button>
          </span>
        </label>
        <div className="form-row"><span>Remember me</span><a href="/forgot-password">Forgot Password?</a></div>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="button button--primary submit-button" type="submit" disabled={loading}>{loading ? 'Connecting...' : 'Sign Up'}</button>
      </form>
    </main>
  )
}

function DashboardPage() {
  const [items, setItems] = useState(demoOpportunities)

  useEffect(() => {
    if (!authStore.accessToken) return
    api('/businesses')
      .then((businesses) => {
        if (!businesses.length) return
        setItems(businesses.map((business) => ({
          id: business.id,
          name: business.name,
          location: business.address || 'Texas',
          website: business.websiteExists ? 'Website Exists' : 'No Website',
          phone: business.phone || '+1 xxx xxx xxx',
          email: business.email || 'hello@email.com',
          recommendation: business.websiteExists ? 'Food Ordering Web.' : 'Restaurant Website',
        })))
      })
      .catch(() => setItems(demoOpportunities))
  }, [])

  function logout(event) {
    event.preventDefault()
    authStore.clear()
    window.location.href = '/'
  }

  return (
    <main className="dashboard-page">
      <aside>
        <Logo light />
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/discover">Discover Leads</a>
          <a href="/settings">Settings</a>
        </nav>
        <a className="logout" href="/" onClick={logout}>Logout</a>
      </aside>
      <section className="dashboard-content">
        <div className="dashboard-top">
          <h1>Welcome Back, Rosemary 👋</h1>
          <div className="search-pill">⌕ <span>Search Businesses</span></div>
          <img src="/profile-pic.png" alt="Rosemary" />
        </div>
        <img className="map-strip" src="/dashboard-google-map.png" alt="Dallas map" />
        <h2>Opportunities</h2>
        <div className="opportunity-grid">
          {items.map((item) => (
            <article className="opportunity-card" key={item.id}>
              <h3>{item.name}</h3>
              <p>📍 {item.location}</p>
              <p>🌐 {item.website}</p>
              <p>☎️ {item.phone}</p>
              <p>✉️ {item.email}</p>
              <p>⭐ {item.recommendation}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
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
  if (path === '/dashboard') return <DashboardPage />
  if (path === '/privacy') return <PrivacyPage />
  if (path === '/terms') return <TermsPage />
  if (path === '/forgot-password') return <ForgotPasswordPage />
  if (path === '/discover') return <DiscoverPage />
  if (path === '/settings') return <SettingsPage />
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

