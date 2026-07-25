import React from 'react';

interface MessageAnalyzerProps {
  inputText: string;
  onChangeInput: (text: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
}

export const MessageAnalyzer: React.FC<MessageAnalyzerProps> = ({
  inputText,
  onChangeInput,
  onAnalyze,
  onReset,
  isAnalyzing
}) => {
  const charCount = inputText.length;
  const isInputEmpty = !inputText || !inputText.trim();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allows Cmd/Ctrl + Enter to trigger analysis
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !isInputEmpty && !isAnalyzing) {
      e.preventDefault();
      onAnalyze();
    }
  };

  return (
    <div className="glass-panel" style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleGroup}>
          <div style={styles.cyberDot} />
          <h2 style={styles.title}>Paste Suspicious Content</h2>
        </div>
        <span style={{ ...styles.charCount, color: charCount > 1000 ? '#f59e0b' : 'var(--text-muted)' }}>
          {charCount.toLocaleString()} chars
        </span>
      </div>

      <textarea
        className="cyber-input"
        placeholder="Paste a suspicious SMS, WhatsApp message, email, job offer, or reward claim here..."
        value={inputText}
        onChange={(e) => onChangeInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isAnalyzing}
        maxLength={5000}
        aria-label="Suspicious message input"
      />

      <div style={styles.footer}>
        <div style={styles.tipText}>
          <svg style={styles.infoIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.083.984l-.04.02a.75.75 0 01-1.083-.984zM12 9a.75.75 0 110-1.5.75.75 0 010 1.5zM22.5 12a10.5 10.5 0 11-21 0 10.5 10.5 0 0121 0z" />
          </svg>
          <span>Tip: Press Ctrl + Enter to analyze instantly.</span>
        </div>

        <div style={styles.actions} className="actions-stack">
          <button
            type="button"
            className="cyber-button secondary"
            onClick={onReset}
            disabled={isInputEmpty || isAnalyzing}
            aria-label="Reset input text"
          >
            Clear
          </button>
          <button
            type="button"
            className="cyber-button"
            onClick={onAnalyze}
            disabled={isInputEmpty || isAnalyzing}
            aria-label="Analyze suspicious message"
          >
            {isAnalyzing ? (
              <>
                <span style={styles.spinner} />
                Scanning...
              </>
            ) : (
              <>
                <svg style={styles.shieldIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Analyze Message
              </>
            )}
          </button>
        </div>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  cyberDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-cyan)',
    boxShadow: '0 0 8px var(--accent-cyan)',
  },
  title: {
    fontSize: '1.15rem',
    color: 'var(--text-primary)',
    fontWeight: '600',
  },
  charCount: {
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    marginTop: '0.25rem',
  },
  tipText: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  infoIcon: {
    width: '16px',
    height: '16px',
  },
  shieldIcon: {
    width: '18px',
    height: '18px',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    marginLeft: 'auto',
  },
  spinner: {
    width: '14px',
    height: '14px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
};

// Global spin keyframes styling can also be injected, but we'll add inline style injection or just use global css.
// Vite dev server lets us define standard spinner styles. Let's make sure it is in index.css as well.
// We'll write the spinner animation into index.css.
