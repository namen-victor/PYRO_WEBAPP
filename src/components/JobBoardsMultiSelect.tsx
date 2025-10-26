"use client";

import { JOB_BOARDS } from '@/lib/constants';

interface JobBoardsMultiSelectProps {
  selectedBoards: string[];
  onChange: (boards: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  error?: string;
  otherError?: string;
}

export function JobBoardsMultiSelect({ 
  selectedBoards, 
  onChange, 
  otherValue = '',
  onOtherChange,
  error,
  otherError
}: JobBoardsMultiSelectProps) {
  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    error: '#dc2626',
    white: '#ffffff',
    selected: '#e8f5f3'
  };

  const handleToggle = (board: string) => {
    if (selectedBoards.includes(board)) {
      onChange(selectedBoards.filter(b => b !== board));
    } else {
      onChange([...selectedBoards, board]);
    }
  };

  const isOtherSelected = selectedBoards.includes('Other');

  // Group job boards by category
  const categories = [
    {
      name: 'Global Platforms',
      boards: ['LinkedIn', 'Indeed', 'Glassdoor', 'ZipRecruiter', 'Monster', 'Google Jobs', 'Hired', 'Wellfound (AngelList)', 'Dice', 'The Muse', 'CareerBuilder', 'Levels.fyi Jobs']
    },
    {
      name: 'Remote-First',
      boards: ['Remote OK', 'We Work Remotely', 'FlexJobs', 'Arc']
    },
    {
      name: 'Nigeria & Africa',
      boards: ['Jobberman (NG)', 'HotNigerianJobs (NG)', 'MyJobMag (NG)', 'Jobzilla (NG)', 'Jobberman Ghana (GH)']
    },
    {
      name: 'UK & Europe',
      boards: ['Reed (UK)', 'Totaljobs (UK)', 'CV-Library (UK)', 'Guardian Jobs (UK)', 'StepStone (EU)']
    },
    {
      name: 'North America',
      boards: ['Workopolis (CA)', 'Job Bank (CA)']
    },
    {
      name: 'Australia & New Zealand',
      boards: ['SEEK (AU/NZ)', 'Jora (AU/NZ)']
    },
    {
      name: 'India',
      boards: ['Naukri (IN)', 'Shine (IN)', 'TimesJobs (IN)']
    },
    {
      name: 'Middle East & North Africa',
      boards: ['Bayt (MENA)', 'GulfTalent (MENA)']
    },
    {
      name: 'Tech & Niche',
      boards: ['Otta', 'Hacker News: Who\'s Hiring?']
    },
    {
      name: 'Other',
      boards: ['Other']
    }
  ];

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ 
        display: 'block', 
        fontSize: 14, 
        fontWeight: 600, 
        color: colors.text, 
        marginBottom: 8 
      }}>
        Job Boards <span style={{ color: colors.error }}>*</span>
      </label>

      <div style={{ 
        fontSize: 13, 
        color: colors.textLight,
        marginBottom: 16,
        lineHeight: 1.5
      }}>
        Select all job boards where you're actively searching or would like us to help you apply
      </div>

      {/* Categories */}
      <div style={{ 
        maxHeight: 500, 
        overflowY: 'auto',
        border: `1px solid ${error ? colors.error : colors.border}`,
        borderRadius: 8,
        padding: 16,
        background: colors.white
      }}>
        {categories.map((category, catIndex) => (
          <div key={category.name} style={{ marginBottom: catIndex < categories.length - 1 ? 20 : 0 }}>
            <div style={{ 
              fontSize: 12, 
              fontWeight: 700, 
              color: colors.textLight,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 12
            }}>
              {category.name}
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 8
            }}>
              {category.boards.map((board) => {
                const isSelected = selectedBoards.includes(board);
                
                return (
                  <label
                    key={board}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      background: isSelected ? colors.selected : colors.white,
                      border: `1px solid ${isSelected ? colors.accent : colors.border}`,
                      borderRadius: 6,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: 13
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = '#f9fafb';
                        e.currentTarget.style.borderColor = colors.accent;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = colors.white;
                        e.currentTarget.style.borderColor = colors.border;
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle(board)}
                      style={{
                        width: 16,
                        height: 16,
                        cursor: 'pointer',
                        accentColor: colors.accent,
                        flexShrink: 0
                      }}
                    />
                    <span style={{ 
                      color: colors.text,
                      fontWeight: isSelected ? 600 : 400
                    }}>
                      {board}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Other input (conditional) */}
      {isOtherSelected && (
        <div style={{ marginTop: 16 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 14, 
            fontWeight: 600, 
            color: colors.text, 
            marginBottom: 8 
          }}>
            Specify Other Job Boards <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange && onOtherChange(e.target.value)}
            placeholder="e.g., AngelList, Hired, Stack Overflow Jobs"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${otherError ? colors.error : colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => !otherError && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !otherError && (e.currentTarget.style.borderColor = colors.border)}
          />
          {otherError && (
            <div style={{ 
              marginTop: 6, 
              fontSize: 13, 
              color: colors.error,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <span>⚠</span>
              <span>{otherError}</span>
            </div>
          )}
        </div>
      )}

      {error && (
        <div style={{ 
          marginTop: 8, 
          fontSize: 13, 
          color: colors.error,
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}>
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Selected count */}
      <div style={{ 
        marginTop: 12, 
        fontSize: 13, 
        color: colors.textLight,
        fontWeight: 500
      }}>
        {selectedBoards.length} board{selectedBoards.length !== 1 ? 's' : ''} selected
      </div>
    </div>
  );
}






