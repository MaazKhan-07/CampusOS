import React from 'react';
import { useToastStore } from '../../store/useToastStore';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-accent shrink-0" />,
        };

        const type = toast.type || 'info';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-surface border border-primary/15 shadow-soft-lg rounded-2xl animate-in slide-in-from-bottom-3 duration-200"
          >
            {icons[type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-heading font-bold text-primary">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-text-muted mt-0.5 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-primary transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

