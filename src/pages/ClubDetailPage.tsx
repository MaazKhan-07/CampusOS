import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { useClubStore } from '../store/useClubStore';
import { useEventStore } from '../store/useEventStore';
import { useToastStore } from '../store/useToastStore';
import {
  ArrowLeft,
  Users,
  Calendar,
  Pin,
  Instagram,
  Linkedin,
  Github,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const ClubDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clubs, members, joinClub, leaveClub } = useClubStore();
  const { events } = useEventStore();
  const { addToast } = useToastStore();

  const club = clubs.find((c) => c.id === id);

  if (!club) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-heading font-bold text-primary">Club Not Found</h2>
        <Link to="/app/clubs">
          <Button variant="accent">Back to Clubs</Button>
        </Link>
      </div>
    );
  }

  const clubEvents = events.filter((e) => e.clubId === club.id || e.clubName === club.name);

  const handleToggleJoin = () => {
    if (club.isMember) {
      leaveClub(club.id);
      addToast({
        title: `Left ${club.name}`,
        description: 'You will no longer receive announcements.',
        type: 'info',
      });
    } else {
      joinClub(club.id);
      addToast({
        title: `Joined ${club.name}! 🎉`,
        description: 'You are now an active member.',
        type: 'success',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Link
          to="/app/clubs"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Clubs</span>
        </Link>
      </div>

      {/* Hero Cover Card */}
      <Card padded={false} className="overflow-hidden border-border shadow-soft-sm">
        <div className="relative h-48 sm:h-64 bg-surface-muted overflow-hidden">
          <img src={club.cover} alt={club.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

          {/* Social Links */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {club.socialLinks?.instagram && (
              <a
                href={club.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-surface/90 text-primary hover:text-accent transition-colors backdrop-blur-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {club.socialLinks?.linkedin && (
              <a
                href={club.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-surface/90 text-primary hover:text-accent transition-colors backdrop-blur-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {club.socialLinks?.github && (
              <a
                href={club.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-surface/90 text-primary hover:text-accent transition-colors backdrop-blur-sm"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Club Details Header */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 -mt-16 sm:-mt-20">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-surface border-4 border-surface shadow-soft overflow-hidden shrink-0">
                <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <Badge variant="accent" size="sm">
                  {club.category}
                </Badge>
                <h1 className="text-xl sm:text-3xl font-heading font-extrabold text-primary leading-tight mt-1">
                  {club.name}
                </h1>
              </div>
            </div>

            <Button
              variant={club.isMember ? 'outline' : 'accent'}
              size="md"
              onClick={handleToggleJoin}
              className="font-bold shadow-copper w-full sm:w-auto"
            >
              {club.isMember ? 'Member of Society (Leave)' : 'Join Club'}
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-3xl pt-2">
            {club.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-3 border-t border-border">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent" />
              <strong>{club.membersCount} Active Members</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{club.meetingSchedule}</span>
            </span>
            <span>•</span>
            <span>Lead: <strong>{club.leadName}</strong> ({club.leadRole})</span>
          </div>
        </div>
      </Card>

      {/* Announcements Section */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
          <Pin className="w-5 h-5 text-accent" />
          <span>Official Announcements</span>
        </h3>

        {club.announcements && club.announcements.length > 0 ? (
          <div className="space-y-3">
            {club.announcements.map((ann) => (
              <Card key={ann.id} className="p-5 border-border">
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                    Posted by {ann.authorName}
                  </span>
                  <span>{ann.date}</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-primary">{ann.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed mt-1">{ann.content}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-text-muted bg-surface rounded-2xl border border-border">
            No announcements posted yet this semester.
          </div>
        )}
      </div>

      {/* Upcoming Events by this Club */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          <span>Events by {club.name}</span>
        </h3>

        {clubEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clubEvents.map((evt) => (
              <Link
                key={evt.id}
                to={`/app/events/${evt.id}`}
                className="bg-surface rounded-2xl border border-border p-4 hover:border-accent hover:shadow-soft transition-all group flex flex-col justify-between"
              >
                <div>
                  <Badge variant="accent" size="sm" className="mb-2">
                    {evt.category}
                  </Badge>
                  <h4 className="font-heading font-bold text-sm text-primary group-hover:text-accent-hover transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-text-muted mt-1">{evt.date} • {evt.venue}</p>
                </div>
                <span className="text-xs font-bold text-accent mt-3 block">View Event →</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-text-muted bg-surface rounded-2xl border border-border">
            No active events scheduled by this club at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

