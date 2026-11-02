import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { ImpactWidget } from '../components/common/ImpactWidget';
import { EmptyState } from '../components/common/EmptyState';
import { SellBookModal } from '../components/books/SellBookModal';
import {
  BookOpen,
  Search,
  Plus,
  LayoutGrid,
  List,
  Heart,
  MessageSquare,
  Sparkles,
  SlidersHorizontal,
  X,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useBookStore } from '../store/useBookStore';
import { useChatStore } from '../store/useChatStore';
import { BookCondition, BookType } from '../types';

export const BooksPage: React.FC = () => {
  const navigate = useNavigate();
  const { books, wishlist, toggleWishlist } = useBookStore();
  const { startOrOpenChat } = useChatStore();

  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [semester, setSemester] = useState('All');
  const [type, setType] = useState<string>('All');
  const [condition, setCondition] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (!book.isAvailable) return false;
        if (showWishlistOnly && !wishlist.includes(book.id)) return false;

        const matchesSearch =
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()) ||
          book.description.toLowerCase().includes(search.toLowerCase());

        const matchesDept = department === 'All' || book.department === department;
        const matchesSem = semester === 'All' || book.semester.toString() === semester;
        const matchesType = type === 'All' || book.type === type;
        const matchesCondition = condition === 'All' || book.condition === condition;

        return matchesSearch && matchesDept && matchesSem && matchesType && matchesCondition;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [books, wishlist, search, department, semester, type, condition, sortBy, showWishlistOnly]);

  const handleStartChat = (e: React.MouseEvent, book: any) => {
    e.preventDefault();
    e.stopPropagation();
    const chatId = startOrOpenChat(
      {
        id: book.sellerId,
        name: book.sellerName,
        avatar: book.sellerAvatar,
        role: `${book.sellerDepartment}`,
        online: true,
      },
      'book',
      book.title,
      book.id
    );
    navigate(`/app/chat`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              Used Books Marketplace
            </h1>
            <Badge variant="accent" size="sm">
              {books.filter((b) => b.isAvailable).length} Available
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Buy, rent, and trade course textbooks directly with seniors on campus.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant={showWishlistOnly ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            leftIcon={<Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-current' : ''}`} />}
          >
            Wishlist ({wishlist.length})
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsSellModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
            className="shadow-copper font-bold"
          >
            Sell a Book
          </Button>
        </div>
      </div>

      {/* Campus Sustainability Impact Metrics */}
      <ImpactWidget />

      {/* Search & Filter Bar */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-soft-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, author, or keyword (e.g. CLRS, Grewal, DBMS)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-muted/70 text-text placeholder:text-text-muted text-xs sm:text-sm pl-9 pr-8 py-2.5 rounded-xl border border-border focus:outline-none focus:border-primary focus:bg-surface focus:ring-2 focus:ring-accent/30"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-primary"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-surface' : 'text-text-muted hover:text-primary'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-surface' : 'text-text-muted hover:text-primary'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-40 py-2 text-xs"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </Select>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/60">
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="py-1.5 text-xs"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science & Engineering">CSE</option>
            <option value="Information Technology">IT</option>
            <option value="Electronics & Telecommunication">EXTC</option>
            <option value="Mechanical Engineering">Mech</option>
            <option value="Civil Engineering">Civil</option>
            <option value="Artificial Intelligence & Data Science">AI & DS</option>
            <option value="First Year / All Branches">First Year</option>
            <option value="Management / MBA">MBA</option>
          </Select>

          <Select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="py-1.5 text-xs"
          >
            <option value="All">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s.toString()}>
                Semester {s}
              </option>
            ))}
          </Select>

          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="py-1.5 text-xs"
          >
            <option value="All">All Types (Buy/Rent/Free)</option>
            <option value="Buy">For Sale</option>
            <option value="Rent">For Rent</option>
            <option value="Free">Free Giveaways</option>
          </Select>

          <Select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="py-1.5 text-xs"
          >
            <option value="All">All Conditions</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Acceptable">Acceptable</option>
          </Select>
        </div>
      </div>

      {/* Book Grid / List View */}
      {filteredBooks.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8 text-accent" />}
          title="No Books Found"
          description="Try broadening your department or semester filters, or be the first to list a textbook."
          actionLabel="List a Book Now"
          onAction={() => setIsSellModalOpen(true)}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => {
            const isWishlisted = wishlist.includes(book.id);

            return (
              <Card
                key={book.id}
                hover
                padded={false}
                className="flex flex-col justify-between group overflow-hidden"
              >
                <Link to={`/app/books/${book.id}`} className="block">
                  <div className="relative h-48 bg-surface-muted overflow-hidden">
                    <img
                      src={book.images[0]}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Condition & Type Pills */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded-md bg-primary/90 text-surface backdrop-blur-sm">
                        {book.type === 'Free' ? 'FREE' : book.type === 'Rent' ? 'RENT' : 'BUY'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface/90 text-primary backdrop-blur-sm border border-border">
                        {book.condition}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(book.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center text-primary hover:text-rose-600 transition-colors shadow-soft-sm"
                      title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-rose-600 text-rose-600' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                        Sem {book.semester} • {book.department.split('&')[0]}
                      </span>
                      <h3 className="font-heading font-bold text-sm text-primary line-clamp-1 group-hover:text-accent-hover transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-text-muted truncate mt-0.5">{book.author}</p>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        {book.price === 0 ? (
                          <span className="text-base font-heading font-extrabold text-emerald-700">
                            Free
                          </span>
                        ) : (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-heading font-extrabold text-primary">
                              ₹{book.price}
                            </span>
                            {book.originalPrice > book.price && (
                              <span className="text-xs text-text-muted line-through">
                                ₹{book.originalPrice}
                              </span>
                            )}
                            {book.type === 'Rent' && (
                              <span className="text-[10px] text-text-muted">
                                {book.rentPeriod || '/mo'}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        {book.price === 0
                          ? 'Donation'
                          : `${Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% off`}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Seller Bar & Chat Action */}
                <div className="p-3 bg-surface-muted/50 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={book.sellerAvatar}
                      alt={book.sellerName}
                      className="w-5 h-5 rounded-full object-cover shrink-0"
                    />
                    <span className="truncate text-[11px] text-text-muted">
                      {book.sellerName}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant="accent"
                    onClick={(e) => handleStartChat(e, book)}
                    className="text-xs px-2.5 py-1 rounded-lg gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Chat</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              hover
              padded={false}
              className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <Link to={`/app/books/${book.id}`} className="flex items-center gap-4 flex-1 min-w-0">
                <img
                  src={book.images[0]}
                  alt={book.title}
                  className="w-16 h-20 rounded-xl object-cover shrink-0 border border-border"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="primary" size="sm">
                      {book.type}
                    </Badge>
                    <Badge variant="surface" size="sm">
                      {book.condition}
                    </Badge>
                    <span className="text-[10px] text-text-muted">
                      Sem {book.semester} • {book.department}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-primary group-hover:text-accent-hover transition-colors truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-text-muted truncate">{book.author}</p>
                  <p className="text-[11px] text-text-muted flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-accent" /> {book.location}
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                <div className="text-right">
                  <span className="text-base font-heading font-extrabold text-primary block">
                    {book.price === 0 ? 'Free' : `₹${book.price}`}
                  </span>
                  {book.originalPrice > book.price && (
                    <span className="text-[11px] text-text-muted line-through block">
                      MRP ₹{book.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="accent"
                    onClick={(e) => handleStartChat(e, book)}
                    leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                  >
                    Chat
                  </Button>
                  <button
                    onClick={() => toggleWishlist(book.id)}
                    className="p-2 rounded-xl border border-border text-text-muted hover:text-rose-600 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlist.includes(book.id) ? 'fill-rose-600 text-rose-600' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Sell a Book Modal */}
      <SellBookModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
    </div>
  );
};

