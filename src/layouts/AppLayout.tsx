import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { MobileNav } from '../components/layout/MobileNav';
import { FloatingActionBtn } from '../components/layout/FloatingActionBtn';
import { ToastContainer } from '../components/common/ToastContainer';
import { useNotificationStore } from '../store/useNotificationStore';

export const AppLayout: React.FC = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { addNotification } = useNotificationStore();

  // Simulated live campus notifications arriving periodically (~45s) as per specification
  useEffect(() => {
    const simulatedAlerts = [
      {
        type: 'event' as const,
        title: 'New Event Alert: GDSC Flutter Workshop',
        message: 'Google Developer Student Clubs just posted a hands-on Flutter workshop for this Saturday.',
        link: '/app/events',
        actionLabel: 'View Event',
      },
      {
        type: 'lost_item' as const,
        title: 'New Found Item Reported in Library',
        message: 'Someone deposited a set of Honda bike keys at the circulation desk.',
        link: '/app/lost-found',
        actionLabel: 'Check Post',
      },
      {
        type: 'internship' as const,
        title: 'Fresh Internship: Razorpay Frontend SDE',
        message: 'Razorpay opened 2 new positions for Mumbai & Bengaluru campuses.',
        link: '/app/internships',
        actionLabel: 'Apply Now',
      },
      {
        type: 'club' as const,
        title: 'Coding Club SIT Announcement',
        message: 'Weekly Leetcode sprint starts today at 5 PM on Discord.',
        link: '/app/clubs',
        actionLabel: 'Join Discord',
      },
    ];

    let alertIndex = 0;
    const interval = setInterval(() => {
      const alert = simulatedAlerts[alertIndex % simulatedAlerts.length];
      addNotification(alert);
      alertIndex++;
    }, 45000); // 45s interval

    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <div className="min-h-screen bg-bg text-text flex">
      {/* Desktop Persistent Left Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Drawer (Slide-Over) */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <Sidebar
            className="relative z-10 w-72 shadow-2xl animate-in slide-in-from-left duration-200"
            onNavigate={() => setIsMobileDrawerOpen(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar onToggleMobileNav={() => setIsMobileDrawerOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          <Outlet />
        </main>

        {/* Floating Quick Action Button */}
        <FloatingActionBtn />

        {/* Mobile Bottom Navigation Bar */}
        <MobileNav />

        {/* Global Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

