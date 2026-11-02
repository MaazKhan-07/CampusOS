import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { UploadNoteModal } from '../components/notes/UploadNoteModal';
import {
  FileText,
  Search,
  Upload,
  Download,
  Star,
  Lock,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Filter,
  Eye,
  FileDown,
} from 'lucide-react';
import { useNoteStore } from '../store/useNoteStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { NoteType, Note } from '../types';

export const NotesPage: React.FC = () => {
  const { notes, userUploadedCount, downloadNote, rateNote } = useNoteStore();
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [semester, setSemester] = useState('All');
  const [activeType, setActiveType] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // PDF Preview Modal State
  const [previewNote, setPreviewNote] = useState<Note | null>(null);

  const types = ['All', 'Notes', 'PYQ', 'Assignment', 'Lab Manual'];

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (department !== 'All' && note.department !== department) return false;
      if (semester !== 'All' && note.semester.toString() !== semester) return false;
      if (activeType !== 'All' && note.type !== activeType) return false;

      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.subject.toLowerCase().includes(search.toLowerCase()) ||
        note.uploaderName.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [notes, department, semester, activeType, search]);

  const handleDownload = (note: Note) => {
    downloadNote(note.id);
    addToast({
      title: 'Downloading Document 📄',
      description: `"${note.fileName}" saved to your downloads.`,
      type: 'success',
    });
  };

  const handleRate = (noteId: string, rating: number) => {
    rateNote(noteId, rating);
    addToast({
      title: 'Rating Submitted ⭐',
      description: `Thank you for rating this document ${rating} stars!`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              Peer Notes & PYQ Archive
            </h1>
            <Badge variant="accent" size="sm">
              {notes.length} Verified Docs
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Top ranker handwritten notes, solved past 5-year exam papers, and practical lab code.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => setIsUploadModalOpen(true)}
          leftIcon={<Upload className="w-4 h-4 stroke-[3]" />}
          className="shadow-copper font-bold"
        >
          Upload Notes
        </Button>
      </div>

      {/* Free Tier Storage Meter Strip */}
      <div className="p-4 rounded-2xl bg-surface border border-border shadow-soft-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 max-w-lg">
          <div className="flex items-center justify-between text-xs font-heading font-bold text-primary">
            <span>Free Tier Cloud Document Meter</span>
            <span>
              {currentUser?.isPremium ? 'Unlimited Storage (Premium)' : `${userUploadedCount} of 5 Slots Used`}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-muted overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{
                width: currentUser?.isPremium ? '100%' : `${(userUploadedCount / 5) * 100}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-text-muted">
            {currentUser?.isPremium
              ? '✨ CampusOS Premium active: Upload unlimited study notes & question solutions.'
              : 'Free accounts can store up to 5 document uploads. Upgrade for unlimited storage.'}
          </p>
        </div>

        {!currentUser?.isPremium && (
          <Link to="/app/premium" className="shrink-0">
            <Button variant="outline" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5 text-accent" />}>
              Get Unlimited for ₹99
            </Button>
          </Link>
        )}
      </div>

      {/* Hierarchical Browsing & Filter Bar */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-soft-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by subject, document title, or uploader..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-muted/70 text-text placeholder:text-text-muted text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-primary focus:bg-surface focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="py-2 text-xs"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science & Engineering">CSE</option>
              <option value="Information Technology">IT</option>
              <option value="Electronics & Telecommunication">EXTC</option>
              <option value="Mechanical Engineering">Mech</option>
              <option value="Civil Engineering">Civil</option>
              <option value="Artificial Intelligence & Data Science">AI & DS</option>
              <option value="First Year / All Branches">First Year</option>
            </Select>

            <Select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="py-2 text-xs"
            >
              <option value="All">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s.toString()}>
                  Sem {s}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Type Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold whitespace-nowrap transition-all ${
                activeType === t
                  ? 'bg-primary text-onPrimary shadow-soft-sm'
                  : 'bg-surface-muted text-text-muted hover:text-primary hover:bg-surface'
              }`}
            >
              {t}
              {t === 'All' ? ` (${notes.length})` : ` (${notes.filter((n) => n.type === t).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Cards Grid */}
      {filteredNotes.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-8 h-8 text-accent" />}
          title="No Documents Found"
          description="Try broadening your subject or department filter, or upload your handwritten notes to earn peer credits."
          actionLabel="Upload First Document"
          onAction={() => setIsUploadModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              hover
              padded={false}
              className="flex flex-col justify-between group overflow-hidden border-border"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="accent" size="sm">
                    {note.type}
                  </Badge>
                  <span className="text-[10px] text-text-muted font-medium">
                    Sem {note.semester} • {note.pages} pages
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-sm text-primary group-hover:text-accent-hover transition-colors line-clamp-2 leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-xs text-text-muted font-medium mt-1 truncate">
                    {note.subject} • {note.department.split('&')[0]}
                  </p>
                </div>

                {/* Rating & Downloads Bar */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-border/60">
                  <div className="flex items-center gap-1 text-amber-700 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{note.rating}</span>
                    <span className="text-text-muted text-[10px]">({note.ratingCount})</span>
                  </div>

                  <span className="text-[11px] text-text-muted flex items-center gap-1">
                    <Download className="w-3 h-3 text-accent" />
                    {note.downloads} downloads
                  </span>
                </div>

                {/* Uploader Details */}
                <div className="flex items-center gap-2 pt-1 text-xs text-text-muted">
                  <img
                    src={note.uploaderAvatar}
                    alt={note.uploaderName}
                    className="w-5 h-5 rounded-full object-cover shrink-0"
                  />
                  <span className="truncate text-[11px]">By {note.uploaderName}</span>
                </div>
              </div>

              {/* Action Buttons: Preview & Download */}
              <div className="p-3.5 bg-surface-muted/50 border-t border-border flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewNote(note)}
                  className="px-3 py-1.5 rounded-xl text-xs font-heading font-bold text-primary hover:bg-surface transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-accent" />
                  <span>Preview</span>
                </button>

                <Button
                  size="sm"
                  variant="accent"
                  onClick={() => handleDownload(note)}
                  leftIcon={<FileDown className="w-3.5 h-3.5" />}
                  className="text-xs font-bold"
                >
                  Download ({note.fileSize})
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* PDF Document Preview Modal */}
      {previewNote && (
        <Modal
          isOpen={!!previewNote}
          onClose={() => setPreviewNote(null)}
          title={previewNote.title}
          description={`${previewNote.subject} • ${previewNote.pages} Pages • Uploaded by ${previewNote.uploaderName}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            {/* Fake PDF Render Canvas with Real Typography & Content */}
            <div className="aspect-[4/3] rounded-2xl bg-white border border-border p-6 shadow-inner text-primary flex flex-col justify-between overflow-hidden relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                    Verified University Study Material
                  </span>
                  <span className="text-[10px] text-text-muted">Page 1 of {previewNote.pages}</span>
                </div>

                <h2 className="font-heading font-extrabold text-lg text-primary">
                  {previewNote.title}
                </h2>
                <p className="text-xs text-text-muted">
                  Department: {previewNote.department} | Course Semester: {previewNote.semester}
                </p>

                {/* Simulated Handwritten / Typeset Lecture Notes Lines */}
                <div className="space-y-2 text-xs text-text-muted font-serif pt-2 leading-relaxed">
                  <p className="italic">
                    1. Fundamental Principles & Definition: In computing, {previewNote.subject} addresses asymptotic complexity bounds \(\mathcal&#123;O&#125;(n \log n)\) and optimal storage allocation under memory constraints...
                  </p>
                  <div className="p-3 rounded-lg bg-surface-muted/50 font-mono text-[11px] text-primary">
                    {previewNote.type === 'PYQ'
                      ? 'Q1. Explain dynamic programming formulation for 0/1 Knapsack with recurrence equation. [10 Marks]'
                      : 'theorem: For every connected planar graph G, vertices - edges + faces = 2.'}
                  </div>
                  <p>
                    2. Worked Example & Exam Solution Derivation with complete step-by-step reasoning.
                  </p>
                </div>
              </div>

              {/* Watermark overlay */}
              <div className="flex items-center justify-between pt-3 border-t border-primary/10 text-[10px] text-text-muted">
                <span>CampusOS Document Verification Node #SIT-2026</span>
                <span className="text-accent font-bold">Verified Peer Reviewed</span>
              </div>
            </div>

            {/* Quick Star Rating Form */}
            <div className="p-3 bg-surface-muted rounded-xl border border-border flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-primary">Rate this note:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(previewNote.id, star)}
                    className="p-1 text-amber-500 hover:scale-125 transition-transform"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={() => setPreviewNote(null)}>
                Close Preview
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={() => {
                  handleDownload(previewNote);
                  setPreviewNote(null);
                }}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Download Complete PDF ({previewNote.fileSize})
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Note Modal */}
      <UploadNoteModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

