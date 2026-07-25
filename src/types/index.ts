export type DetectionCategory =
  | 'urgency'
  | 'threats'
  | 'verification'
  | 'payment_requests'
  | 'rewards'
  | 'suspicious_links'
  | 'impersonation'
  | 'secrecy'
  | 'remote_access'
  | 'unrealistic_offers';

export interface ScamRule {
  category: DetectionCategory;
  name: string;
  description: string;
  keywords: string[];
  regexes?: string[]; // Store regex patterns as strings
}

export interface HighlightChunk {
  text: string;
  isHighlighted: boolean;
  category?: DetectionCategory;
  categoryName?: string;
}

export interface DetectedCategoryInfo {
  category: DetectionCategory;
  name: string;
  description: string;
  matchCount: number;
  matchedPhrases: string[];
}

export interface AnalysisResult {
  score: number;
  rating: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
  detectedCategories: DetectedCategoryInfo[];
  highlightChunks: HighlightChunk[];
  safeActions: string[];
  disclaimer: string;
}

export interface SampleMessage {
  id: string;
  title: string;
  label: string;
  text: string;
}

export type AiWarningSeverity = 'low' | 'medium' | 'high';

export interface AiWarningSign {
  category: string;
  evidence: string;
  explanation: string;
  severity: AiWarningSeverity;
}

export interface AiAnalysisResult {
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
  warningSigns: AiWarningSign[];
  safeActions: string[];
  disclaimer: string;
}