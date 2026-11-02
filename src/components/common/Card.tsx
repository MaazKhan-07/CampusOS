import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padded?: boolean;
  dark?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = false, padded = true, dark = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border transition-all duration-200 overflow-hidden',
          dark
            ? 'bg-primary text-onPrimary border-accent/20 shadow-soft'
            : 'bg-surface text-text border-border shadow-soft-sm',
          hover && (dark ? 'hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-soft-lg' : 'hover:border-primary/25 hover:-translate-y-0.5 hover:shadow-soft'),
          padded && 'p-5 sm:p-6',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

