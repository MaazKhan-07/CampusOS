import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Select } from '../components/common/Select';
import { EmptyState } from '../components/common/EmptyState';
import { ReportLostFoundModal } from '../components/lostfound/ReportLostFoundModal';
import {
  Search,
  Plus,
  MapPin,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Tag,
} from 'lucide-react';
import { useLostFoundStore } from '../store/useLostFoundStore';
import { useChatStore } from '../store/useChatStore';
import { useToastStore } from '../store/useToastStore';
import { fireConfetti } from '../lib/confetti';
import { LostFoundCategory, LostFoundType } from '../types';
import { formatRelativeTime } from '../lib/utils';

export const LostFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, claimItem } = useLostFoundStore();
  const { startOrOpenChat } = useChatStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<LostFoundType>('lost');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'open' | 'claimed'>('All');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (item.type !== activeTab) return false;
      if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
      if (statusFilter !== 'All' && item.status !== statusFilter) return false;
      return true;
    });
  }, [items, activeTab, categoryFilter, statusFilter]);

  const handleContactSecurely = (item: any) => {
    startOrOpenChat(
      {
        id: item.reportedBy.id,
        name: item.reportedBy.name,
        avatar: item.reportedBy.avatar,
        role: `Reporter • ${item.contactMaskedId}`,
        online: true,
      },
      'lost_found',
      item.title,
      item.id
    );
    navigate('/app/chat');
  };

  const handleClaim = (itemId: string, title: string) => {
    claimItem(itemId);
    fireConfetti();
    addToast({
      title: 'Item Marked as Returned / Claimed! 🎉',
      description: `Great job! "${title}" has been safely returned to its owner.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              Campus Lost & Found
            </h1>
            <Badge variant="accent" size="sm">
              Masked Privacy Relay
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Safely recover lost IDs, wallets, keys, and devices without broadcasting private contact details.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => setIsReportModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
          className="shadow-copper font-bold"
        >
          Report an Item
        </Button>
      </div>

      {/* Main Tabs (Lost / Found) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface p-3 rounded-2xl border border-border shadow-soft-sm">
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('lost')}
            className={`px-5 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'lost'
                ? 'bg-rose-600 text-white shadow-soft-sm'
                : 'text-text-muted hover:text-primary hover:bg-surface-muted'
            }`}
          >
            <span>Lost Items</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
              {items.filter((i) => i.type === 'lost' && i.status === 'open').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('found')}
            className={`px-5 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'found'
                ? 'bg-emerald-700 text-white shadow-soft-sm'
                : 'text-text-muted hover:text-primary hover:bg-surface-muted'
            }`}
          >
            <span>Found Items</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
              {items.filter((i) => i.type === 'found' && i.status === 'open').length}
            </span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-1.5 text-xs w-full sm:w-44"
          >
            <option value="All">All Categories</option>
            <option value="ID Card">ID Card</option>
            <option value="Wallet">Wallet / Purse</option>
            <option value="Electronics">Electronics</option>
            <option value="Calculator">Calculator</option>
            <option value="Keys">Keys</option>
            <option value="Clothing">Clothing</option>
            <option value="Documents">Documents</option>
            <option value="Other">Other</option>
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="py-1.5 text-xs w-full sm:w-36"
          >
            <option value="All">All Status</option>
            <option value="open">Active (Open)</option>
            <option value="claimed">Returned / Claimed</option>
          </Select>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={<Search className="w-8 h-8 text-accent" />}
          title={`No ${activeTab === 'lost' ? 'Lost' : 'Found'} Items Found`}
          description="Everything seems to be accounted for right now, or try clearing your category filter."
          actionLabel="Report an Item"
          onAction={() => setIsReportModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isClaimed = item.status === 'claimed';

            return (
              <Card
                key={item.id}
                hover
                padded={false}
                className={`flex flex-col justify-between group overflow-hidden ${
                  isClaimed ? 'opacity-75 bg-surface/60' : ''
                }`}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-44 bg-surface-muted overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Status badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span
                        className={`text-[10px] uppercase font-heading font-extrabold px-2.5 py-1 rounded-lg backdrop-blur-md ${
                          isClaimed
                            ? 'bg-emerald-800 text-white'
                            : item.type === 'lost'
                            ? 'bg-rose-700 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {isClaimed ? 'Returned / Claimed' : item.type === 'lost' ? 'Lost' : 'Found'}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-primary/90 text-surface text-[10px] font-mono font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {item.contactMaskedId}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <Badge variant="accent" size="sm">
                        {item.category}
                      </Badge>
                      <span className="text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelativeTime(item.date)}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-sm text-primary group-hover:text-accent-hover transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <div className="pt-2 text-[11px] text-text-muted flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-3 bg-surface-muted/50 border-t border-border flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src={item.reportedBy.avatar}
                      alt={item.reportedBy.name}
                      className="w-5 h-5 rounded-full object-cover shrink-0"
                    />
                    <span className="text-[11px] text-text-muted truncate">
                      {item.reportedBy.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isClaimed && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClaim(item.id, item.title)}
                        className="text-[11px] px-2 py-1 text-emerald-800 hover:bg-emerald-50 border-emerald-300"
                        title="Mark as returned"
                      >
                        Claim
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() => handleContactSecurely(item)}
                      leftIcon={<MessageSquare className="w-3 h-3" />}
                      className="text-xs px-2.5 py-1"
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Report Modal */}
      <ReportLostFoundModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        defaultType={activeTab}
      />
    </div>
  );
};

