import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'dark' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium font-heading transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

    const variants = {
      primary:
        'bg-primary text-onPrimary hover:bg-primary-light hover:shadow-soft active:bg-primary-dark',
      accent:
        'bg-accent text-primary font-semibold hover:bg-accent-hover hover:shadow-copper active:brightness-95',
      outline:
        'border border-primary/20 bg-transparent text-primary hover:bg-primary/5 hover:border-primary/40 active:bg-primary/10',
      ghost:
        'text-primary hover:bg-primary/5 active:bg-primary/10',
      dark:
        'bg-surface-dark text-surface hover:bg-primary-light active:bg-primary',
      secondary:
        'bg-surface text-primary border border-border hover:bg-surface-muted hover:shadow-soft-sm',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5',
      md: 'text-sm px-4 py-2.5 rounded-2xl gap-2',
      lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 font-semibold',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

