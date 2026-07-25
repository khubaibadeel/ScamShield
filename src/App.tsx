import React, { useState } from 'react';
import { Header } from './components/Header';
import { SampleMessages } from './components/SampleMessages';
import { MessageAnalyzer } from './components/MessageAnalyzer';
import { RiskScore } from './components/RiskScore';
import { WarningSigns } from './components/WarningSigns';
import { HighlightedMessage } from './components/HighlightedMessage';
import { SafetyActions } from './components/SafetyActions';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';
import { analyzeMessage } from './services/scamAnalyzer';
import { requestAiAnalysis } from './services/aiAnalyzer';
import type { AiWarningSign, AnalysisResult } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [analysisMode, setAnalysisMode] = useState<'ai' | 'local' | null>(null);
  const [aiWarningSigns, setAiWarningSigns] = useState<AiWarningSign[]>([]);

  const handleInputChange = (text: string) => {
    setInputText(text);
    // Auto-clear result if user modifies text after scanning
    if (result) {
      setResult(null);
      setAnalysisMode(null);
      setAiWarningSigns([]);
    }
  };

  const handleSelectSample = (text: string) => {
    setInputText(text);
    setResult(null);
    setAnalysisMode(null);
    setAiWarningSigns([]);
  };

  const handleAnalyze = async () => {
    if (!inputText || !inputText.trim()) return;

    setIsAnalyzing(true);
    setCopySuccess(false);
    const localAnalysis = analyzeMessage(inputText);

    try {
      const aiAnalysis = await requestAiAnalysis(inputText);
      setResult({
        ...localAnalysis,
        score: aiAnalysis.score,
        rating: aiAnalysis.riskLevel,
        summary: aiAnalysis.summary,
        safeActions: aiAnalysis.safeActions,
        disclaimer: aiAnalysis.disclaimer
      });
      setAiWarningSigns(aiAnalysis.warningSigns);
      setAnalysisMode('ai');
    } catch {
      setResult(localAnalysis);
      setAiWarningSigns([]);
      setAnalysisMode('local');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setResult(null);
    setCopySuccess(false);
    setAnalysisMode(null);
    setAiWarningSigns([]);
  };

  const handleCopyResults = async () => {
    if (!result) return;

    const categoriesText = result.detectedCategories.length > 0
      ? result.detectedCategories.map(c => `- ${c.name} (${c.matchCount} matched)`).join('\n')
      : '- None (Clean message)';

    const copyText = `--- ScamShield Risk Assessment Report ---
Risk Rating: ${result.rating} RISK (Score: ${result.score}/100)

Summary:
${result.summary}

Warning Indicators Triggered:
${categoriesText}

Safety Guidance:
${result.safeActions.map(action => `* ${action}`).join('\n')}

Disclaimer:
${result.disclaimer}
-----------------------------------------`;

    try {
      await navigator.clipboard.writeText(copyText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <main style={styles.main}>
        {/* Sample Messages & Input Section */}
        <div style={styles.inputSection}>
          <SampleMessages 
            onSelectSample={handleSelectSample} 
            disabled={isAnalyzing} 
          />
          
          <MessageAnalyzer
            inputText={inputText}
            onChangeInput={handleInputChange}
            onAnalyze={handleAnalyze}
            onReset={handleReset}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Results Section */}
        {result && !isAnalyzing && (
          <div style={styles.resultsWrapper}>
            <div className="cyber-accent-line" style={styles.accentLine} />
            {analysisMode && (
              <div role="status" style={analysisMode === 'ai' ? styles.aiNotice : styles.fallbackNotice}>
                {analysisMode === 'ai'
                  ? 'AI-enhanced analysis'
                  : 'AI analysis is unavailable. Showing the local ScamShield analysis instead.'}
              </div>
            )}
            <div className="grid-2col" style={styles.resultsGrid}>
              
              {/* Left Column: Highlights and Safety Actions */}
              <div style={styles.resultsLeft}>
                <HighlightedMessage highlightChunks={result.highlightChunks} />
                <SafetyActions actions={result.safeActions} />
              </div>

              {/* Right Column: Score, Warning Cards, Copy Actions, Disclaimer */}
              <div style={styles.resultsRight}>
                <RiskScore score={result.score} rating={result.rating} />
                <WarningSigns detectedCategories={result.detectedCategories} aiWarningSigns={aiWarningSigns} />

                {/* Dashboard Actions */}
                <div style={styles.dashboardActions}>
                  <button
                    type="button"
                    className="cyber-button accent"
                    style={styles.copyButton}
                    onClick={handleCopyResults}
                    aria-label="Copy analysis report"
                  >
                    <svg style={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                    </svg>
                    {copySuccess ? 'Copied to Clipboard!' : 'Copy Assessment Report'}
                  </button>
                </div>

                <Disclaimer text={result.disclaimer} />
              </div>
              
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    flex: 1,
    paddingBottom: '2rem',
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  resultsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  aiNotice: {
    fontSize: '0.8rem', color: 'var(--accent-cyan)', padding: '0.45rem 0.7rem',
    border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '6px', alignSelf: 'flex-start',
  },
  fallbackNotice: {
    fontSize: '0.8rem', color: 'var(--text-muted)', padding: '0.45rem 0.7rem',
    border: '1px solid var(--border-color)', borderRadius: '6px', alignSelf: 'flex-start',
  },
  accentLine: {
    height: '2px',
    background: 'linear-gradient(90deg, var(--color-low) 0%, var(--accent-cyan) 50%, var(--color-high) 100%)',
    borderRadius: '1px',
    boxShadow: '0 0 10px rgba(0, 229, 255, 0.2)',
  },
  resultsGrid: {
    marginTop: '0.5rem',
  },
  resultsLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  resultsRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  dashboardActions: {
    display: 'flex',
    justifyContent: 'stretch',
  },
  copyButton: {
    width: '100%',
    padding: '0.9rem',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
  },
  buttonIcon: {
    width: '18px',
    height: '18px',
  },
};

export default App;
