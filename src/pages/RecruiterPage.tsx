import React, { useState, useMemo } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/common/Table';
import {
  Briefcase,
  Users,
  Search,
  Plus,
  Sparkles,
  Calendar,
  CheckCircle2,
  Filter,
  Download,
  Building,
} from 'lucide-react';
import { useInternshipStore } from '../store/useInternshipStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { mockUsers } from '../data/users';
import { ApplicationStatus, InternshipType } from '../types';

export const RecruiterPage: React.FC = () => {
  const { internships, applications, updateApplicationStatus, postJob } = useInternshipStore();
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<'applicants' | 'post-job' | 'talent' | 'drives'>('applicants');

  // Post Job Form State
  const [role, setRole] = useState('');
  const [company, setCompany] = useState(currentUser?.name || 'Zepto Labs');
  const [type, setType] = useState<InternshipType>('Internship');
  const [stipend, setStipend] = useState('₹45,000 / month');
  const [location, setLocation] = useState('Mumbai / Hybrid');
  const [deadline, setDeadline] = useState('2026-12-15');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, Tailwind CSS');
  const [isFeatured, setIsFeatured] = useState(true);
  const [description, setDescription] = useState('');

  // Talent Search State
  const [talentSearch, setTalentSearch] = useState('');
  const [talentSkillFilter, setTalentSkillFilter] = useState('All');

  const verifiedStudents = useMemo(() => {
    return mockUsers.filter((u) => u.role === 'student').filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(talentSearch.toLowerCase()) ||
        (u.department && u.department.toLowerCase().includes(talentSearch.toLowerCase())) ||
        (u.skills && u.skills.some((s) => s.toLowerCase().includes(talentSearch.toLowerCase())));

      const matchesSkill =
        talentSkillFilter === 'All' ||
        (u.skills && u.skills.some((s) => s.toLowerCase() === talentSkillFilter.toLowerCase()));

      return matchesSearch && matchesSkill;
    });
  }, [talentSearch, talentSkillFilter]);

  const handleStatusChange = (appId: string, applicantName: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(appId, newStatus);
    addToast({
      title: 'Status Updated',
      description: `${applicantName} has been transitioned to "${newStatus}".`,
      type: 'info',
    });
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) return;

    postJob({
      role,
      company,
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
      type,
      stipend,
      location,
      isRemote: location.toLowerCase().includes('remote'),
      deadline,
      skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      isFeatured,
      description: description || 'Exciting engineering internship role for passionate college students.',
      requirements: ['Strong engineering fundamentals', 'Hands-on project experience in web or mobile'],
      perks: ['PPO Conversion opportunity', 'Mentorship and flexible hours'],
    });

    addToast({
      title: 'Listing Published! 🚀',
      description: `"${role}" is now live on the student opportunities board.`,
      type: 'success',
    });

    setRole('');
    setDescription('');
    setActiveTab('applicants');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              Recruiter & University Talent Portal
            </h1>
            <Badge variant="accent" size="sm">
              Sunrise Institute of Technology
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Screen verified engineering candidates, manage pipeline stages, and schedule on-campus drives.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => setActiveTab('post-job')}
          leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
          className="shadow-copper font-bold"
        >
          Post New Role
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-surface p-1.5 rounded-2xl border border-border shadow-soft-sm overflow-x-auto scrollbar-none">
        {[
          { id: 'applicants', label: `Applicant Tracking Pipeline (${applications.length})`, icon: Briefcase },
          { id: 'talent', label: `Talent Search (${verifiedStudents.length})`, icon: Users },
          { id: 'post-job', label: 'Post Job Listing', icon: Plus },
          { id: 'drives', label: 'Campus Hiring Drives', icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-surface shadow-soft-sm'
                  : 'text-text-muted hover:text-primary hover:bg-surface-muted'
              }`}
            >
              <Icon className="w-4 h-4 text-accent" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: APPLICANT TRACKING TABLE */}
      {activeTab === 'applicants' && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-base text-primary">
                Candidate Pipeline & ATS Status
              </h3>
              <p className="text-xs text-text-muted">
                Move students between Applied, Shortlisted, Interview, and Offer.
              </p>
            </div>
            <span className="text-xs font-bold text-accent">
              {applications.length} Candidates Screened
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role Applied</TableHead>
                <TableHead>Verified College</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Stage Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div>
                      <strong className="text-primary font-heading block">{app.applicantName}</strong>
                      <span className="text-[11px] text-text-muted">{app.applicantEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <strong className="text-xs text-primary block">{app.role}</strong>
                      <span className="text-[11px] text-text-muted">{app.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-text-muted">{app.applicantCollege}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-mono text-accent underline cursor-pointer">
                      {app.resumeName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, app.applicantName, e.target.value as ApplicationStatus)
                      }
                      className="py-1 text-xs w-36 font-semibold"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer Extended</option>
                      <option value="Rejected">Rejected</option>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* TAB 2: TALENT SEARCH */}
      {activeTab === 'talent' && (
        <Card className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates by name, department, or skill (e.g. React, C++, ROS2)..."
                value={talentSearch}
                onChange={(e) => setTalentSearch(e.target.value)}
                className="w-full bg-surface-muted text-text placeholder:text-text-muted text-xs pl-9 pr-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-primary"
              />
            </div>

            <Select
              value={talentSkillFilter}
              onChange={(e) => setTalentSkillFilter(e.target.value)}
              className="py-2 text-xs w-full sm:w-48"
            >
              <option value="All">All Skillsets</option>
              <option value="React">React / Frontend</option>
              <option value="Python">Python / ML</option>
              <option value="C++">C++ / Algorithms</option>
              <option value="Go">Go / Systems</option>
              <option value="Figma">UI/UX Figma</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {verifiedStudents.map((student) => (
              <div
                key={student.id}
                className="p-4 rounded-2xl bg-surface-muted/50 border border-border flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-primary flex items-center gap-1">
                      {student.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    </h4>
                    <p className="text-[11px] text-text-muted truncate">
                      {student.department} • Sem {student.semester}
                    </p>
                    <span className="text-[10px] font-mono text-text-muted">
                      ID: {student.studentId || '2023ENG01'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {(student.skills || []).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-surface border border-border font-medium text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Verified Candidate
                  </span>
                  <button
                    onClick={() =>
                      addToast({
                        title: 'Interview Invitation Dispatched',
                        description: `Invitation sent to ${student.name} (${student.email}).`,
                        type: 'success',
                      })
                    }
                    className="text-xs font-heading font-bold text-accent hover:underline"
                  >
                    Invite to Apply →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: POST JOB FORM */}
      {activeTab === 'post-job' && (
        <Card className="max-w-2xl mx-auto p-6 sm:p-8 space-y-5">
          <div className="pb-3 border-b border-border">
            <h3 className="font-heading font-extrabold text-lg text-primary">
              Post an Internship or Graduate Role
            </h3>
            <p className="text-xs text-text-muted">
              Published directly to verified students at Sunrise Institute of Technology.
            </p>
          </div>

          <form onSubmit={handlePostJob} className="space-y-4">
            <Input
              label="Role Title *"
              required
              placeholder="e.g. SDE Intern - Backend (Go)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Hiring Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <Select
                label="Opportunity Type"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="Internship">Summer / Winter Internship</option>
                <option value="Part-time">Part-Time Student Role</option>
                <option value="Campus Ambassador">Campus Ambassador</option>
                <option value="Training">Training / Fellowship</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Monthly Stipend (₹) *"
                required
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
              />
              <Input
                label="Work Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <Input
              label="Target Skills (Comma-separated) *"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
            />

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-primary uppercase font-heading">
                Job Overview & Responsibilities
              </label>
              <textarea
                rows={4}
                placeholder="What will the intern work on? Mention mentorship, stacks, and eligibility..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface text-text placeholder:text-text-muted/60 border border-border rounded-xl p-3 text-xs"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-heading font-semibold text-primary cursor-pointer p-3 rounded-xl bg-accent/15 border border-accent/30">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-border text-accent focus:ring-accent"
              />
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Feature with Copper Badge (Top of Board Placement)</span>
              </div>
            </label>

            <div className="pt-2">
              <Button type="submit" variant="accent" size="md" className="w-full font-bold shadow-copper">
                Publish Opportunity Listing
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 4: CAMPUS HIRING DRIVES */}
      {activeTab === 'drives' && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-base text-primary">
                On-Campus Placement & Pool Drives
              </h3>
              <p className="text-xs text-text-muted">
                Coordinate with the Training & Placement Cell for auditorium tests and interview suites.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { company: 'Zepto', date: 'Nov 12, 2026', venue: 'Computer Labs 301-304', roles: 'Frontend & Backend Interns', status: 'Confirmed' },
              { company: 'Razorpay', date: 'Nov 20, 2026', venue: 'Main Auditorium', roles: 'Fullstack & Platform Engineers', status: 'Confirmed' },
              { company: 'CRED', date: 'Dec 02, 2026', venue: 'Design Studio Lab', roles: 'UI/UX & Product Design Fellows', status: 'Under Review' },
            ].map((drive, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-surface-muted/60 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-heading font-bold text-sm text-primary">{drive.company} On-Campus Drive</h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    Date: {drive.date} • Venue: {drive.venue} • Roles: {drive.roles}
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/20 text-primary border border-accent/40">
                  {drive.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

