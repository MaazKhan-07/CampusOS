import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useNoteStore } from '../../store/useNoteStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import { NoteType } from '../../types';
import { FileUp, FileText, CheckCircle2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UploadNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadNoteModal: React.FC<UploadNoteModalProps> = ({ isOpen, onClose }) => {
  const { uploadNote, userUploadedCount } = useNoteStore();
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState('4');
  const [type, setType] = useState<NoteType>('Notes');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [pages, setPages] = useState('45');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Storage limit check for non-premium: 5 slots
  const isStorageFull = !currentUser?.isPremium && userUploadedCount >= 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Document title is required';
    if (!subject.trim()) newErrors.subject = 'Subject name is required';
    if (!fileName) newErrors.file = 'Please attach a PDF document';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      uploadNote({
        title,
        subject,
        department,
        semester: Number(semester),
        type,
        fileUrl: `/notes/${fileName}`,
        fileName: fileName || 'Campus_Study_Notes.pdf',
        fileSize: fileSize || '5.4 MB',
        pages: Number(pages) || 30,
        uploaderId: currentUser?.id || 'user-student-1',
        uploaderName: currentUser?.name || 'Aarav Sharma',
        uploaderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      });

      addToast({
        title: 'Document Uploaded!',
        description: `"${title}" is now available in the ${department} library.`,
        type: 'success',
      });

      setIsSubmitting(false);
      onClose();
      // Reset
      setTitle('');
      setSubject('');
      setFileName('');
      setFileSize('');
      setErrors({});
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contribute Study Notes or Question Papers"
      description="Earn karma points, peer recognition, and help your batchmates ace finals."
      maxWidth="md"
    >
      {/* Free Tier Storage Limit Warning */}
      <div className="mb-4 p-3 rounded-2xl bg-surface-muted border border-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-primary">
            <span>Free Tier Cloud Storage</span>
            {currentUser?.isPremium && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent text-primary">
                Unlimited
              </span>
            )}
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">
            {currentUser?.isPremium
              ? 'Premium member: unlimited notes and solution uploads.'
              : `${userUploadedCount} of 5 free note slots used.`}
          </p>
        </div>

        {!currentUser?.isPremium && (
          <Link to="/app/premium" onClick={onClose}>
            <span className="text-xs font-heading font-bold text-accent hover:underline flex items-center gap-1">
              <Lock className="w-3 h-3" /> Upgrade
            </span>
          </Link>
        )}
      </div>

      {isStorageFull ? (
        <div className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h4 className="font-heading font-bold text-base text-primary">
            Free Upload Limit Reached (5/5)
          </h4>
          <p className="text-xs text-text-muted max-w-sm mx-auto">
            You have used all 5 free document slots. Upgrade to CampusOS Premium to upload unlimited study materials and access AI note summaries.
          </p>
          <div className="pt-2">
            <Link to="/app/premium" onClick={onClose}>
              <Button variant="accent" size="md">
                Upgrade to Premium (₹99/mo)
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <Input
            label="Document Title *"
            placeholder="e.g. Unit 3 Dynamic Programming Handouts"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Subject Name *"
              placeholder="e.g. Algorithms, DBMS, Maths 3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              error={errors.subject}
            />

            <Select
              label="Document Type *"
              value={type}
              onChange={(e) => setType(e.target.value as NoteType)}
            >
              <option value="Notes">Lecture Notes</option>
              <option value="PYQ">Previous Year Questions (PYQ)</option>
              <option value="Assignment">Solved Assignment</option>
              <option value="Lab Manual">Lab Manual with Outputs</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Select
              label="Department *"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
              <option value="First Year / All Branches">First Year / All Branches</option>
            </Select>

            <Select
              label="Semester *"
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

          {/* PDF File Picker with Mock File Preview Card */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold text-primary uppercase font-heading">
              Select Document (PDF format) *
            </label>

            {fileName ? (
              <div className="p-3 rounded-2xl bg-surface border border-accent/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-primary">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-heading font-bold text-primary truncate max-w-xs">
                      {fileName}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {fileSize} • Verified PDF Document
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFileName('');
                    setFileSize('');
                  }}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Change
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-primary/25 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-muted/50 transition-colors">
                <FileUp className="w-7 h-7 text-accent mb-1.5" />
                <span className="text-xs font-heading font-semibold text-primary">
                  Choose a PDF file from your device
                </span>
                <span className="text-[11px] text-text-muted mt-0.5">
                  PDF, DOCX up to 25MB
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
            {errors.file && <p className="text-xs text-rose-600 font-medium">{errors.file}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" isLoading={isSubmitting}>
              Upload Document
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

