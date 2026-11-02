import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { mockColleges } from '../data/colleges';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Role } from '../types';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  const { addToast } = useToastStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('col-1');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState('1');
  const [role, setRole] = useState<Role>('student');
  const [isLoading, setIsLoading] = useState(false);

  const isVerifiedDomain =
    email.endsWith('.edu') ||
    email.endsWith('.edu.in') ||
    email.endsWith('.ac.in');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const col = mockColleges.find((c) => c.id === selectedCollege);

    setTimeout(() => {
      signup({
        name,
        email,
        role,
        collegeId: selectedCollege,
        collegeName: col?.name || 'Sunrise Institute of Technology, Mumbai',
        department,
        semester: Number(semester),
      });

      addToast({
        title: 'Account Created!',
        description: isVerifiedDomain
          ? 'College email verified! You received the Verified Student badge.'
          : 'Welcome to CampusOS!',
        type: 'success',
      });

      setIsLoading(false);
      navigate('/app');
    }, 450);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 selection:bg-accent selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo className="justify-center" />
        <h2 className="mt-6 text-2xl sm:text-3xl font-heading font-extrabold text-primary">
          Join your college network
        </h2>
        <p className="mt-2 text-xs text-text-muted">
          Connect with peers, trade books, and stay up to date
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-6 sm:px-10 border border-border rounded-3xl shadow-soft">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Full Name *"
              required
              placeholder="e.g. Aarav Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Select
              label="Select Your College *"
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              {mockColleges.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name} ({col.shortName})
                </option>
              ))}
            </Select>

            <div>
              <Input
                label="College Email Address *"
                type="email"
                required
                placeholder="e.g. yourname@sit.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email && (
                <div className="mt-1 flex items-center gap-1.5 text-xs">
                  {isVerifiedDomain ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified college domain recognized!
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium">
                      Tip: Use an <code>.ac.in</code> or <code>.edu.in</code> email to get the verified student badge.
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Computer Science & Engineering">CSE</option>
                <option value="Information Technology">IT</option>
                <option value="Electronics & Telecommunication">EXTC</option>
                <option value="Mechanical Engineering">Mech</option>
                <option value="Civil Engineering">Civil</option>
                <option value="AI & Data Science">AI & DS</option>
              </Select>

              <Select
                label="Current Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </Select>
            </div>

            <Input
              label="Password *"
              type="password"
              required
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="accent"
              size="md"
              className="w-full font-bold shadow-copper mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-text-muted">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Log in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

