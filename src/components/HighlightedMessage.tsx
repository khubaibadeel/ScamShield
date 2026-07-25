import React from 'react';
import type { HighlightChunk } from '../types';

interface HighlightedMessageProps {
  highlightChunks: HighlightChunk[];
}

export const HighlightedMessage: React.FC<HighlightedMessageProps> = ({ highlightChunks }) => {
  return (
    <div className="glass-panel" style={styles.card}>
      <h3 style={styles.title}>Scam Pattern Highlighting</h3>
      <p style={styles.info}>Hover over highlighted phrases to see which category they triggered.</p>
      
      <div style={styles.textContainer} aria-label="Highlighted message body">
        {highlightChunks.map((chunk, index) => {
          if (chunk.isHighlighted) {
            return (
              <mark
                key={index}
                className="scam-highlight"
                title={`${chunk.categoryName || 'Suspicious'} Indicator`}
                style={styles.highlight}
              >
                {chunk.text}
              </mark>
            );
          } else {
            return <span key={index}>{chunk.text}</span>;
          }
        })}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
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
  info: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
  },
  textContainer: {
    padding: '1.25rem',
    borderRadius: '8px',
    background: '#04070e',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    color: '#e2e8f0',
    fontSize: '1rem',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: 'var(--font-sans)',
  },
  highlight: {
    fontWeight: '600',
  },
};
