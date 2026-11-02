import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { useInternshipStore } from '../store/useInternshipStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNotificationStore } from '../store/useNotificationStore';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  Bookmark,
  Share2,
  ShieldCheck,
  Building,
} from 'lucide-react';

export const InternshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { internships, applications, applyToInternship, savedInternships, toggleSave } =
    useInternshipStore();
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();
  const { addNotification } = useNotificationStore();

  const internship = internships.find((i) => i.id === id);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [resumeName, setResumeName] = useState('Aarav_Sharma_Resume_2026.pdf');
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!internship) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-heading font-bold text-primary">Opportunity Not Found</h2>
        <Link to="/app/internships">
          <Button variant="accent">Back to Internships</Button>
        </Link>
      </div>
    );
  }

  const isSaved = savedInternships.includes(internship.id);
  const existingApp = applications.find(
    (a) =>
      a.internshipId === internship.id &&
      (a.userId === currentUser?.id || a.userId === 'user-student-1')
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      applyToInternship({
        internshipId: internship.id,
        userId: currentUser?.id || 'user-student-1',
        applicantName: currentUser?.name || 'Aarav Sharma',
        applicantEmail: currentUser?.email || 'aarav.sharma@sit.edu.in',
        applicantCollege: currentUser?.collegeName || 'Sunrise Institute of Technology',
        applicantSkills: currentUser?.skills || internship.skills,
        resumeName,
        coverNote,
        company: internship.company,
        role: internship.role,
      });

      addToast({
        title: 'Application Submitted! 🚀',
        description: `Your profile was dispatched to ${internship.company} talent team.`,
        type: 'success',
      });

      addNotification({
        type: 'internship',
        title: `Application Confirmed: ${internship.company}`,
        message: `Applied for ${internship.role}. Live tracking available on Home dashboard.`,
        link: '/app',
        actionLabel: 'View Tracker',
      });

      setIsSubmitting(false);
      setIsApplyModalOpen(false);
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Link
          to="/app/internships"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </Link>
      </div>

      {/* Hero Header Card */}
      <Card className="p-6 sm:p-8 space-y-6 border-border shadow-soft-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-muted border border-border flex items-center justify-center font-heading font-extrabold text-2xl text-primary overflow-hidden shrink-0">
              {internship.logo ? (
                <img
                  src={internship.logo}
                  alt={internship.company}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{internship.company.slice(0, 2).toUpperCase()}</span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-heading font-bold text-text-muted">
                  {internship.company}
                </span>
                {internship.isFeatured && (
                  <Badge variant="accent" size="sm">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-primary leading-tight mt-0.5">
                {internship.role}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleSave(internship.id)}
              className={`p-3 rounded-2xl border transition-colors ${
                isSaved
                  ? 'text-accent bg-accent/20 border-accent'
                  : 'text-text-muted hover:text-primary bg-surface border-border'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Save'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {existingApp ? (
              <span className="px-5 py-3 rounded-2xl bg-accent/20 text-primary font-heading font-bold text-sm border border-accent/40 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Status: {existingApp.status}
              </span>
            ) : (
              <Button
                variant="accent"
                size="lg"
                onClick={() => setIsApplyModalOpen(true)}
                className="font-bold shadow-copper flex-1 sm:flex-none"
              >
                1-Click Quick Apply
              </Button>
            )}
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border">
          <div className="p-3 bg-surface-muted/60 rounded-xl">
            <span className="text-[10px] text-text-muted uppercase block font-heading">Stipend</span>
            <strong className="text-sm font-heading font-extrabold text-accent">
              {internship.stipend}
            </strong>
          </div>

          <div className="p-3 bg-surface-muted/60 rounded-xl">
            <span className="text-[10px] text-text-muted uppercase block font-heading">Location</span>
            <strong className="text-sm font-heading font-bold text-primary">
              {internship.location}
            </strong>
          </div>

          <div className="p-3 bg-surface-muted/60 rounded-xl">
            <span className="text-[10px] text-text-muted uppercase block font-heading">Category</span>
            <strong className="text-sm font-heading font-bold text-primary">
              {internship.type}
            </strong>
          </div>

          <div className="p-3 bg-surface-muted/60 rounded-xl">
            <span className="text-[10px] text-text-muted uppercase block font-heading">Application Due</span>
            <strong className="text-sm font-heading font-bold text-primary">
              {internship.deadline}
            </strong>
          </div>
        </div>
      </Card>

      {/* Main Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Role Description */}
          <Card className="space-y-3">
            <h3 className="font-heading font-bold text-base text-primary">Role Overview</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
              {internship.description}
            </p>
          </Card>

          {/* Key Requirements */}
          <Card className="space-y-3">
            <h3 className="font-heading font-bold text-base text-primary">Requirements & Eligibility</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-text-muted">
              {internship.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Perks & Benefits */}
          <Card className="space-y-3">
            <h3 className="font-heading font-bold text-base text-primary">Perks & Growth Track</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-text-muted">
              {internship.perks.map((perk, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-primary uppercase tracking-wider">
              Required Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-surface-muted text-primary border border-border"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-border space-y-2 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verified recruiter partnership</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                <span>{internship.applicantsCount} applicants from SIT</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 1-Click Apply Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply to ${internship.company}`}
        description={`Submitting application for ${internship.role}.`}
        maxWidth="md"
      >
        <form onSubmit={handleApply} className="space-y-4 pt-2">
          <div className="p-3.5 rounded-2xl bg-surface-muted border border-border">
            <span className="text-[10px] text-text-muted uppercase font-heading font-bold">
              Applicant Profile
            </span>
            <p className="text-xs font-heading font-bold text-primary mt-0.5">
              {currentUser?.name || 'Aarav Sharma'} ({currentUser?.studentId || '2023CS0184'})
            </p>
            <p className="text-[11px] text-text-muted">{currentUser?.email || 'aarav.sharma@sit.edu.in'}</p>
          </div>

          <Select
            label="Select Verified Campus Resume"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
          >
            <option value="Aarav_Sharma_Resume_2026.pdf">
              Aarav_Sharma_Resume_2026.pdf (Updated Oct 2026)
            </option>
            <option value="Aarav_Sharma_Frontend_Specialist.pdf">
              Aarav_Sharma_Frontend_Specialist.pdf
            </option>
            <option value="Generate_from_CampusOS_Resume_Builder.pdf">
              [Live ATS PDF] CampusOS Generated Resume
            </option>
          </Select>

          <div className="space-y-1 text-left">
            <label className="block text-xs font-semibold text-primary uppercase font-heading">
              Quick Pitch / Cover Note (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Why are you a good fit for this role? Mention your projects or open source..."
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              className="w-full bg-surface text-text placeholder:text-text-muted/60 border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => setIsApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" isLoading={isSubmitting} className="font-bold">
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

