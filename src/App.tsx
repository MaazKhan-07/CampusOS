import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { PublicLayout } from './layouts/PublicLayout';

// Lazy loaded page components for optimal bundle performance
const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const SignupPage = lazy(() =>
  import('./pages/SignupPage').then((m) => ({ default: m.SignupPage }))
);
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const BooksPage = lazy(() =>
  import('./pages/BooksPage').then((m) => ({ default: m.BooksPage }))
);
const BookDetailPage = lazy(() =>
  import('./pages/BookDetailPage').then((m) => ({ default: m.BookDetailPage }))
);
const LostFoundPage = lazy(() =>
  import('./pages/LostFoundPage').then((m) => ({ default: m.LostFoundPage }))
);
const EventsPage = lazy(() =>
  import('./pages/EventsPage').then((m) => ({ default: m.EventsPage }))
);
const EventDetailPage = lazy(() =>
  import('./pages/EventDetailPage').then((m) => ({ default: m.EventDetailPage }))
);
const InternshipsPage = lazy(() =>
  import('./pages/InternshipsPage').then((m) => ({ default: m.InternshipsPage }))
);
const InternshipDetailPage = lazy(() =>
  import('./pages/InternshipDetailPage').then((m) => ({ default: m.InternshipDetailPage }))
);
const ClubsPage = lazy(() =>
  import('./pages/ClubsPage').then((m) => ({ default: m.ClubsPage }))
);
const ClubDetailPage = lazy(() =>
  import('./pages/ClubDetailPage').then((m) => ({ default: m.ClubDetailPage }))
);
const ClubManagePage = lazy(() =>
  import('./pages/ClubManagePage').then((m) => ({ default: m.ClubManagePage }))
);
const NotesPage = lazy(() =>
  import('./pages/NotesPage').then((m) => ({ default: m.NotesPage }))
);
const ChatPage = lazy(() =>
  import('./pages/ChatPage').then((m) => ({ default: m.ChatPage }))
);
const NotificationsPage = lazy(() =>
  import('./pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage }))
);
const ProfilePage = lazy(() =>
  import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage }))
);
const PremiumPage = lazy(() =>
  import('./pages/PremiumPage').then((m) => ({ default: m.PremiumPage }))
);
const CollegeDashboardPage = lazy(() =>
  import('./pages/CollegeDashboardPage').then((m) => ({ default: m.CollegeDashboardPage }))
);
const RecruiterPage = lazy(() =>
  import('./pages/RecruiterPage').then((m) => ({ default: m.RecruiterPage }))
);
const ComingSoonPage = lazy(() =>
  import('./pages/ComingSoonPage').then((m) => ({ default: m.ComingSoonPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const PageLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-accent animate-spin" />
    <span className="text-xs font-heading font-semibold text-text-muted">Loading Campus Module...</span>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Marketing & Auth Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Authenticated Application Shell */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="books/:id" element={<BookDetailPage />} />
            <Route path="lost-found" element={<LostFoundPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<EventDetailPage />} />
            <Route path="internships" element={<InternshipsPage />} />
            <Route path="internships/:id" element={<InternshipDetailPage />} />
            <Route path="clubs" element={<ClubsPage />} />
            <Route path="clubs/:id" element={<ClubDetailPage />} />
            <Route path="clubs/manage" element={<ClubManagePage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="premium" element={<PremiumPage />} />
            <Route path="college-dashboard" element={<CollegeDashboardPage />} />
            <Route path="recruiter" element={<RecruiterPage />} />
            <Route path="coming-soon" element={<ComingSoonPage />} />
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

