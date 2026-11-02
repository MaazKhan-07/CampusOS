import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ThumbsUp, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { useRoadmapStore } from '../store/useRoadmapStore';
import { useToastStore } from '../store/useToastStore';

export const ComingSoonPage: React.FC = () => {
  const { features, toggleVote } = useRoadmapStore();
  const { addToast } = useToastStore();

  const handleVote = (featureId: string, title: string, hasVoted?: boolean) => {
    toggleVote(featureId);
    if (!hasVoted) {
      addToast({
        title: 'Upvoted Feature! 👍',
        description: `Your vote for "${title}" was recorded and factored into the sprint prioritization.`,
        type: 'success',
      });
    } else {
      addToast({
        title: 'Vote Withdrawn',
        description: `Removed upvote for "${title}".`,
        type: 'info',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-primary text-xs font-heading font-bold shadow-soft-sm">
          <Compass className="w-4 h-4 text-accent" />
          <span>Product Roadmap & Community Backlog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary tracking-tight">
          What should we build next?
        </h1>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          CampusOS is co-designed with students and faculties. Upvote the features you need most in upcoming semester sprints.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        {features.map((feature) => (
          <Card
            key={feature.id}
            hover
            className="flex flex-col justify-between group border-border space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="accent" size="sm">
                  {feature.category}
                </Badge>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    feature.status === 'Under Development'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : feature.status === 'Next Up'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-surface-muted text-text-muted border border-border'
                  }`}
                >
                  {feature.status}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-base text-primary group-hover:text-accent-hover transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mt-1.5">
                {feature.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-primary">
                {feature.votes} Student Upvotes
              </span>

              <Button
                size="sm"
                variant={feature.hasVoted ? 'primary' : 'outline'}
                onClick={() => handleVote(feature.id, feature.title, feature.hasVoted)}
                leftIcon={<ThumbsUp className={`w-3.5 h-3.5 ${feature.hasVoted ? 'fill-current' : ''}`} />}
                className="text-xs font-bold"
              >
                {feature.hasVoted ? 'Upvoted' : 'Vote for Feature'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

