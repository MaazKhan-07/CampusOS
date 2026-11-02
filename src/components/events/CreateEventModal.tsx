import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useEventStore } from '../../store/useEventStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import { EventCategory } from '../../types';
import { Upload, X } from 'lucide-react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const { createEvent } = useEventStore();
  const { currentUser, currentRole } = useAuthStore();
  const { addToast } = useToastStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Workshops');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM - 01:00 PM');
  const [venue, setVenue] = useState('Seminar Hall 1');
  const [clubName, setClubName] = useState('Coding Club SIT');
  const [totalSeats, setTotalSeats] = useState('150');
  const [price, setPrice] = useState('Free');
  const [description, setDescription] = useState('');
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Event title is required';
    if (!date) newErrors.date = 'Event date is required';
    if (!description.trim()) newErrors.description = 'Please provide an event description';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createEvent({
        title,
        description,
        category,
        date,
        time,
        venue,
        clubId: 'club-1',
        clubName: clubName || 'Student Council',
        clubLogo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&auto=format&fit=crop&q=80',
        banner: bannerPreview || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
        totalSeats: Number(totalSeats) || 100,
        price: price === 'Free' ? 'Free' : Number(price),
        schedule: [
          { time: '10:00 AM', activity: 'Inauguration & Keynote' },
          { time: '11:30 AM', activity: 'Main Activity / Workshop Sessions' },
          { time: '01:00 PM', activity: 'Q&A, Networking & Refreshments' },
        ],
      });

      addToast({
        title: currentRole === 'admin' ? 'Event Approved & Published!' : 'Event Submitted for Approval',
        description: `"${title}" has been submitted to the Student Affairs Council.`,
        type: 'success',
      });

      setIsSubmitting(false);
      onClose();
      setTitle('');
      setDescription('');
      setBannerPreview('');
      setErrors({});
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Organize a Campus Event"
      description="Create workshops, hackathons, sports tourneys, and cultural nights."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        <Input
          label="Event Title *"
          placeholder="e.g. NextGen Web3 & AI Hackathon"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Select
            label="Category *"
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory)}
          >
            <option value="Workshops">Workshops</option>
            <option value="Hackathons">Hackathons</option>
            <option value="Cultural">Cultural & Arts</option>
            <option value="Sports">Sports & Fitness</option>
            <option value="Seminars">Seminars & Guest Lectures</option>
          </Select>

          <Input
            label="Host Organization / Club"
            placeholder="e.g. Coding Club SIT"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Date *"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={errors.date}
          />

          <Input
            label="Time"
            placeholder="e.g. 10:00 AM - 04:00 PM"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Campus Venue"
            placeholder="e.g. Seminar Hall 2, Amphitheatre"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />

          <Input
            label="Total Seat Capacity"
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
          />
        </div>

        <div className="space-y-1 text-left">
          <label className="block text-xs font-semibold text-primary uppercase font-heading">
            Event Description & Overview *
          </label>
          <textarea
            rows={3}
            placeholder="Describe what students will learn, who is speaking, and eligibility..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-surface text-text placeholder:text-text-muted/60 border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-accent/30"
          />
          {errors.description && (
            <p className="text-xs text-rose-600 font-medium">{errors.description}</p>
          )}
        </div>

        {/* Banner Upload with Preview */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-semibold text-primary uppercase font-heading">
            Promotional Banner Image
          </label>
          {bannerPreview ? (
            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-border group">
              <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setBannerPreview('')}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-primary/80 text-surface hover:bg-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-primary/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-muted/50 transition-colors">
              <Upload className="w-5 h-5 text-accent mb-1" />
              <span className="text-xs font-heading font-semibold text-primary">
                Click to upload 16:9 banner
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" isLoading={isSubmitting}>
            Submit Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};

