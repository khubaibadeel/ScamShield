import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestAiAnalysis } from './aiAnalyzer';

const validResponse = {
  score: 55,
  riskLevel: 'HIGH',
  summary: 'Strong warning signs are present, but this does not confirm fraud.',
  warningSigns: [{ category: 'Impersonation', evidence: 'Claims to represent a bank.', explanation: 'Sender identity should be independently verified.', severity: 'high' }],
  safeActions: ['Use an independently sourced official contact method.'],
  disclaimer: 'This assessment cannot confirm whether a message is fraudulent.'
};

afterEach(() => vi.unstubAllGlobals());

describe('requestAiAnalysis', () => {
  it('accepts the structured endpoint response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json(validResponse)));
    await expect(requestAiAnalysis('untrusted message')).resolves.toEqual(validResponse);
    expect(fetch).toHaveBeenCalledWith('/api/analyze', expect.objectContaining({ method: 'POST' }));
  });

  it('rejects malformed responses so callers can use local fallback', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ score: 500 })));
    await expect(requestAiAnalysis('untrusted message')).rejects.toThrow('invalid response');
  });
});