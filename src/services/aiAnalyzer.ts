import type { AiAnalysisResult } from '../types';

const CLIENT_TIMEOUT_MS = 10_000;

function isAiAnalysisResult(value: unknown): value is AiAnalysisResult {
  if (!value || typeof value !== 'object') return false;
  const result = value as Record<string, unknown>;
  return typeof result.score === 'number' && result.score >= 0 && result.score <= 100 &&
    ['LOW', 'MEDIUM', 'HIGH'].includes(String(result.riskLevel)) &&
    typeof result.summary === 'string' && Array.isArray(result.warningSigns) &&
    result.warningSigns.every((sign) => {
      if (!sign || typeof sign !== 'object') return false;
      const item = sign as Record<string, unknown>;
      return typeof item.category === 'string' && typeof item.evidence === 'string' &&
        typeof item.explanation === 'string' && ['low', 'medium', 'high'].includes(String(item.severity));
    }) && Array.isArray(result.safeActions) &&
    result.safeActions.every((action) => typeof action === 'string') &&
    typeof result.disclaimer === 'string';
}

export async function requestAiAnalysis(message: string): Promise<AiAnalysisResult> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
    signal: AbortSignal.timeout(CLIENT_TIMEOUT_MS)
  });
  if (!response.ok) throw new Error(`AI analysis unavailable (${response.status})`);
  const data: unknown = await response.json();
  if (!isAiAnalysisResult(data)) throw new Error('AI analysis returned an invalid response');
  return data;
}