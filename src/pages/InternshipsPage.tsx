import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { EmptyState } from '../components/common/EmptyState';
import {
  Briefcase,
  Search,
  Bookmark,
  MapPin,
  Clock,
  Sparkles,
  Lock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { useInternshipStore } from '../store/useInternshipStore';
import { useAuthStore } from '../store/useAuthStore';
import { InternshipType } from '../types';

export const InternshipsPage: React.FC = () => {
  const { internships, savedInternships, toggleSave, applications } = useInternshipStore();
  const { currentUser } = useAuthStore();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const types = ['All', 'Internship', 'Part-time', 'Campus Ambassador', 'Training'];

  const filteredInternships = useMemo(() => {
    return internships.filter((intern) => {
      if (showSavedOnly && !savedInternships.includes(intern.id)) return false;
      if (remoteOnly && !intern.isRemote) return false;
      if (typeFilter !== 'All' && intern.type !== typeFilter) return false;

      const matchesSearch =
        intern.role.toLowerCase().includes(search.toLowerCase()) ||
        intern.company.toLowerCase().includes(search.toLowerCase()) ||
        intern.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      return matchesSearch;
    });
  }, [internships, savedInternships, showSavedOnly, remoteOnly, typeFilter, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              Internship Opportunities
            </h1>
            <Badge variant="accent" size="sm">
              Verified High-Growth Startups
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Apply to verified software engineering, product design, and campus ambassador roles.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant={showSavedOnly ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            leftIcon={<Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current' : ''}`} />}
          >
            Saved ({savedInternships.length})
          </Button>

          {!currentUser?.isPremium && (
            <Link to="/app/premium">
              <Button
                variant="accent"
                size="sm"
                leftIcon={<Lock className="w-3.5 h-3.5" />}
                className="shadow-copper font-bold"
              >
                Priority Fast-Track
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Priority Applications Upsell Hint for Non-Premium */}
      {!currentUser?.isPremium && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-accent/20 via-surface to-surface-muted border border-accent/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent text-primary flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-heading font-bold text-primary">
                CampusOS Premium: Get 3x Faster Screening
              </h4>
              <p className="text-[11px] text-text-muted">
                Premium students receive the "Priority Applicant" gold flag on recruiter dashboards.
              </p>
            </div>
          </div>
          <Link to="/app/premium" className="shrink-0">
            <span className="text-xs font-heading font-bold text-accent hover:underline">
              Unlock for ₹99/mo →
            </span>
          </Link>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-soft-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by role, company, or tech stack (e.g. React, Go, Zepto, Figma)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-muted/70 text-text placeholder:text-text-muted text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-primary focus:bg-surface focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="flex items-center gap-2 text-xs font-heading font-semibold text-primary px-3 py-2 bg-surface-muted rounded-xl border border-border cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded border-border text-accent focus:ring-accent"
              />
              <span>Remote Only</span>
            </label>
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold whitespace-nowrap transition-all ${
                typeFilter === t
                  ? 'bg-primary text-onPrimary shadow-soft-sm'
                  : 'bg-surface-muted text-text-muted hover:text-primary hover:bg-surface'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Internship Cards Grid */}
      {filteredInternships.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-8 h-8 text-accent" />}
          title="No Opportunities Found"
          description="Try broadening your search query or removing the remote-only filter."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredInternships.map((intern) => {
            const isSaved = savedInternships.includes(intern.id);
            const userApp = applications.find(
              (a) => a.internshipId === intern.id && (a.userId === currentUser?.id || a.userId === 'user-student-1')
            );

            return (
              <Card
                key={intern.id}
                hover
                padded={false}
                className="flex flex-col justify-between group overflow-hidden border-border"
              >
                <div className="p-5 space-y-4">
                  {/* Top Bar: Company, Logo, Featured Badge & Bookmark */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-surface-muted border border-border flex items-center justify-center font-heading font-extrabold text-primary overflow-hidden shrink-0">
                        {intern.logo ? (
                          <img
                            src={intern.logo}
                            alt={intern.company}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{intern.company.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-heading font-bold text-xs text-text-muted">
                            {intern.company}
                          </h4>
                          {intern.isFeatured && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-accent text-primary shadow-soft-sm">
                              Featured
                            </span>
                          )}
                        </div>
                        <Link to={`/app/internships/${intern.id}`}>
                          <h3 className="font-heading font-extrabold text-base text-primary group-hover:text-accent-hover transition-colors leading-snug">
                            {intern.role}
                          </h3>
                        </Link>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSave(intern.id)}
                      className={`p-2 rounded-xl transition-colors ${
                        isSaved
                          ? 'text-accent bg-accent/15'
                          : 'text-text-muted hover:text-primary hover:bg-surface-muted'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Save Internship'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Stipend, Location, Deadline */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted pt-1">
                    <span className="font-heading font-bold text-accent text-sm">
                      {intern.stipend}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-text-muted" />
                      {intern.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-text-muted" />
                      Due {intern.deadline}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {intern.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {intern.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-surface-muted text-primary border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-surface-muted/50 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-text-muted">
                    {intern.applicantsCount} applicants applied
                  </span>

                  {userApp ? (
                    <span className="text-xs font-heading font-bold px-3 py-1 rounded-xl bg-accent/20 text-primary border border-accent/40 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      Applied: {userApp.status}
                    </span>
                  ) : (
                    <Link to={`/app/internships/${intern.id}`}>
                      <Button size="sm" variant="accent" className="font-bold shadow-copper">
                        Apply Now
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

