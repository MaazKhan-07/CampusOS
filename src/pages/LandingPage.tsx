import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import {
  BookOpen,
  Search,
  Calendar,
  Briefcase,
  Users,
  FileText,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Building,
  GraduationCap,
  ChevronDown,
  Layers,
  Zap,
  TrendingUp,
  Award,
  Clock,
  HeartHandshake,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'books' | 'events' | 'lost' | 'notes'>('books');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="bg-bg text-text min-h-screen flex flex-col font-sans selection:bg-accent selection:text-white">
      {/* 1. STICKY NAVBAR */}
      <header
        className={`sticky top-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-primary shadow-lg border-b border-white/10'
            : 'bg-bg/90 backdrop-blur-md border-b border-border/80'
        }`}
      >
        <Logo light={scrolled} />

        <nav
          className={`hidden md:flex items-center gap-7 text-xs font-heading font-semibold transition-colors duration-300 ${
            scrolled ? 'text-[#F3EEE7]/80' : 'text-primary/80'
          }`}
        >
          <a href="#problem" className={`transition-colors hover:text-accent`}>The Problem</a>
          <a href="#features" className={`transition-colors hover:text-accent`}>Features</a>
          <a href="#why-campusos" className={`transition-colors hover:text-accent`}>Why CampusOS</a>
          <a href="#comparison" className={`transition-colors hover:text-accent`}>Compare</a>
          <a href="#pricing" className={`transition-colors hover:text-accent`}>Pricing</a>
          <a href="#faq" className={`transition-colors hover:text-accent`}>FAQ</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="hidden sm:inline-block">
            <button
              className={`px-3 sm:px-4 py-1.5 text-xs font-heading font-semibold rounded-xl transition-all duration-300 ${
                scrolled
                  ? 'text-[#F3EEE7] hover:text-accent border border-white/20 hover:border-accent/60'
                  : 'text-primary hover:text-accent border border-transparent hover:border-accent/40'
              }`}
            >
              Log In
            </button>
          </Link>
          <Link to="/app">
            <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-heading font-bold rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-200 shadow-copper hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
              <span className="hidden sm:inline">Try Demo App</span>
              <span className="sm:hidden">Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              scrolled
                ? 'text-[#F3EEE7] hover:bg-white/10'
                : 'text-primary hover:bg-surface-muted'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden fixed inset-x-0 top-[65px] z-40 border-b shadow-soft-lg p-5 transition-all ${
            scrolled
              ? 'bg-[#01241C] border-white/10 text-[#F3EEE7]'
              : 'bg-surface border-border text-primary'
          }`}
        >
          <nav className="flex flex-col space-y-3 font-heading font-bold text-sm">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-accent transition-colors"
            >
              The Problem
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-accent transition-colors"
            >
              Core Features
            </a>
            <a
              href="#why-campusos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-accent transition-colors"
            >
              Why CampusOS
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-accent transition-colors"
            >
              Compare Platforms
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-accent transition-colors"
            >
              Pricing Plans
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-accent transition-colors"
            >
              Frequently Asked Questions
            </a>
          </nav>

          <div className="pt-4 mt-3 border-t border-border/60 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-border font-heading font-semibold text-xs hover:bg-surface-muted transition-colors"
            >
              Student Log In
            </Link>
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-accent text-white font-heading font-bold text-xs shadow-copper"
            >
              Launch Live Demo App
            </Link>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-accent/40 shadow-soft-sm max-w-full">
            <Sparkles className="w-4 h-4 text-accent shrink-0" />
            <span className="text-[11px] sm:text-xs font-heading font-bold text-primary truncate sm:text-clip">
              The Next-Gen College Life Operating System
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-primary tracking-tight leading-[1.15]">
            Everything a student needs, <br />
            <span className="text-accent underline decoration-accent/40 decoration-4 underline-offset-8">
              all in one place.
            </span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed px-1">
            Eliminate the chaos of 15 scattered WhatsApp groups, lost Telegram PDFs, and forgotten notice boards. Trade used textbooks, recover lost items, RSVP to events, find internships, and share verified notes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <Link to="/app" className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-copper font-bold"
              >
                Explore Live Demo
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                switchRole('admin');
                navigate('/app/college-dashboard');
              }}
              className="w-full sm:w-auto font-bold border-primary/30"
              leftIcon={<Building className="w-4 h-4 text-primary" />}
            >
              Demo as College Admin
            </Button>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-text-muted font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" /> Verified College Emails
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-accent shrink-0" /> Zero Setup Required
            </span>
          </div>
        </div>

        {/* Floating Mock-UI Collage */}
        <div className="relative mt-10 sm:mt-12 max-w-5xl mx-auto">
          <div className="bg-surface/90 border border-border/80 shadow-soft-lg rounded-3xl p-4 sm:p-6 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-4 border-b border-border/80 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-medium text-text-muted ml-2 truncate max-w-[180px] sm:max-w-none">
                  app.campusos.internal/dashboard
                </span>
              </div>
              <Badge variant="accent" size="sm">
                Sunrise Institute of Technology
              </Badge>
            </div>

            {/* Collage Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Card 1: Used Book Card */}
              <div className="bg-bg/70 p-4 rounded-2xl border border-border shadow-soft-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="primary" size="sm">Used Books</Badge>
                  <span className="text-xs font-bold text-accent">₹650</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-primary">
                  Introduction to Algorithms (CLRS)
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5">Thomas Cormen • 3rd Edition</p>
                <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-700 font-semibold">Like New</span>
                  <span className="text-[11px] text-text-muted">Ananya (Sem 7)</span>
                </div>
              </div>

              {/* Card 2: Upcoming Event Card */}
              <div className="bg-bg/70 p-4 rounded-2xl border border-border shadow-soft-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="accent" size="sm">Hackathon</Badge>
                  <span className="text-[10px] font-bold text-emerald-700">Free RSVP</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-primary">
                  HackCampus SIT 2026 (36h)
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5">₹2.5 Lakh Prize Pool • Main Audi</p>
                <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[11px] text-accent font-semibold">298 Registered</span>
                  <span className="text-[11px] text-text-muted">Nov 05</span>
                </div>
              </div>

              {/* Card 3: Lost & Found Card */}
              <div className="bg-bg/70 p-4 rounded-2xl border border-border shadow-soft-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Found Item
                  </span>
                  <span className="text-[10px] text-text-muted">Today</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-primary">
                  Casio fx-991EX Calculator
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5">Found with NASA sticker in Room 402</p>
                <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[11px] text-primary font-bold">Masked Chat Available</span>
                  <span className="text-accent text-[11px] font-bold">Claim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "THE PROBLEM" SECTION: Scattered Tools -> Merge into One */}
      <section id="problem" className="py-20 bg-primary text-surface px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <Badge variant="accent" size="md">
            The Broken Campus Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface">
            Students are drowning in 6 fragmented platforms
          </h2>
          <p className="text-surface/75 text-sm sm:text-base max-w-2xl mx-auto">
            Important notices get buried under 800 unread WhatsApp memes. Notes are scattered across random Telegram channels. Finding a used textbook means posting on Instagram stories.
          </p>

          {/* Chaotic Scattered Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-8 text-left">
            <div className="bg-surface/10 border border-surface/15 rounded-2xl p-4">
              <span className="text-2xl mb-2 block">💬</span>
              <h5 className="font-heading font-bold text-xs text-accent">WhatsApp</h5>
              <p className="text-[11px] text-surface/70 mt-1">Official notices buried in endless group chats</p>
            </div>
            <div className="bg-surface/10 border border-surface/15 rounded-2xl p-4">
              <span className="text-2xl mb-2 block">📁</span>
              <h5 className="font-heading font-bold text-accent">Telegram</h5>
              <p className="text-[11px] text-surface/70 mt-1">Pirated or unverified notes with broken links</p>
            </div>
            <div className="bg-surface/10 border border-surface/15 rounded-2xl p-4">
              <span className="text-2xl mb-2 block">📸</span>
              <h5 className="font-heading font-bold text-accent">Instagram</h5>
              <p className="text-[11px] text-surface/70 mt-1">College fest posters lost in algorithmic feeds</p>
            </div>
            <div className="bg-surface/10 border border-surface/15 rounded-2xl p-4">
              <span className="text-2xl mb-2 block">📚</span>
              <h5 className="font-heading font-bold text-accent">FB Market / OLX</h5>
              <p className="text-[11px] text-surface/70 mt-1">Strangers, spam buyers, zero verified seniors</p>
            </div>
            <div className="bg-surface/10 border border-surface/15 rounded-2xl p-4">
              <span className="text-2xl mb-2 block">📧</span>
              <h5 className="font-heading font-bold text-accent">Messy Email</h5>
              <p className="text-[11px] text-surface/70 mt-1">Internship deadlines missed in spam folders</p>
            </div>
            <div className="bg-surface/10 border border-surface/15 rounded-2xl p-4">
              <span className="text-2xl mb-2 block">📌</span>
              <h5 className="font-heading font-bold text-accent">Physical Boards</h5>
              <p className="text-[11px] text-surface/70 mt-1">Paper notices for lost items no one notices</p>
            </div>
          </div>

          {/* Visual Merge Transformation Arrow into CampusOS */}
          <div className="pt-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold shadow-copper animate-bounce">
              <ChevronDown className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="mt-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-surface text-primary border border-accent/40 font-heading font-bold text-xs sm:text-sm shadow-soft-lg flex items-center justify-center gap-2 max-w-full text-center">
              <Sparkles className="w-4 h-4 text-accent shrink-0" />
              <span>CampusOS unifies all 6 into a single, cohesive verified platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID (6 Pillars) */}
      <section id="features" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="accent" size="md">Core Modules</Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            Everything designed for real university workflows
          </h2>
          <p className="text-sm text-text-muted">
            Engineered with verified college email authentication so only genuine campus students and faculty participate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Card hover className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary text-surface flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">Used Books Marketplace</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Buy, sell, or rent university textbooks from verified seniors in your exact department and semester. No shipping fees, hand delivery on campus.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Filter by branch, semester, and course syllabus</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Integrated in-app buyer-seller chat</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Free giveaway rack for senior book donations</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link to="/app/books" className="text-xs font-heading font-bold text-primary hover:text-accent flex items-center gap-1">
                <span>Browse Marketplace</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card hover className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary text-surface flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">Lost & Found Hub</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Report lost ID cards, keys, calculators, or earphones. Finder and owner communicate via masked in-app chat so your phone number remains private.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Categorized by ID card, wallet, electronics & keys</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Photo proofs and campus drop-off coordinates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>One-click verified owner return verification</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link to="/app/lost-found" className="text-xs font-heading font-bold text-primary hover:text-accent flex items-center gap-1">
                <span>View Lost & Found</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card hover className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary text-surface flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">Event Notifications & RSVP</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Discover hackathons, cultural nights, and workshops. Toggle calendar view, register with 1-click, and download a digital pass ticket.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Calendar view with seat availability counters</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Instant digital pass generation with unique ticket ID</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Remind-me notification triggers before event starts</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link to="/app/events" className="text-xs font-heading font-bold text-primary hover:text-accent flex items-center gap-1">
                <span>Explore Events</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Feature 4 */}
          <Card hover className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary text-surface flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">Internship Listings</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Apply to verified tech, design, and business internships from high-growth Indian startups like Zepto, Razorpay, and CRED with application tracking.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Stipends clearly listed in ₹ (no unpaid scam listings)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Live 4-stage application status tracker</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Campus Ambassador & Part-Time filters</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link to="/app/internships" className="text-xs font-heading font-bold text-primary hover:text-accent flex items-center gap-1">
                <span>View Opportunities</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Feature 5 */}
          <Card hover className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary text-surface flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">Club Management</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Join student clubs, see announcements in your home feed, and club leads get attendance trackers and registration tables with CSV export.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>One-click club joining and society roster</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Leader attendance grid with present/absent logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Direct broadcast announcements to members</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link to="/app/clubs" className="text-xs font-heading font-bold text-primary hover:text-accent flex items-center gap-1">
                <span>Discover Clubs</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Feature 6 */}
          <Card hover className="flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary text-surface flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">Notes & PYQ Repository</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Browse past 5-year exam papers, handwritten topper lecture notes, lab manuals with code outputs, and semester assignments with ratings.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Organized by Department → Semester → Subject</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Peer star ratings & download counter</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>PDF preview and easy one-click download</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link to="/app/notes" className="text-xs font-heading font-bold text-primary hover:text-accent flex items-center gap-1">
                <span>Access Notes</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. "WHY STUDENTS LOVE IT / WHY COLLEGES NEED IT" TWO-COLUMN */}
      <section id="why-campusos" className="py-20 bg-surface/60 border-y border-border px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <Badge variant="accent" size="md">Value Proposition</Badge>
            <h2 className="text-3xl font-heading font-extrabold text-primary mt-2">
              Built for students. Trusted by administrations.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: For Students */}
            <div className="bg-surface p-7 sm:p-8 rounded-3xl border border-border shadow-soft-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-primary flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-primary mb-3">
                Why Students Love It
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-6">
                No more begging seniors in corridors for textbooks or past exam solutions. CampusOS puts your entire campus in your pocket.
              </p>
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-primary block font-heading">Save ₹4,000–₹10,000 every semester</strong>
                    <span className="text-text-muted">Buy used textbooks from seniors and resell them next year.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-primary block font-heading">Never miss a hackathon or exam date</strong>
                    <span className="text-text-muted">Official pinned notices and calendar alerts keep you ahead.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-primary block font-heading">Direct placement & internship track</strong>
                    <span className="text-text-muted">Campus-exclusive listings with verified recruiter partnerships.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: For Colleges */}
            <div className="bg-surface p-7 sm:p-8 rounded-3xl border border-border shadow-soft-sm">
              <div className="w-10 h-10 rounded-xl bg-primary text-surface flex items-center justify-center mb-4">
                <Building className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-primary mb-3">
                Why Colleges Need It
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-6">
                Universities struggle with student engagement and administrative transparency. CampusOS provides a unified digital infrastructure.
              </p>
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-primary block font-heading">Higher student engagement & fest participation</strong>
                    <span className="text-text-muted">Centralized event hub increases attendance by up to 300%.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-primary block font-heading">Audit-ready club administration & analytics</strong>
                    <span className="text-text-muted">Track society membership rosters, meetings, and attendance for NAAC/NIRF accreditation.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-primary block font-heading">Verified campus security</strong>
                    <span className="text-text-muted">Zero unauthorized outsiders in buy/sell transactions or chats.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (3 Simple Steps) */}
      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto text-center">
        <Badge variant="accent" size="md">Onboarding</Badge>
        <h2 className="text-3xl font-heading font-extrabold text-primary mt-2 mb-12">
          Up and running in less than 60 seconds
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-surface p-6 rounded-3xl border border-border relative">
            <div className="w-10 h-10 rounded-2xl bg-primary text-accent font-heading font-extrabold flex items-center justify-center text-base mb-4">
              01
            </div>
            <h4 className="font-heading font-bold text-base text-primary">Verify with College Email</h4>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Sign up with your <code>.edu.in</code> or university email domain. Instant verification unlocks your campus node.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-3xl border border-border relative">
            <div className="w-10 h-10 rounded-2xl bg-accent text-primary font-heading font-extrabold flex items-center justify-center text-base mb-4">
              02
            </div>
            <h4 className="font-heading font-bold text-base text-primary">Join Your Department & Year</h4>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Select your major and semester. Your home feed automatically calibrates with relevant books, exams, and clubs.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-3xl border border-border relative">
            <div className="w-10 h-10 rounded-2xl bg-primary text-accent font-heading font-extrabold flex items-center justify-center text-base mb-4">
              03
            </div>
            <h4 className="font-heading font-bold text-base text-primary">Do Everything In One App</h4>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Buy books, download topper notes, RSVP to hackathons, track internships, and chat securely with peers.
            </p>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE PRODUCT PREVIEW / TABS */}
      <section className="py-20 bg-primary text-surface px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <Badge variant="accent" size="md">Interactive App Tour</Badge>
          <h2 className="text-3xl font-heading font-extrabold text-surface">
            See CampusOS in action
          </h2>
          <p className="text-xs sm:text-sm text-surface/70 max-w-xl mx-auto">
            Switch between modules to preview the native user experience.
          </p>

          {/* Interactive tab selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'books', label: 'Used Books' },
              { id: 'events', label: 'Events Hub' },
              { id: 'lost', label: 'Lost & Found' },
              { id: 'notes', label: 'Notes Repository' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-primary shadow-copper'
                    : 'bg-surface/10 text-surface hover:bg-surface/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Preview Display */}
          <div className="pt-6">
            <div className="bg-surface text-text rounded-3xl p-6 shadow-soft-lg text-left border border-accent/20">
              {activeTab === 'books' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-heading font-bold text-base text-primary">
                        Used Books Marketplace Preview
                      </h4>
                      <p className="text-xs text-text-muted">24 books listed across CSE, IT, Mechanical & MBA</p>
                    </div>
                    <Link to="/app/books" className="shrink-0">
                      <Button variant="accent" size="sm" className="w-full sm:w-auto">Open Marketplace</Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-surface-muted/60 rounded-xl border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-primary block">CLRS Algorithms (3rd Ed)</span>
                        <span className="text-[11px] text-text-muted">CSE Sem 4 • Like New</span>
                      </div>
                      <span className="font-bold text-xs text-accent">₹650</span>
                    </div>
                    <div className="p-3 bg-surface-muted/60 rounded-xl border border-border flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-primary block">Higher Engg Maths (B.S. Grewal)</span>
                        <span className="text-[11px] text-text-muted">Sem 1 • Crisp Pages</span>
                      </div>
                      <span className="font-bold text-xs text-accent">₹420</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-heading font-bold text-base text-primary">
                        Campus Events & Calendar Preview
                      </h4>
                      <p className="text-xs text-text-muted">20 live workshops, sports tournaments & cultural nights</p>
                    </div>
                    <Link to="/app/events" className="shrink-0">
                      <Button variant="accent" size="sm" className="w-full sm:w-auto">View All Events</Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-surface-muted/60 rounded-xl border border-border">
                      <Badge variant="accent" size="sm">Hackathons</Badge>
                      <h5 className="font-heading font-bold text-xs text-primary mt-1">HackCampus SIT 2026 (36h)</h5>
                      <span className="text-[11px] text-text-muted">Convention Center • 298/350 Registered</span>
                    </div>
                    <div className="p-3 bg-surface-muted/60 rounded-xl border border-border">
                      <Badge variant="primary" size="sm">Cultural</Badge>
                      <h5 className="font-heading font-bold text-xs text-primary mt-1">Aarohan 2026 Cultural Fest</h5>
                      <span className="text-[11px] text-text-muted">College Main Grounds • Free Admission</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'lost' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-heading font-bold text-base text-primary">
                        Lost & Found Live Feed Preview
                      </h4>
                      <p className="text-xs text-text-muted">Secure masked messaging keeps phone numbers private</p>
                    </div>
                    <Link to="/app/lost-found" className="shrink-0">
                      <Button variant="accent" size="sm" className="w-full sm:w-auto">Open Lost & Found</Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-surface-muted/60 rounded-xl border border-border">
                      <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">Lost Item</span>
                      <h5 className="font-heading font-bold text-xs text-primary mt-1">Blue SIT College Identity Card</h5>
                      <span className="text-[11px] text-text-muted">Lost in Seminar Hall 1 • Masked Chat</span>
                    </div>
                    <div className="p-3 bg-surface-muted/60 rounded-xl border border-border">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Found Item</span>
                      <h5 className="font-heading font-bold text-xs text-primary mt-1">Casio fx-991EX Scientific Calc</h5>
                      <span className="text-[11px] text-text-muted">Found in Room 402 • Verified Claim</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-heading font-bold text-base text-primary">
                        Verified Peer Notes & Past Papers
                      </h4>
                      <p className="text-xs text-text-muted">30 hand-curated topper notes and 5-year solved PYQs</p>
                    </div>
                    <Link to="/app/notes" className="shrink-0">
                      <Button variant="accent" size="sm" className="w-full sm:w-auto">Browse Notes</Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-surface-muted/60 rounded-xl border border-border">
                      <span className="text-[10px] font-bold text-accent">DSA Handwritten Guide</span>
                      <h5 className="font-heading font-bold text-xs text-primary mt-0.5">142 Pages • 1,420 Downloads</h5>
                      <span className="text-[11px] text-emerald-700 font-semibold">★ 4.9 (184 reviews)</span>
                    </div>
                    <div className="p-3 bg-surface-muted/60 rounded-xl border border-border">
                      <span className="text-[10px] font-bold text-accent">Operating Systems PYQs (2020-2025)</span>
                      <h5 className="font-heading font-bold text-xs text-primary mt-0.5">88 Pages • Step Solutions</h5>
                      <span className="text-[11px] text-emerald-700 font-semibold">★ 4.8 (112 reviews)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. STATS BAND */}
      <section className="py-14 bg-surface border-y border-border px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">10+</div>
            <p className="text-xs text-text-muted font-medium mt-1">Top Engineering Colleges</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-extrabold text-accent">50,000+</div>
            <p className="text-xs text-text-muted font-medium mt-1">Active Verified Students</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">1,200+</div>
            <p className="text-xs text-text-muted font-medium mt-1">Used Books Listed</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-extrabold text-accent">300+</div>
            <p className="text-xs text-text-muted font-medium mt-1">Campus Events / Month</p>
          </div>
        </div>
      </section>

      {/* 9. COMPARISON TABLE */}
      <section id="comparison" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Badge variant="accent" size="md">Side-by-Side</Badge>
          <h2 className="text-3xl font-heading font-extrabold text-primary mt-2">
            Why legacy tools fall short
          </h2>
        </div>

        <div className="block md:hidden text-center text-[11px] text-text-muted mb-3 font-medium">
          👉 Swipe horizontally to compare all platforms →
        </div>

        <div className="overflow-x-auto rounded-3xl border border-border bg-surface shadow-soft-sm">
          <table className="w-full text-left text-xs border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-surface-muted/80 text-primary border-b border-border">
                <th className="p-4 font-heading font-bold">Feature / Capability</th>
                <th className="p-4 font-heading font-bold text-accent bg-accent/10">CampusOS</th>
                <th className="p-4 font-heading font-bold text-text-muted">WhatsApp</th>
                <th className="p-4 font-heading font-bold text-text-muted">Telegram</th>
                <th className="p-4 font-heading font-bold text-text-muted">Google Classroom</th>
                <th className="p-4 font-heading font-bold text-text-muted">FB Marketplace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-4 font-semibold text-primary">Verified College Email Gating</td>
                <td className="p-4 bg-accent/5 font-bold text-emerald-800">✓ Yes, Strict</td>
                <td className="p-4 text-rose-600">✗ No (Anyone with link)</td>
                <td className="p-4 text-rose-600">✗ No</td>
                <td className="p-4 text-text-muted">Limited to course</td>
                <td className="p-4 text-rose-600">✗ No (Public)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-primary">Used Books Search by Branch & Sem</td>
                <td className="p-4 bg-accent/5 font-bold text-emerald-800">✓ Yes, Structured</td>
                <td className="p-4 text-rose-600">✗ Buried in chat</td>
                <td className="p-4 text-rose-600">✗ Unorganized</td>
                <td className="p-4 text-rose-600">✗ Not supported</td>
                <td className="p-4 text-text-muted">Generic search only</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-primary">Lost & Found with Masked Chat</td>
                <td className="p-4 bg-accent/5 font-bold text-emerald-800">✓ In-app Privacy</td>
                <td className="p-4 text-rose-600">✗ Phone numbers leaked</td>
                <td className="p-4 text-rose-600">✗ Spam bots</td>
                <td className="p-4 text-rose-600">✗ Not supported</td>
                <td className="p-4 text-rose-600">✗ Not supported</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-primary">Event Registration + Digital Pass</td>
                <td className="p-4 bg-accent/5 font-bold text-emerald-800">✓ Integrated Tickets</td>
                <td className="p-4 text-rose-600">✗ Clunky Google Forms</td>
                <td className="p-4 text-rose-600">✗ Link only</td>
                <td className="p-4 text-rose-600">✗ Assignment focus</td>
                <td className="p-4 text-rose-600">✗ No</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-primary">Club Leader Attendance & CSV Export</td>
                <td className="p-4 bg-accent/5 font-bold text-emerald-800">✓ Built-in Tools</td>
                <td className="p-4 text-rose-600">✗ Manual registers</td>
                <td className="p-4 text-rose-600">✗ None</td>
                <td className="p-4 text-text-muted">Teacher only</td>
                <td className="p-4 text-rose-600">✗ No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 10. PRICING PLANS */}
      <section id="pricing" className="py-20 bg-surface/60 border-y border-border px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <Badge variant="accent" size="md">Honest Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
            Accessible for every student & college budget
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
            Free forever for basic campus utilities. Upgrade for unlimited cloud note storage, priority job screening, and advanced club administration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
            {/* Plan 1: Student Free */}
            <Card className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-heading font-bold text-text-muted uppercase">Student Free</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-extrabold text-primary">₹0</span>
                  <span className="text-xs text-text-muted">/ forever</span>
                </div>
                <p className="text-xs text-text-muted mt-2">Essential utilities for every enrolled student.</p>
                <div className="mt-6 space-y-2.5 text-xs text-text-muted">
                  <div className="flex items-center gap-2">✓ Browse all used books & events</div>
                  <div className="flex items-center gap-2">✓ Report & claim lost belongings</div>
                  <div className="flex items-center gap-2">✓ Up to 5 note uploads</div>
                  <div className="flex items-center gap-2">✓ Join student clubs & feeds</div>
                </div>
              </div>
              <div className="pt-6">
                <Link to="/app" className="w-full block">
                  <Button variant="outline" size="md" className="w-full">
                    Start Free
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Plan 2: Student Pro (Highlighted) */}
            <Card dark className="border-accent relative flex flex-col justify-between shadow-soft-lg">
              <div className="absolute top-4 right-4">
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-accent text-primary">
                  Most Popular
                </span>
              </div>
              <div>
                <span className="text-xs font-heading font-bold text-accent uppercase">Student Premium</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-extrabold text-surface">₹99</span>
                  <span className="text-xs text-surface/70">/ month (or ₹199/yr)</span>
                </div>
                <p className="text-xs text-surface/75 mt-2">Supercharge exam prep & job applications.</p>
                <div className="mt-6 space-y-2.5 text-xs text-surface/85">
                  <div className="flex items-center gap-2 text-accent">★ Unlimited note & PYQ uploads</div>
                  <div className="flex items-center gap-2 text-accent">★ Ad-free experience (zero sponsors)</div>
                  <div className="flex items-center gap-2 text-accent">★ Priority internship applications</div>
                  <div className="flex items-center gap-2 text-accent">★ Interactive ATS Resume Builder</div>
                  <div className="flex items-center gap-2 text-accent">★ Cloud notes bookmarks & backup</div>
                </div>
              </div>
              <div className="pt-6">
                <Link to="/app/premium" className="w-full block">
                  <Button variant="accent" size="md" className="w-full font-bold shadow-copper">
                    Upgrade to Premium
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Plan 3: College Campus Enterprise */}
            <Card className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-heading font-bold text-text-muted uppercase">College Campus Plan</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-extrabold text-primary">₹75,000</span>
                  <span className="text-xs text-text-muted">/ year / campus</span>
                </div>
                <p className="text-xs text-text-muted mt-2">Complete institution-wide deployment with official dashboard.</p>
                <div className="mt-6 space-y-2.5 text-xs text-text-muted">
                  <div className="flex items-center gap-2">✓ Verified <code>.ac.in</code> domain SSO</div>
                  <div className="flex items-center gap-2">✓ Admin announcement & notice portal</div>
                  <div className="flex items-center gap-2">✓ Event approval & attendance tracking</div>
                  <div className="flex items-center gap-2">✓ Placement & recruiter talent access</div>
                  <div className="flex items-center gap-2">✓ NAAC accreditation analytics reports</div>
                </div>
              </div>
              <div className="pt-6">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    switchRole('admin');
                    navigate('/app/college-dashboard');
                  }}
                >
                  Explore College Plan
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 11. ROADMAP / FUTURE FEATURES TEASER */}
      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="accent" size="md">Future Horizons</Badge>
            <h2 className="text-3xl font-heading font-extrabold text-primary mt-2">
              Upcoming Features on the Roadmap
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Vote on what we should build next for your university life.
            </p>
          </div>
          <Link to="/app/coming-soon">
            <Button variant="accent" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Vote on Features
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-left">
          <div className="p-4 rounded-2xl bg-surface border border-border">
            <span className="text-[10px] font-bold text-accent uppercase">Academics</span>
            <h5 className="font-heading font-bold text-xs text-primary mt-1">Smart Attendance & Bunk Meter</h5>
            <p className="text-[11px] text-text-muted mt-1">Calculate safe absents before dropping below 75%.</p>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border">
            <span className="text-[10px] font-bold text-accent uppercase">AI Assistant</span>
            <h5 className="font-heading font-bold text-xs text-primary mt-1">AI Exam Study Flashcards</h5>
            <p className="text-[11px] text-text-muted mt-1">Auto-generate flashcards from syllabus PDFs.</p>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border">
            <span className="text-[10px] font-bold text-accent uppercase">Transit</span>
            <h5 className="font-heading font-bold text-xs text-primary mt-1">Live College Shuttle GPS</h5>
            <p className="text-[11px] text-text-muted mt-1">Track bus location and metro station timings.</p>
          </div>
          <div className="p-4 rounded-2xl bg-surface border border-border">
            <span className="text-[10px] font-bold text-accent uppercase">Hostel</span>
            <h5 className="font-heading font-bold text-xs text-primary mt-1">Laundry & Maintenance Slots</h5>
            <p className="text-[11px] text-text-muted mt-1">Book washing machines and lodge geyser repairs.</p>
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS */}
      <section className="py-20 bg-surface/60 border-t border-border px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <Badge variant="accent" size="md">Community Proof</Badge>
            <h2 className="text-3xl font-heading font-extrabold text-primary mt-2">
              Loved by students, trusted by faculty
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col justify-between">
              <p className="text-xs text-text-muted italic leading-relaxed">
                "I bought my Semester 4 CLRS algorithms book and engineering mathematics textbook for less than ₹1,000 from a 4th-year senior. Hand delivered in the canteen within 15 minutes of messaging!"
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
                  alt="Aarav"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-xs font-heading font-bold text-primary">Aarav Sharma</h5>
                  <span className="text-[10px] text-text-muted">CSE Sem 5, SIT Mumbai</span>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <p className="text-xs text-text-muted italic leading-relaxed">
                "Managing 400+ members in Coding Club used to be a nightmare of messy WhatsApp groups and expired Drive links. With CampusOS, our hackathon had 350 registrations in 48 hours with zero manual data entry."
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Ananya"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-xs font-heading font-bold text-primary">Ananya Iyer</h5>
                  <span className="text-[10px] text-text-muted">President, Coding Club SIT</span>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <p className="text-xs text-text-muted italic leading-relaxed">
                "CampusOS eliminated the chaotic bulletin boards outside the administrative block. Pinned notices regarding exam dates reach 100% of students within minutes with complete delivery receipts."
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Dr. Sen"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-xs font-heading font-bold text-primary">Dr. Radhika Sen</h5>
                  <span className="text-[10px] text-text-muted">Dean of Student Affairs</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 13. FAQ ACCORDION */}
      <section id="faq" className="py-20 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Badge variant="accent" size="md">Got Questions?</Badge>
          <h2 className="text-3xl font-heading font-extrabold text-primary mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does CampusOS ensure that only real college students join?',
              a: 'Every student registers with their official college email domain (e.g., student@sit.edu.in). Our simulated verification checks the domain, ensuring that outside strangers, spammers, and fake accounts cannot access book trading or chat with students.',
            },
            {
              q: 'Is CampusOS really free for students?',
              a: 'Yes! The core utilities—searching and listing used textbooks, reporting lost & found items, RSVPing for campus events, applying to internships, and downloading notes—are 100% free forever. Students can optionally upgrade to Premium (₹99/mo) for unlimited uploads and AI resume tools.',
            },
            {
              q: 'How does the buyer-seller chat protect student privacy?',
              a: 'When you contact a book seller or someone who reported a lost calculator, communication happens through an in-app masked relay chat. Phone numbers and personal social handles are never displayed unless both parties explicitly choose to share them.',
            },
            {
              q: 'Can our college student council or club use CampusOS today?',
              a: 'Absolutely! Club leaders can manage member rosters, post pinned announcements, track attendance at meetings, and export event registration lists directly to CSV.',
            },
            {
              q: 'Can companies hire verified students through CampusOS?',
              a: 'Yes. Our Recruiter Portal allows tech startups and hiring partners to post verified internships and jobs, screen candidates by university branch and skills, and update application stages directly in real-time.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-surface rounded-2xl border border-border overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 sm:p-5 text-left font-heading font-bold text-xs sm:text-sm text-primary flex items-center justify-between gap-4"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-accent shrink-0 transition-transform duration-200 ${
                    faqOpen === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {faqOpen === index && (
                <div className="px-4 pb-5 sm:px-5 text-xs text-text-muted leading-relaxed border-t border-border/40 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 14. FINAL CTA BANNER + FOOTER */}
      <section className="py-20 bg-primary text-surface px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <Badge variant="accent" size="md">Join the Movement</Badge>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface tracking-tight">
            Ready to upgrade your college life?
          </h2>
          <p className="text-xs sm:text-sm text-surface/80 max-w-lg mx-auto leading-relaxed">
            Join thousands of students at Sunrise Institute of Technology and beyond. Experience the demo right now with realistic mock data.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/app" className="w-full sm:w-auto">
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto font-bold shadow-copper"
              >
                Launch Live Demo
              </Button>
            </Link>
            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-surface border-surface/30 hover:bg-surface/10 font-bold"
              >
                Create Student Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER (Dark Green #013328) */}
      <footer className="bg-[#01241C] py-12 px-4 sm:px-8 border-t border-white/10 text-xs text-[#F3EEE7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          <div className="space-y-3">
            <Logo light />
            <p className="text-[11px] text-[#F3EEE7]/70 leading-relaxed max-w-xs">
              CampusOS is the all-in-one college operating system empowering Indian engineering colleges with unified student utilities, marketplaces, and administrative tools.
            </p>
          </div>

          <div>
            <h5 className="font-heading font-bold text-xs text-[#F3EEE7] uppercase tracking-wider mb-3">
              Campus Modules
            </h5>
            <ul className="space-y-2 text-[11px] text-[#F3EEE7]/80">
              <li><Link to="/app/books" className="hover:text-accent transition-colors">Used Books Marketplace</Link></li>
              <li><Link to="/app/lost-found" className="hover:text-accent transition-colors">Lost & Found Hub</Link></li>
              <li><Link to="/app/events" className="hover:text-accent transition-colors">Campus Events & Calendar</Link></li>
              <li><Link to="/app/internships" className="hover:text-accent transition-colors">Internship Listings</Link></li>
              <li><Link to="/app/notes" className="hover:text-accent transition-colors">Topper Notes & PYQs</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-xs text-[#F3EEE7] uppercase tracking-wider mb-3">
              Role Portals
            </h5>
            <ul className="space-y-2 text-[11px] text-[#F3EEE7]/80">
              <li>
                <button
                  onClick={() => {
                    switchRole('student');
                    navigate('/app');
                  }}
                  className="hover:text-accent transition-colors"
                >
                  Student Portal (Aarav Sharma)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    switchRole('admin');
                    navigate('/app/college-dashboard');
                  }}
                  className="hover:text-accent transition-colors"
                >
                  College Admin Portal (Dean Sen)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    switchRole('recruiter');
                    navigate('/app/recruiter');
                  }}
                  className="hover:text-accent transition-colors"
                >
                  Recruiter Portal (Vikram Mehta)
                </button>
              </li>
              <li><Link to="/app/premium" className="hover:text-accent transition-colors">Student Premium & Resume</Link></li>
              <li><Link to="/app/coming-soon" className="hover:text-accent transition-colors">Feature Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-xs text-[#F3EEE7] uppercase tracking-wider mb-3">
              Compliance & Trust
            </h5>
            <p className="text-[11px] text-[#F3EEE7]/70 leading-relaxed mb-3">
              Built in Mumbai, India for national engineering colleges. Compliant with student data privacy guidelines and verified campus network protocols.
            </p>
            <div className="flex items-center gap-2 text-accent font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Node: SIT Mumbai</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#F3EEE7]/60">
          <p>© 2026 CampusOS Technologies. "Everything a student needs, all in one place."</p>
          <div className="flex items-center gap-4">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Security Whitepaper</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

