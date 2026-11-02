import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, light = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      <div className={`relative ${sizeClasses} rounded-full overflow-hidden shrink-0 shadow-soft border border-accent/30 group-hover:scale-105 transition-transform bg-[#013328]`}>
        <img
          src="/logo.png"
          alt="CampusOS"
          className="w-full h-full object-cover"
        />
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
              light ? 'text-[#F3EEE7]/70' : 'text-text-muted'
            }`}
          >
            One App For College
          </span>
        </div>
      )}
    </Link>
  );
};

