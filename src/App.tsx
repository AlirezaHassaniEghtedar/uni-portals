import { useState, useEffect } from 'react'

// ── Icons (inline SVG, Lucide-style 1.5px stroke) ──────────────────────────
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
  check: 'M20 6L9 17l-5-5',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  trendingUp: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  database: 'M12 2C6.5 2 2 4.7 2 8v8c0 3.3 4.5 6 10 6s10-2.7 10-6V8c0-3.3-4.5-6-10-6zM2 8c0 3.3 4.5 6 10 6s10-2.7 10-6M2 12c0 3.3 4.5 6 10 6s10-2.7 10-6',
  cpu: 'M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0M12 3v3M12 18v3M3 12h3M18 12h3M7.76 7.76l-2.12-2.12M18.36 18.36l-2.12-2.12M7.76 16.24l-2.12 2.12M18.36 5.64l-2.12 2.12',
  globe: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  menu: 'M3 12h18M3 6h18M3 18h18',
  x: 'M18 6L6 18M6 6l12 12',
}

// ── Design tokens helpers ───────────────────────────────────────────────────
const css = (vars: React.CSSProperties): React.CSSProperties => vars

// ── Sub-components ──────────────────────────────────────────────────────────

function Badge({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'secondary' | 'tertiary' }) {
  const colors = {
    primary: { bg: 'rgba(79,70,229,0.10)', color: 'var(--primary)', darkBg: 'rgba(129,140,248,0.15)' },
    secondary: { bg: 'rgba(16,185,129,0.10)', color: 'var(--secondary)', darkBg: 'rgba(52,211,153,0.15)' },
    tertiary: { bg: 'rgba(245,158,11,0.10)', color: 'var(--tertiary)', darkBg: 'rgba(251,191,36,0.15)' },
  }
  const c = colors[variant]
  return (
    <span style={css({
      display: 'inline-block',
      background: c.bg,
      color: c.color,
      borderRadius: 'var(--radius-sm)',
      padding: '3px 10px',
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      fontFamily: 'inherit',
    })}>
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
    <div style={css({
      width: `${size}px`, height: `${size}px`,
      borderRadius: 'var(--radius-md)',
      background: c.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: '0',
    })}>
      <Icon path={iconPath} color={c.color} size={Math.round(size * 0.5)} />
    </div>
  )
}

function PrimaryButton({ children, recommender = false, onClick }: { children: React.ReactNode; recommender?: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  const bg = recommender ? 'var(--gradient-secondary)' : 'var(--gradient-primary)'
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={css({
        background: bg,
        color: '#fff',
        borderRadius: 'var(--radius-md)',
        padding: '12px 24px',
        fontSize: '15px',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        boxShadow: hovered ? 'var(--shadow-4)' : 'var(--shadow-1)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        fontFamily: 'inherit',
      })}>
      {children}
    </button>
  )
}

function OutlineButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={css({
        background: hovered ? 'rgba(79,70,229,0.06)' : 'transparent',
        color: 'var(--foreground)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 24px',
        fontSize: '15px',
        fontWeight: '600',
        border: '1.5px solid var(--border)',
        cursor: 'pointer',
        fontFamily: 'inherit',
      })}>
      {children}
    </button>
  )
}

function Card({ children, style = {}, elevation = 1 }: { children: React.ReactNode; style?: React.CSSProperties; elevation?: number }) {
  const [hovered, setHovered] = useState(false)
  const shadows = ['var(--shadow-1)', 'var(--shadow-1)', 'var(--shadow-2)', 'var(--shadow-4)', 'var(--shadow-8)']
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={css({
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        border: `1px solid ${hovered ? 'rgba(79,70,229,0.30)' : 'var(--border)'}`,
        boxShadow: hovered ? 'var(--shadow-4)' : shadows[elevation] ?? 'var(--shadow-1)',
        transition: 'box-shadow 200ms ease-out, border-color 200ms ease-out, transform 200ms ease-out',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        ...style,
      })}>
      {children}
    </div>
  )
}

