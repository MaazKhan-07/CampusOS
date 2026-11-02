import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center p-6 selection:bg-accent selection:text-white">
      <Logo className="mb-6" />
      <div className="w-16 h-16 rounded-3xl bg-accent/20 text-accent flex items-center justify-center mb-4">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-primary">404</h1>
      <h2 className="text-lg font-heading font-bold text-primary mt-2">
        Campus Page Not Found
      </h2>
      <p className="text-xs text-text-muted max-w-sm mt-1 leading-relaxed">
        The classroom, document, or listing you were looking for seems to have moved or does not exist.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link to="/app">
          <Button variant="accent" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home Feed
          </Button>
        </Link>
      </div>
    </div>
  );
};

