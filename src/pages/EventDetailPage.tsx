import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { TicketModal } from '../components/events/TicketModal';
import { useEventStore } from '../store/useEventStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNotificationStore } from '../store/useNotificationStore';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Bell,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, registerForEvent, toggleReminder } = useEventStore();
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();
  const { addNotification } = useNotificationStore();

  const event = events.find((e) => e.id === id);

  // Registration Form State
  const [attendeeName, setAttendeeName] = useState(currentUser?.name || '');
  const [attendeeEmail, setAttendeeEmail] = useState(currentUser?.email || '');
  const [rollNumber, setRollNumber] = useState(currentUser?.studentId || '2023CS0184');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  if (!event) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-heading font-bold text-primary">Event Not Found</h2>
        <Link to="/app/events">
          <Button variant="accent">Back to Events</Button>
        </Link>
      </div>
    );
  }

  const seatsLeft = Math.max(0, event.totalSeats - event.registeredCount);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    setTimeout(() => {
      const res = registerForEvent(event.id);
      setIsRegistering(false);

      if (res.success) {
        addToast({
          title: 'Ticket Issued! 🎟️',
          description: `You are registered for "${event.title}".`,
          type: 'success',
        });

        addNotification({
          type: 'event',
          title: `Admission Pass: ${event.title}`,
          message: `Digital pass ${res.ticketId} ready for download.`,
          link: `/app/events/${event.id}`,
        });

        setIsTicketOpen(true);
      }
    }, 400);
  };

  const handleToggleReminder = () => {
    toggleReminder(event.id);
    if (!event.isReminderSet) {
      addToast({
        title: 'Reminder Set',
        description: `Notification scheduled for ${event.title}.`,
        type: 'info',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Link
          to="/app/events"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden border border-border shadow-soft-lg">
        <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-surface">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="accent" size="sm">
              {event.category}
            </Badge>
            <span className="text-xs font-mono font-bold bg-surface/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
              {event.price === 'Free' ? 'Free Admission' : `Entry: ₹${event.price}`}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-surface leading-tight">
            {event.title}
          </h1>
          <p className="text-xs sm:text-sm text-surface/80 mt-1 flex items-center gap-2">
            Organized by <strong className="text-accent">{event.clubName}</strong>
          </p>
        </div>
      </div>

      {/* Main Grid: Details & Registration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Schedule, Description, Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Quick Info Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-surface border border-border text-center">
              <Calendar className="w-5 h-5 mx-auto text-accent mb-1" />
              <span className="text-[10px] text-text-muted uppercase block">Date</span>
              <strong className="text-xs font-heading text-primary">{event.date}</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface border border-border text-center">
              <Clock className="w-5 h-5 mx-auto text-accent mb-1" />
              <span className="text-[10px] text-text-muted uppercase block">Time</span>
              <strong className="text-xs font-heading text-primary truncate block">
                {event.time.split('-')[0]}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface border border-border text-center">
              <MapPin className="w-5 h-5 mx-auto text-accent mb-1" />
              <span className="text-[10px] text-text-muted uppercase block">Venue</span>
              <strong className="text-xs font-heading text-primary truncate block">
                {event.venue}
              </strong>
            </div>
          </div>

          {/* Description */}
          <Card className="space-y-3">
            <h3 className="font-heading font-bold text-base text-primary">About the Event</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </Card>

          {/* Schedule Breakdown */}
          {event.schedule && event.schedule.length > 0 && (
            <Card className="space-y-4">
              <h3 className="font-heading font-bold text-base text-primary">Event Schedule</h3>
              <div className="relative border-l-2 border-accent/40 ml-3 space-y-4 py-1">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-accent border-2 border-surface" />
                    <span className="text-[11px] font-mono font-bold text-accent uppercase block">
                      {item.time}
                    </span>
                    <h5 className="font-heading font-bold text-xs text-primary mt-0.5">
                      {item.activity}
                    </h5>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Col: Registration Card / Pass */}
        <div className="space-y-6">
          <Card className="border-border space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <span className="text-[10px] uppercase font-bold text-text-muted">Status</span>
                <p className="font-heading font-extrabold text-lg text-primary">
                  {seatsLeft > 0 ? `${seatsLeft} Seats Left` : 'Sold Out'}
                </p>
              </div>
              <button
                onClick={handleToggleReminder}
                className={`p-2.5 rounded-2xl border transition-colors ${
                  event.isReminderSet
                    ? 'bg-accent text-primary border-accent'
                    : 'bg-surface-muted text-text-muted hover:text-primary border-border'
                }`}
                title="Toggle Reminder"
              >
                <Bell className="w-4 h-4 fill-current" />
              </button>
            </div>

            {event.isRegistered ? (
              <div className="space-y-4 text-center py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-base text-primary">
                    You Are Registered!
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    Ticket Pass ID: <span className="font-mono font-bold">{event.ticketId || 'TCK-SIT-01'}</span>
                  </p>
                </div>
                <Button
                  variant="accent"
                  size="md"
                  onClick={() => setIsTicketOpen(true)}
                  leftIcon={<Ticket className="w-4 h-4" />}
                  className="w-full font-bold shadow-copper"
                >
                  View Digital QR Pass
                </Button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <h4 className="font-heading font-bold text-xs text-primary uppercase tracking-wider">
                  Quick Seat Registration
                </h4>

                <Input
                  label="Full Name *"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                />

                <Input
                  label="College Email *"
                  type="email"
                  required
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                />

                <Input
                  label="Student Roll No / ID *"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="accent"
                  size="md"
                  disabled={seatsLeft === 0}
                  isLoading={isRegistering}
                  className="w-full font-bold shadow-copper mt-2"
                >
                  {seatsLeft === 0 ? 'Registration Closed' : 'Confirm Free Seat'}
                </Button>

                <p className="text-[10px] text-text-muted text-center leading-relaxed">
                  Instant QR ticket will be issued to your student profile upon confirmation.
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>

      {/* Ticket Modal */}
      {isTicketOpen && (
        <TicketModal
          isOpen={isTicketOpen}
          onClose={() => setIsTicketOpen(false)}
          event={event}
        />
      )}
    </div>
  );
};

