import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Avatar } from '../components/common/Avatar';
import {
  User as UserIcon,
  CheckCircle2,
  Building,
  RotateCcw,
  Sparkles,
  Ticket,
  Briefcase,
  BookOpen,
  Edit2,
  Save,
  GraduationCap,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useBookStore } from '../store/useBookStore';
import { useEventStore } from '../store/useEventStore';
import { useInternshipStore } from '../store/useInternshipStore';
import { useToastStore } from '../store/useToastStore';

export const ProfilePage: React.FC = () => {
  const { currentUser, currentRole, switchRole, updateProfile, resetDemoData } = useAuthStore();
  const { books } = useBookStore();
  const { events } = useEventStore();
  const { applications } = useInternshipStore();
  const { addToast } = useToastStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [skillsText, setSkillsText] = useState((currentUser?.skills || []).join(', '));

  const registeredEvents = events.filter((e) => e.isRegistered);
  const myBooks = books.filter((b) => b.sellerId === currentUser?.id || b.sellerName === currentUser?.name);
  const myApplications = applications.filter(
    (a) => a.userId === currentUser?.id || a.userId === 'user-student-1'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      bio,
      department,
      skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setIsEditing(false);
    addToast({
      title: 'Profile Updated',
      description: 'Your changes have been saved to your campus identity.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <Card className="p-6 sm:p-8 space-y-6 border-border shadow-soft-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              src={currentUser?.avatar}
              name={currentUser?.name || 'Aarav Sharma'}
              size="xl"
              isVerified={currentUser?.isVerified}
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-primary">
                  {currentUser?.name}
                </h1>
                {currentUser?.isVerified && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-primary border border-accent/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    Verified Campus Student
                  </span>
                )}
              </div>

              <p className="text-xs text-text-muted mt-0.5">
                {currentUser?.email} • Student ID: <span className="font-mono font-bold">{currentUser?.studentId || '2023CS0184'}</span>
              </p>

              <p className="text-xs text-text-muted mt-1">
                {currentUser?.department} • Semester {currentUser?.semester || 5} • {currentUser?.collegeName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isEditing ? (
              <Button
                variant="accent"
                size="sm"
                onClick={handleSave}
                leftIcon={<Save className="w-3.5 h-3.5" />}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                leftIcon={<Edit2 className="w-3.5 h-3.5" />}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Bio */}
        {isEditing ? (
          <div className="space-y-3 pt-3 border-t border-border">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Department / Specialization"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-primary uppercase font-heading">
                Bio
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-surface text-text border border-border rounded-xl p-3 text-xs"
              />
            </div>
            <Input
              label="Skills (Comma-separated)"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
            />
          </div>
        ) : (
          <div className="pt-3 border-t border-border space-y-3">
            <p className="text-xs text-text-muted leading-relaxed">
              {currentUser?.bio || 'Undergrad passionate about campus open source and systems engineering.'}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {(currentUser?.skills || ['React', 'TypeScript', 'Node.js', 'Python']).map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-0.5 rounded-lg text-xs bg-surface-muted text-primary border border-border font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-text-muted uppercase font-heading font-bold">
              Registered Events
            </span>
            <p className="text-xl font-heading font-extrabold text-primary">
              {registeredEvents.length} Passes Issued
            </p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-surface flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-accent" />
          </div>
          <div>
            <span className="text-[10px] text-text-muted uppercase font-heading font-bold">
              Applications
            </span>
            <p className="text-xl font-heading font-extrabold text-primary">
              {myApplications.length} In Review
            </p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-text-muted uppercase font-heading font-bold">
              Books Listed
            </span>
            <p className="text-xl font-heading font-extrabold text-primary">
              {myBooks.length} Active Listings
            </p>
          </div>
        </Card>
      </div>

      {/* System Demo Settings & Reset Data Button */}
      <Card className="p-6 border-amber-200 bg-amber-50/40 space-y-3">
        <div className="flex items-center gap-2 text-amber-900">
          <RotateCcw className="w-5 h-5" />
          <h3 className="font-heading font-bold text-sm">Demo Data & Role Control</h3>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          CampusOS stores your simulated posts, book listings, event RSVPs, and chat messages in your browser's <code>localStorage</code>. Click below anytime to reset demo data back to the clean baseline.
        </p>
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (window.confirm('Reset all demo state and reload initial data?')) {
                resetDemoData();
              }
            }}
            className="border-amber-400 text-amber-900 hover:bg-amber-100"
          >
            Reset Demo State (Factory Reset)
          </Button>
        </div>
      </Card>
    </div>
  );
};

