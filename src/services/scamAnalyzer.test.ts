import { describe, it, expect } from 'vitest';
import { analyzeMessage } from './scamAnalyzer';

describe('ScamAnalyzer focused behavior', () => {
  it('returns LOW with score 0 for a normal harmless message', () => {
    const result = analyzeMessage('Hey, are you free for lunch tomorrow at 1 PM?');
    expect(result.score).toBe(0);
    expect(result.rating).toBe('LOW');
  });

  it('flags OTP and urgent bank impersonation without claiming certainty', () => {
    const result = analyzeMessage('URGENT: Chase customer service needs your OTP immediately to verify your account.');
    expect(result.score).toBe(55);
    expect(result.rating).toBe('HIGH');
    expect(result.detectedCategories.map(c => c.category)).toEqual(expect.arrayContaining(['urgency', 'verification', 'impersonation']));
    expect(result.summary).toContain('cannot confirm');
  });

  it('flags a fake job fee', () => {
    const result = analyzeMessage('Amazon HR department offers work from home at $500 a day. Pay a registration fee to start.');
    expect(result.rating).toBe('HIGH');
    expect(result.detectedCategories.map(c => c.category)).toEqual(expect.arrayContaining(['impersonation', 'unrealistic_offers', 'payment_requests']));
  });

  it('detects and cleanly highlights a suspicious shortened link', () => {
    const result = analyzeMessage('Review this link: https://bit.ly/verify-now.');
    expect(result.score).toBe(15);
    expect(result.rating).toBe('LOW');
    expect(result.detectedCategories.filter(c => c.category === 'suspicious_links')).toHaveLength(1);
    expect(result.highlightChunks.map(c => c.text).join('')).toBe('Review this link: https://bit.ly/verify-now.');
    expect(result.highlightChunks.find(c => c.isHighlighted)?.text).toBe('https://bit.ly/verify-now');
  });

  it('does not inflate score for repeated matching phrases', () => {
    const result = analyzeMessage('Urgent urgent urgent. Act now, act now, immediately, deadline.');
    expect(result.score).toBe(15);
    expect(result.rating).toBe('LOW');
    expect(result.detectedCategories).toHaveLength(1);
    expect(result.detectedCategories[0].matchCount).toBeGreaterThan(1);
  });

  it('returns LOW with score 0 for empty input', () => {
    for (const input of ['', '   \n\t']) {
      const result = analyzeMessage(input);
      expect(result.score).toBe(0);
      expect(result.rating).toBe('LOW');
    }
  });

  it('is deterministic and caps the score at 100', () => {
    const text = 'Congratulations winner. Urgent: verify your OTP and password, send money for a processing fee, install AnyDesk remote access, or your account will be frozen by police. Keep this secret. Visit https://bit.ly/claim now.';
    expect(analyzeMessage(text)).toEqual(analyzeMessage(text));
    expect(analyzeMessage(text).score).toBe(100);
  });
});