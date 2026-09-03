import { useState, useEffect, useRef } from 'react'

// ── Breakpoint hook ─────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop'
    if (window.innerWidth <= 500) return 'mobile'
    if (window.innerWidth <= 900) return 'tablet'
    return 'desktop'
  })
  useEffect(() => {
    const fn = () => {
      if (window.innerWidth <= 500) setBp('mobile')
      else if (window.innerWidth <= 900) setBp('tablet')
      else setBp('desktop')
    }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return bp
}

// ── Icons (Lucide-style 1.5px stroke) ──────────────────────────────────────
function Icon({ path, color = 'currentColor', size = 20 }: { path: string; color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  )
}

const Icons = {
  sun: 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z',
  moon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z',
  graduationCap: 'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5',
  creditCard: 'M1 6h22v12H1zM1 10h22',
  calendar: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  messageCircle: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  barChart: 'M12 20V10M18 20V4M6 20v-4',
  brain: 'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.04A3 3 0 0 1 4 12a3 3 0 0 1 2-2.83V8.5A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.04A3 3 0 0 0 20 12a3 3 0 0 0-2-2.83V8.5A2.5 2.5 0 0 0 14.5 2z',
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  sparkles: 'M12 3l1.09 3.26L16.5 7.5l-3.41 1.24L12 12l-1.09-3.26L7.5 7.5l3.41-1.24L12 3zM5 17l.55 1.64L7.19 19.7l-1.64.64L5 22l-.55-1.64-1.64-.64 1.64-.64L5 17zM18 17l.55 1.64 1.64.64-1.64.64L18 22l-.55-1.64-1.64-.64 1.64-.64L18 17z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  layers: 'M12 2l9.5 5.5-9.5 5.5L2.5 7.5 12 2zM2.5 16.5L12 22l9.5-5.5M2.5 12L12 17.5l9.5-5.5',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  arrowDown: 'M12 5v14M5 12l7 7 7-7',
  check: 'M20 6L9 17l-5-5',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  trendingUp: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  database: 'M12 2C6.5 2 2 4.7 2 8v8c0 3.3 4.5 6 10 6s10-2.7 10-6V8c0-3.3-4.5-6-10-6zM2 8c0 3.3 4.5 6 10 6s10-2.7 10-6M2 12c0 3.3 4.5 6 10 6s10-2.7 10-6',
  cpu: 'M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0M12 3v3M12 18v3M3 12h3M18 12h3M7.76 7.76l-2.12-2.12M18.36 18.36l-2.12-2.12M7.76 16.24l-2.12 2.12M18.36 5.64l-2.12 2.12',
  globe: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  menu: 'M3 12h18M3 6h18M3 18h18',
  x: 'M18 6L6 18M6 6l12 12',
}

// ── Sub-components ──────────────────────────────────────────────────────────
function Badge({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'secondary' | 'tertiary' }) {
  const colors = {
    primary: 'rgba(79,70,229,0.10)',
    secondary: 'rgba(16,185,129,0.10)',
    tertiary: 'rgba(245,158,11,0.10)',
  }
  const text = { primary: 'var(--primary)', secondary: 'var(--secondary)', tertiary: 'var(--tertiary)' }
  return (
    <span style={{
      display: 'inline-block',
      background: colors[variant],
      color: text[variant],
      borderRadius: 'var(--radius-sm)',
      padding: '3px 10px',
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    }}>
      {label}
    </span>
  )
}

function IconBox({ iconPath, variant = 'primary', size = 40 }: { iconPath: string; variant?: 'primary' | 'secondary' | 'tertiary'; size?: number }) {
  const map = {
    primary: { bg: 'rgba(79,70,229,0.08)', color: 'var(--primary)' },
    secondary: { bg: 'rgba(16,185,129,0.08)', color: 'var(--secondary)' },
    tertiary: { bg: 'rgba(245,158,11,0.08)', color: 'var(--tertiary)' },
  }
  const c = map[variant]
  return (
    <div style={{
      width: size, height: size,
      borderRadius: 'var(--radius-md)',
      background: c.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon path={iconPath} color={c.color} size={Math.round(size * 0.5)} />
    </div>
  )
}

function PrimaryButton({ children, recommender = false, onClick, fullWidth = false }: {
  children: React.ReactNode; recommender?: boolean; onClick?: () => void; fullWidth?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: recommender ? 'var(--gradient-secondary)' : 'var(--gradient-primary)',
        color: '#fff',
        borderRadius: 'var(--radius-md)',
        padding: '13px 24px',
        fontSize: '15px',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        boxShadow: hovered ? 'var(--shadow-4)' : 'var(--shadow-1)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        fontFamily: 'inherit',
        width: fullWidth ? '100%' : undefined,
        minHeight: '44px',
        transition: 'box-shadow 150ms ease, transform 150ms ease',
      }}>
      {children}
    </button>
  )
}

function OutlineButton({ children, onClick, fullWidth = false }: { children: React.ReactNode; onClick?: () => void; fullWidth?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(79,70,229,0.06)' : 'transparent',
        color: 'var(--foreground)',
        borderRadius: 'var(--radius-md)',
        // padding: '13px 24px',
        fontSize: '15px',
        fontWeight: '600',
        border: '1.5px solid var(--border)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        width: fullWidth ? '100%' : undefined,
        minHeight: '44px',
        transition: 'background 150ms ease',
      }}>
      {children}
    </button>
  )
}

