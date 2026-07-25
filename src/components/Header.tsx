import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <div style={styles.logoGlow} className="glow-pulse" />
        <svg
          style={styles.logoIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
        <span style={styles.title}>Scam<span style={{ color: 'var(--accent-cyan)' }}>Shield</span></span>
      </div>
      <p style={styles.tagline}>
        Instant, privacy-first security analysis. Identify suspicious indicators in SMS, emails, job offers, or chat messages.
      </p>
      <div style={styles.cyberLine} />
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    padding: '2.5rem 0 1.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    position: 'relative',
  },
  logoGlow: {
    position: 'absolute',
    left: '-5px',
    top: '-5px',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    zIndex: 0,
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    color: 'var(--accent-cyan)',
    zIndex: 1,
  },
  title: {
    fontSize: '2.25rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    color: 'var(--text-primary)',
    userSelect: 'none',
  },
  tagline: {
    color: 'var(--text-secondary)',
    fontSize: '1.05rem',
    maxWidth: '640px',
    lineHeight: '1.5',
  },
  cyberLine: {
    width: '80px',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
    marginTop: '1.25rem',
    borderRadius: '2px',
  },
};
