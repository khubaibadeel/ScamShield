import { afterEach, describe, expect, it, vi } from 'vitest';
import { analyzeWithGemini } from './gemini.js';

const validGeminiPayload = {
  candidates: [{
    content: {
      parts: [{
        text: JSON.stringify({
          score: 55,
          riskLevel: 'HIGH',
          summary: 'Strong warning signs are present, but this does not confirm fraud.',
          warningSigns: [{ category: 'Impersonation', evidence: 'Claims to represent a bank.', explanation: 'Sender identity should be independently verified.', severity: 'high' }],
          safeActions: ['Use an independently sourced official contact method.'],
          disclaimer: 'This assessment cannot confirm whether a message is fraudulent.'
        })
      }]
    }
  }]
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('analyzeWithGemini', () => {
  it('falls back to the next model only on 404', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: { message: 'Model not found', status: 'NOT_FOUND', code: 404 } }), { status: 404, headers: { 'Content-Type': 'application/json' } }))
      .mockResolvedValueOnce(Response.json(validGeminiPayload));
    vi.stubGlobal('fetch', fetchMock);

    const result = await analyzeWithGemini('test message', 'secret-key');

    expect(result.score).toBe(55);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toContain('/models/gemini-3.5-flash-lite:generateContent');
    expect(fetchMock.mock.calls[1][0]).toContain('/models/gemini-3.5-flash:generateContent');
    expect(errorSpy).toHaveBeenCalledWith(
      'Gemini request failed',
      expect.stringContaining('"status":404')
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Gemini request failed',
      expect.stringContaining('Model not found')
    );
  });

  it('does not retry non-404 Gemini errors', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: { message: 'Bad request', status: 'INVALID_ARGUMENT', code: 400 } }), { status: 400, headers: { 'Content-Type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(analyzeWithGemini('test message', 'secret-key')).rejects.toThrow('Gemini request failed (400)');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/models/gemini-3.5-flash-lite:generateContent');
  });
});
