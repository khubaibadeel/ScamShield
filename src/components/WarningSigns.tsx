import React from 'react';
import type { AiWarningSign, DetectedCategoryInfo } from '../types';

interface WarningSignsProps {
  detectedCategories: DetectedCategoryInfo[];
  aiWarningSigns?: AiWarningSign[];
}

export const WarningSigns: React.FC<WarningSignsProps> = ({ detectedCategories, aiWarningSigns = [] }) => {
  const hasSigns = detectedCategories.length > 0 || aiWarningSigns.length > 0;

  return (
    <div className="glass-panel" style={styles.card}>
      <h3 style={styles.title}>Detected Warning Signs</h3>

      {aiWarningSigns.length > 0 && (
        <div style={styles.list}>
          {aiWarningSigns.map((sign, index) => (
            <div key={`${sign.category}-${index}`} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.indicatorNameGroup}>
                  <div style={styles.warningIndicator} />
                  <span style={styles.signName}>{sign.category}</span>
                </div>
                <span className={`badge ${sign.severity === 'high' ? 'high' : sign.severity === 'medium' ? 'medium' : 'low'}`} style={styles.countBadge}>
                  {sign.severity}
                </span>
              </div>
              <p style={styles.description}>{sign.explanation}</p>
              {sign.evidence && <p style={styles.evidence}>Evidence: {sign.evidence}</p>}
            </div>
          ))}
        </div>
      )}

      {!hasSigns ? (
        <div style={styles.emptyState}>
          <svg style={styles.emptyIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          <span style={styles.emptyText}>No scam indicator patterns were matched.</span>
        </div>
      ) : (
        <div style={styles.list}>
          {detectedCategories.map((info) => (
            <div key={info.category} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.indicatorNameGroup}>
                  <div style={styles.warningIndicator} />
                  <span style={styles.signName}>{info.name}</span>
                </div>
                <span className="badge high" style={styles.countBadge}>
                  {info.matchCount} {info.matchCount === 1 ? 'match' : 'matches'}
                </span>
              </div>
              
              <p style={styles.description}>{info.description}</p>
              
              {info.matchedPhrases.length > 0 && (
                <div style={styles.phraseContainer}>
                  <span style={styles.phraseLabel}>Flagged text:</span>
                  <div style={styles.phrasesList}>
                    {info.matchedPhrases.map((phrase, idx) => (
                      <span key={idx} style={styles.phraseTag}>
                        "{phrase}"
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
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
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5rem 1rem',
    gap: '0.75rem',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '40px',
    height: '40px',
    color: 'var(--color-low)',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '0.25rem',
  },
  item: {
    padding: '1rem',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  indicatorNameGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  warningIndicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-high)',
    boxShadow: '0 0 6px var(--color-high)',
  },
  signName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  countBadge: {
    fontSize: '0.7rem',
    padding: '0.15rem 0.5rem',
  },
  description: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  evidence: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  phraseContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    marginTop: '0.25rem',
  },
  phraseLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  phrasesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  phraseTag: {
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    background: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.15)',
    color: '#fca5a5',
    fontFamily: 'monospace',
  },
};
