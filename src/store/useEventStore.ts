import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Event } from '../types';
import { mockEvents } from '../data/events';

interface EventState {
  events: Event[];
  registerForEvent: (eventId: string) => { success: boolean; ticketId?: string };
  toggleReminder: (eventId: string) => void;
  approveEvent: (eventId: string) => void;
  createEvent: (eventData: Omit<Event, 'id' | 'registeredCount' | 'isRegistered' | 'isApproved'>) => void;
  resetEvents: () => void;
}

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: mockEvents,

      registerForEvent: (eventId: string) => {
        let ticketId = '';
        set((state) => ({
          events: state.events.map((e) => {
            if (e.id === eventId) {
              ticketId = 'TCK-' + Math.random().toString(36).substring(2, 7).toUpperCase();
              return {
                ...e,
                isRegistered: true,
                registeredCount: e.registeredCount + 1,
                ticketId,
              };
            }
            return e;
          }),
        }));
        return { success: true, ticketId };
      },

      toggleReminder: (eventId: string) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId ? { ...e, isReminderSet: !e.isReminderSet } : e
          ),
        }));
      },

      approveEvent: (eventId: string) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId ? { ...e, isApproved: true } : e
          ),
        }));
      },

      createEvent: (eventData) => {
        const newEvent: Event = {
          ...eventData,
          id: 'evt-' + Date.now(),
          registeredCount: 0,
          isRegistered: false,
          isApproved: false, // Default requires admin review
        };
        set((state) => ({
          events: [newEvent, ...state.events],
        }));
      },

      resetEvents: () => {
        set({ events: mockEvents });
      },
    }),
    {
      name: 'campus-os-events',
    }
  )
);