function Card({ children, style = {}, hoverLift = true }: { children: React.ReactNode; style?: React.CSSProperties; hoverLift?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        border: `1px solid ${hovered && hoverLift ? 'rgba(79,70,229,0.30)' : 'var(--border)'}`,
        boxShadow: hovered && hoverLift ? 'var(--shadow-4)' : 'var(--shadow-1)',
        transition: 'box-shadow 200ms ease-out, border-color 200ms ease-out, transform 200ms ease-out',
        transform: hovered && hoverLift ? 'translateY(-2px)' : 'translateY(0)',
        ...style,
      }}>
      {children}
    </div>
  )
}

// ── Theme Toggle ────────────────────────────────────────────────────────────
function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    /* Outer div provides the 44px touch target without distorting the pill */
    <div
      onClick={onToggle}
      role="button"
      aria-label="Toggle theme"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onToggle()}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        cursor: 'pointer',
        flexShrink: 0,
      }}>
      <div style={{
        position: 'relative',
        width: 52,
        height: 28,
        borderRadius: 999,
        background: dark ? 'rgba(129,140,248,0.20)' : 'rgba(79,70,229,0.12)',
        border: '1.5px solid var(--border)',
        flexShrink: 0,
      }}>
        <span style={{
          position: 'absolute',
          top: 3,
          left: dark ? 27 : 3,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'left 200ms ease-out',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        }}>
          <Icon path={dark ? Icons.moon : Icons.sun} color="#fff" size={11} />
        </span>
      </div>
    </div>
  )
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const collapsed = isMobile || isTablet

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    if (!collapsed) setMenuOpen(false)
  }, [collapsed])

  const links = ['Overview', 'Features', 'Recommendations', 'Dashboard', 'About']
  const px = isMobile ? 16 : isTablet ? 40 : 80

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? 'var(--surface)' : 'transparent',
        borderBottom: `1px solid ${scrolled || menuOpen ? 'var(--border)' : 'transparent'}`,
        boxShadow: scrolled ? 'var(--shadow-1)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 250ms ease, border-color 250ms ease',
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          padding: `0 ${px}px`,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon path={Icons.graduationCap} color="#fff" size={18} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              UniPortal
            </span>
          </div>

          {/* Desktop nav links */}
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
              {links.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{
                  color: 'var(--foreground-muted)',
                  textDecoration: 'none',
                  fontSize: 14, fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-md)',
                  transition: 'color 150ms, background 150ms',
                  display: 'inline-block',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--foreground)'; (e.target as HTMLElement).style.background = 'rgba(79,70,229,0.06)' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--foreground-muted)'; (e.target as HTMLElement).style.background = 'transparent' }}
                >
                  {l}
                </a>
              ))}
            </div>
          )}

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
            {/* Theme toggle always visible */}
            <ThemeToggle dark={dark} onToggle={onToggle} />

            {/* Login button — desktop & tablet only in navbar */}
            {!isMobile && (
              <PrimaryButton>Login to Portal</PrimaryButton>
            )}

            {/* Hamburger — tablet & mobile */}
            {collapsed && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  color: 'var(--foreground)',
                  flexShrink: 0,
                }}>
                <Icon path={menuOpen ? Icons.x : Icons.menu} color="var(--foreground)" size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile/Tablet dropdown menu — open state */}
        {collapsed && menuOpen && (
          <div style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--surface)',
            padding: `16px ${px}px 24px`,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                  fontSize: 16, fontWeight: 500,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  minHeight: 44,
                  display: 'flex', alignItems: 'center',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(79,70,229,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {l}
              </a>
            ))}
            {/* Login button inside hamburger menu on mobile */}
            {isMobile && (
              <div style={{ marginTop: 12 }}>
                <PrimaryButton fullWidth>Login to Portal</PrimaryButton>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

// ── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80
  const py = isMobile ? 48 : isTablet ? 64 : 100
  const h1Size = isMobile ? 32 : isTablet ? 40 : 56

  return (
    <section id="overview" style={{
      paddingTop: py + 64,
      paddingBottom: py,
      paddingLeft: px,
      paddingRight: px,
      maxWidth: 1440,
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gradient orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Text block */}
      <div style={{
        textAlign: 'center',
        maxWidth: 760,
        margin: '0 auto',
        position: 'relative', zIndex: 1,
        marginBottom: isMobile ? 40 : 56,
      }}>
        <Badge label="Smart Academic Platform" variant="primary" />
        <h1 style={{
          fontSize: h1Size,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.015em',
          color: 'var(--foreground)',
          margin: '16px 0 20px',
        }}>
          One Portal.{' '}
          <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Every Service.
          </span>{' '}
          Smarter Course Choices.
        </h1>
        <p style={{
          fontSize: isMobile ? 16 : isTablet ? 17 : 18,
          lineHeight: 1.6,
          color: 'var(--foreground-muted)',
          margin: '0 0 32px',
        }}>
          UniPortal unifies every academic, administrative, and financial service into a single intelligent workspace — and its AI-powered recommendation engine suggests courses tailored to your skills, interests, and academic history.
        </p>
        {/* CTAs: side-by-side on desktop/tablet, stacked full-width on mobile */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 12,
          justifyContent: 'center',
          alignItems: isMobile ? 'stretch' : 'center',
        }}>
          <PrimaryButton fullWidth={isMobile}>Explore the Portal</PrimaryButton>
          <OutlineButton fullWidth={isMobile}><a title='read the paper' style={{width: '100%', height: '100%' , padding: '13px 24px'}} href="https://drive.google.com/drive/folders/1bJNFR-d29V7eISIMtyEVkpzmyGz58YOO?usp=sharing"  target='_blank'>See How Recommendations Work</a></OutlineButton>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <DashboardMockup />
      </div>
    </section>
  )
}

function DashboardMockup() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  return (
    <div style={{
      width: '100%',
      maxWidth: 1100,
      margin: '0 auto',
      background: 'var(--surface)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-8)',
      overflow: 'hidden',
    }}>
      {/* Browser bar */}
      <div style={{
        background: 'var(--surface-muted)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'block' }} />
        {!isMobile && (
          <div style={{
            flex: 1, marginLeft: 8,
            background: 'var(--surface)', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', padding: '4px 12px',
            fontSize: 12, color: 'var(--foreground-subtle)',
            fontFamily: 'IBM Plex Mono, monospace',
            maxWidth: 280, margin: '0 auto',
          }}>
            portal.university.edu/dashboard
          </div>
        )}
      </div>

      {/* Dashboard body */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '180px 1fr' : '220px 1fr', minHeight: isMobile ? 'auto' : 400 }}>
        {/* Sidebar — hidden on mobile */}
        {!isMobile && (
          <div style={{
            background: 'var(--surface-muted)',
            borderRight: '1px solid var(--border)',
            padding: '16px 10px',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {[
              { icon: Icons.globe, label: 'Dashboard', active: true, v: 'primary' as const },
              { icon: Icons.book, label: 'Courses', v: 'primary' as const },
              { icon: Icons.barChart, label: 'Grades', v: 'primary' as const },
              { icon: Icons.creditCard, label: 'Finance', v: 'tertiary' as const },
              { icon: Icons.calendar, label: 'Schedule', v: 'primary' as const },
              { icon: Icons.sparkles, label: 'Recommend', v: 'secondary' as const },
              { icon: Icons.bell, label: 'Alerts', v: 'primary' as const },
            ].map(({ icon, label, active, v }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px',
                borderRadius: 'var(--radius-md)',
                background: active ? 'rgba(79,70,229,0.10)' : 'transparent',
                cursor: 'pointer',
              }}>
                <Icon path={icon} color={active ? 'var(--primary)' : v === 'secondary' ? 'var(--secondary)' : v === 'tertiary' ? 'var(--tertiary)' : 'var(--foreground-muted)'} size={14} />
                <span style={{ fontSize: isTablet ? 11 : 13, color: active ? 'var(--primary)' : 'var(--foreground-muted)', fontWeight: active ? 600 : 400 }}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Main area */}
        <div style={{ padding: isMobile ? 14 : 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: 'GPA', value: '3.87', sub: 'Spring 2025', v: 'primary' as const },
              { label: 'Credits', value: '96', sub: '/ 120', v: 'secondary' as const },
              { label: 'Balance', value: '$842', sub: 'Due Apr 15', v: 'tertiary' as const },
            ].map(({ label, value, sub, v }) => (
              <div key={label} style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                padding: isMobile ? '10px 8px' : 12,
                border: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: 10, color: 'var(--foreground-muted)', marginBottom: 3 }}>{label}</div>
                <div className="mono" style={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: v === 'primary' ? 'var(--primary)' : v === 'secondary' ? 'var(--secondary)' : 'var(--tertiary)' }}>{value}</div>
                <div style={{ fontSize: 10, color: 'var(--foreground-subtle)', marginTop: 1 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Schedule + Recs */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: 12, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--foreground)', marginBottom: 8 }}>Today's Schedule</div>
              {[
                { time: '09:00', course: 'CS 401 — Machine Learning', room: 'Hall B-204' },
                { time: '11:30', course: 'MATH 302 — Linear Algebra', room: 'Hall A-101' },
                { time: '14:00', course: 'CS 355 — Databases', room: 'Lab 3-B' },
              ].slice(0, isMobile ? 2 : 3).map(({ time, course, room }) => (
                <div key={time} style={{ display: 'flex', gap: 8, marginBottom: 7, alignItems: 'flex-start' }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--primary)', minWidth: 38, paddingTop: 1 }}>{time}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--foreground)' }}>{course}</div>
                    <div style={{ fontSize: 10, color: 'var(--foreground-subtle)' }}>{room}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(79,70,229,0.05) 100%)',
              borderRadius: 'var(--radius-md)', padding: 12,
              border: '1px solid rgba(16,185,129,0.25)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                <Icon path={Icons.sparkles} color="var(--secondary)" size={12} />
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--foreground)' }}>Recommended For You</span>
              </div>
              {[
                { code: 'CS 480', name: 'Deep Learning', match: '96%' },
                { code: 'CS 465', name: 'NLP & Text Mining', match: '91%' },
                { code: 'STAT 410', name: 'Bayesian Stats', match: '88%' },
              ].slice(0, isMobile ? 2 : 3).map(({ code, name, match }) => (
                <div key={code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                  <div>
                    <span className="mono" style={{ fontSize: 9, color: 'var(--secondary)', fontWeight: 500 }}>{code}</span>
                    <div style={{ fontSize: 11, color: 'var(--foreground)', fontWeight: 500 }}>{name}</div>
                  </div>
                  <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary)' }}>{match}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Problem Statement ───────────────────────────────────────────────────────
function ProblemSection() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80
  const py = isMobile ? 48 : isTablet ? 64 : 100

  const stats = [
    { value: '73%', label: 'of students use 4+ separate systems for academic tasks', icon: Icons.layers, v: 'primary' as const },
    { value: '61%', label: 'feel unprepared when choosing elective courses each semester', icon: Icons.target, v: 'secondary' as const },
    { value: '38%', label: 'experience delays due to siloed administrative workflows', icon: Icons.zap, v: 'tertiary' as const },
  ]

  return (
    <section id="problem" style={{ padding: `${py}px ${px}px`, maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ maxWidth: 640, marginBottom: isMobile ? 36 : 56 }}>
        <Badge label="The Problem" variant="tertiary" />
        <h2 style={{ fontSize: isMobile ? 24 : isTablet ? 28 : 36, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '14px 0 16px' }}>
          Students Juggle Too Many Systems — With No Guidance
        </h2>
        <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.6, color: 'var(--foreground-muted)', margin: 0 }}>
          Between registration portals, learning management systems, financial platforms, and academic advisors, students face fragmented experiences that waste time and leave critical decisions — like course selection — without intelligent support.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? 16 : 24,
      }}>
        {stats.map(({ value, label, icon, v }, i) => (
          <div key={value}>
            {isMobile && i > 0 && (
              <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
            )}
            <Card style={{ padding: isMobile ? 20 : 24 }}>
              <IconBox iconPath={icon} variant={v} />
              <div className="mono" style={{ fontSize: isMobile ? 32 : 40, fontWeight: 600, color: 'var(--foreground)', margin: '14px 0 8px', letterSpacing: '-0.02em' }}>
                {value}
              </div>
              <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.6, color: 'var(--foreground-muted)', margin: 0 }}>{label}</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Features Section ────────────────────────────────────────────────────────
function FeaturesSection() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80
  const py = isMobile ? 48 : isTablet ? 64 : 100

  const features = [
    { icon: Icons.book, title: 'Course Registration', desc: 'Browse, register, and manage your courses with real-time seat availability and prerequisite validation.', v: 'primary' as const },
    { icon: Icons.barChart, title: 'Grades & Transcripts', desc: 'Access current grades, historical transcripts, and GPA analytics with semester-by-semester breakdowns.', v: 'primary' as const },
    { icon: Icons.creditCard, title: 'Financial Services', desc: 'View tuition invoices, make payments, apply for financial aid, and track scholarship status — all in one screen.', v: 'tertiary' as const },
    { icon: Icons.messageCircle, title: 'Academic Advising', desc: 'Submit advising requests, track appointment status, and receive responses directly in the portal.', v: 'primary' as const },
    { icon: Icons.calendar, title: 'Schedule & Calendar', desc: 'Synced class timetable, exam dates, registration deadlines, and university events in one interactive calendar.', v: 'primary' as const },
    { icon: Icons.bell, title: 'Notifications', desc: 'Centralised announcements from departments, advisors, and financial services — no more missing critical emails.', v: 'primary' as const },
  ]

  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  return (
    <section id="features" style={{ padding: `${py}px ${px}px`, background: 'var(--surface-muted)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: `0 auto ${isMobile ? 36 : 56}px` }}>
          <Badge label="Platform Features" variant="primary" />
          <h2 style={{ fontSize: isMobile ? 24 : isTablet ? 28 : 36, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '14px 0 14px' }}>
            Everything in One Place
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.6, color: 'var(--foreground-muted)', margin: 0 }}>
            Six integrated service areas, unified under a single authenticated session.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 16 : 24 }}>
          {features.map(({ icon, title, desc, v }) => (
            <Card key={title} style={{ padding: isMobile ? 20 : 24 }}>
              <IconBox iconPath={icon} variant={v} />
              <h3 style={{ fontSize: isMobile ? 18 : isTablet ? 18 : 20, fontWeight: 600, color: 'var(--foreground)', margin: '14px 0 8px', letterSpacing: '-0.01em' }}>{title}</h3>
              <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.6, color: 'var(--foreground-muted)', margin: 0 }}>{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Recommender Section ─────────────────────────────────────────────────────
function RecommenderSection() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80
  const py = isMobile ? 48 : isTablet ? 64 : 100
  const stacked = isMobile || isTablet

  const courses = [
    { code: 'CS 480', name: 'Deep Learning Foundations', credits: 3, match: '96%', tag: 'Matches interest in AI/ML', dept: 'Computer Science' },
    { code: 'STAT 410', name: 'Bayesian Statistical Methods', credits: 3, match: '91%', tag: 'Complements CS 355 (Databases)', dept: 'Statistics' },
    { code: 'CS 472', name: 'Natural Language Processing', credits: 3, match: '88%', tag: 'Builds on your Python proficiency', dept: 'Computer Science' },
  ]

  return (
    <section id="recommendations" style={{ padding: `${py}px ${px}px`, maxWidth: 1440, margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: stacked ? '1fr' : '1fr 1fr',
        gap: stacked ? 40 : 80,
        alignItems: 'center',
      }}>
        {/* Left */}
        <div>
          <Badge label="Smart Recommender" variant="secondary" />
          <h2 style={{ fontSize: isMobile ? 24 : isTablet ? 28 : 36, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '14px 0 18px' }}>
            Courses Picked{' '}
            <span style={{ borderBottom: '3px solid var(--secondary)', paddingBottom: 2 }}>For You</span>
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.6, color: 'var(--foreground-muted)', marginBottom: 24 }}>
            Our recommendation engine analyses three dimensions of your academic profile to suggest courses where you're likely to excel and grow.
          </p>
          {[
            { icon: Icons.user, label: 'Skills & Competencies', desc: 'Derived from completed coursework, GPA by subject area, and self-reported proficiencies.', v: 'primary' as const },
            { icon: Icons.star, label: 'Interests & Goals', desc: 'Elective preferences, department activities, and declared major progression requirements.', v: 'secondary' as const },
            { icon: Icons.barChart, label: 'Academic Performance', desc: 'Historical grade trends, course difficulty scores, and peer cohort benchmarks.', v: 'tertiary' as const },
          ].map(({ icon, label, desc, v }) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'flex-start' }}>
              <IconBox iconPath={icon} variant={v} size={36} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--foreground-muted)' }}>{desc}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8 }}>
            <PrimaryButton recommender fullWidth={isMobile}>Get My Recommendations</PrimaryButton>
          </div>
        </div>

        {/* Right: course cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 14px',
            background: 'rgba(16,185,129,0.08)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(16,185,129,0.20)',
            marginBottom: 4,
          }}>
            <Icon path={Icons.sparkles} color="var(--secondary)" size={14} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--secondary)' }}>Recommended for Jordan Kim — Spring 2026</span>
          </div>
          {courses.map(({ code, name, credits, match, tag, dept }) => (
            <div key={code} style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? 18 : 20,
              border: '1px solid rgba(16,185,129,0.20)',
              boxShadow: 'var(--shadow-2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <span className="mono" style={{ fontSize: 11, fontWeight: 500, color: 'var(--secondary)' }}>{code}</span>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)', marginTop: 2 }}>{name}</div>
                  <div style={{ fontSize: 13, color: 'var(--foreground-muted)' }}>{dept} · {credits} credits</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 600, color: 'var(--secondary)', lineHeight: 1 }}>{match}</div>
                  <div style={{ fontSize: 10, color: 'var(--foreground-subtle)', marginTop: 2 }}>match</div>
                </div>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: 'rgba(16,185,129,0.10)',
                borderRadius: 'var(--radius-sm)', padding: '4px 10px',
              }}>
                <Icon path={Icons.check} color="var(--secondary)" size={11} />
                <span style={{ fontSize: 12, color: 'var(--secondary)', fontWeight: 500 }}>{tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How It Works ────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80
  const py = isMobile ? 48 : isTablet ? 64 : 100
  const isDesktop = bp === 'desktop'

  const steps = [
    { n: '01', icon: Icons.user, title: 'Student Profile & History', desc: 'Your academic record, completed courses, grades, and declared major are ingested securely.' },
    { n: '02', icon: Icons.brain, title: 'Skill & Interest Analysis', desc: 'The engine maps competency vectors from performance data and stated interest signals.' },
    { n: '03', icon: Icons.cpu, title: 'Recommendation Algorithm', desc: 'A collaborative-filtering + content-based hybrid ranks eligible courses by predicted fit.' },
    { n: '04', icon: Icons.sparkles, title: 'Personalized Suggestions', desc: 'Top-ranked courses appear on your dashboard with match scores and contextual reasons.' },
  ]

  const gridCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'

  return (
    <section style={{ padding: `${py}px ${px}px`, background: 'var(--surface-muted)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 520, margin: `0 auto ${isMobile ? 36 : 52}px` }}>
          <Badge label="How It Works" variant="secondary" />
          <h2 style={{ fontSize: isMobile ? 24 : isTablet ? 28 : 36, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '14px 0' }}>
            From Data to Discovery in Four Steps
          </h2>
        </div>

        {/* Desktop: horizontal flow with connector line */}
        {isDesktop && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 44,
              left: 'calc(12.5% + 20px)', right: 'calc(12.5% + 20px)',
              height: 2,
              background: 'linear-gradient(90deg, #4F46E5, #10B981)',
              zIndex: 0,
            }} />
            {steps.map(({ n, icon, title, desc }) => (
              <div key={n} style={{ position: 'relative', zIndex: 1 }}>
                <Card style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 0 4px var(--surface), 0 0 0 6px rgba(79,70,229,0.20)',
                    }}>
                      <Icon path={icon} color="#fff" size={22} />
                    </div>
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--foreground-subtle)', marginBottom: 6 }}>Step {n}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--foreground-muted)', margin: 0 }}>{desc}</p>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Tablet: 2×2 grid with numbered badges */}
        {isTablet && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {steps.map(({ n, icon, title, desc }) => (
              <Card key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 20 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon path={icon} color="#fff" size={20} />
                  </div>
                  <span className="mono" style={{
                    position: 'absolute', top: -4, right: -6,
                    background: 'var(--primary)', color: '#fff',
                    fontSize: 9, fontWeight: 700,
                    borderRadius: 999, width: 18, height: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{n}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 6px' }}>{title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--foreground-muted)', margin: 0 }}>{desc}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Mobile: vertical stack with vertical connector */}
        {isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map(({ n, icon, title, desc }, i) => (
              <div key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Left: icon + vertical line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1, position: 'relative',
                  }}>
                    <Icon path={icon} color="#fff" size={18} />
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 40, background: 'linear-gradient(180deg, #4F46E5, #10B981)', margin: '4px 0' }} />
                  )}
                </div>
                {/* Right: text */}
                <div style={{ paddingBottom: i < steps.length - 1 ? 28 : 0, paddingTop: 4 }}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--foreground-subtle)', marginBottom: 4 }}>Step {n}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 6px' }}>{title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--foreground-muted)', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ── Architecture Section ────────────────────────────────────────────────────
