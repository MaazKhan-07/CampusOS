import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationItem } from '../types';
import { mockNotifications } from '../data/notifications';
import { useToastStore } from './useToastStore';

interface NotificationState {
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'time' | 'isRead'>) => void;
  resetNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: mockNotifications,

      markAsRead: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        }));
      },

      addNotification: (itemData) => {
        const newNotif: NotificationItem = {
          ...itemData,
          id: 'notif-' + Date.now(),
          time: 'Just now',
          isRead: false,
        };

        set((state) => ({
          notifications: [newNotif, ...state.notifications],
        }));

        // Fire interactive toast
        useToastStore.getState().addToast({
          title: itemData.title,
          description: itemData.message,
          type: 'info',
        });
      },

      resetNotifications: () => {
        set({ notifications: mockNotifications });
      },
    }),
    {
      name: 'campus-os-notifications',
    }
  )
);

