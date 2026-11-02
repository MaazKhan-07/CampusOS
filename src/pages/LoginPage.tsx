import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Badge } from '../components/common/Badge';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { mockColleges } from '../data/colleges';
import { GraduationCap, Building, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import { Role } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuthStore();
  const { addToast } = useToastStore();

  const [email, setEmail] = useState('aarav.sharma@sit.edu.in');
  const [password, setPassword] = useState('password123');
  const [selectedCollege, setSelectedCollege] = useState('col-1');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(email, selectedCollege);
      addToast({
        title: 'Welcome back!',
        description: `Successfully authenticated for ${email}.`,
        type: 'success',
      });
      setIsLoading(false);
      navigate('/app');
    }, 400);
  };

  const handleQuickDemo = (role: Role) => {
    switchRole(role);
    addToast({
      title: `Demo Session Activated: ${role.toUpperCase()}`,
      description: 'Switched role and logged into campus instance.',
      type: 'info',
    });
    if (role === 'admin') {
      navigate('/app/college-dashboard');
    } else if (role === 'recruiter') {
      navigate('/app/recruiter');
    } else {
      navigate('/app');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 selection:bg-accent selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo className="justify-center" />
        <h2 className="mt-6 text-2xl sm:text-3xl font-heading font-extrabold text-primary">
          Sign in to your campus node
        </h2>
        <p className="mt-2 text-xs text-text-muted">
          Access your textbooks, events, notes, and notifications
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-6 sm:px-10 border border-border rounded-3xl shadow-soft">
          {/* Quick Demo Role Buttons */}
          <div className="mb-6 pb-5 border-b border-border/80">
            <span className="text-[10px] font-heading font-bold text-text-muted uppercase tracking-wider block mb-2 text-center">
              One-Click Instant Demo Login:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="p-2 rounded-xl bg-surface-muted hover:bg-accent/20 border border-border text-center transition-colors group"
              >
                <GraduationCap className="w-4 h-4 mx-auto text-primary group-hover:text-accent mb-1" />
                <span className="text-[11px] font-heading font-bold text-primary block">Student</span>
                <span className="text-[9px] text-text-muted block">Aarav (CSE)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="p-2 rounded-xl bg-surface-muted hover:bg-accent/20 border border-border text-center transition-colors group"
              >
                <Building className="w-4 h-4 mx-auto text-primary group-hover:text-accent mb-1" />
                <span className="text-[11px] font-heading font-bold text-primary block">Admin</span>
                <span className="text-[9px] text-text-muted block">Dean Sen</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('recruiter')}
                className="p-2 rounded-xl bg-surface-muted hover:bg-accent/20 border border-border text-center transition-colors group"
              >
                <Briefcase className="w-4 h-4 mx-auto text-primary group-hover:text-accent mb-1" />
                <span className="text-[11px] font-heading font-bold text-primary block">Recruiter</span>
                <span className="text-[9px] text-text-muted block">Vikram M.</span>
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Select
              label="Select Your College / University"
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              {mockColleges.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name} ({col.shortName})
                </option>
              ))}
            </Select>

            <Input
              label="College Email ID"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@sit.edu.in"
              helperText="College domain (.edu, .ac.in) gives instant verified badge"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-text-muted">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <span>Remember campus session</span>
              </label>
              <a href="#forgot" className="font-semibold text-accent hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="accent"
              size="md"
              className="w-full font-bold shadow-copper mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to CampusOS
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-text-muted">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-bold text-primary hover:underline">
              Sign up with college email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

