import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isVerified?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  isVerified = false,
  className,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const getInitials = (n: string) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const badgeSizes = {
    xs: 'w-2.5 h-2.5 -right-0.5 -bottom-0.5',
    sm: 'w-3 h-3 -right-0.5 -bottom-0.5',
    md: 'w-4 h-4 -right-1 -bottom-1',
    lg: 'w-5 h-5 -right-1 -bottom-1',
    xl: 'w-6 h-6 right-0 bottom-0',
  };

  return (
    <div className={cn('relative inline-flex shrink-0 select-none', className)}>
      <div
        className={cn(
          'rounded-2xl flex items-center justify-center font-heading overflow-hidden border border-border shadow-soft-sm',
          sizes[size],
          src && !imageError
            ? 'bg-surface-muted'
            : 'bg-primary text-surface font-semibold'
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {isVerified && (
        <div
          title="Verified College Student"
          className={cn(
            'absolute rounded-full bg-surface text-accent flex items-center justify-center shadow-soft-sm',
            badgeSizes[size]
          )}
        >
          <CheckCircle2 className="w-full h-full fill-accent text-surface" />
        </div>
      )}
    </div>
  );
};

