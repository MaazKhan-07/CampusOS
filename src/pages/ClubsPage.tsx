import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Users,
  Calendar,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useClubStore } from '../store/useClubStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';

export const ClubsPage: React.FC = () => {
  const { clubs, joinClub, leaveClub } = useClubStore();
  const { currentUser, currentRole } = useAuthStore();
  const { addToast } = useToastStore();

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Technology & Open Source',
    'Robotics & Embedded AI',
    'Business & Startups',
    'Arts & Culture',
    'Athletics & Fitness',
    'Music & Production',
  ];

  const filteredClubs = clubs.filter((c) => {
    if (activeCategory !== 'All' && c.category !== activeCategory) return false;
    return true;
  });

  const handleToggleJoin = (club: any) => {
    if (club.isMember) {
      leaveClub(club.id);
      addToast({
        title: `Left ${club.name}`,
        description: 'You will no longer receive club announcements in your feed.',
        type: 'info',
      });
    } else {
      joinClub(club.id);
      addToast({
        title: `Joined ${club.name}! 🎉`,
        description: 'You now receive official society broadcasts.',
        type: 'success',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              Clubs & Societies Directory
            </h1>
            <Badge variant="accent" size="sm">
              {clubs.length} Active Chapters
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Join student-led organizations, build campus projects, and attend weekly meetups.
          </p>
        </div>

        {/* Club Leader Dashboard Quick Access */}
        <Link to="/app/clubs/manage">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Settings className="w-4 h-4 text-accent" />}
            className="font-bold border-primary/25"
          >
            Club Leader Admin Panel
          </Button>
        </Link>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-primary text-onPrimary shadow-soft-sm'
                : 'bg-surface text-text-muted border border-border hover:bg-surface-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <Card
            key={club.id}
            hover
            padded={false}
            className="flex flex-col justify-between group overflow-hidden border-border"
          >
            <div>
              {/* Cover Banner */}
              <div className="relative h-32 bg-surface-muted overflow-hidden">
                <img
                  src={club.cover}
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

                {/* Logo Overlap */}
                <div className="absolute -bottom-4 left-4 w-14 h-14 rounded-2xl bg-surface border-2 border-surface shadow-soft overflow-hidden">
                  <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-surface/90 text-primary backdrop-blur-sm">
                    {club.category.split('&')[0]}
                  </span>
                </div>
              </div>

              {/* Club Info */}
              <div className="pt-6 px-5 pb-4 space-y-3">
                <div>
                  <Link to={`/app/clubs/${club.id}`}>
                    <h3 className="font-heading font-extrabold text-base text-primary group-hover:text-accent-hover transition-colors">
                      {club.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                    {club.description}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-text-muted pt-1 border-t border-border/60">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{club.membersCount} Active Members</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="truncate">{club.meetingSchedule}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-surface-muted/50 border-t border-border flex items-center justify-between">
              <Link
                to={`/app/clubs/${club.id}`}
                className="text-xs font-heading font-bold text-primary hover:text-accent flex items-center gap-1"
              >
                <span>View Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Button
                size="sm"
                variant={club.isMember ? 'outline' : 'accent'}
                onClick={() => handleToggleJoin(club)}
                className="text-xs font-bold"
              >
                {club.isMember ? 'Leave Society' : 'Join Club'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

