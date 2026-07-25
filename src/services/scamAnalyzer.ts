import { SCAM_RULES } from '../data/scamRules';
import type { AnalysisResult, DetectedCategoryInfo, HighlightChunk, DetectionCategory } from '../types';

interface MatchRange {
  start: number;
  end: number;
  category: DetectionCategory;
  phrase: string;
}

const CATEGORY_BASE_SCORES: Record<DetectionCategory, number> = {
  verification: 25, remote_access: 25, payment_requests: 25, threats: 20, rewards: 20,
  unrealistic_offers: 20, urgency: 15, suspicious_links: 15, impersonation: 15, secrecy: 15
};

// Escapes special characters for use in RegExp
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Analyzes a message text for potential scam indicators.
 */
export function analyzeMessage(text: string): AnalysisResult {
  const disclaimer = 'Disclaimer: This analysis is for educational and guidance purposes only. It is not legal advice or definitive proof of fraud. Use caution and verify all communications independently.';

  if (!text || !text.trim()) {
    return {
      score: 0,
      rating: 'LOW',
      summary: 'No message content provided. Paste a message above to analyze it.',
      detectedCategories: [],
      highlightChunks: [
        { text: text || '', isHighlighted: false }
      ],
      safeActions: [
        'Paste a suspicious message into the analyzer to see safety recommendations.'
      ],
      disclaimer
    };
  }

  const matchRanges: MatchRange[] = [];
  const seenMatches = new Set<string>();
  const categoryMatchCounts: Record<DetectionCategory, number> = {} as Record<DetectionCategory, number>;
  const categoryMatchedPhrases: Record<DetectionCategory, Set<string>> = {} as Record<DetectionCategory, Set<string>>;

  // Initialize tracking records
  SCAM_RULES.forEach(rule => {
    categoryMatchCounts[rule.category] = 0;
    categoryMatchedPhrases[rule.category] = new Set<string>();
  });

  const recordMatch = (start: number, matchedText: string, category: DetectionCategory, trim = false) => {
    const phrase = trim ? matchedText.replace(/[.,!?;:)\]}]+$/g, '') : matchedText;
    if (!phrase) return;
    const end = start + phrase.length;
    const key = category + ':' + start + ':' + end;
    if (seenMatches.has(key)) return;
    seenMatches.add(key);
    matchRanges.push({ start, end, category, phrase });
    categoryMatchCounts[category]++;
    categoryMatchedPhrases[category].add(phrase.trim().toLocaleLowerCase());
  };

  // Find all matches based on rules
  for (const rule of SCAM_RULES) {
    // 1. Keyword matching
    for (const keyword of rule.keywords) {
      // Create regex with word boundaries if it starts/ends with alphanumeric characters
      const startsWithWord = /^[a-zA-Z0-9]/.test(keyword);
      const endsWithWord = /[a-zA-Z0-9]$/.test(keyword);
      const pattern = `${startsWithWord ? '\\b' : ''}${escapeRegExp(keyword)}${endsWithWord ? '\\b' : ''}`;
      
      try {
        const regex = new RegExp(pattern, 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
          recordMatch(match.index, match[0], rule.category);
          if (match[0].length === 0) regex.lastIndex++;
        }
      } catch (e) {
        console.error(`Error compiling regex for keyword: ${keyword}`, e);
      }
    }

    // 2. Regular expression matching
    if (rule.regexes) {
      for (const regexStr of rule.regexes) {
        try {
          const regex = new RegExp(regexStr, 'gi');
          let match;
          while ((match = regex.exec(text)) !== null) {
            recordMatch(match.index, match[0], rule.category, rule.category === 'suspicious_links');
            if (match[0].length === 0) regex.lastIndex++;
          }
        } catch (e) {
          console.error(`Error compiling regex pattern: ${regexStr}`, e);
        }
      }
    }
  }

  // Merge overlapping and adjacent ranges
  // Sort by start position ascending, then by match length descending
  const sortedRanges = [...matchRanges].sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return (b.end - b.start) - (a.end - a.start);
  });

  const mergedRanges: MatchRange[] = [];
  for (const range of sortedRanges) {
    if (range.start === range.end) continue; // Ignore empty matches

    if (mergedRanges.length === 0) {
      mergedRanges.push({ ...range });
    } else {
      const last = mergedRanges[mergedRanges.length - 1];
      if (range.start < last.end) {
        // Overlap detected. If the new match extends beyond the last merged range, extend it.
        if (range.end > last.end) {
          last.end = range.end;
          last.phrase = text.substring(last.start, last.end);
        }
        // We keep the category of the earlier or longer match (already in last)
      } else {
        mergedRanges.push({ ...range });
      }
    }
  }

  // Split text into highlight chunks
  const highlightChunks: HighlightChunk[] = [];
  let lastIndex = 0;
  for (const range of mergedRanges) {
    if (range.start > lastIndex) {
      highlightChunks.push({
        text: text.substring(lastIndex, range.start),
        isHighlighted: false
      });
    }
    const matchedText = text.substring(range.start, range.end);
    const ruleInfo = SCAM_RULES.find(r => r.category === range.category);
    highlightChunks.push({
      text: matchedText,
      isHighlighted: true,
      category: range.category,
      categoryName: ruleInfo ? ruleInfo.name : 'Suspicious'
    });
    lastIndex = range.end;
  }
  if (lastIndex < text.length) {
    highlightChunks.push({
      text: text.substring(lastIndex),
      isHighlighted: false
    });
  }

  // Calculate score
  let totalScore = 0;

  const detectedCategories: DetectedCategoryInfo[] = [];
  const processedCategories = new Set<DetectionCategory>();

  SCAM_RULES.forEach(rule => {
    if (processedCategories.has(rule.category)) return;
    processedCategories.add(rule.category);

    const matchCount = categoryMatchCounts[rule.category];
    if (matchCount > 0) {
      const phrases = Array.from(categoryMatchedPhrases[rule.category]);
      detectedCategories.push({
        category: rule.category,
        name: rule.name,
        description: rule.description,
        matchCount,
        matchedPhrases: phrases
      });

      totalScore += CATEGORY_BASE_SCORES[rule.category];
    }
  });

  // Cap score at 100
  totalScore = Math.min(totalScore, 100);

  // Set risk rating
  let rating: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (totalScore >= 55) {
    rating = 'HIGH';
  } else if (totalScore >= 25) {
    rating = 'MEDIUM';
  }

  // Create summary
  let summary = '';
  if (rating === 'HIGH') {
    summary = `This message shows multiple strong scam warning signs (Risk Score: ${totalScore}/100). These indicators are strongly associated with scam attempts, but this analysis cannot confirm that the message is fraudulent.`;
  } else if (rating === 'MEDIUM') {
    summary = `This message shows some scam warning signs (Risk Score: ${totalScore}/100). Take precautions, verify the sender through independent methods, and avoid sharing personal information.`;
  } else {
    summary = `No major scam warning signs were detected (Risk Score: ${totalScore}/100). However, always stay alert and never share passwords or sensitive information.`;
  }

  // Generate safe actions list
  const safeActions: string[] = [];

  // Category specific actions
  if (categoryMatchCounts['verification'] > 0) {
    safeActions.push('Never share one-time passcodes (OTPs), PINs, passwords, or personal credentials. Legitimate organizations will never ask for these via message.');
  }
  if (categoryMatchCounts['payment_requests'] > 0) {
    safeActions.push('Do not send payments, fees, or purchase gift cards to claim a job, prize, or package. These are common payment scam methods.');
  }
  if (categoryMatchCounts['remote_access'] > 0) {
    safeActions.push('Do not download or install screen sharing software (like AnyDesk or TeamViewer) requested in a message.');
  }
  if (categoryMatchCounts['impersonation'] > 0) {
    safeActions.push("Verify the sender's identity. Look up the organization's official phone number or website independently. Do not use any contact info provided in this message.");
  }
  if (categoryMatchCounts['suspicious_links'] > 0) {
    safeActions.push('Avoid clicking links in unsolicited messages. Hover over links to inspect the actual web address, or visit the official site by typing the URL manually.');
  }
  if (categoryMatchCounts['rewards'] > 0) {
    safeActions.push('Be skeptical of lotteries or prizes you did not enter. Legitimate contests do not require processing fees to claim winnings.');
  }
  if (categoryMatchCounts['unrealistic_offers'] > 0) {
    safeActions.push('Remember: if a job offer or investment opportunity sounds too good to be true (e.g. high salary for zero experience), it is likely a scam.');
  }
  if (categoryMatchCounts['urgency'] > 0) {
    safeActions.push('Take your time. Scammers create artificial deadlines to panic you. A legitimate organization will not pressure you to act instantly.');
  }

  // General safe actions to ensure we have recommendations
  safeActions.push('Do not reply to the sender or call any numbers listed in the message.');
  safeActions.push('Report and block the sender on your messaging app or carrier.');

  // Filter unique safety recommendations (though they are already unique, clean them up)
  const uniqueSafeActions = Array.from(new Set(safeActions));

  return {
    score: totalScore,
    rating,
    summary,
    detectedCategories,
    highlightChunks,
    safeActions: uniqueSafeActions,
    disclaimer
  };
}
