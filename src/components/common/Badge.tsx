import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'surface' | 'success' | 'warn' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'accent',
  size = 'md',
  ...props
}) => {
  const variants = {
    accent: 'bg-accent/20 text-primary border border-accent/30 font-semibold',
    primary: 'bg-primary text-surface font-medium',
    surface: 'bg-surface-muted text-text border border-border',
    success: 'bg-emerald-100 text-emerald-900 border border-emerald-200',
    warn: 'bg-amber-100 text-amber-900 border border-amber-200',
    outline: 'border border-primary/25 text-primary bg-transparent',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full',
    md: 'text-xs px-2.5 py-1 rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-heading font-medium tracking-wide leading-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

