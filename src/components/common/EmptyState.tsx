import React from 'react';
import { Button } from './Button';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-dashed border-primary/20 bg-surface/50 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-accent/15 text-primary flex items-center justify-center mb-4 border border-accent/25">
        {icon || <Inbox className="w-7 h-7 text-accent" />}
      </div>
      <h3 className="font-heading font-bold text-lg text-primary">{title}</h3>
      <p className="text-xs sm:text-sm text-text-muted max-w-sm mt-1 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="accent" size="sm" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

