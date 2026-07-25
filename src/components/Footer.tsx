import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.privacyBox}>
        <svg style={styles.privacyIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        <span style={styles.privacyText}>
          <strong>Privacy Note:</strong> Local analysis stays in the browser. AI-enhanced analysis may send pasted text to the configured AI service. Remove personal and financial information before analysis.
        </span>
      </div>
      <div style={styles.copyright}>
        &copy; {currentYear} ScamShield security initiative. Built for verification and security guidance.
      </div>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    marginTop: 'auto',
    padding: '2rem 0 3rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  privacyBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    background: 'rgba(16, 185, 129, 0.03)',
    border: '1px solid rgba(16, 185, 129, 0.1)',
    maxWidth: '680px',
    textAlign: 'left',
  },
  privacyIcon: {
    width: '16px',
    height: '16px',
    color: 'var(--color-low)',
    flexShrink: 0,
  },
  privacyText: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  copyright: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
};
