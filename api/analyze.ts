import { analyzeWithGemini } from './providers/gemini.js';

const MAX_INPUT_LENGTH = 5_000;
function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
    let body: unknown;
    try { body = await request.json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }
    const message = body && typeof body === 'object' && 'message' in body ? (body as { message?: unknown }).message : undefined;
    if (typeof message !== 'string' || !message.trim()) return json({ error: 'Message is required' }, 400);
    if (message.length > MAX_INPUT_LENGTH) return json({ error: `Message must be ${MAX_INPUT_LENGTH} characters or fewer` }, 413);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return json({ error: 'AI analysis is not configured' }, 503);
    try { return json(await analyzeWithGemini(message, apiKey)); }
    catch (error) {
      console.error('AI analysis failed', error instanceof Error ? error.message : 'Unknown error');
      return json({ error: 'AI analysis is temporarily unavailable' }, 502);
    }
  }
};