import React from 'react';

interface DisclaimerProps {
  text: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ text }) => {
  return (
    <div style={styles.container}>
      <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <p style={styles.text}>{text}</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
    borderRadius: '8px',
    background: 'rgba(245, 158, 11, 0.05)',
    border: '1px solid rgba(245, 158, 11, 0.15)',
    margin: '1rem 0',
  },
  icon: {
    width: '20px',
    height: '20px',
    color: '#fbbf24',
    flexShrink: 0,
    marginTop: '0.1rem',
  },
  text: {
    fontSize: '0.8rem',
    color: '#f59e0b',
    lineHeight: '1.4',
  },
};
