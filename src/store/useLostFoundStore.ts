import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LostFoundItem } from '../types';
import { mockLostFound } from '../data/lostFound';

interface LostFoundState {
  items: LostFoundItem[];
  reportItem: (item: Omit<LostFoundItem, 'id' | 'status' | 'date'>) => void;
  claimItem: (itemId: string) => void;
  deleteItem: (itemId: string) => void;
  resetLostFound: () => void;
}

export const useLostFoundStore = create<LostFoundState>()(
  persist(
    (set) => ({
      items: mockLostFound,

      reportItem: (newItemData) => {
        const newItem: LostFoundItem = {
          ...newItemData,
          id: 'lf-' + Date.now(),
          status: 'open',
          date: new Date().toISOString(),
        };
        set((state) => ({
          items: [newItem, ...state.items],
        }));
      },

      claimItem: (itemId: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, status: 'claimed' as const, claimedAt: new Date().toISOString() }
              : item
          ),
        }));
      },

      deleteItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      resetLostFound: () => {
        set({ items: mockLostFound });
      },
    }),
    {
      name: 'campus-os-lost-found',
    }
  )
);

