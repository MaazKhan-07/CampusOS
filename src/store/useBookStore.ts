import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book } from '../types';
import { mockBooks } from '../data/books';

interface BookState {
  books: Book[];
  wishlist: string[];
  addBook: (book: Omit<Book, 'id' | 'createdAt' | 'isAvailable'>) => void;
  toggleWishlist: (bookId: string) => void;
  markAsSold: (bookId: string) => void;
  deleteBook: (bookId: string) => void;
  resetBooks: () => void;
}

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: mockBooks,
      wishlist: ['book-1', 'book-4'],

      addBook: (newBookData) => {
        const newBook: Book = {
          ...newBookData,
          id: 'book-' + Date.now(),
          createdAt: new Date().toISOString(),
          isAvailable: true,
        };
        set((state) => ({
          books: [newBook, ...state.books],
        }));
      },

      toggleWishlist: (bookId: string) => {
        set((state) => ({
          wishlist: state.wishlist.includes(bookId)
            ? state.wishlist.filter((id) => id !== bookId)
            : [...state.wishlist, bookId],
        }));
      },

      markAsSold: (bookId: string) => {
        set((state) => ({
          books: state.books.map((b) =>
            b.id === bookId ? { ...b, isAvailable: !b.isAvailable } : b
          ),
        }));
      },

      deleteBook: (bookId: string) => {
        set((state) => ({
          books: state.books.filter((b) => b.id !== bookId),
        }));
      },

      resetBooks: () => {
        set({ books: mockBooks, wishlist: ['book-1', 'book-4'] });
      },
    }),
    {
      name: 'campus-os-books',
    }
  )
);

