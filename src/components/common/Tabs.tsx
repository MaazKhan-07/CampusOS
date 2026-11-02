import React from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  fullWidth = false,
}) => {
  return (
    <div
      className={cn(
        'inline-flex p-1 bg-surface-muted/80 rounded-2xl border border-border/80 gap-1 overflow-x-auto max-w-full',
        fullWidth && 'w-full',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center justify-center gap-2 px-4 py-2 text-xs font-heading font-semibold rounded-xl transition-all whitespace-nowrap',
              fullWidth && 'flex-1',
              isActive
                ? 'bg-primary text-onPrimary shadow-soft-sm'
                : 'text-text-muted hover:text-primary hover:bg-surface/60'
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                  isActive
                    ? 'bg-accent text-primary'
                    : 'bg-primary/10 text-primary'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