function ArchitectureSection() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80
  const py = isMobile ? 48 : isTablet ? 64 : 100
  const isDesktop = bp === 'desktop'

  const layers = [
    { label: 'Student Data Layer', sub: 'Academic records · Identity · History', color: 'var(--primary)', icon: Icons.database },
    { label: 'Unified Portal Backend', sub: 'REST API · Auth · Service Bus', color: 'var(--secondary)', icon: Icons.settings },
    { label: 'Recommendation Engine', sub: 'ML Model · Scorer · Ranker', color: 'var(--primary)', icon: Icons.brain },
    { label: 'Personalised Frontend', sub: 'React SPA · Dashboard · Alerts', color: 'var(--secondary)', icon: Icons.globe },
  ]

  const isVertical = isMobile
  const connectorIcon = isVertical ? Icons.arrowDown : Icons.arrowRight

  return (
    <section style={{ padding: `${py}px ${px}px`, maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ maxWidth: 600, marginBottom: isMobile ? 32 : 48 }}>
        <Badge label="System Architecture" variant="primary" />
        <h2 style={{ fontSize: isMobile ? 24 : isTablet ? 28 : 36, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '14px 0 14px' }}>
          Built on a Layered Architecture
        </h2>
        <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.6, color: 'var(--foreground-muted)', margin: 0 }}>
          Each system layer is independently deployable and communicates via a secure internal service bus.
        </p>
      </div>

      <div style={{
        background: 'var(--surface-muted)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        padding: isMobile ? 24 : 40,
        boxShadow: 'var(--shadow-2)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          alignItems: isVertical ? 'center' : 'center',
          gap: isVertical ? 0 : 12,
          flexWrap: isTablet ? 'wrap' : 'nowrap',
        }}>
          {layers.map(({ label, sub, color, icon }, i) => (
            <div key={label} style={{
              display: 'flex',
              flexDirection: isVertical ? 'column' : 'row',
              alignItems: 'center',
              gap: isVertical ? 0 : 12,
              flex: isVertical ? undefined : 1,
              width: isVertical ? '100%' : undefined,
              minWidth: isTablet && !isVertical ? 'calc(50% - 30px)' : undefined,
            }}>
              <div style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: `1.5px solid ${color}`,
                padding: isMobile ? '16px 12px' : '20px 16px',
                textAlign: 'center',
                flex: isVertical ? undefined : 1,
                width: isVertical ? '100%' : undefined,
              }}>
                <Icon path={icon} color={color} size={22} />
                <div className="mono" style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, color, marginTop: 8, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--foreground-muted)', lineHeight: 1.4 }}>{sub}</div>
              </div>
              {i < layers.length - 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0, padding: isVertical ? '6px 0' : '0 4px' }}>
                  <div style={{
                    width: isVertical ? 2 : 40,
                    height: isVertical ? 24 : 2,
                    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                  }} />
                  <Icon path={connectorIcon} color="var(--primary)" size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Gallery Section ─────────────────────────────────────────────────────────
