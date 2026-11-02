import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { ImpactWidget } from '../components/common/ImpactWidget';
import { SponsoredCard } from '../components/common/SponsoredCard';
import { DealsCard } from '../components/common/DealsCard';
import {
  BookOpen,
  Search,
  Calendar,
  Briefcase,
  FileText,
  Pin,
  Clock,
  ArrowRight,
  Sparkles,
  Ticket,
  CheckCircle2,
  AlertCircle,
  Building,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useBookStore } from '../store/useBookStore';
import { useEventStore } from '../store/useEventStore';
import { useInternshipStore } from '../store/useInternshipStore';
import { useLostFoundStore } from '../store/useLostFoundStore';
import { useNoteStore } from '../store/useNoteStore';
import { mockNotices } from '../data/notices';
import { mockStudentDeals } from '../data/deals';
import { formatRelativeTime } from '../lib/utils';
import { TicketModal } from '../components/events/TicketModal';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, currentRole, switchRole } = useAuthStore();
  const { books } = useBookStore();
  const { events } = useEventStore();
  const { internships, applications } = useInternshipStore();
  const { items: lostItems } = useLostFoundStore();
  const { notes } = useNoteStore();

  const [selectedTicketEvent, setSelectedTicketEvent] = useState<any | null>(null);

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Recent data slices
  const registeredEvents = events.filter((e) => e.isRegistered);
  const userApplications = applications.filter(
    (a) => a.userId === currentUser?.id || a.userId === 'user-student-1'
  );
  const pinnedNotice = mockNotices.find((n) => n.isPinned) || mockNotices[0];
  const upcomingEvents = events.slice(0, 3);
  const featuredInternships = internships.slice(0, 3);
  const trendingBooks = books.slice(0, 3);
  const recentLost = lostItems.slice(0, 3);
  const popularNotes = notes.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 1. GREETING & CAMPUS HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              {getGreeting()}, {currentUser?.name?.split(' ')[0] || 'Aarav'}! 👋
            </h1>
            {currentUser?.isVerified && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-primary border border-accent/40 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Verified Student
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            {currentUser?.department || 'Computer Science & Engineering'} • Semester{' '}
            {currentUser?.semester || 5} • {currentUser?.collegeName || 'Sunrise Institute of Technology'}
          </p>
        </div>

        {/* Role Quick Switcher Pills for Demo */}
        <div className="flex items-center gap-2 bg-surface p-1.5 rounded-2xl border border-border shadow-soft-sm">
          <span className="text-[10px] font-heading font-bold text-text-muted px-2 uppercase">
            Role:
          </span>
          <button
            onClick={() => switchRole('student')}
            className={`px-3 py-1 rounded-xl text-xs font-heading font-bold transition-colors ${
              currentRole === 'student'
                ? 'bg-primary text-surface'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => {
              switchRole('admin');
              navigate('/app/college-dashboard');
            }}
            className="px-3 py-1 rounded-xl text-xs font-heading font-bold text-text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            <Building className="w-3 h-3" /> Admin
          </button>
          <button
            onClick={() => {
              switchRole('recruiter');
              navigate('/app/recruiter');
            }}
            className="px-3 py-1 rounded-xl text-xs font-heading font-bold text-text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            <Briefcase className="w-3 h-3" /> Recruiter
          </button>
        </div>
      </div>

      {/* 2. PINNED OFFICIAL COLLEGE NOTICE STRIP */}
      {pinnedNotice && (
        <div className="bg-gradient-to-r from-surface to-surface-muted border-l-4 border-l-accent border-y border-r border-border p-4 rounded-2xl shadow-soft-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
              <Pin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-accent/20 text-primary">
                  Official Notice
                </span>
                <span className="text-xs text-text-muted">• {pinnedNotice.author}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-heading font-bold text-primary mt-0.5">
                {pinnedNotice.title}
              </h4>
              <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
                {pinnedNotice.content}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-text-muted shrink-0">
            {pinnedNotice.date}
          </span>
        </div>
      )}

      {/* 3. QUICK ACTION TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Link
          to="/app/books"
          className="p-3.5 rounded-2xl bg-surface border border-border hover:border-accent/50 hover:shadow-soft transition-all group flex flex-col justify-between"
        >
          <div className="w-9 h-9 rounded-xl bg-primary text-surface flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h4 className="text-xs font-heading font-bold text-primary group-hover:text-accent-hover transition-colors">
              Sell or Buy Books
            </h4>
            <span className="text-[10px] text-text-muted">{books.length} listed</span>
          </div>
        </Link>

        <Link
          to="/app/lost-found"
          className="p-3.5 rounded-2xl bg-surface border border-border hover:border-accent/50 hover:shadow-soft transition-all group flex flex-col justify-between"
        >
          <div className="w-9 h-9 rounded-xl bg-primary text-surface flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h4 className="text-xs font-heading font-bold text-primary group-hover:text-accent-hover transition-colors">
              Lost & Found
            </h4>
            <span className="text-[10px] text-text-muted">{lostItems.length} items logged</span>
          </div>
        </Link>

        <Link
          to="/app/events"
          className="p-3.5 rounded-2xl bg-surface border border-border hover:border-accent/50 hover:shadow-soft transition-all group flex flex-col justify-between"
        >
          <div className="w-9 h-9 rounded-xl bg-primary text-surface flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Calendar className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h4 className="text-xs font-heading font-bold text-primary group-hover:text-accent-hover transition-colors">
              Campus Events
            </h4>
            <span className="text-[10px] text-text-muted">{events.length} active fests</span>
          </div>
        </Link>

        <Link
          to="/app/internships"
          className="p-3.5 rounded-2xl bg-surface border border-border hover:border-accent/50 hover:shadow-soft transition-all group flex flex-col justify-between"
        >
          <div className="w-9 h-9 rounded-xl bg-primary text-surface flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Briefcase className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h4 className="text-xs font-heading font-bold text-primary group-hover:text-accent-hover transition-colors">
              Internships
            </h4>
            <span className="text-[10px] text-text-muted">{internships.length} roles hiring</span>
          </div>
        </Link>

        <Link
          to="/app/notes"
          className="p-3.5 rounded-2xl bg-surface border border-border hover:border-accent/50 hover:shadow-soft transition-all group flex flex-col justify-between col-span-2 sm:col-span-1"
        >
          <div className="w-9 h-9 rounded-xl bg-primary text-surface flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h4 className="text-xs font-heading font-bold text-primary group-hover:text-accent-hover transition-colors">
              Notes & PYQs
            </h4>
            <span className="text-[10px] text-text-muted">{notes.length} verified docs</span>
          </div>
        </Link>
      </div>

      {/* 4. MAIN TWO-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: "Today on Campus" Dynamic Live Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applications Status Tracker Widget */}
          {userApplications.length > 0 && (
            <Card className="border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent" />
                  <h3 className="font-heading font-bold text-sm text-primary">
                    Your Active Internship Applications ({userApplications.length})
                  </h3>
                </div>
                <Link to="/app/internships" className="text-xs font-heading font-semibold text-accent hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {userApplications.map((app) => {
                  const stages = ['Applied', 'Shortlisted', 'Interview', 'Offer'];
                  const currentIdx = stages.indexOf(app.status);

                  return (
                    <div
                      key={app.id}
                      className="p-3.5 rounded-2xl bg-surface-muted/60 border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-heading font-bold text-xs text-primary">
                            {app.role}
                          </h4>
                          <span className="text-[11px] text-text-muted">
                            {app.company} • Applied on {app.appliedAt}
                          </span>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/20 text-primary border border-accent/30">
                          {app.status}
                        </span>
                      </div>

                      {/* 4-Step Progress Indicator */}
                      <div className="grid grid-cols-4 gap-1.5 pt-2">
                        {stages.map((stage, idx) => {
                          const isDone = idx <= currentIdx;
                          return (
                            <div key={stage} className="text-center">
                              <div
                                className={`h-1.5 rounded-full ${
                                  isDone ? 'bg-accent' : 'bg-border'
                                }`}
                              />
                              <span
                                className={`text-[10px] font-heading mt-1 block truncate ${
                                  isDone ? 'font-bold text-primary' : 'text-text-muted'
                                }`}
                              >
                                {stage}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Today on Campus: Upcoming Events */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <h3 className="font-heading font-bold text-base text-primary">
                  Happening This Week
                </h3>
              </div>
              <Link to="/app/events" className="text-xs font-heading font-semibold text-accent hover:underline">
                See Calendar
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {upcomingEvents.map((evt) => (
                <Link
                  key={evt.id}
                  to={`/app/events/${evt.id}`}
                  className="bg-surface rounded-2xl border border-border p-4 hover:border-accent/50 hover:shadow-soft transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="accent" size="sm">
                        {evt.category}
                      </Badge>
                      <span className="text-[10px] text-text-muted">{evt.date}</span>
                    </div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-primary group-hover:text-accent-hover transition-colors line-clamp-2">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-text-muted mt-1 truncate">
                      📍 {evt.venue}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-emerald-800">
                      {evt.price === 'Free' ? 'Free RSVP' : `₹${evt.price}`}
                    </span>
                    <span className="text-accent text-xs font-bold group-hover:translate-x-0.5 transition-transform">
                      View →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Books in Marketplace */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                <h3 className="font-heading font-bold text-base text-primary">
                  Trending Used Textbooks
                </h3>
              </div>
              <Link to="/app/books" className="text-xs font-heading font-semibold text-accent hover:underline">
                Explore Marketplace
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {trendingBooks.map((b) => (
                <Link
                  key={b.id}
                  to={`/app/books/${b.id}`}
                  className="bg-surface rounded-2xl border border-border p-3.5 hover:border-accent/50 hover:shadow-soft transition-all group flex flex-col justify-between"
                >
                  <div className="flex gap-3">
                    <img
                      src={b.images[0]}
                      alt={b.title}
                      className="w-16 h-20 rounded-xl object-cover shrink-0 border border-border"
                    />
                    <div className="min-w-0">
                      <Badge variant="primary" size="sm" className="mb-1">
                        Sem {b.semester}
                      </Badge>
                      <h4 className="font-heading font-bold text-xs text-primary group-hover:text-accent-hover transition-colors line-clamp-2 leading-tight">
                        {b.title}
                      </h4>
                      <p className="text-[10px] text-text-muted truncate mt-0.5">
                        {b.author}
                      </p>
                      <p className="text-xs font-heading font-extrabold text-accent mt-1">
                        {b.price === 0 ? 'Free' : `₹${b.price}`}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sponsored Ad Banner (tasteful, hidden for premium) */}
          <SponsoredCard />

          {/* Recent Lost & Found Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-accent" />
                <h3 className="font-heading font-bold text-base text-primary">
                  Recent Lost & Found Reports
                </h3>
              </div>
              <Link to="/app/lost-found" className="text-xs font-heading font-semibold text-accent hover:underline">
                View All Items
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {recentLost.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface rounded-2xl border border-border p-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.type === 'lost'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {formatRelativeTime(item.date)}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-xs text-primary line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-text-muted line-clamp-1 mt-0.5">
                      📍 {item.location}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted">
                      {item.contactMaskedId}
                    </span>
                    <Link
                      to="/app/lost-found"
                      className="text-xs font-bold text-accent hover:underline"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className="space-y-6">
          {/* Registered Events Passes Widget */}
          <Card className="border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-accent" />
                <h3 className="font-heading font-bold text-sm text-primary">
                  Your Event Passes ({registeredEvents.length})
                </h3>
              </div>
              <Link to="/app/events" className="text-xs text-accent font-semibold hover:underline">
                All
              </Link>
            </div>

            {registeredEvents.length === 0 ? (
              <p className="text-xs text-text-muted py-2">
                You haven't registered for any events yet. Check out upcoming hackathons!
              </p>
            ) : (
              <div className="space-y-2.5">
                {registeredEvents.slice(0, 2).map((e) => (
                  <div
                    key={e.id}
                    className="p-3 rounded-2xl bg-surface-muted/60 border border-border flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-accent uppercase">
                        {e.date} • {e.time.split('-')[0]}
                      </span>
                      <h4 className="font-heading font-bold text-xs text-primary truncate">
                        {e.title}
                      </h4>
                      <p className="text-[10px] text-text-muted truncate">
                        Pass #{e.ticketId || 'TCK-SIT-01'}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() => setSelectedTicketEvent(e)}
                      className="shrink-0 text-xs px-2.5 py-1.5"
                    >
                      Pass
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Campus Sustainability Impact Widget */}
          <ImpactWidget />

          {/* High Yield Topper Notes */}
          <Card className="border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                <h3 className="font-heading font-bold text-sm text-primary">
                  Top Peer Notes
                </h3>
              </div>
              <Link to="/app/notes" className="text-xs text-accent font-semibold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {popularNotes.map((n) => (
                <div
                  key={n.id}
                  className="p-2.5 rounded-xl bg-surface-muted/60 border border-border flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <h5 className="font-heading font-bold text-xs text-primary truncate">
                      {n.title}
                    </h5>
                    <span className="text-[10px] text-text-muted">
                      {n.downloads} downloads • ★ {n.rating}
                    </span>
                  </div>
                  <Link to="/app/notes">
                    <span className="text-xs font-bold text-accent hover:underline shrink-0 ml-2">
                      Get
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Student Deals Section (Affiliate slots with disclosure) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-primary">
                Student Perks & Deals
              </h3>
              <span className="text-[10px] text-text-muted">Affiliate Link</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {mockStudentDeals.slice(0, 2).map((deal) => (
                <DealsCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ticket QR Modal */}
      {selectedTicketEvent && (
        <TicketModal
          isOpen={!!selectedTicketEvent}
          onClose={() => setSelectedTicketEvent(null)}
          event={selectedTicketEvent}
        />
      )}
    </div>
  );
};

