import type { ScamRule, SampleMessage } from '../types';

export const SCAM_RULES: ScamRule[] = [
  {
    category: 'urgency',
    name: 'Urgency & High Pressure',
    description: 'Creates a false sense of urgency to pressure you into acting quickly without thinking.',
    keywords: [
      'act now',
      'urgent',
      'urgently',
      'immediately',
      'hurry',
      'limited time',
      'expires',
      'expires in',
      'within 24 hours',
      'within 48 hours',
      'asap',
      'quick action',
      'final warning',
      'final notice',
      'respond today',
      'today only',
      'deadline',
      'instant action'
    ],
    regexes: [
      '\\b(\\d+)\\s*(hours?|mins?|minutes?|secs?|seconds?)\\s*left\\b',
      '\\b(fast|quick)\\s*action\\b'
    ]
  },
  {
    category: 'threats',
    name: 'Threats & Intimidation',
    description: 'Threatens legal action, law enforcement involvement, or service suspension to scare you.',
    keywords: [
      'arrest',
      'police',
      'jail',
      'lawsuit',
      'legal action',
      'prosecuted',
      'court',
      'suspended',
      'frozen',
      'blocked',
      'deactivated',
      'terminated',
      'fined',
      'penalty',
      'illegal',
      'avoid prosecution',
      'legal consequences',
      'will deactivate',
      'card block',
      'account closure'
    ]
  },
  {
    category: 'verification',
    name: 'Verification & Credential Requests',
    description: 'Asks for sensitive personal details, password, PIN, OTP, or verification codes.',
    keywords: [
      'verification code',
      'one-time password',
      'otp',
      'pin code',
      'verify pin',
      'password',
      'security code',
      'verify your account',
      'confirm pin',
      'security questions',
      'credentials',
      'login details',
      'security link',
      'bank details',
      'bank account details',
      'card details',
      'account details',
      'personal details',
      'social security number',
      'ssn',
      'identity verification',
      'verify identity',
      'verify your identity'
    ]
  },
  {
    category: 'payment_requests',
    name: 'Payment & Processing Fees',
    description: 'Requests upfront payment, processing fees, shipping costs, or gift cards to release funds or services.',
    keywords: [
      'processing fee',
      'registration fee',
      'shipping fee',
      'upfront payment',
      'send money',
      'pay to claim',
      'gift card',
      'deposit required',
      'wire transfer',
      'payment details',
      'credit card upfront',
      'administrative fee',
      'courier fee',
      'customs duty',
      'clearance charge',
      'pay upfront'
    ]
  },
  {
    category: 'rewards',
    name: 'Prizes & Fake Rewards',
    description: 'Claims you won a lottery, prize, giveaway, or reward that you did not enter.',
    keywords: [
      'won',
      'winner',
      'lottery',
      'prize',
      'selected for a cash prize',
      'claim your prize',
      'jackpot',
      'reward',
      'giveaway',
      'free cash',
      'cash reward',
      'free gift',
      'congratulations',
      'lucky draw',
      'sweepstakes',
      'gift card winner'
    ]
  },
  {
    category: 'suspicious_links',
    name: 'Suspicious Links',
    description: 'Contains links to unofficial websites, shortened URLs, or suspicious domains.',
    keywords: [
      'click here',
      'link below',
      'visit link',
      'verify here',
      'login at',
      'access your account here'
    ],
    regexes: [
      // Shortened URLs
      '\\b(bit\\.ly|tinyurl\\.com|t\\.co|rebrand\\.ly|ow\\.ly|is\\.gd|buff\\.ly|cutt\\.ly|t\\.me|shorte\\.st|v\\.gd)\\b/\\S*',
      // Generic HTTP/HTTPS links
      'https?://[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+[^\\s]*',
      // Email addresses
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
    ]
  },
  {
    category: 'impersonation',
    name: 'Authority Impersonation',
    description: 'Impersonates trusted institutions like banks, government agencies, delivery services, or employers.',
    keywords: [
      'netflix',
      'amazon',
      'dhl',
      'fedex',
      'ups',
      'usps',
      'irs',
      'social security',
      'bank of america',
      'chase',
      'wells fargo',
      'paypal',
      'mom',
      'dad',
      'son',
      'daughter',
      'hr department',
      'hiring manager',
      'support agent',
      'customer service',
      'official team',
      'post office',
      'internal revenue',
      'card services',
      'customs agency',
      'delivery driver'
    ]
  },
  {
    category: 'secrecy',
    name: 'Secrecy Requests',
    description: 'Asks you to keep the conversation or offer secret from others, including family or bank staff.',
    keywords: [
      'keep this secret',
      'don\'t tell anyone',
      'confidential',
      'do not share with family',
      'keep this between us',
      'secretly',
      'private information',
      'do not disclose',
      'keep it quiet',
      'under wraps',
      'hush-hush',
      'do not inform anyone'
    ]
  },
  {
    category: 'remote_access',
    name: 'Remote Access Requests',
    description: 'Requests that you install software to allow remote access to your device.',
    keywords: [
      'anydesk',
      'teamviewer',
      'any desk',
      'team viewer',
      'zoho assist',
      'download software',
      'install app to verify',
      'remote access',
      'remote desk',
      'rustdesk',
      'install extension',
      'download diagnostic',
      'screen sharing'
    ]
  },
  {
    category: 'unrealistic_offers',
    name: 'Unrealistic Offers & Earnings',
    description: 'Offers high returns, massive salaries, or financial rewards with little to no effort.',
    keywords: [
      '$500 a day',
      '$1000 a day',
      '$2000 a week',
      'work from home',
      'guaranteed return',
      'double your money',
      'risk-free investment',
      'crypto investment profit',
      'high yield',
      'earn quick cash',
      'high salary',
      'massive return',
      'get rich',
      'no experience needed',
      'passive income',
      'financial freedom',
      'grow your savings'
    ]
  }
];

export const SAMPLE_MESSAGES: SampleMessage[] = [
  {
    id: 'sample-bank',
    title: 'Chase Bank Verification',
    label: 'Bank Scam',
    text: 'URGENT: Your Chase bank account has been temporarily frozen due to suspicious activity. Please verify your identity immediately by clicking this link: https://chase-security-verify.net/login. Failure to do so within 24 hours will result in permanent suspension of your card.'
  },
  {
    id: 'sample-job',
    title: 'Amazon Remote Job Offer',
    label: 'Job Scam',
    text: 'Hello, this is the HR department at Amazon. We have reviewed your profile and are pleased to offer you a work-from-home position earning $500 to $1000 a day. There are no qualifications needed. To finalize your onboarding and receive your training kit, a one-time administrative registration fee of $50 is required. Please pay here: http://bit.ly/amazon-job-onboard'
  },
  {
    id: 'sample-lottery',
    title: 'International Lottery Winner',
    label: 'Lottery Scam',
    text: 'CONGRATULATIONS! You have been selected as the grand prize winner of the International Lottery. You have won a cash reward of $500,000! To claim your jackpot, you must send your bank account details and pay a processing fee of $250. Please keep this confidential to prevent double-claims. Contact us at cash-claims@reward-lottery-info.com.'
  }
];