// ── Theme Toggle ────────────────────────────────────────────────────────────
function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={css({
        position: 'relative',
        width: '52px',
        height: '28px',
        borderRadius: '999px',
        background: dark ? 'rgba(129,140,248,0.20)' : 'rgba(79,70,229,0.12)',
        border: '1.5px solid var(--border)',
        cursor: 'pointer',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        flexShrink: '0',
      })}>
      <span style={css({
        position: 'absolute',
        left: dark ? 'calc(100% - 24px)' : '3px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'left 200ms ease-out',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
      })}>
        <Icon path={dark ? Icons.moon : Icons.sun} color="#fff" size={11} />
      </span>
    </button>
  )
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Overview', 'Features', 'Recommendations', 'Dashboard', 'About']

  return (
    <nav style={css({
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '100',
      background: scrolled ? 'var(--surface)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      boxShadow: scrolled ? 'var(--shadow-1)' : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 250ms ease, border-color 250ms ease, box-shadow 250ms ease',
    })}>
      <div style={css({
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 80px',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
      })}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={css({
            width: '36px', height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          })}>
            <Icon path={Icons.graduationCap} color="#fff" size={20} />
          </div>
          <span style={{ fontWeight: '700', fontSize: '17px', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
            UniPortal
          </span>
        </div>

        {/* Nav links — desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, justifyContent: 'center' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={css({
              color: 'var(--foreground-muted)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              transition: 'color 150ms, background 150ms',
              display: 'inline-block',
            })}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--foreground)'; (e.target as HTMLElement).style.background = 'rgba(79,70,229,0.06)' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--foreground-muted)'; (e.target as HTMLElement).style.background = 'transparent' }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <PrimaryButton>Login to Portal</PrimaryButton>
        </div>
      </div>
    </nav>
  )
}

// ── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="overview" style={css({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 80px 100px',
      maxWidth: '1440px',
      margin: '0 auto',
      position: 'relative',
    })}>
      {/* Gradient orbs */}
      <div style={css({
        position: 'absolute', top: '15%', left: '5%',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      })} />
      <div style={css({
        position: 'absolute', top: '20%', right: '5%',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      })} />

      <div style={{ textAlign: 'center', maxWidth: '760px', position: 'relative', zIndex: 1, marginBottom: '64px' }}>
        <Badge label="Smart Academic Platform" variant="primary" />
        <h1 style={{
          fontSize: 'clamp(40px, 5vw, 56px)',
          fontWeight: '700',
          lineHeight: '1.15',
          letterSpacing: '-0.015em',
          color: 'var(--foreground)',
          margin: '20px 0 24px',
        }}>
          One Portal.{' '}
          <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Every Service.
          </span>{' '}
          Smarter Course Choices.
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'var(--foreground-muted)',
          margin: '0 0 36px',
        }}>
          UniPortal unifies every academic, administrative, and financial service into a single intelligent workspace — and its AI-powered recommendation engine suggests courses tailored to your skills, interests, and academic history.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <PrimaryButton>Explore the Portal</PrimaryButton>
          <OutlineButton>See How Recommendations Work</OutlineButton>
        </div>
      </div>

      {/* Dashboard mockup */}
      <DashboardMockup />
    </section>
  )
}

