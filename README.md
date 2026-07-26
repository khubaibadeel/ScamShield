# ScamShield

ScamShield is an AI-powered scam message analyzer that helps users identify suspicious warning signs in SMS messages, emails, job offers, lottery claims, marketplace messages, and online chats.

It combines a deterministic local detection engine with optional Gemini-enhanced analysis. If AI analysis is unavailable, ScamShield automatically falls back to local analysis so the product remains functional.

## Live Demo

**Try ScamShield:**  
Hosted on Vercel and accessible directly in your browser.

https://scamshield-sooty-eta.vercel.app


**Source Code:**  
https://github.com/khubaibadeel/ScamShield

---

## The Problem

Scam messages often use urgency, impersonation, threats, fake rewards, suspicious links, payment requests, and credential requests to pressure people into acting quickly.

Many users can sense that a message looks suspicious but may not understand:

- Which parts of the message are dangerous
- Why those phrases are concerning
- What actions they should avoid
- How to verify the message safely

ScamShield turns a suspicious message into a clear, understandable risk assessment.

---

## The Solution

Users paste a suspicious message into ScamShield and receive:

- A risk score from 0 to 100
- A LOW, MEDIUM, or HIGH risk rating
- Highlighted suspicious phrases
- Detected warning-sign categories
- Explanations for each warning sign
- Recommended safety actions
- An educational disclaimer
- AI-enhanced analysis when available
- Automatic local fallback when AI is unavailable

ScamShield does not claim that a message is definitely fraudulent. It identifies common warning signs and encourages users to verify communications independently.

---

## Key Features

### Local Scam Detection

The built-in rule-based analyzer detects patterns related to:

- Urgency and artificial deadlines
- Threats and intimidation
- OTP, PIN, password, and credential requests
- Processing fees and advance-payment requests
- Fake prizes, lotteries, and rewards
- Suspicious and shortened links
- Bank, employer, delivery-service, and government impersonation
- Requests for secrecy
- Remote-access software requests
- Unrealistic job offers and investment returns

### AI-Enhanced Analysis

ScamShield optionally uses Gemini to produce:

- A contextual risk score
- A clear summary
- Structured warning signs
- Redacted evidence
- Personalized safety guidance
- Cautious, non-definitive conclusions

Current model fallback order:

1. `gemini-3.5-flash-lite`
2. `gemini-3.5-flash`

The second model is attempted only when the first model returns HTTP 404.

### Safe Local Fallback

If the Gemini API is unavailable, times out, returns an invalid response, or is not configured, ScamShield automatically displays the local analysis instead.

The product remains usable without AI access.

### Privacy-Aware Design

- Local analysis stays inside the browser.
- AI-enhanced analysis may send pasted text to the configured Gemini service.
- Users are advised to remove personal and financial information before analysis.
- The Gemini API key is stored only in the server environment.
- The API key is never exposed through frontend Vite variables.

### Responsive Interface

The interface is optimized for desktop and mobile devices with:

- Accessible controls
- Full-width mobile buttons
- Responsive warning cards
- Clear risk visualization
- No unsafe HTML injection
- Safe React-based phrase highlighting

---

## How It Works

```text
User pastes a message
        ↓
Local rule-based analysis runs
        ↓
Frontend requests optional AI analysis
        ↓
Gemini succeeds → AI-enhanced report
Gemini fails    → Local fallback report
        ↓
Risk score, warning signs, highlights, and safety actions are displayed