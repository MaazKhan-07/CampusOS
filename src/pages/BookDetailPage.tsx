import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { useBookStore } from '../store/useBookStore';
import { useChatStore } from '../store/useChatStore';
import { useToastStore } from '../store/useToastStore';
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Star,
  Share2,
  Calendar,
  BookOpen,
} from 'lucide-react';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, wishlist, toggleWishlist } = useBookStore();
  const { startOrOpenChat } = useChatStore();
  const { addToast } = useToastStore();

  const book = books.find((b) => b.id === id);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!book) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-heading font-bold text-primary">Book Not Found</h2>
        <p className="text-xs text-text-muted">This book listing may have been sold or removed.</p>
        <Link to="/app/books">
          <Button variant="accent">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(book.id);

  const handleStartChat = () => {
    const chatId = startOrOpenChat(
      {
        id: book.sellerId,
        name: book.sellerName,
        avatar: book.sellerAvatar,
        role: book.sellerDepartment,
        online: true,
      },
      'book',
      book.title,
      book.id
    );
    navigate('/app/chat');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Link Copied',
      description: 'Book listing link copied to clipboard.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          to="/app/books"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/3] rounded-3xl bg-surface-muted overflow-hidden border border-border shadow-soft-sm">
            <img
              src={book.images[selectedImageIdx] || book.images[0]}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="primary" size="md">
                {book.type}
              </Badge>
              <Badge variant="surface" size="md">
                {book.condition}
              </Badge>
            </div>
          </div>

          {/* Thumbnail list if multiple */}
          {book.images.length > 1 && (
            <div className="flex gap-2">
              {book.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIdx === idx ? 'border-accent' : 'border-border opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Book Details & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-text-muted mb-1">
              <span>Department: {book.department}</span>
              <span>Semester {book.semester}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary leading-tight">
              {book.title}
            </h1>
            <p className="text-sm text-text-muted mt-1">By {book.author}</p>
          </div>

          {/* Pricing Block */}
          <div className="p-4 rounded-2xl bg-surface border border-border flex items-baseline justify-between shadow-soft-sm">
            <div>
              <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">
                {book.type === 'Rent' ? 'Rent Price' : 'Asking Price'}
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-heading font-extrabold text-primary">
                  {book.price === 0 ? 'Free' : `₹${book.price}`}
                </span>
                {book.originalPrice > book.price && (
                  <span className="text-sm text-text-muted line-through">
                    ₹{book.originalPrice}
                  </span>
                )}
                {book.type === 'Rent' && (
                  <span className="text-xs text-text-muted">{book.rentPeriod || 'per month'}</span>
                )}
              </div>
            </div>

            {book.originalPrice > book.price && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Save ₹{book.originalPrice - book.price}
              </span>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Button
              variant="accent"
              size="lg"
              onClick={handleStartChat}
              leftIcon={<MessageSquare className="w-5 h-5" />}
              className="flex-1 font-bold shadow-copper"
            >
              Chat With Seller
            </Button>

            <button
              onClick={() => toggleWishlist(book.id)}
              className="p-3.5 rounded-2xl border border-border bg-surface text-primary hover:text-rose-600 transition-colors shadow-soft-sm"
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-3.5 rounded-2xl border border-border bg-surface text-primary hover:text-accent transition-colors shadow-soft-sm"
              title="Share listing"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Pickup Details */}
          <div className="p-4 rounded-2xl bg-surface-muted/60 border border-border space-y-2 text-xs">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Campus Handover Location: {book.location}</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>In-person verification before payment. Zero advance deposits.</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-sm text-primary uppercase tracking-wider">
              Seller Description & Condition
            </h4>
            <p className="text-xs text-text-muted leading-relaxed whitespace-pre-line bg-surface p-4 rounded-2xl border border-border">
              {book.description}
            </p>
          </div>

          {/* Seller Profile Card */}
          <div className="p-4 rounded-2xl bg-surface border border-border flex items-center justify-between shadow-soft-sm">
            <div className="flex items-center gap-3">
              <Avatar
                src={book.sellerAvatar}
                name={book.sellerName}
                size="md"
                isVerified={true}
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="font-heading font-bold text-xs text-primary">
                    {book.sellerName}
                  </h5>
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                </div>
                <p className="text-[11px] text-text-muted">{book.sellerDepartment}</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold mt-0.5">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{book.sellerRating} / 5.0 Seller Rating</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleStartChat}>
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

