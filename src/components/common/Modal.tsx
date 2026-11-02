import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div
        className={cn(
          'relative w-full bg-surface border border-border shadow-soft-lg rounded-3xl p-6 sm:p-7 z-10 my-8 animate-in fade-in zoom-in-95 duration-200',
          maxWidths[maxWidth]
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {title && (
              <h3 className="font-heading font-bold text-xl text-primary leading-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

