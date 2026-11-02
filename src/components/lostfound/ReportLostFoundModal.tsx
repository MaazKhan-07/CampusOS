import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useLostFoundStore } from '../../store/useLostFoundStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import { LostFoundType, LostFoundCategory } from '../../types';
import { Upload, X } from 'lucide-react';

interface ReportLostFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: LostFoundType;
}

export const ReportLostFoundModal: React.FC<ReportLostFoundModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'lost',
}) => {
  const { reportItem } = useLostFoundStore();
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [type, setType] = useState<LostFoundType>(defaultType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<LostFoundCategory>('ID Card');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Item title is required';
    if (!location.trim()) newErrors.location = 'Please specify campus location';
    if (!description.trim()) newErrors.description = 'Please describe the item';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      reportItem({
        type,
        title,
        category,
        location,
        description,
        image: imagePreview || 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=500&auto=format&fit=crop&q=80',
        reportedBy: {
          id: currentUser?.id || 'user-student-1',
          name: currentUser?.name || 'Aarav Sharma',
          avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        },
        contactMaskedId: `MASK-${Math.floor(1000 + Math.random() * 9000)}-SIT`,
      });

      addToast({
        title: type === 'lost' ? 'Lost Item Reported' : 'Found Item Reported',
        description: `"${title}" has been broadcasted across campus channels.`,
        type: 'success',
      });

      setIsSubmitting(false);
      onClose();
      // Reset form
      setTitle('');
      setLocation('');
      setDescription('');
      setImagePreview('');
      setErrors({});
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Report an Item (Lost & Found)"
      description="Help reconnect lost belongings with their owners with secure masked messaging."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        {/* Toggle between Lost / Found */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-surface-muted rounded-2xl border border-border">
          <button
            type="button"
            onClick={() => setType('lost')}
            className={`py-2 rounded-xl text-xs font-heading font-bold transition-all ${
              type === 'lost'
                ? 'bg-rose-600 text-white shadow-soft-sm'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            I Lost Something
          </button>
          <button
            type="button"
            onClick={() => setType('found')}
            className={`py-2 rounded-xl text-xs font-heading font-bold transition-all ${
              type === 'found'
                ? 'bg-emerald-600 text-white shadow-soft-sm'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            I Found Something
          </button>
        </div>

        <Input
          label="Item Name / Title *"
          placeholder="e.g. Navy Blue Wildcraft Umbrella, Casio 991EX"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Select
            label="Category *"
            value={category}
            onChange={(e) => setCategory(e.target.value as LostFoundCategory)}
          >
            <option value="ID Card">ID Card</option>
            <option value="Wallet">Wallet / Purse</option>
            <option value="Electronics">Electronics (Earphones, USB, Watch)</option>
            <option value="Calculator">Scientific Calculator</option>
            <option value="Keys">Keys / Keychains</option>
            <option value="Clothing">Clothing / Jacket</option>
            <option value="Documents">Documents / Notebook</option>
            <option value="Other">Other Miscellaneous</option>
          </Select>

          <Input
            label="Location *"
            placeholder="e.g. Seminar Hall 1 or Canteen"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={errors.location}
          />
        </div>

        <div className="space-y-1 text-left">
          <label className="block text-xs font-semibold text-primary uppercase font-heading">
            Detailed Description & Identifying Marks *
          </label>
          <textarea
            rows={3}
            placeholder="Mention distinguishing stickers, scratch marks, roll number, brand..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-surface text-text placeholder:text-text-muted/60 border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-accent/30"
          />
          {errors.description && (
            <p className="text-xs text-rose-600 font-medium">{errors.description}</p>
          )}
        </div>

        {/* Photo Upload with live FileReader preview */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-semibold text-primary uppercase font-heading">
            Photo (Optional but Recommended)
          </label>
          {imagePreview ? (
            <div className="relative w-full h-32 rounded-xl overflow-hidden border border-border group">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImagePreview('')}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-primary/80 text-surface hover:bg-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-primary/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-muted/50 transition-colors">
              <Upload className="w-5 h-5 text-accent mb-1" />
              <span className="text-xs font-heading font-semibold text-primary">
                Upload image of item
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
            Submit Report
          </Button>
        </div>
      </form>
    </Modal>
  );
};

