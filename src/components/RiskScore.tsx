import React from 'react';

interface RiskScoreProps {
  score: number;
  rating: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const RiskScore: React.FC<RiskScoreProps> = ({ score, rating }) => {
  // Get color based on risk rating
  const getRiskColor = (rate: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (rate) {
      case 'LOW':
        return 'var(--color-low)';
      case 'MEDIUM':
        return 'var(--color-medium)';
      case 'HIGH':
        return 'var(--color-high)';
    }
  };

  const getRiskColorGlow = (rate: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (rate) {
      case 'LOW':
        return 'var(--color-low-glow)';
      case 'MEDIUM':
        return 'var(--color-medium-glow)';
      case 'HIGH':
        return 'var(--color-high-glow)';
    }
  };

  const activeColor = getRiskColor(rating);
  const activeGlow = getRiskColorGlow(rating);

  return (
    <div className="glass-panel" style={styles.card}>
      <h3 style={styles.title}>Risk Assessment</h3>
      
      <div style={styles.meterContainer}>
        {/* Circle/Shield Score Indicator */}
        <div style={{ ...styles.shieldGlow, backgroundColor: activeGlow }} />
        <div style={{ ...styles.shieldContainer, borderColor: activeColor }}>
          <span style={styles.numericalScore}>{score}</span>
          <span style={styles.scoreMax}>/100</span>
          <span className={`badge ${rating.toLowerCase()}`} style={styles.ratingBadge}>
            {rating} RISK
          </span>
        </div>
      </div>

      {/* Progress Bar with markers */}
      <div style={styles.barWrapper}>
        <div style={styles.barLabelContainer}>
          <span style={{ ...styles.barLabel, left: '0' }}>0</span>
          <span style={{ ...styles.barLabel, left: '25%', transform: 'translateX(-50%)' }}>25</span>
          <span style={{ ...styles.barLabel, left: '55%', transform: 'translateX(-50%)' }}>55</span>
          <span style={{ ...styles.barLabel, right: '0' }}>100</span>
        </div>
        
        <div style={styles.track}>
          <div 
            style={{ 
              ...styles.fill, 
              width: `${score}%`, 
              background: `linear-gradient(90deg, var(--color-low) 0%, var(--color-medium) 50%, var(--color-high) 100%)`,
              boxShadow: `0 0 10px ${activeColor}`
            }} 
          />
          {/* Glowing cursor pin */}
          <div 
            style={{ 
              ...styles.cursor, 
              left: `${score}%`, 
              backgroundColor: activeColor,
              boxShadow: `0 0 10px ${activeColor}` 
            }} 
          />
        </div>

        <div style={styles.zones}>
          <span style={{ ...styles.zoneText, color: 'var(--color-low)' }}>LOW</span>
          <span style={{ ...styles.zoneText, color: 'var(--color-medium)' }}>MEDIUM</span>
          <span style={{ ...styles.zoneText, color: 'var(--color-high)' }}>HIGH</span>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    fontWeight: '600',
    alignSelf: 'flex-start',
    width: '100%',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  meterContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    height: '150px',
  },
  shieldGlow: {
    position: 'absolute',
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    filter: 'blur(20px)',
    opacity: 0.7,
    zIndex: 0,
    transition: 'var(--transition-smooth)',
  },
  shieldContainer: {
    position: 'relative',
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    border: '3px solid',
    backgroundColor: '#0c1222',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
    transition: 'var(--transition-smooth)',
  },
  numericalScore: {
    fontSize: '3rem',
    fontWeight: '800',
    fontFamily: 'var(--font-display)',
    lineHeight: '1',
    color: 'var(--text-primary)',
  },
  scoreMax: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginTop: '0.2rem',
    fontWeight: '600',
  },
  ratingBadge: {
    marginTop: '0.6rem',
    padding: '0.2rem 0.6rem',
    fontSize: '0.7rem',
  },
  barWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  barLabelContainer: {
    display: 'block',
    position: 'relative',
    height: '18px',
  },
  barLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
    position: 'absolute',
    bottom: 0,
    cursor: 'default',
  },
  track: {
    height: '8px',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'visible',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  fill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.8s cubic-bezier(0.1, 0.8, 0.2, 1)',
  },
  cursor: {
    position: 'absolute',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid var(--text-primary)',
    transition: 'left 0.8s cubic-bezier(0.1, 0.8, 0.2, 1)',
  },
  zones: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.25rem',
    padding: '0 0.25rem',
  },
  zoneText: {
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
};
