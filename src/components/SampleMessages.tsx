import React from 'react';
import { SAMPLE_MESSAGES } from '../data/scamRules';
import type { SampleMessage } from '../types';

interface SampleMessagesProps {
  onSelectSample: (text: string) => void;
  disabled?: boolean;
}

export const SampleMessages: React.FC<SampleMessagesProps> = ({ onSelectSample, disabled = false }) => {
  return (
    <div style={styles.container}>
      <span style={styles.label}>Try Sample Messages:</span>
      <div style={styles.buttonList}>
        {SAMPLE_MESSAGES.map((sample: SampleMessage) => (
          <button
            key={sample.id}
            type="button"
            className="cyber-button secondary"
            style={styles.btn}
            onClick={() => onSelectSample(sample.text)}
            disabled={disabled}
            aria-label={`Load sample: ${sample.title}`}
          >
            <span style={styles.badge}>{sample.label}</span>
            <span style={styles.title}>{sample.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    margin: '1.25rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  buttonList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  btn: {
    flex: '1 1 200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0.6rem 0.9rem',
    gap: '0.6rem',
    fontSize: '0.85rem',
    textTransform: 'none',
    fontWeight: '500',
  },
  badge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    background: 'rgba(56, 189, 248, 0.1)',
    color: 'var(--text-cyan)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    flexShrink: 0,
  },
  title: {
    color: 'var(--text-primary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};