function DashboardMockup() {
  return (
    <div style={css({
      width: '100%',
      maxWidth: '1100px',
      background: 'var(--surface)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-8)',
      overflow: 'hidden',
      position: 'relative',
    })}>
      {/* Mock browser bar */}
      <div style={css({
        background: 'var(--surface-muted)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      })}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'block' }} />
        <div style={css({
          flex: 1, marginLeft: '8px',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          padding: '4px 12px',
          fontSize: '12px',
          color: 'var(--foreground-subtle)',
          fontFamily: 'IBM Plex Mono, monospace',
          maxWidth: '300px',
          margin: '0 auto',
        })}>
          portal.university.edu/dashboard
        </div>
      </div>

      {/* Dashboard content */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '420px' }}>
        {/* Sidebar */}
        <div style={css({
          background: 'var(--surface-muted)',
          borderRight: '1px solid var(--border)',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}>
          {[
            { icon: Icons.globe, label: 'Dashboard', active: true, v: 'primary' as const },
            { icon: Icons.book, label: 'Courses', v: 'primary' as const },
            { icon: Icons.barChart, label: 'Grades', v: 'primary' as const },
            { icon: Icons.creditCard, label: 'Finance', v: 'tertiary' as const },
            { icon: Icons.calendar, label: 'Schedule', v: 'primary' as const },
            { icon: Icons.sparkles, label: 'Recommendations', v: 'secondary' as const },
            { icon: Icons.bell, label: 'Notifications', v: 'primary' as const },
          ].map(({ icon, label, active, v }) => (
            <div key={label} style={css({
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 10px',
              borderRadius: 'var(--radius-md)',
              background: active ? 'rgba(79,70,229,0.10)' : 'transparent',
              cursor: 'pointer',
            })}>
              <Icon path={icon} color={active ? 'var(--primary)' : v === 'secondary' ? 'var(--secondary)' : v === 'tertiary' ? 'var(--tertiary)' : 'var(--foreground-muted)'} size={15} />
              <span style={{ fontSize: '13px', color: active ? 'var(--primary)' : 'var(--foreground-muted)', fontWeight: active ? '600' : '400' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Main dashboard area */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { label: 'Current GPA', value: '3.87', sub: 'Spring 2025', v: 'primary' as const },
              { label: 'Credits Earned', value: '96', sub: '/ 120 required', v: 'secondary' as const },
              { label: 'Balance Due', value: '$842', sub: 'Due Apr 15', v: 'tertiary' as const },
            ].map(({ label, value, sub, v }) => (
              <div key={label} style={css({
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                border: '1px solid var(--border)',
              })}>
                <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', marginBottom: '4px' }}>{label}</div>
                <div className="mono" style={{ fontSize: '22px', fontWeight: '600', color: v === 'primary' ? 'var(--primary)' : v === 'secondary' ? 'var(--secondary)' : 'var(--tertiary)' }}>{value}</div>
                <div style={{ fontSize: '11px', color: 'var(--foreground-subtle)', marginTop: '2px' }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Course schedule + Recommendations row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Schedule */}
            <div style={css({
              background: 'var(--surface)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              border: '1px solid var(--border)',
            })}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--foreground)', marginBottom: '10px' }}>Today's Schedule</div>
              {[
                { time: '09:00', course: 'CS 401 — Machine Learning', room: 'Hall B-204' },
                { time: '11:30', course: 'MATH 302 — Linear Algebra', room: 'Hall A-101' },
                { time: '14:00', course: 'CS 355 — Databases', room: 'Lab 3-B' },
              ].map(({ time, course, room }) => (
                <div key={time} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                  <span className="mono" style={{ fontSize: '11px', color: 'var(--primary)', minWidth: '40px', paddingTop: '1px' }}>{time}</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--foreground)' }}>{course}</div>
                    <div style={{ fontSize: '11px', color: 'var(--foreground-subtle)' }}>{room}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations panel */}
            <div style={css({
              background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(79,70,229,0.05) 100%)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              border: '1px solid rgba(16,185,129,0.25)',
            })}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <Icon path={Icons.sparkles} color="var(--secondary)" size={13} />
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Recommended For You</span>
              </div>
              {[
                { code: 'CS 480', name: 'Deep Learning', match: '96%' },
                { code: 'CS 465', name: 'NLP & Text Mining', match: '91%' },
                { code: 'STAT 410', name: 'Bayesian Statistics', match: '88%' },
              ].map(({ code, name, match }) => (
                <div key={code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span className="mono" style={{ fontSize: '10px', color: 'var(--secondary)', fontWeight: '500' }}>{code}</span>
                    <div style={{ fontSize: '12px', color: 'var(--foreground)', fontWeight: '500' }}>{name}</div>
                  </div>
                  <span className="mono" style={{ fontSize: '11px', fontWeight: '600', color: 'var(--secondary)' }}>{match}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Problem Statement Section ───────────────────────────────────────────────
function ProblemSection() {
  const stats = [
    { value: '73%', label: 'of students use 4+ separate systems for academic tasks', icon: Icons.layers, v: 'primary' as const },
    { value: '61%', label: 'feel unprepared when choosing elective courses each semester', icon: Icons.target, v: 'secondary' as const },
    { value: '38%', label: 'experience delays due to siloed administrative workflows', icon: Icons.zap, v: 'tertiary' as const },
  ]

  return (
    <section id="problem" style={css({
      padding: '100px 80px',
      maxWidth: '1440px',
      margin: '0 auto',
    })}>
      <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
        <Badge label="The Problem" variant="tertiary" />
        <h2 style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '16px 0 20px' }}>
          Students Juggle Too Many Systems — With No Guidance
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--foreground-muted)', margin: 0 }}>
          Between registration portals, learning management systems, financial platforms, and academic advisors, students face fragmented experiences that waste time and leave critical decisions — like course selection — without intelligent support.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {stats.map(({ value, label, icon, v }) => (
          <Card key={value} elevation={1}>
            <IconBox iconPath={icon} variant={v} />
            <div className="mono" style={{ fontSize: '40px', fontWeight: '600', color: 'var(--foreground)', margin: '16px 0 8px', letterSpacing: '-0.02em' }}>
              {value}
            </div>
            <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--foreground-muted)', margin: 0 }}>{label}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ── Features Section ────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    { icon: Icons.book, title: 'Course Registration', desc: 'Browse, register, and manage your courses with real-time seat availability and prerequisite validation.', v: 'primary' as const },
    { icon: Icons.barChart, title: 'Grades & Transcripts', desc: 'Access current grades, historical transcripts, and GPA analytics with semester-by-semester breakdowns.', v: 'primary' as const },
    { icon: Icons.creditCard, title: 'Financial Services', desc: 'View tuition invoices, make payments, apply for financial aid, and track scholarship status — all in one screen.', v: 'tertiary' as const },
    { icon: Icons.messageCircle, title: 'Academic Advising', desc: 'Submit advising requests, track appointment status, and receive responses directly in the portal.', v: 'primary' as const },
    { icon: Icons.calendar, title: 'Schedule & Calendar', desc: 'Synced class timetable, exam dates, registration deadlines, and university events in one interactive calendar.', v: 'primary' as const },
    { icon: Icons.bell, title: 'Notifications', desc: 'Centralised announcements from departments, advisors, and financial services — no more missing critical emails.', v: 'primary' as const },
  ]

  return (
    <section id="features" style={css({
      padding: '100px 80px',
      background: 'var(--surface-muted)',
    })}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 64px' }}>
          <Badge label="Platform Features" variant="primary" />
          <h2 style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '16px 0 16px' }}>
            Everything in One Place
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--foreground-muted)', margin: 0 }}>
            Six integrated service areas, unified under a single authenticated session. No more tab-switching.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {features.map(({ icon, title, desc, v }) => (
            <Card key={title} elevation={1}>
              <IconBox iconPath={icon} variant={v} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--foreground)', margin: '16px 0 8px', letterSpacing: '-0.01em' }}>{title}</h3>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--foreground-muted)', margin: 0 }}>{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Recommender Section ─────────────────────────────────────────────────────
function RecommenderSection() {
  const courses = [
    { code: 'CS 480', name: 'Deep Learning Foundations', credits: 3, match: '96%', tag: 'Matches interest in AI/ML', dept: 'Computer Science' },
    { code: 'STAT 410', name: 'Bayesian Statistical Methods', credits: 3, match: '91%', tag: 'Complements CS 355 (Databases)', dept: 'Statistics' },
    { code: 'CS 472', name: 'Natural Language Processing', credits: 3, match: '88%', tag: 'Builds on your Python proficiency', dept: 'Computer Science' },
  ]

  return (
    <section id="recommendations" style={css({
      padding: '100px 80px',
      maxWidth: '1440px',
      margin: '0 auto',
    })}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        {/* Left: explanation */}
        <div>
          <Badge label="Smart Recommender" variant="secondary" />
          <h2 style={{
            fontSize: '36px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.01em',
            color: 'var(--foreground)', margin: '16px 0 20px',
          }}>
            Courses Picked{' '}
            <span style={{
              borderBottom: '3px solid var(--secondary)',
              paddingBottom: '2px',
            }}>
              For You
            </span>
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--foreground-muted)', marginBottom: '28px' }}>
            Our recommendation engine analyses three dimensions of your academic profile to suggest courses where you're likely to excel and grow.
          </p>
          {[
            { icon: Icons.user, label: 'Skills & Competencies', desc: 'Derived from completed coursework, GPA by subject area, and self-reported proficiencies.', v: 'primary' as const },
            { icon: Icons.star, label: 'Interests & Goals', desc: 'Elective preferences, department activities, and declared major progression requirements.', v: 'secondary' as const },
            { icon: Icons.barChart, label: 'Academic Performance', desc: 'Historical grade trends, course difficulty scores, and peer cohort benchmarks.', v: 'tertiary' as const },
          ].map(({ icon, label, desc, v }) => (
            <div key={label} style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'flex-start' }}>
              <IconBox iconPath={icon} variant={v} size={36} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--foreground)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--foreground-muted)' }}>{desc}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '8px' }}>
            <PrimaryButton recommender>Get My Recommendations</PrimaryButton>
          </div>
        </div>

        {/* Right: course cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px',
            background: 'rgba(16,185,129,0.08)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(16,185,129,0.20)',
            marginBottom: '8px',
          }}>
            <Icon path={Icons.sparkles} color="var(--secondary)" size={15} />
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--secondary)' }}>Recommended for Alireza Eghtedar — Spring 2026</span>
          </div>
          {courses.map(({ code, name, credits, match, tag, dept }) => (
            <div key={code} style={css({
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              border: '1px solid rgba(16,185,129,0.20)',
              boxShadow: 'var(--shadow-2)',
            })}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <span className="mono" style={{ fontSize: '11px', fontWeight: '500', color: 'var(--secondary)' }}>{code}</span>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--foreground)', marginTop: '2px' }}>{name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--foreground-muted)' }}>{dept} · {credits} credits</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: '22px', fontWeight: '600', color: 'var(--secondary)', lineHeight: '1' }}>{match}</div>
                  <div style={{ fontSize: '10px', color: 'var(--foreground-subtle)', marginTop: '2px' }}>match</div>
                </div>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(16,185,129,0.10)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
              }}>
                <Icon path={Icons.check} color="var(--secondary)" size={11} />
                <span style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: '500' }}>{tag}</span>
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
  const steps = [
    { n: '01', icon: Icons.user, title: 'Student Profile & History', desc: 'Your academic record, completed courses, grades, and declared major are ingested securely.', v: 'primary' as const },
    { n: '02', icon: Icons.brain, title: 'Skill & Interest Analysis', desc: 'The engine maps competency vectors from performance data and stated interest signals.', v: 'secondary' as const },
    { n: '03', icon: Icons.cpu, title: 'Recommendation Algorithm', desc: 'A collaborative-filtering + content-based hybrid ranks eligible courses by predicted fit.', v: 'secondary' as const },
    { n: '04', icon: Icons.sparkles, title: 'Personalized Suggestions', desc: 'Top-ranked courses appear on your dashboard with match scores and contextual reasons.', v: 'primary' as const },
  ]

  return (
    <section id="how-it-works" style={css({
      padding: '100px 80px',
      background: 'var(--surface-muted)',
    })}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 64px' }}>
          <Badge label="How It Works" variant="secondary" />
          <h2 style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '16px 0 16px' }}>
            From Data to Discovery in Four Steps
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative' }}>
          {/* Connector line */}
          <div style={css({
            position: 'absolute',
            top: '36px',
            left: 'calc(12.5% + 20px)',
            right: 'calc(12.5% + 20px)',
            height: '2px',
            background: 'linear-gradient(90deg, #4F46E5, #10B981)',
            zIndex: 0,
          })} />
          {steps.map(({ n, icon, title, desc, v }) => (
            <div key={n} style={{ position: 'relative', zIndex: 1 }}>
              <Card key={n} elevation={1} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div style={css({
                    width: '56px', height: '56px',
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 4px var(--surface), 0 0 0 6px rgba(79,70,229,0.20)',
                  })}>
                    <Icon path={icon} color="#fff" size={22} />
                  </div>
                </div>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--foreground-subtle)', marginBottom: '6px' }}>Step {n}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--foreground)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--foreground-muted)', margin: 0 }}>{desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Architecture Section ────────────────────────────────────────────────────
function ArchitectureSection() {
  const layers = [
    { label: 'Student Data Layer', sub: 'Academic records · Identity · History', color: 'var(--primary)', icon: Icons.database },
    { label: 'Unified Portal Backend', sub: 'REST API · Auth · Service Bus', color: 'var(--secondary)', icon: Icons.settings },
    { label: 'Recommendation Engine', sub: 'ML Model · Scorer · Ranker', color: 'var(--primary)', icon: Icons.brain },
    { label: 'Personalised Frontend', sub: 'React SPA · Dashboard · Alerts', color: 'var(--secondary)', icon: Icons.globe },
  ]

  return (
    <section style={css({
      padding: '100px 80px',
      maxWidth: '1440px',
      margin: '0 auto',
    })}>
      <div style={{ maxWidth: '600px', marginBottom: '48px' }}>
        <Badge label="System Architecture" variant="primary" />
        <h2 style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '16px 0 16px' }}>
          Built on a Layered Architecture
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--foreground-muted)', margin: 0 }}>
          Each system layer is independently deployable and communicates via a secure internal service bus, ensuring reliability and scalability at every tier.
        </p>
      </div>

      <div style={css({
        background: 'var(--surface-muted)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        padding: '40px',
        boxShadow: 'var(--shadow-2)',
      })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto' }}>
          {layers.map(({ label, sub, color, icon }, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '180px' }}>
              <div style={css({
                flex: 1,
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: `1.5px solid ${color}`,
                padding: '20px 16px',
                textAlign: 'center',
              })}>
                <Icon path={icon} color={color} size={24} />
                <div className="mono" style={{ fontSize: '12px', fontWeight: '600', color, marginTop: '10px', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', lineHeight: '1.4' }}>{sub}</div>
              </div>
              {i < layers.length - 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                  <Icon path={Icons.arrowRight} color="var(--primary)" size={18} />
                  <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Dashboard Gallery Section ───────────────────────────────────────────────
function GallerySection() {
  const screens = [
    { title: 'Student Dashboard', caption: 'Unified home view with schedule, GPA, and financial snapshot', bg: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)' },
    { title: 'Financial & Admin Panel', caption: 'Invoices, payment history, and aid status in a single interface', bg: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' },
    { title: 'Recommendation Panel', caption: 'AI-ranked course cards with match scores and rationale tags', bg: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' },
  ]

  return (
    <section id="dashboard" style={css({
      padding: '100px 80px',
      background: 'var(--surface-muted)',
    })}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 64px' }}>
          <Badge label="Dashboard Preview" variant="primary" />
          <h2 style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '16px 0' }}>
            See the Portal in Action
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {screens.map(({ title, caption, bg }) => (
            <div key={title}>
              <div style={css({
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-2)',
                aspectRatio: '4/3',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}>
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', padding: '12px 20px', marginBottom: '12px' }}>
                    <div style={{ width: '120px', height: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px', marginBottom: '6px' }} />
                    <div style={{ width: '80px', height: '8px', background: 'rgba(255,255,255,0.25)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {[0,1,2,3].map(i => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-sm)', height: '40px' }} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '12px', padding: '0 4px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--foreground)', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', lineHeight: '1.5', letterSpacing: '0.01em' }}>{caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Research Section ────────────────────────────────────────────────────────
function ResearchSection() {
  return (
    <section id="about" style={css({
      padding: '100px 80px',
      maxWidth: '1440px',
      margin: '0 auto',
    })}>
      <div style={css({
        background: 'var(--surface-muted)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        padding: '60px',
        boxShadow: 'var(--shadow-1)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
      })}>
        <div>
          <Badge label="Research & Methodology" variant="tertiary" />
          <h2 style={{ fontSize: '30px', fontWeight: '700', lineHeight: '1.3', letterSpacing: '-0.01em', color: 'var(--foreground)', margin: '16px 0 16px' }}>
            Grounded in Academic Research
          </h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--foreground-muted)', marginBottom: '20px' }}>
            This project is a capstone research initiative investigating the effectiveness of unified digital academic portals and AI-driven course recommendation systems in improving student outcomes.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--foreground-muted)', marginBottom: '28px' }}>
            The study employs a mixed-methods approach: quantitative analysis of student registration data across four semesters and qualitative interviews with academic advisors and students. The recommendation engine uses a hybrid collaborative-filtering model validated against historical enrollment and grade data.
          </p>
          <div style={{ display: 'flex', gap: '32px' }}>
            {[
              { value: '1,240', label: 'Students surveyed' },
              { value: '4', label: 'Semesters of data' },
              { value: '89%', label: 'Satisfaction rate' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="mono" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--primary)' }}>{value}</div>
                <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: chart placeholder */}
        <div style={css({
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: '28px',
          boxShadow: 'var(--shadow-1)',
        })}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--foreground)', marginBottom: '20px' }}>
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
              <div key={label} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--foreground-muted)' }}>{label}</span>
                  <span className="mono" style={{ fontSize: '13px', fontWeight: '600', color: colors[v] }}>{pct}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--surface-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: colors[v], borderRadius: '3px', transition: 'width 800ms ease' }} />
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
  return (
    <footer style={css({
      borderTop: '1px solid var(--border)',
      padding: '60px 80px 40px',
    })}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* CTA row */}
        <div style={css({
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '60px',
          flexWrap: 'wrap',
          gap: '24px',
        })}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
              Explore the Full Research
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              Access the complete capstone paper, methodology, and data appendices.
            </p>
          </div>
          <button style={css({
            background: '#fff',
            color: '#4F46E5',
            borderRadius: 'var(--radius-md)',
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
          })}>
            Read the Research →
          </button>
        </div>

        {/* Team info */}
        <div style={{ marginBottom: '40px', padding: '24px', background: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={css({ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
              <Icon path={Icons.user} color="#fff" size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--foreground)' }}>Research Team — Department of Computer Engineering</div>
              <div style={{ fontSize: '13px', color: 'var(--foreground-muted)' }}>Capstone Research Project · Kharazmi University  · Academic Year 2025–2026</div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={css({ width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
              <Icon path={Icons.graduationCap} color="#fff" size={14} />
            </div>
            <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--foreground)' }}>UniPortal</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Overview', 'Features', 'Recommendations', 'Dashboard', 'About', 'Privacy'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ fontSize: '13px', color: 'var(--foreground-muted)', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--foreground-subtle)' }}>
            © 2026 UniPortal Research Project
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
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
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
