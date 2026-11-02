import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Bell,
  CheckCheck,
  Calendar,
  Briefcase,
  MessageSquare,
  Search,
  Users,
  Building,
  ArrowRight,
} from 'lucide-react';
import { useNotificationStore } from '../store/useNotificationStore';
import { useToastStore } from '../store/useToastStore';
import { NotificationType } from '../types';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  const { addToast } = useToastStore();

  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = ['All', 'event', 'internship', 'chat', 'lost_item', 'club', 'college'];

  const filteredNotifs = notifications.filter((n) => {
    if (activeFilter !== 'All' && n.type !== activeFilter) return false;
    return true;
  });

  const todayNotifs = filteredNotifs.filter(
    (n) => n.time.includes('AM') || n.time.includes('PM') || n.time.includes('Just now')
  );
  const earlierNotifs = filteredNotifs.filter(
    (n) => !todayNotifs.some((t) => t.id === n.id)
  );

  const handleMarkAllRead = () => {
    markAllAsRead();
    addToast({
      title: 'All Caught Up! ✓',
      description: 'Marked all notifications as read.',
      type: 'success',
    });
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-4 h-4 text-accent" />;
      case 'internship':
        return <Briefcase className="w-4 h-4 text-accent" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-accent" />;
      case 'lost_item':
        return <Search className="w-4 h-4 text-accent" />;
      case 'club':
        return <Users className="w-4 h-4 text-accent" />;
      case 'college':
        return <Building className="w-4 h-4 text-accent" />;
      default:
        return <Bell className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              Campus Notifications
            </h1>
            <Badge variant="accent" size="sm">
              {notifications.filter((n) => !n.isRead).length} Unread
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Real-time feed of event reminders, application movements, and campus alerts.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllRead}
          leftIcon={<CheckCheck className="w-4 h-4" />}
          className="border-primary/20"
        >
          Mark All as Read
        </Button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold whitespace-nowrap capitalize transition-all ${
              activeFilter === f
                ? 'bg-primary text-onPrimary shadow-soft-sm'
                : 'bg-surface text-text-muted border border-border hover:bg-surface-muted'
            }`}
          >
            {f === 'lost_item' ? 'Lost & Found' : f}
          </button>
        ))}
      </div>

      {/* Today Section */}
      {todayNotifs.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-heading font-extrabold text-primary uppercase tracking-wider px-1">
            Today
          </h3>

          <div className="space-y-2.5">
            {todayNotifs.map((item) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  item.isRead
                    ? 'bg-surface border-border'
                    : 'bg-surface border-accent/40 shadow-soft-sm'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-xs sm:text-sm font-heading ${
                          item.isRead ? 'font-semibold text-primary' : 'font-extrabold text-primary'
                        }`}
                      >
                        {item.title}
                      </h4>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-text-muted block mt-1.5 font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>

                {item.link && (
                  <Link
                    to={item.link}
                    className="shrink-0 text-xs font-heading font-bold text-accent hover:underline flex items-center gap-1 mt-1"
                  >
                    <span>{item.actionLabel || 'View'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earlier Section */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-heading font-extrabold text-primary uppercase tracking-wider px-1">
          Earlier
        </h3>

        <div className="space-y-2.5">
          {earlierNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className="p-4 rounded-2xl bg-surface border border-border flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-surface-muted flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-heading font-semibold text-primary">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-text-muted block mt-1.5 font-medium">
                    {item.time}
                  </span>
                </div>
              </div>

              {item.link && (
                <Link
                  to={item.link}
                  className="shrink-0 text-xs font-heading font-bold text-primary hover:text-accent flex items-center gap-1 mt-1"
                >
                  <span>{item.actionLabel || 'Details'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

