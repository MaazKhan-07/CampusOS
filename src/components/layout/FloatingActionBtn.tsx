import React, { useState } from 'react';
import { Plus, BookOpen, Search, FileText, Calendar, X } from 'lucide-react';
import { SellBookModal } from '../books/SellBookModal';
import { ReportLostFoundModal } from '../lostfound/ReportLostFoundModal';
import { UploadNoteModal } from '../notes/UploadNoteModal';
import { CreateEventModal } from '../events/CreateEventModal';

export const FloatingActionBtn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'book' | 'lost' | 'note' | 'event' | null>(null);

  const actions = [
    {
      id: 'book',
      label: 'Sell a Used Book',
      icon: BookOpen,
      color: 'bg-primary text-surface',
      onClick: () => {
        setIsOpen(false);
        setModalType('book');
      },
    },
    {
      id: 'lost',
      label: 'Report Lost or Found Item',
      icon: Search,
      color: 'bg-primary text-surface',
      onClick: () => {
        setIsOpen(false);
        setModalType('lost');
      },
    },
    {
      id: 'note',
      label: 'Upload Notes or PYQs',
      icon: FileText,
      color: 'bg-primary text-surface',
      onClick: () => {
        setIsOpen(false);
        setModalType('note');
      },
    },
    {
      id: 'event',
      label: 'Organize Campus Event',
      icon: Calendar,
      color: 'bg-primary text-surface',
      onClick: () => {
        setIsOpen(false);
        setModalType('event');
      },
    },
  ];

  return (
    <>
      <div className="fixed bottom-20 lg:bottom-8 right-6 z-40 flex flex-col items-end">
        {/* Speed Dial Menu Items */}
        {isOpen && (
          <div className="mb-3 space-y-2.5 animate-in slide-in-from-bottom-5 duration-200">
            {actions.map((act) => {
              const Icon = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={act.onClick}
                  className="flex items-center gap-3 bg-surface border border-border shadow-soft-lg px-4 py-2.5 rounded-2xl hover:bg-surface-muted transition-all group active:scale-95 text-left"
                >
                  <span className="text-xs font-heading font-bold text-primary group-hover:text-accent-hover transition-colors whitespace-nowrap">
                    {act.label}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-accent text-primary flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Quick Campus Actions"
          className={`w-13 h-13 p-3.5 rounded-2xl bg-accent text-primary font-bold shadow-copper border-2 border-surface flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
            isOpen ? 'rotate-45 bg-primary text-surface' : ''
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6 stroke-[2.5]" />}
        </button>
      </div>

      {/* Actual Action Modals */}
      <SellBookModal
        isOpen={modalType === 'book'}
        onClose={() => setModalType(null)}
      />

      <ReportLostFoundModal
        isOpen={modalType === 'lost'}
        onClose={() => setModalType(null)}
      />

      <UploadNoteModal
        isOpen={modalType === 'note'}
        onClose={() => setModalType(null)}
      />

      <CreateEventModal
        isOpen={modalType === 'event'}
        onClose={() => setModalType(null)}
      />
    </>
  );
};

