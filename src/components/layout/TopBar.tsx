import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  UserCheck,
  Building,
  Briefcase,
  GraduationCap,
  RotateCcw,
  Sparkles,
  LogOut,
  X,
  BookOpen,
  Calendar,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useBookStore } from '../../store/useBookStore';
import { useEventStore } from '../../store/useEventStore';
import { useInternshipStore } from '../../store/useInternshipStore';
import { useNoteStore } from '../../store/useNoteStore';
import { Role } from '../../types';

interface TopBarProps {
  onToggleMobileNav?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleMobileNav }) => {
  const navigate = useNavigate();
  const { currentUser, currentRole, switchRole, logout, resetDemoData } = useAuthStore();
  const { notifications } = useNotificationStore();
  const { books } = useBookStore();
  const { events } = useEventStore();
  const { internships } = useInternshipStore();
  const { notes } = useNoteStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global search filtering
  const filteredBooks = searchQuery.trim()
    ? books.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.department.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredEvents = searchQuery.trim()
    ? events.filter((e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredInternships = searchQuery.trim()
    ? internships.filter((i) =>
        i.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.company.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredNotes = searchQuery.trim()
    ? notes.filter((n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.subject.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const totalResults =
    filteredBooks.length +
    filteredEvents.length +
    filteredInternships.length +
    filteredNotes.length;

  return (
    <header className="h-16 bg-surface/90 backdrop-blur-md border-b border-border sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4 select-none">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden p-2 rounded-xl text-primary hover:bg-surface-muted transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar with Live Results Dropdown */}
        <div ref={searchRef} className="relative w-full">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search books, notes, events, internships..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full bg-surface-muted/70 text-text placeholder:text-text-muted/70 text-xs sm:text-sm pl-9 pr-8 py-2 rounded-xl border border-border/70 focus:outline-none focus:border-primary focus:bg-surface focus:ring-2 focus:ring-accent/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 text-text-muted hover:text-primary"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border shadow-soft-lg rounded-2xl p-3 max-h-[80vh] overflow-y-auto z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-heading font-bold text-text-muted px-2 py-1 uppercase tracking-wider">
                Search Results ({totalResults})
              </div>

              {totalResults === 0 ? (
                <div className="p-4 text-center text-xs text-text-muted">
                  No matches found for "{searchQuery}".
                </div>
              ) : (
                <div className="space-y-3 mt-1">
                  {/* Books */}
                  {filteredBooks.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Used Books
                      </div>
                      {filteredBooks.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => {
                            navigate(`/app/books/${b.id}`);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-muted cursor-pointer transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-heading font-bold text-primary truncate">
                              {b.title}
                            </p>
                            <p className="text-[11px] text-text-muted truncate">
                              {b.author} • {b.department}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-primary shrink-0 ml-2">
                            {b.price === 0 ? 'Free' : `₹${b.price}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Events */}
                  {filteredEvents.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Events
                      </div>
                      {filteredEvents.map((e) => (
                        <div
                          key={e.id}
                          onClick={() => {
                            navigate(`/app/events/${e.id}`);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-muted cursor-pointer transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-heading font-bold text-primary truncate">
                              {e.title}
                            </p>
                            <p className="text-[11px] text-text-muted truncate">
                              {e.category} • {e.venue}
                            </p>
                          </div>
                          <Badge size="sm" variant="accent">
                            {e.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Internships */}
                  {filteredInternships.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" /> Internships
                      </div>
                      {filteredInternships.map((i) => (
                        <div
                          key={i.id}
                          onClick={() => {
                            navigate(`/app/internships/${i.id}`);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-muted cursor-pointer transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-heading font-bold text-primary truncate">
                              {i.role}
                            </p>
                            <p className="text-[11px] text-text-muted truncate">
                              {i.company} • {i.stipend}
                            </p>
                          </div>
                          <span className="text-[11px] font-bold text-accent shrink-0 ml-2">
                            {i.stipend}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {filteredNotes.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Notes & Papers
                      </div>
                      {filteredNotes.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            navigate(`/app/notes`);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-muted cursor-pointer transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-heading font-bold text-primary truncate">
                              {n.title}
                            </p>
                            <p className="text-[11px] text-text-muted truncate">
                              {n.subject} • Sem {n.semester}
                            </p>
                          </div>
                          <Badge size="sm" variant="surface">
                            {n.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Notifications & Profile with Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Premium Upgrade Pill (if not premium) */}
        {!currentUser?.isPremium && (
          <Link
            to="/app/premium"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/20 border border-accent/40 text-primary text-xs font-heading font-bold hover:bg-accent hover:text-white transition-all shadow-copper"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Go Premium</span>
          </Link>
        )}

        {/* Notifications Icon with Unread Counter */}
        <Link
          to="/app/notifications"
          className="relative p-2 rounded-xl text-primary hover:bg-surface-muted transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-primary text-[10px] font-extrabold flex items-center justify-center border-2 border-surface">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Menu & Role Switcher */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-surface-muted transition-colors border border-transparent hover:border-border"
          >
            <Avatar
              src={currentUser?.avatar}
              name={currentUser?.name || 'User'}
              size="sm"
              isVerified={currentUser?.isVerified}
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-heading font-bold text-primary truncate max-w-[120px] leading-tight">
                {currentUser?.name}
              </span>
              <span className="text-[10px] text-text-muted truncate max-w-[120px]">
                {currentRole === 'student'
                  ? 'Student'
                  : currentRole === 'admin'
                  ? 'Dean / Admin'
                  : 'Recruiter'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted ml-0.5" />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-surface border border-border shadow-soft-lg rounded-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* User Bio Header */}
              <div className="p-3 border-b border-border/80">
                <div className="flex items-center gap-2.5">
                  <Avatar
                    src={currentUser?.avatar}
                    name={currentUser?.name || 'User'}
                    size="md"
                    isVerified={currentUser?.isVerified}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-heading font-bold text-primary truncate flex items-center gap-1">
                      {currentUser?.name}
                      {currentUser?.isVerified && (
                        <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 inline" />
                      )}
                    </p>
                    <p className="text-xs text-text-muted truncate">{currentUser?.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent/20 text-primary border border-accent/30 uppercase tracking-wider">
                      {currentRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Demo Role Switcher ("Demo as...") */}
              <div className="p-2 border-b border-border/80">
                <p className="text-[10px] font-heading font-bold text-text-muted px-2 py-1 uppercase tracking-wider">
                  Demo as role:
                </p>
                <div className="space-y-1 mt-1">
                  <button
                    onClick={() => {
                      switchRole('student');
                      setIsProfileOpen(false);
                      navigate('/app');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-semibold transition-colors ${
                      currentRole === 'student'
                        ? 'bg-primary text-onPrimary'
                        : 'text-text hover:bg-surface-muted'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-accent" />
                      1. Student (Aarav Sharma)
                    </span>
                    {currentRole === 'student' && <UserCheck className="w-3.5 h-3.5 text-accent" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      setIsProfileOpen(false);
                      navigate('/app/college-dashboard');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-semibold transition-colors ${
                      currentRole === 'admin'
                        ? 'bg-primary text-onPrimary'
                        : 'text-text hover:bg-surface-muted'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-accent" />
                      2. College Admin (Dean Sen)
                    </span>
                    {currentRole === 'admin' && <UserCheck className="w-3.5 h-3.5 text-accent" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('recruiter');
                      setIsProfileOpen(false);
                      navigate('/app/recruiter');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-semibold transition-colors ${
                      currentRole === 'recruiter'
                        ? 'bg-primary text-onPrimary'
                        : 'text-text hover:bg-surface-muted'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-accent" />
                      3. Recruiter (Vikram Mehta)
                    </span>
                    {currentRole === 'recruiter' && <UserCheck className="w-3.5 h-3.5 text-accent" />}
                  </button>
                </div>
              </div>

              {/* Profile & Settings Navigation */}
              <div className="p-1 space-y-0.5">
                <Link
                  to="/app/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-semibold text-text hover:bg-surface-muted transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-text-muted" />
                  <span>My Profile & Settings</span>
                </Link>

                <Link
                  to="/app/premium"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-semibold text-accent hover:bg-accent/10 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Premium Plans & Resume</span>
                </Link>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo data back to default initial state?')) {
                      resetDemoData();
                    }
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-semibold text-amber-700 hover:bg-amber-50 transition-colors text-left"
                >
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Reset Demo Data</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-semibold text-rose-700 hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

