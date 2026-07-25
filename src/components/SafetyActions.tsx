import React from 'react';

interface SafetyActionsProps {
  actions: string[];
}

export const SafetyActions: React.FC<SafetyActionsProps> = ({ actions }) => {
  return (
    <div className="glass-panel" style={styles.card}>
      <h3 style={styles.title}>Recommended Actions</h3>
      
      <div style={styles.list}>
        {actions.map((action, index) => (
          <div key={index} style={styles.item}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <span style={styles.text}>{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    fontWeight: '600',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  iconContainer: {
    paddingTop: '0.15rem',
    flexShrink: 0,
  },
  icon: {
    width: '18px',
    height: '18px',
    color: 'var(--accent-cyan)',
  },
  text: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.45',
  },
};
