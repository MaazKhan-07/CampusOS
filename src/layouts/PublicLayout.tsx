import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from '../components/common/ToastContainer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <Outlet />
      <ToastContainer />
    </div>
  );
};
