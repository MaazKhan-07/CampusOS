import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { ExternalLink, Tag } from 'lucide-react';
import { StudentDeal } from '../../types';

interface DealsCardProps {
  deal: StudentDeal;
}

export const DealsCard: React.FC<DealsCardProps> = ({ deal }) => {
  return (
    <Card hover className="flex flex-col justify-between group">
      <div>
        <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-surface-muted">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2.5 left-2.5">
            <Badge variant="accent" size="sm">
              {deal.tag}
            </Badge>
          </div>
          <div className="absolute bottom-2.5 right-2.5 bg-primary/90 backdrop-blur-sm text-surface text-[11px] font-heading font-bold px-2 py-0.5 rounded-lg border border-accent/30">
            {deal.partner}
          </div>
        </div>

        <h4 className="font-heading font-bold text-sm text-primary group-hover:text-accent-hover transition-colors line-clamp-1">
          {deal.title}
        </h4>
        <p className="text-xs font-semibold text-accent mt-1 flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {deal.discount}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        {deal.code ? (
          <div className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-surface-muted border border-border text-primary">
            {deal.code}
          </div>
        ) : (
          <span className="text-[10px] text-text-muted">Instant discount</span>
        )}

        <a
          href={deal.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-heading font-semibold text-primary hover:text-accent flex items-center gap-1 transition-colors"
        >
          <span>Claim Deal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </Card>
  );
};

