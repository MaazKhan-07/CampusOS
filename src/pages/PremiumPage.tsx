import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { fireConfetti } from '../lib/confetti';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Printer,
  Download,
  CreditCard,
  Zap,
  ShieldCheck,
  FileText,
  Star,
  Award,
} from 'lucide-react';

export const PremiumPage: React.FC = () => {
  const { currentUser, upgradeToPremium } = useAuthStore();
  const { addToast } = useToastStore();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Resume Builder Live State
  const [resumeName, setResumeName] = useState(currentUser?.name || 'Aarav Sharma');
  const [resumeRole, setResumeRole] = useState('Full Stack & Systems Undergrad');
  const [resumeEmail, setResumeEmail] = useState(currentUser?.email || 'aarav.sharma@sit.edu.in');
  const [resumePhone, setResumePhone] = useState('+91 98201 44829');
  const [resumeCollege, setResumeCollege] = useState(currentUser?.collegeName || 'Sunrise Institute of Technology, Mumbai');
  const [resumeDegree, setResumeDegree] = useState('B.Tech in Computer Science & Engineering (2023 - 2027)');
  const [resumeCgpa, setResumeCgpa] = useState('CGPA: 9.24 / 10.0');
  const [resumeSkills, setResumeSkills] = useState('React, TypeScript, Next.js, Node.js, Go, PostgreSQL, Redis, Docker, Git');
  const [resumeProject1, setResumeProject1] = useState('CampusOS: Built fullstack peer university platform with real-time state and masked privacy chat.');
  const [resumeProject2, setResumeProject2] = useState('Distributed Key-Value Store: Raft consensus algorithm implementation in Go with gRPC.');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpgrading(true);

    setTimeout(() => {
      upgradeToPremium();
      fireConfetti();
      addToast({
        title: 'Welcome to CampusOS Premium! 🌟',
        description: 'Unlimited note uploads, priority job tags, and ad-free experience unlocked.',
        type: 'success',
      });
      setIsUpgrading(false);
      setIsCheckoutModalOpen(false);
    }, 600);
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-primary text-xs font-heading font-bold shadow-soft-sm">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>CampusOS Premium for Students</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary tracking-tight">
          Supercharge your university edge
        </h1>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          Unlock unlimited cloud notes, skip the recruiter screening queue with priority applications, and build clean ATS resumes in minutes.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="pt-3 flex items-center justify-center gap-3">
          <div className="p-1 bg-surface rounded-2xl border border-border shadow-soft-sm inline-flex items-center gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-heading font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-surface shadow-soft-sm'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              Monthly (₹99/mo)
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-surface shadow-soft-sm'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              <span>Annual (₹199/yr)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-accent text-primary font-extrabold">
                Save 83%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plan Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className="p-6 sm:p-7 flex flex-col justify-between border-border bg-surface">
          <div>
            <span className="text-xs font-heading font-bold text-text-muted uppercase tracking-wider">
              Student Basic
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-heading font-extrabold text-primary">₹0</span>
              <span className="text-xs text-text-muted">/ forever</span>
            </div>
            <p className="text-xs text-text-muted mt-2">
              All essential peer utilities to trade books and find events.
            </p>

            <div className="mt-6 space-y-3 text-xs text-text-muted border-t border-border pt-4">
              <div className="flex items-center gap-2">✓ Browse all used books & events</div>
              <div className="flex items-center gap-2">✓ Report & claim lost belongings</div>
              <div className="flex items-center gap-2">✓ In-app masked buyer-seller chat</div>
              <div className="flex items-center gap-2 text-text-muted/60">
                • 5 note uploads max (Free storage limit)
              </div>
              <div className="flex items-center gap-2 text-text-muted/60">
                • Standard recruiter application screening
              </div>
              <div className="flex items-center gap-2 text-text-muted/60">
                • Sponsored cards visible in feed
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button variant="outline" size="md" disabled className="w-full">
              Current Base Plan
            </Button>
          </div>
        </Card>

        {/* Premium Plan (Featured) */}
        <Card dark className="p-6 sm:p-7 flex flex-col justify-between border-accent shadow-soft-lg relative">
          <div className="absolute top-4 right-4">
            <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-accent text-primary shadow-copper">
              Recommended
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-bold text-accent uppercase tracking-wider">
                CampusOS Premium
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-heading font-extrabold text-surface">
                {billingCycle === 'monthly' ? '₹99' : '₹199'}
              </span>
              <span className="text-xs text-surface/70">
                {billingCycle === 'monthly' ? '/ month' : '/ year billed once'}
              </span>
            </div>
            <p className="text-xs text-surface/80 mt-2">
              Fast-track your internships, eliminate study limits, and unlock pro tools.
            </p>

            <div className="mt-6 space-y-3 text-xs text-surface/90 border-t border-surface/15 pt-4">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Unlimited study notes & solution uploads</span>
              </div>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Priority Internship applicant flag for recruiters</span>
              </div>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Ad-Free campus experience (zero sponsors)</span>
              </div>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Interactive ATS Resume Builder & PDF export</span>
              </div>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Cloud note bookmarks & offline sync</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            {currentUser?.isPremium ? (
              <Button variant="secondary" size="md" disabled className="w-full font-bold">
                ✓ Premium Already Active
              </Button>
            ) : (
              <Button
                variant="accent"
                size="md"
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full font-bold shadow-copper"
              >
                Upgrade to Premium
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* SECTION: INTERACTIVE RESUME BUILDER TEASER */}
      <div className="pt-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-heading font-extrabold text-primary">
              Interactive ATS Resume Builder
            </h2>
            <p className="text-xs text-text-muted">
              Live edit below to generate an ATS-compliant, single-page engineering resume.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintResume}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print / Save as PDF
          </Button>
        </div>

        {/* Two-Pane Builder: Editor on Left, Live Render on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume Form Inputs */}
          <Card className="p-5 space-y-3.5 bg-surface border-border">
            <h4 className="font-heading font-bold text-xs text-primary uppercase tracking-wider">
              Resume Content Editor
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Full Name"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
              />
              <Input
                label="Target Title"
                value={resumeRole}
                onChange={(e) => setResumeRole(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Email"
                value={resumeEmail}
                onChange={(e) => setResumeEmail(e.target.value)}
              />
              <Input
                label="Phone"
                value={resumePhone}
                onChange={(e) => setResumePhone(e.target.value)}
              />
            </div>

            <Input
              label="College & Degree"
              value={resumeCollege}
              onChange={(e) => setResumeCollege(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Course & Batch"
                value={resumeDegree}
                onChange={(e) => setResumeDegree(e.target.value)}
              />
              <Input
                label="Academic CGPA"
                value={resumeCgpa}
                onChange={(e) => setResumeCgpa(e.target.value)}
              />
            </div>

            <Input
              label="Key Skills"
              value={resumeSkills}
              onChange={(e) => setResumeSkills(e.target.value)}
            />

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-primary uppercase font-heading">
                Project 1 Highlight
              </label>
              <textarea
                rows={2}
                value={resumeProject1}
                onChange={(e) => setResumeProject1(e.target.value)}
                className="w-full bg-surface text-text border border-border rounded-xl p-2.5 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-primary uppercase font-heading">
                Project 2 Highlight
              </label>
              <textarea
                rows={2}
                value={resumeProject2}
                onChange={(e) => setResumeProject2(e.target.value)}
                className="w-full bg-surface text-text border border-border rounded-xl p-2.5 text-xs"
              />
            </div>
          </Card>

          {/* Live Printable Preview Sheet */}
          <div className="p-6 bg-white rounded-3xl border border-border shadow-soft-lg text-black font-sans space-y-4 print:p-0 print:border-none print:shadow-none">
            {/* Resume Header */}
            <div className="text-center border-b pb-3 border-gray-300">
              <h2 className="text-xl font-bold font-heading tracking-tight text-gray-900">
                {resumeName}
              </h2>
              <p className="text-xs font-medium text-gray-700">{resumeRole}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {resumeEmail} • {resumePhone} • Mumbai, India
              </p>
            </div>

            {/* Education */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-0.5">
                Education
              </h3>
              <div className="flex justify-between text-xs">
                <div>
                  <strong className="text-gray-900">{resumeCollege}</strong>
                  <p className="text-gray-600 text-[11px]">{resumeDegree}</p>
                </div>
                <span className="font-semibold text-gray-800 text-[11px]">{resumeCgpa}</span>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-0.5">
                Technical Skills
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">{resumeSkills}</p>
            </div>

            {/* Selected Projects */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-0.5">
                Technical Projects
              </h3>
              <div className="text-xs text-gray-700 space-y-1.5">
                <p>• {resumeProject1}</p>
                <p>• {resumeProject2}</p>
              </div>
            </div>

            {/* Honors & Accolades */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-0.5">
                Achievements & Campus Leadership
              </h3>
              <div className="text-xs text-gray-700 space-y-1">
                <p>• 1st Place - SIT Hackathon 2026 (Winner out of 60 finalist teams).</p>
                <p>• Active Core Lead at SIT Coding Club, mentoring 120+ first-year students.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Checkout Modal */}
      <Modal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        title="Activate CampusOS Premium"
        description="Demo payment simulation. No real credit card charges are made."
        maxWidth="md"
      >
        <form onSubmit={handleCheckout} className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl bg-primary text-surface flex items-center justify-between">
            <div>
              <span className="text-[10px] text-accent uppercase font-bold block">Selected Plan</span>
              <h4 className="font-heading font-extrabold text-base text-surface">
                {billingCycle === 'monthly' ? 'Student Premium Monthly' : 'Student Premium Annual'}
              </h4>
            </div>
            <span className="text-2xl font-heading font-extrabold text-accent">
              {billingCycle === 'monthly' ? '₹99' : '₹199'}
            </span>
          </div>

          <Input
            label="Card Number (Mock)"
            defaultValue="4111 2222 3333 4444"
            disabled
          />

          <div className="grid grid-cols-2 gap-3">
            <Input label="Expiry Date" defaultValue="12/28" disabled />
            <Input label="CVV" defaultValue="884" disabled />
          </div>

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Simulated instant checkout for peer review demo.</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => setIsCheckoutModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              isLoading={isUpgrading}
              className="font-bold shadow-copper"
            >
              Confirm Mock Upgrade ({billingCycle === 'monthly' ? '₹99' : '₹199'})
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

