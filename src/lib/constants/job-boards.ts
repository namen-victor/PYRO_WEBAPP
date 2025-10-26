// Global + Regional job boards (with Nigeria emphasis)
// Major job boards (shown by default)
export const MAJOR_JOB_BOARDS = [
  'LinkedIn',
  'Indeed',
  'Glassdoor',
  'ZipRecruiter',
  'Dice'
];

// All job boards
export const JOB_BOARDS = [
  // Global
  "LinkedIn",
  "Indeed",
  "Glassdoor",
  "ZipRecruiter",
  "Monster",
  "Google Jobs",
  "Hired",
  "Wellfound (AngelList)",
  "Dice",
  "The Muse",
  "CareerBuilder",
  "Levels.fyi Jobs",
  
  // Remote-first
  "Remote OK",
  "We Work Remotely",
  "FlexJobs",
  "Arc",
  
  // UK & Europe
  "Reed (UK)",
  "Totaljobs (UK)",
  "CV-Library (UK)",
  "Guardian Jobs (UK)",
  "StepStone (EU)",
  
  // North America
  "Workopolis (CA)",
  "Job Bank (CA)",
  
  // Australia & NZ
  "SEEK (AU/NZ)",
  "Jora (AU/NZ)",
  
  // India
  "Naukri (IN)",
  "Shine (IN)",
  "TimesJobs (IN)",
  
  // MENA
  "Bayt (MENA)",
  "GulfTalent (MENA)",
  
  // Sub-Saharan Africa (with Nigeria emphasis)
  "Jobberman (NG)",
  "HotNigerianJobs (NG)",
  "MyJobMag (NG)",
  "Jobzilla (NG)",
  "Jobberman Ghana (GH)",
  
  // Tech & niche
  "Otta",
  "Hacker News: Who's Hiring?",
  
  // Fallback
  "Other"
] as const;

export type JobBoard = typeof JOB_BOARDS[number];

// Additional job boards (shown in collapsible section)
export const ADDITIONAL_JOB_BOARDS = JOB_BOARDS.filter(
  board => !MAJOR_JOB_BOARDS.includes(board)
);
