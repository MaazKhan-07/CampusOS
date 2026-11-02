import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useBookStore } from '../../store/useBookStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';
import { BookCondition, BookType } from '../../types';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface SellBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellBookModal: React.FC<SellBookModalProps> = ({ isOpen, onClose }) => {
  const { addBook } = useBookStore();
  const { currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState('4');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState<BookCondition>('Good');
  const [type, setType] = useState<BookType>('Buy');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Central Library');
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

    if (!title.trim()) newErrors.title = 'Book title is required';
    if (!author.trim()) newErrors.author = 'Author name is required';
    if (type !== 'Free' && (!price || Number(price) < 0)) newErrors.price = 'Valid price is required';
    if (!description.trim()) newErrors.description = 'Please add a brief description';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addBook({
        title,
        author,
        department,
        semester: Number(semester),
        price: type === 'Free' ? 0 : Number(price),
        originalPrice: Number(originalPrice) || (type === 'Free' ? 0 : Number(price) * 1.8),
        condition,
        type,
        sellerId: currentUser?.id || 'user-student-1',
        sellerName: currentUser?.name || 'Aarav Sharma',
        sellerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        sellerRating: 5.0,
        sellerDepartment: `${currentUser?.department || 'CSE'}, Sem ${currentUser?.semester || 5}`,
        images: imagePreview
          ? [imagePreview]
          : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'],
        description,
        location: location || 'Campus Quad',
      });

      addToast({
        title: 'Book Listed for Sale!',
        description: `"${title}" is now visible to all students on campus.`,
        type: 'success',
      });

      setIsSubmitting(false);
      onClose();
      // Reset form
      setTitle('');
      setAuthor('');
      setPrice('');
      setOriginalPrice('');
      setDescription('');
      setImagePreview('');
      setErrors({});
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="List a Book on Campus Marketplace"
      description="Help a junior, clear your shelf, and recover textbook expenses."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Book Title *"
            placeholder="e.g. Introduction to Algorithms"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />

          <Input
            label="Author(s) *"
            placeholder="e.g. Cormen, Leiserson"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={errors.author}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Select
            label="Department"
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
            <option value="Management / MBA">Management / MBA</option>
          </Select>

          <Select
            label="Semester"
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

        <div className="grid grid-cols-3 gap-3.5">
          <Select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value as BookType)}
          >
            <option value="Buy">Sell (One-time)</option>
            <option value="Rent">Rent (Semester)</option>
            <option value="Free">Give Away Free</option>
          </Select>

          <Select
            label="Condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as BookCondition)}
          >
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Acceptable">Acceptable</option>
          </Select>

          {type !== 'Free' ? (
            <Input
              label="Price (₹) *"
              type="number"
              placeholder="e.g. 450"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={errors.price}
            />
          ) : (
            <div className="text-left space-y-1.5">
              <label className="block text-xs font-semibold text-primary uppercase font-heading">
                Price
              </label>
              <div className="py-2.5 px-3 bg-surface-muted rounded-xl text-xs font-bold text-accent">
                ₹0 (Free Donation)
              </div>
            </div>
          )}
        </div>

        <Input
          label="Pickup Location on Campus"
          placeholder="e.g. Central Library, 2nd Floor or Canteen"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="space-y-1 text-left">
          <label className="block text-xs font-semibold text-primary uppercase font-heading">
            Book Description & Condition Notes *
          </label>
          <textarea
            rows={3}
            placeholder="Mention edition, highlights, pen marks, or loose sheets..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-surface text-text placeholder:text-text-muted/60 border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-accent/30"
          />
          {errors.description && (
            <p className="text-xs text-rose-600 font-medium">{errors.description}</p>
          )}
        </div>

        {/* Photo Upload with Live FileReader Preview */}
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-semibold text-primary uppercase font-heading">
            Book Photo
          </label>
          {imagePreview ? (
            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-border group">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImagePreview('')}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-primary/80 text-surface hover:bg-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-primary/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-muted/50 transition-colors">
              <Upload className="w-6 h-6 text-accent mb-1.5" />
              <span className="text-xs font-heading font-semibold text-primary">
                Click to upload cover photo
              </span>
              <span className="text-[11px] text-text-muted">PNG, JPG up to 5MB</span>
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
            Publish Book Listing
          </Button>
        </div>
      </form>
    </Modal>
  );
};

