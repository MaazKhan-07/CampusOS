import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { CreateEventModal } from '../components/events/CreateEventModal';
import { TicketModal } from '../components/events/TicketModal';
import {
  Calendar as CalendarIcon,
  Plus,
  MapPin,
  Clock,
  Ticket,
  Bell,
  BellOff,
  LayoutGrid,
  CalendarDays,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { useEventStore } from '../store/useEventStore';
import { useToastStore } from '../store/useToastStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { EventCategory } from '../types';

export const EventsPage: React.FC = () => {
  const { events, registerForEvent, toggleReminder } = useEventStore();
  const { addToast } = useToastStore();
  const { addNotification } = useNotificationStore();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [ticketModalEvent, setTicketModalEvent] = useState<any | null>(null);

  const categories = ['All', 'Workshops', 'Hackathons', 'Cultural', 'Sports', 'Seminars'];

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (activeCategory !== 'All' && e.category !== activeCategory) return false;
      return true;
    });
  }, [events, activeCategory]);

  const handleRegister = (eventId: string, title: string) => {
    const res = registerForEvent(eventId);
    if (res.success) {
      addToast({
        title: 'Registration Confirmed! 🎟️',
        description: `Pass issued for "${title}". Pass ID: ${res.ticketId}`,
        type: 'success',
      });

      addNotification({
        type: 'event',
        title: `Ticket Issued: ${title}`,
        message: `Your seat is confirmed with digital ticket ${res.ticketId}.`,
        link: `/app/events/${eventId}`,
        actionLabel: 'View Pass',
      });

      const updated = events.find((e) => e.id === eventId);
      if (updated) {
        setTicketModalEvent({ ...updated, isRegistered: true, ticketId: res.ticketId });
      }
    }
  };

  const handleReminder = (eventId: string, title: string, currentState?: boolean) => {
    toggleReminder(eventId);
    if (!currentState) {
      addToast({
        title: 'Reminder Scheduled 🔔',
        description: `We will notify you 2 hours before "${title}" kicks off.`,
        type: 'info',
      });
      addNotification({
        type: 'event',
        title: `Reminder Active: ${title}`,
        message: 'You will receive an alert before the session begins.',
        link: `/app/events/${eventId}`,
      });
    } else {
      addToast({
        title: 'Reminder Removed',
        description: `Alert removed for "${title}".`,
        type: 'info',
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
              Campus Events & Fests
            </h1>
            <Badge variant="accent" size="sm">
              {events.length} Upcoming
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Discover workshops, sports championships, hackathons, and cultural nights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle between Card Grid & Month Calendar View */}
          <div className="flex items-center p-1 bg-surface rounded-xl border border-border shadow-soft-sm">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-colors flex items-center gap-1.5 ${
                viewMode === 'cards'
                  ? 'bg-primary text-surface'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-colors flex items-center gap-1.5 ${
                viewMode === 'calendar'
                  ? 'bg-primary text-surface'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
            className="shadow-copper font-bold"
          >
            Post Event
          </Button>
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-heading font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-primary text-onPrimary shadow-soft-sm'
                : 'bg-surface text-text-muted border border-border hover:bg-surface-muted hover:text-primary'
            }`}
          >
            {cat}
            {cat === 'All' ? ` (${events.length})` : ` (${events.filter((e) => e.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* View Modes */}
      {viewMode === 'calendar' ? (
        /* Interactive Month Calendar View */
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" />
              <span>November 2026 Campus Schedule</span>
            </h3>
            <span className="text-xs text-text-muted font-medium">
              Click any event dot to view full details
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-heading font-bold text-text-muted mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const dayString = `2026-11-${day < 10 ? '0' + day : day}`;
              const daysEvents = events.filter((e) => e.date.endsWith(day < 10 ? '0' + day : '' + day));

              return (
                <div
                  key={day}
                  className="min-h-24 p-2 bg-surface-muted/40 rounded-2xl border border-border flex flex-col justify-between text-left group hover:border-accent transition-colors"
                >
                  <span className="font-heading font-bold text-xs text-primary">{day}</span>
                  <div className="space-y-1 mt-1 flex-1">
                    {daysEvents.map((e) => (
                      <Link
                        key={e.id}
                        to={`/app/events/${e.id}`}
                        className="block text-[10px] p-1 rounded-md bg-accent/20 hover:bg-accent text-primary hover:text-white truncate font-medium transition-colors"
                        title={e.title}
                      >
                        {e.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        /* Event Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const seatsLeft = Math.max(0, event.totalSeats - event.registeredCount);
            const isFull = seatsLeft === 0;

            return (
              <Card
                key={event.id}
                hover
                padded={false}
                className="flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Banner Image */}
                  <div className="relative h-44 bg-surface-muted overflow-hidden">
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category pill */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <Badge variant="accent" size="sm">
                        {event.category}
                      </Badge>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/90 text-surface backdrop-blur-sm">
                        {event.price === 'Free' ? 'FREE' : `₹${event.price}`}
                      </span>
                    </div>

                    {/* Remind Me Bell Button */}
                    <button
                      onClick={() => handleReminder(event.id, event.title, event.isReminderSet)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors shadow-soft-sm ${
                        event.isReminderSet
                          ? 'bg-accent text-primary'
                          : 'bg-surface/80 text-text-muted hover:text-primary'
                      }`}
                      title={event.isReminderSet ? 'Reminder is set' : 'Remind me'}
                    >
                      {event.isReminderSet ? (
                        <Bell className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Bell className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <CalendarIcon className="w-3.5 h-3.5 text-accent" />
                      <span className="font-semibold text-primary">{event.date}</span>
                      <span>• {event.time.split('-')[0]}</span>
                    </div>

                    <Link to={`/app/events/${event.id}`}>
                      <h3 className="font-heading font-extrabold text-base text-primary group-hover:text-accent-hover transition-colors line-clamp-2 leading-snug">
                        {event.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="pt-1 text-xs text-text-muted flex items-center justify-between border-t border-border/70">
                      <span className="flex items-center gap-1 truncate max-w-[160px]">
                        <MapPin className="w-3 h-3 text-accent shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-text-muted flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Housefull'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-surface-muted/50 border-t border-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={event.clubLogo}
                      alt={event.clubName}
                      className="w-5 h-5 rounded-full object-cover shrink-0"
                    />
                    <span className="text-[11px] font-semibold text-primary truncate">
                      {event.clubName}
                    </span>
                  </div>

                  {event.isRegistered ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setTicketModalEvent(event)}
                      leftIcon={<Ticket className="w-3.5 h-3.5 text-accent" />}
                      className="text-xs font-bold"
                    >
                      View Ticket
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="accent"
                      disabled={isFull}
                      onClick={() => handleRegister(event.id, event.title)}
                      className="text-xs font-bold shadow-copper"
                    >
                      {isFull ? 'Sold Out' : 'Register'}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Ticket Modal */}
      {ticketModalEvent && (
        <TicketModal
          isOpen={!!ticketModalEvent}
          onClose={() => setTicketModalEvent(null)}
          event={ticketModalEvent}
        />
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

