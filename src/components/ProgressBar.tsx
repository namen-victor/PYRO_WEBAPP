"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = 6 }: ProgressBarProps) {
  const steps = [
    { number: 1, label: "Basics" },
    { number: 2, label: "Location" },
    { number: 3, label: "Résumé" },
    { number: 4, label: "Contact" },
    { number: 5, label: "Job Boards" },
    { number: 6, label: "Review" },
  ];

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    bg: '#ebebeb',
    white: '#ffffff',
    border: '#e0e0e0',
    textLight: '#666'
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Progress percentage bar */}
      <div style={{ 
        width: '100%', 
        height: 6, 
        background: colors.border, 
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 24
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: colors.accent,
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Step dots with labels */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative'
      }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div 
              key={step.number}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1,
                position: 'relative'
              }}
            >
              {/* Dot */}
              <div style={{
                width: isCurrent ? 32 : 24,
                height: isCurrent ? 32 : 24,
                borderRadius: '50%',
                background: isCompleted || isCurrent ? colors.accent : colors.white,
                border: `2px solid ${isCompleted || isCurrent ? colors.accent : colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: isCurrent ? 700 : 500,
                fontSize: isCurrent ? 14 : 12,
                color: isCompleted || isCurrent ? colors.white : colors.textLight,
                transition: 'all 0.3s ease',
                marginBottom: 8
              }}>
                {isCompleted ? '✓' : step.number}
              </div>

              {/* Label */}
              <div style={{
                fontSize: isCurrent ? 13 : 11,
                fontWeight: isCurrent ? 600 : 400,
                color: isCurrent ? colors.primary : colors.textLight,
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile-friendly progress text */}
      <div style={{
        marginTop: 16,
        textAlign: 'center',
        fontSize: 13,
        color: colors.textLight,
        fontWeight: 500
      }}>
        Step {currentStep + 1} of {totalSteps}
      </div>
    </div>
  );
}






