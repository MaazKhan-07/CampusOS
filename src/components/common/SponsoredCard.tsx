import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface SponsoredCardProps {
  title?: string;
  sponsor?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  badge?: string;
  image?: string;
  className?: string;
}

export const SponsoredCard: React.FC<SponsoredCardProps> = ({
  title = 'Fast-track your Master’s: GRE & IELTS Live Coaching Cohort',
  sponsor = 'LeapScholar Prep',
  description = 'Exclusive SIT campus batch starts this weekend. 1-on-1 alumni mentorship and 320+ score guarantee.',
  ctaText = 'Claim 40% Campus Pass',
  ctaUrl = 'https://leapscholar.com',
  badge = 'Sponsored Partner',
  image = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
  className = '',
}) => {
  const { currentUser } = useAuthStore();

  // Hidden for premium students!
  if (currentUser?.isPremium) {
    return null;
  }

  return (
    <Card hover className={`border-accent/30 bg-surface/80 relative group overflow-hidden ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {image && (
            <img
              src={image}
              alt={sponsor}
              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-border"
            />
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-accent/20 text-primary border border-accent/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                {badge}
              </span>
              <span className="text-xs text-text-muted font-medium">• {sponsor}</span>
            </div>
            <h4 className="font-heading font-bold text-sm text-primary group-hover:text-accent-hover transition-colors">
              {title}
            </h4>
            <p className="text-xs text-text-muted mt-0.5 max-w-xl">{description}</p>
          </div>
        </div>

        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button variant="accent" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />} className="w-full sm:w-auto">
            {ctaText}
          </Button>
        </a>
      </div>
      <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-text-muted">
        <span>CampusOS Partner Network • Verified student discount</span>
        <span className="text-accent/80 font-medium">Remove ads with CampusOS Premium</span>
      </div>
    </Card>
  );
};