function GallerySection() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80
  const py = isMobile ? 48 : isTablet ? 64 : 100

  // Mobile/Tablet: carousel with dot indicators
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const screens = [
    { title: 'Student Dashboard', caption: 'Unified home view with schedule, GPA, and financial snapshot', bg: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)' },
    { title: 'Financial & Admin Panel', caption: 'Invoices, payment history, and aid status in a single interface', bg: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' },
    { title: 'Recommendation Panel', caption: 'AI-ranked course cards with match scores and rationale tags', bg: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' },
  ]

  const useCarousel = isMobile || isTablet

  return (
    <section id="dashboard" style={{ padding: `${py}px 0`, background: 'var(--surface-muted)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', paddingLeft: px, paddingRight: px }}>
        <div style={{ textAlign: 'center', maxWidth: 520, margin: `0 auto ${isMobile ? 32 : 52}px` }}>
          <Badge label="Dashboard Preview" variant="primary" />
          <h2 style={{ fontSize: isMobile ? 24 : isTablet ? 28 : 36, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '14px 0' }}>
            See the Portal in Action
          </h2>
        </div>

        {/* Desktop: 3-column grid */}
        {!useCarousel && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {screens.map(({ title, caption, bg }) => <GalleryCard key={title} title={title} caption={caption} bg={bg} />)}
          </div>
        )}

        {/* Mobile/Tablet: Carousel */}
        {useCarousel && (
          <div>
            <div style={{ overflow: 'hidden' }}>
              <div
                ref={trackRef}
                style={{
                  display: 'flex',
                  transition: 'transform 300ms ease',
                  transform: `translateX(calc(-${active * 100}%))`,
                }}
              >
                {screens.map(({ title, caption, bg }) => (
                  <div key={title} style={{ minWidth: '100%' }}>
                    <GalleryCard title={title} caption={caption} bg={bg} />
                  </div>
                ))}
              </div>
            </div>
            {/* Dot indicators + nav */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 20 }}>
              <button
                onClick={() => setActive(a => Math.max(0, a - 1))}
                disabled={active === 0}
                style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '6px 12px', cursor: 'pointer', color: 'var(--foreground-muted)', minHeight: 44, minWidth: 44 }}
              >‹</button>
              {screens.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: i === active ? 'var(--primary)' : 'var(--border)',
                  padding: 0, minWidth: 8,
                }} />
              ))}
              <button
                onClick={() => setActive(a => Math.min(screens.length - 1, a + 1))}
                disabled={active === screens.length - 1}
                style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '6px 12px', cursor: 'pointer', color: 'var(--foreground-muted)', minHeight: 44, minWidth: 44 }}
              >›</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function GalleryCard({ title, caption, bg }: { title: string; caption: string; bg: string }) {
  return (
    <div>
      <div style={{
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-2)',
        aspectRatio: '4/3',
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', padding: '12px 20px', marginBottom: 12 }}>
            <div style={{ width: 120, height: 8, background: 'rgba(255,255,255,0.4)', borderRadius: 4, marginBottom: 6 }} />
            <div style={{ width: 80, height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 4 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-sm)', height: 40 }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, padding: '0 4px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--foreground-muted)', lineHeight: 1.5 }}>{caption}</div>
      </div>
    </div>
  )
}

// ── Research Section ────────────────────────────────────────────────────────
function ResearchSection() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80
  const py = isMobile ? 48 : isTablet ? 64 : 100
  const stacked = isMobile || isTablet

  return (
    <section id="about" style={{ padding: `${py}px ${px}px`, maxWidth: 1440, margin: '0 auto' }}>
      <div style={{
        background: 'var(--surface-muted)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        padding: isMobile ? 24 : isTablet ? 40 : 60,
        boxShadow: 'var(--shadow-1)',
        display: 'grid',
        gridTemplateColumns: stacked ? '1fr' : '1fr 1fr',
        gap: stacked ? 32 : 60,
        alignItems: 'center',
      }}>
        <div>
          <Badge label="Research & Methodology" variant="tertiary" />
          <h2 style={{ fontSize: isMobile ? 22 : isTablet ? 26 : 30, fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '14px 0 14px' }}>
            Grounded in Academic Research
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.7, color: 'var(--foreground-muted)', marginBottom: 16 }}>
            This project is an undergraduate capstone project focused on designing and implementing a unified digital student portal with an AI-driven course recommendation engine for the Computer Engineering program.
          </p>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.7, color: 'var(--foreground-muted)', marginBottom: 24 }}>
            The study employs a mixed-methods approach: quantitative analysis of student registration data across four semesters and qualitative interviews with academic advisors and students.
          </p>
          <div style={{ display: 'flex', gap: isMobile ? 20 : 32 }}>
            {[
              { value: '1,240', label: 'Students surveyed' },
              { value: '4', label: 'Semesters of data' },
              { value: '89%', label: 'Satisfaction rate' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="mono" style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: 'var(--primary)' }}>{value}</div>
                <div style={{ fontSize: 12, color: 'var(--foreground-muted)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: isMobile ? 20 : 28,
          boxShadow: 'var(--shadow-1)',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 18 }}>
            Student Satisfaction by Service Area
          </div>
          {[
            { label: 'Course Registration', pct: 87, v: 'primary' as const },
            { label: 'Grade Access', pct: 93, v: 'secondary' as const },
            { label: 'Financial Services', pct: 79, v: 'tertiary' as const },
            { label: 'Recommendations', pct: 91, v: 'secondary' as const },
            { label: 'Advising Requests', pct: 82, v: 'primary' as const },
          ].map(({ label, pct, v }) => {
            const colors = { primary: 'var(--primary)', secondary: 'var(--secondary)', tertiary: 'var(--tertiary)' }
            return (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: 'var(--foreground-muted)' }}>{label}</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: colors[v] }}>{pct}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--surface-muted)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: colors[v], borderRadius: 3 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'
  const px = isMobile ? 16 : isTablet ? 40 : 80

  const links = ['Overview', 'Features', 'Recommendations', 'Dashboard', 'About', 'Privacy']

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: `${isMobile ? 40 : 60}px ${px}px ${isMobile ? 32 : 40}px` }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* CTA banner */}
        <div style={{
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: isMobile ? '32px 24px' : isTablet ? '40px' : '48px 60px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          marginBottom: isMobile ? 40 : 60,
          gap: isMobile ? 20 : 24,
        }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
              Explore the Full Research
            </h2>
            <p style={{ fontSize: isMobile ? 14 : 16, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              Access the complete project report, system architecture, and technical documentation.
            </p>
          </div>
          <button style={{
            background: '#fff', color: '#4F46E5',
            borderRadius: 'var(--radius-md)',
            fontSize: 15, fontWeight: 700,
            border: 'none', cursor: 'pointer',
            whiteSpace: 'nowrap', minHeight: 44,
            width: isMobile ? '100%' : undefined,
          }}>
            <a href="https://drive.google.com/drive/folders/1bJNFR-d29V7eISIMtyEVkpzmyGz58YOO?usp=sharing" target='_blank' style={{padding: '13px 28px'}}>Read the Paper →</a>
          </button>
        </div>

        {/* Team info */}
        <div style={{ marginBottom: 36, padding: isMobile ? 18 : 24, background: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon path={Icons.user} color="#fff" size={20} />
            </div>
            <div>
              <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: 'var(--foreground)' }}>Alireza Hassani Eghtedar — Department of Computer Engineering</div>
              <div style={{ fontSize: 13, color: 'var(--foreground-muted)' }}>Undergraduate Capstone Project · Kharazmi University · 2025–2026</div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 20 : 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon path={Icons.graduationCap} color="#fff" size={14} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--foreground)' }}>UniPortal</span>
          </div>

          {/* Links: 2-col on tablet, 1-col on mobile, row on desktop */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, auto)' : 'repeat(6, auto)',
            gap: isMobile ? 10 : 8,
            columnGap: isTablet ? 24 : 0,
          }}>
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{
                fontSize: 13, color: 'var(--foreground-muted)',
                textDecoration: 'none', padding: isTablet || isMobile ? '4px 0' : '0 12px',
                minHeight: isMobile ? 44 : undefined, display: 'flex', alignItems: 'center',
              }}>{link}</a>
            ))}
          </div>

          <div style={{ fontSize: 13, color: 'var(--foreground-subtle)' }}>
            © 2026 UniPortal Research
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Root App ────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar dark={dark} onToggle={() => setDark(d => !d)} />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <RecommenderSection />
      <HowItWorksSection />
      <ArchitectureSection />
      <GallerySection />
      <ResearchSection />
      <Footer />
    </div>
  )
}
