import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Event } from '../../types';
import { Calendar, MapPin, Download, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, event }) => {
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const handleDownload = () => {
    addToast({
      title: 'Digital Pass Saved',
      description: 'Ticket pass image saved to device downloads.',
      type: 'success',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Verified Campus Digital Pass"
      description="Present this QR badge at the venue entry turnstiles."
      maxWidth="md"
    >
      <div className="bg-gradient-to-b from-primary via-primary to-[#01241C] text-surface rounded-3xl p-6 border border-accent/30 relative overflow-hidden shadow-soft-lg">
        {/* Ticket Header */}
        <div className="flex items-center justify-between pb-4 border-b border-surface/15">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-heading font-bold text-accent tracking-wider uppercase">
              Confirmed Admission
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-surface/80">
            {event.ticketId || 'TCK-SIT-8841'}
          </span>
        </div>

        {/* Event Details */}
        <div className="py-5 space-y-3">
          <h3 className="font-heading font-extrabold text-xl text-surface leading-tight">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-xs text-surface/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent shrink-0" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>{event.venue}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs border-t border-surface/10">
            <div>
              <span className="text-[10px] text-surface/60 uppercase block">Attendee</span>
              <span className="font-heading font-bold text-surface">
                {currentUser?.name || 'Aarav Sharma'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-surface/60 uppercase block">College ID</span>
              <span className="font-mono font-bold text-accent">
                {currentUser?.studentId || '2023CS0184'}
              </span>
            </div>
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="relative my-2">
          <div className="border-t-2 border-dashed border-surface/20" />
          <div className="absolute -left-9 -top-3 w-6 h-6 rounded-full bg-surface" />
          <div className="absolute -right-9 -top-3 w-6 h-6 rounded-full bg-surface" />
        </div>

        {/* QR Code Section (Mock SVG QR) */}
        <div className="pt-4 flex flex-col items-center text-center">
          <div className="p-3 bg-white rounded-2xl shadow-soft">
            <svg viewBox="0 0 100 100" className="w-28 h-28 text-primary" fill="currentColor">
              {/* Stylized QR Code Matrix */}
              <rect x="10" y="10" width="24" height="24" rx="3" fill="#013328" />
              <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
              <rect x="18" y="18" width="8" height="8" rx="1" fill="#CC8B65" />

              <rect x="66" y="10" width="24" height="24" rx="3" fill="#013328" />
              <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
              <rect x="74" y="18" width="8" height="8" rx="1" fill="#CC8B65" />

              <rect x="10" y="66" width="24" height="24" rx="3" fill="#013328" />
              <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
              <rect x="18" y="74" width="8" height="8" rx="1" fill="#CC8B65" />

              {/* Data Blocks */}
              <rect x="40" y="12" width="6" height="6" fill="#013328" />
              <rect x="52" y="12" width="6" height="6" fill="#013328" />
              <rect x="40" y="24" width="6" height="6" fill="#CC8B65" />
              <rect x="46" y="32" width="12" height="6" fill="#013328" />
              <rect x="20" y="44" width="6" height="12" fill="#013328" />
              <rect x="36" y="44" width="18" height="6" fill="#013328" />
              <rect x="60" y="44" width="12" height="6" fill="#CC8B65" />
              <rect x="78" y="44" width="6" height="12" fill="#013328" />
              <rect x="40" y="60" width="12" height="6" fill="#013328" />
              <rect x="60" y="60" width="6" height="18" fill="#013328" />
              <rect x="72" y="68" width="14" height="6" fill="#CC8B65" />
              <rect x="44" y="76" width="8" height="8" fill="#013328" />
              <rect x="80" y="80" width="6" height="6" fill="#013328" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-surface/70 mt-2">
            Scan for Entry Access Validation
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close Pass
        </Button>
        <Button
          variant="accent"
          size="sm"
          onClick={handleDownload}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Download Pass PDF
        </Button>
      </div>
    </Modal>
  );
};

