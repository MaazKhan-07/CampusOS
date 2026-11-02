import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../common/Logo';
import {
  LayoutDashboard,
  BookOpen,
  Search,
  Calendar,
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Building2,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useChatStore } from '../../store/useChatStore';
import { cn } from '../../lib/utils';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, onNavigate }) => {
  const { currentRole, currentUser } = useAuthStore();
  const { conversations } = useChatStore();
  const { notifications } = useNotificationStore();

  const unreadChats = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const studentNavItems = [
    { label: 'Home Feed', path: '/app', icon: LayoutDashboard },
    { label: 'Used Books', path: '/app/books', icon: BookOpen },
    { label: 'Lost & Found', path: '/app/lost-found', icon: Search },
    { label: 'Campus Events', path: '/app/events', icon: Calendar },
    { label: 'Internships', path: '/app/internships', icon: Briefcase },
    { label: 'Clubs & Societies', path: '/app/clubs', icon: Users },
    { label: 'Notes & PYQs', path: '/app/notes', icon: FileText },
    { label: 'Messages', path: '/app/chat', icon: MessageSquare, badge: unreadChats > 0 ? unreadChats : undefined },
    { label: 'Future Features', path: '/app/coming-soon', icon: Compass },
    { label: 'Student Premium', path: '/app/premium', icon: Sparkles, highlight: true },
  ];

  const adminNavItems = [
    { label: 'Admin Overview', path: '/app/college-dashboard', icon: LayoutDashboard },
    { label: 'Student Feed', path: '/app', icon: GraduationCap },
    { label: 'Events & Approvals', path: '/app/events', icon: Calendar },
    { label: 'Club Administration', path: '/app/clubs/manage', icon: Users },
    { label: 'Used Books Market', path: '/app/books', icon: BookOpen },
    { label: 'Notes Repository', path: '/app/notes', icon: FileText },
    { label: 'Messages', path: '/app/chat', icon: MessageSquare },
    { label: 'Future Features', path: '/app/coming-soon', icon: Compass },
  ];

  const recruiterNavItems = [
    { label: 'Recruiter Hub', path: '/app/recruiter', icon: Briefcase },
    { label: 'Explore Campus', path: '/app', icon: LayoutDashboard },
    { label: 'Campus Events', path: '/app/events', icon: Calendar },
    { label: 'Student Talent', path: '/app/clubs', icon: Users },
    { label: 'Messages', path: '/app/chat', icon: MessageSquare },
    { label: 'Future Features', path: '/app/coming-soon', icon: Compass },
  ];

  let navItems = studentNavItems;
  if (currentRole === 'admin') navItems = adminNavItems;
  if (currentRole === 'recruiter') navItems = recruiterNavItems;

  return (
    <aside
      className={cn(
        'w-64 bg-primary text-surface flex flex-col justify-between border-r border-accent/20 shrink-0 select-none h-screen sticky top-0',
        className
      )}
    >
      <div>
        {/* Logo Branding */}
        <div className="h-16 flex items-center px-6 border-b border-surface/10">
          <Logo light />
        </div>

        {/* Current Active College Badge */}
        <div className="px-5 py-3 mx-3 my-2.5 rounded-xl bg-surface/5 border border-surface/10">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-accent shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-heading font-bold text-surface truncate">
                {currentUser?.collegeName || 'Sunrise Institute of Tech'}
              </p>
              <p className="text-[10px] text-surface/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Verified Campus Node
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold transition-all duration-150',
                    isActive
                      ? 'bg-surface-dark text-onPrimary font-bold shadow-soft-sm'
                      : 'text-surface/75 hover:text-surface hover:bg-surface/5',
                    item.highlight && !isActive && 'text-accent hover:text-accent font-bold'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Copper Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-accent" />
                    )}

                    <Icon
                      className={cn(
                        'w-4 h-4 transition-colors',
                        isActive
                          ? 'text-accent'
                          : item.highlight
                          ? 'text-accent'
                          : 'text-surface/60 group-hover:text-surface'
                      )}
                    />

                    <span className="flex-1 truncate">{item.label}</span>

                    {item.badge !== undefined && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-accent text-primary">
                        {item.badge}
                      </span>
                    )}

                    {item.highlight && !isActive && (
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md font-bold bg-accent/20 text-accent border border-accent/30">
                        Pro
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Role Indicator & Plan Status */}
      <div className="p-4 border-t border-surface/10 space-y-3">
        <div className="px-3 py-2.5 rounded-xl bg-surface-dark border border-accent/20 flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-surface/60 block">
              Active Role
            </span>
            <span className="text-xs font-heading font-bold text-accent capitalize truncate block">
              {currentRole === 'student'
                ? 'Student View'
                : currentRole === 'admin'
                ? 'College Admin'
                : 'Recruiter'}
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-primary">
            Live
          </span>
        </div>
      </div>
    </aside>
  );
};

