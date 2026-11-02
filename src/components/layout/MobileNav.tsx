import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Briefcase,
  MoreHorizontal,
  X,
  Search,
  Users,
  FileText,
  MessageSquare,
  Sparkles,
  Compass,
  User,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useChatStore } from '../../store/useChatStore';

export const MobileNav: React.FC = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { conversations } = useChatStore();
  const unreadChats = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const mainTabs = [
    { label: 'Home', path: '/app', icon: LayoutDashboard },
    { label: 'Books', path: '/app/books', icon: BookOpen },
    { label: 'Events', path: '/app/events', icon: Calendar },
    { label: 'Internships', path: '/app/internships', icon: Briefcase },
  ];

  const moreItems = [
    { label: 'Lost & Found', path: '/app/lost-found', icon: Search },
    { label: 'Clubs & Societies', path: '/app/clubs', icon: Users },
    { label: 'Notes & PYQs', path: '/app/notes', icon: FileText },
    { label: 'Messages', path: '/app/chat', icon: MessageSquare, badge: unreadChats > 0 ? unreadChats : undefined },
    { label: 'Roadmap & Future', path: '/app/coming-soon', icon: Compass },
    { label: 'Student Premium', path: '/app/premium', icon: Sparkles },
    { label: 'My Profile', path: '/app/profile', icon: User },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border px-2 py-1.5 flex items-center justify-around select-none shadow-soft-lg">
        {mainTabs.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150',
                  isActive ? 'text-primary font-bold' : 'text-text-muted hover:text-primary'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      'p-1 rounded-xl transition-colors',
                      isActive ? 'bg-primary text-surface' : 'text-text-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-heading mt-0.5">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* More Trigger Button */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className={cn(
            'flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all',
            isMoreOpen ? 'text-primary font-bold' : 'text-text-muted hover:text-primary'
          )}
        >
          <div className="p-1 rounded-xl text-text-muted">
            <MoreHorizontal className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-heading mt-0.5">More</span>
        </button>
      </nav>

      {/* "More" Drawer Slide-Over */}
      {isMoreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm"
            onClick={() => setIsMoreOpen(false)}
          />

          <div className="relative bg-surface border-t border-border rounded-t-3xl p-5 shadow-soft-lg max-h-[75vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-border/80">
              <span className="text-sm font-heading font-bold text-primary">All Campus Modules</span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-full text-text-muted hover:text-primary hover:bg-surface-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 py-4">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMoreOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 p-3 rounded-2xl border transition-all',
                        isActive
                          ? 'bg-primary text-surface border-primary'
                          : 'bg-surface-muted/60 text-primary border-border hover:bg-surface-muted'
                      )
                    }
                  >
                    <Icon className="w-4 h-4 text-accent" />
                    <span className="text-xs font-heading font-semibold truncate flex-1">
                      {item.label}
                    </span>
                    {item.badge !== undefined && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-accent text-primary">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

