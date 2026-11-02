import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, light = false }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <div className="relative w-9 h-9 rounded-[11px] bg-primary flex items-center justify-center shadow-soft border border-accent/25 group-hover:scale-105 transition-transform overflow-hidden">
        {/* Arch motif */}
        <svg viewBox="0 0 32 32" className="w-5 h-5 text-surface" fill="none">
          <path
            d="M8 24V14C8 9.58172 11.5817 6 16 6C20.4183 6 24 9.58172 24 14V16"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="12" r="2" fill="#CC8B65" />
          <path
            d="M23 20C21.5 22.8 19 24.5 16 24.5C11.5817 24.5 8 20.9183 8 16.5C8 13.5 10 11 12.5 9.8"
            stroke="#CC8B65"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M7 25H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span
            className={`font-heading font-extrabold text-xl tracking-tight leading-none ${
              light ? 'text-onPrimary' : 'text-primary'
            }`}
          >
            Campus<span className="text-accent">OS</span>
          </span>
          <span
            className={`text-[9px] uppercase tracking-wider font-semibold mt-0.5 ${
              light ? 'text-surface/70' : 'text-text-muted'
            }`}
          >
            One App For College
          </span>
        </div>
      )}
    </Link>
  );
};

