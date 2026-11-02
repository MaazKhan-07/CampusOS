import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note } from '../types';
import { mockNotes } from '../data/notes';

interface NoteState {
  notes: Note[];
  userUploadedCount: number;
  uploadNote: (note: Omit<Note, 'id' | 'downloads' | 'rating' | 'ratingCount' | 'uploadedAt' | 'verifiedBadge'>) => boolean;
  downloadNote: (noteId: string) => void;
  rateNote: (noteId: string, rating: number) => void;
  resetNotes: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set, get) => ({
      notes: mockNotes,
      userUploadedCount: 3, // Mock "3 of 5 notes slots used" for free tier

      uploadNote: (noteData) => {
        const newNote: Note = {
          ...noteData,
          id: 'note-' + Date.now(),
          downloads: 1,
          rating: 5.0,
          ratingCount: 1,
          uploadedAt: new Date().toISOString().split('T')[0],
          verifiedBadge: true,
        };
        set((state) => ({
          notes: [newNote, ...state.notes],
          userUploadedCount: state.userUploadedCount + 1,
        }));
        return true;
      },

      downloadNote: (noteId: string) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === noteId ? { ...n, downloads: n.downloads + 1 } : n
          ),
        }));
      },

      rateNote: (noteId: string, rating: number) => {
        set((state) => ({
          notes: state.notes.map((n) => {
            if (n.id === noteId) {
              const newCount = n.ratingCount + 1;
              const newRating = +(
                (n.rating * n.ratingCount + rating) /
                newCount
              ).toFixed(1);
              return { ...n, rating: newRating, ratingCount: newCount };
            }
            return n;
          }),
        }));
      },

      resetNotes: () => {
        set({ notes: mockNotes, userUploadedCount: 3 });
      },
    }),
    {
      name: 'campus-os-notes',
    }
  )
);

