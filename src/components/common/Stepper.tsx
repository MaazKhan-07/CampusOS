import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface Step {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 0-indexed
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn('w-full flex items-center justify-between', className)}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center relative z-10">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all duration-200 border-2',
                  isCompleted
                    ? 'bg-accent border-accent text-primary'
                    : isCurrent
                    ? 'bg-primary border-primary text-onPrimary shadow-soft-sm'
                    : 'bg-surface border-border text-text-muted'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>
              <span
                className={cn(
                  'text-[11px] font-heading font-semibold mt-1.5 whitespace-nowrap',
                  isCurrent ? 'text-primary' : 'text-text-muted'
                )}
              >
                {step.title}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2 -mt-4 transition-colors',
                  idx < currentStep ? 'bg-accent' : 'bg-border'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

