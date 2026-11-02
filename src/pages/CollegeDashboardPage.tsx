import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/common/Table';
import {
  Building,
  Users,
  Calendar,
  BookOpen,
  TrendingUp,
  Pin,
  CheckCircle2,
  XCircle,
  Plus,
  ShieldCheck,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  mockAdminStats,
  mockDailyActiveUsers,
  mockEventsByCategory,
  mockTopClubs,
  mockFeatureUsage,
} from '../data/analytics';
import { mockNotices } from '../data/notices';
import { useEventStore } from '../store/useEventStore';
import { useClubStore } from '../store/useClubStore';
import { useToastStore } from '../store/useToastStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { CollegeNotice } from '../types';

export const CollegeDashboardPage: React.FC = () => {
  const { events, approveEvent } = useEventStore();
  const { clubs } = useClubStore();
  const { addToast } = useToastStore();
  const { addNotification } = useNotificationStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'events' | 'notices' | 'clubs'>('analytics');
  const [notices, setNotices] = useState<CollegeNotice[]>(mockNotices);

  // New Notice Modal State
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Exam' | 'Academic' | 'Holiday' | 'Placement' | 'General'>('Academic');
  const [isPinned, setIsPinned] = useState(true);

  // Pending events from clubs needing admin approval
  const pendingEvents = events.filter((e) => !e.isApproved);

  const handleApproveEvent = (eventId: string, title: string) => {
    approveEvent(eventId);
    addToast({
      title: 'Event Formally Approved! ✓',
      description: `"${title}" has been authorized and published to campus feeds.`,
      type: 'success',
    });

    addNotification({
      type: 'event',
      title: `Event Approved: ${title}`,
      message: 'Student Affairs has approved this society event.',
      link: `/app/events/${eventId}`,
    });
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;

    const newNot: CollegeNotice = {
      id: 'not-' + Date.now(),
      title: noticeTitle,
      content: noticeContent,
      category: noticeCategory,
      author: 'Office of Student Affairs & Dean',
      date: new Date().toISOString().split('T')[0],
      isPinned,
      priority: 'High',
    };

    setNotices([newNot, ...notices]);
    addToast({
      title: 'Notice Broadcasted to Campus! 📢',
      description: `"${noticeTitle}" pinned to student homepage feed.`,
      type: 'success',
    });

    addNotification({
      type: 'college',
      title: `Official College Notice: ${noticeTitle}`,
      message: noticeContent.slice(0, 90) + '...',
      link: '/app',
    });

    setNoticeTitle('');
    setNoticeContent('');
    setIsNoticeModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              College Administration Command Center
            </h1>
            <Badge variant="accent" size="sm">
              Sunrise Institute of Technology
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Real-time analytics, society governance, event approvals, and institutional notice broadcasts.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={() => setIsNoticeModalOpen(true)}
          leftIcon={<Pin className="w-3.5 h-3.5" />}
          className="shadow-copper font-bold"
        >
          Publish Official Notice
        </Button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading font-bold text-text-muted uppercase">
              Active Students
            </span>
            <Users className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-heading font-extrabold text-primary mt-1">
            {mockAdminStats.activeStudents.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +12.4% vs last semester
          </span>
        </Card>

        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading font-bold text-text-muted uppercase">
              Events This Month
            </span>
            <Calendar className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-heading font-extrabold text-primary mt-1">
            {mockAdminStats.eventsThisMonth}
          </div>
          <span className="text-[10px] text-text-muted mt-1 block">
            Across 10 campus societies
          </span>
        </Card>

        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading font-bold text-text-muted uppercase">
              Books Reused
            </span>
            <BookOpen className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-heading font-extrabold text-primary mt-1">
            {mockAdminStats.booksTraded}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
            ₹8.4 Lakhs saved by students
          </span>
        </Card>

        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading font-bold text-text-muted uppercase">
              Campus Engagement
            </span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-heading font-extrabold text-accent mt-1">
            {mockAdminStats.engagementRate}%
          </div>
          <span className="text-[10px] text-text-muted mt-1 block">
            Verified DAU to enrolled ratio
          </span>
        </Card>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 bg-surface p-1.5 rounded-2xl border border-border shadow-soft-sm overflow-x-auto scrollbar-none">
        {[
          { id: 'analytics', label: 'Institutional Analytics', icon: BarChart3 },
          { id: 'events', label: `Event Approvals (${pendingEvents.length})`, icon: Calendar },
          { id: 'notices', label: `Notice Board (${notices.length})`, icon: Pin },
          { id: 'clubs', label: `Clubs Audit (${clubs.length})`, icon: Building },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-surface shadow-soft-sm'
                  : 'text-text-muted hover:text-primary hover:bg-surface-muted'
              }`}
            >
              <Icon className="w-4 h-4 text-accent" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: RECHARTS ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Daily Active Users Line Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-primary">
                  Weekly Campus Traffic (Daily Active Users)
                </h3>
                <p className="text-xs text-text-muted">
                  Breakdown by students, faculty members, and campus recruiters
                </p>
              </div>
              <Badge variant="surface" size="sm">
                Last 7 Days
              </Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockDailyActiveUsers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(1, 51, 40, 0.1)" />
                  <XAxis dataKey="day" stroke="#013328" fontSize={12} />
                  <YAxis stroke="#013328" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F3EEE7',
                      borderColor: 'rgba(1, 51, 40, 0.2)',
                      borderRadius: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    name="Students"
                    stroke="#013328"
                    strokeWidth={3}
                    dot={{ fill: '#013328', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="faculty"
                    name="Faculty"
                    stroke="#CC8B65"
                    strokeWidth={2}
                    dot={{ fill: '#CC8B65', r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="recruiters"
                    name="Recruiters"
                    stroke="#0A4538"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Two-Column Charts: Events Donut + Top Clubs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Events by Category Donut */}
            <Card className="p-6">
              <h3 className="font-heading font-bold text-sm text-primary mb-1">
                Event Distribution by Category
              </h3>
              <p className="text-xs text-text-muted mb-4">Total campus activities distribution</p>

              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockEventsByCategory}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {mockEventsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#F3EEE7',
                        borderColor: 'rgba(1, 51, 40, 0.2)',
                        borderRadius: '12px',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Top Clubs by Member Count */}
            <Card className="p-6">
              <h3 className="font-heading font-bold text-sm text-primary mb-1">
                Top Student Societies by Enrolled Roster
              </h3>
              <p className="text-xs text-text-muted mb-4">Official club membership census</p>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockTopClubs} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(1, 51, 40, 0.1)" />
                    <XAxis type="number" stroke="#013328" fontSize={11} />
                    <YAxis dataKey="name" type="category" stroke="#013328" fontSize={11} width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#F3EEE7',
                        borderColor: 'rgba(1, 51, 40, 0.2)',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar dataKey="members" fill="#CC8B65" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Feature Usage Bar Chart */}
          <Card className="p-6">
            <h3 className="font-heading font-bold text-sm text-primary mb-1">
              Weekly Feature Utilization (Interactions)
            </h3>
            <p className="text-xs text-text-muted mb-4">
              Where students spend the most time on CampusOS
            </p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockFeatureUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(1, 51, 40, 0.1)" />
                  <XAxis dataKey="feature" stroke="#013328" fontSize={11} />
                  <YAxis stroke="#013328" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F3EEE7',
                      borderColor: 'rgba(1, 51, 40, 0.2)',
                      borderRadius: '12px',
                    }}
                  />
                  <Bar dataKey="weeklyUses" fill="#013328" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: PENDING EVENT APPROVALS */}
      {activeTab === 'events' && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-base text-primary">
                Pending Society Event Requisitions
              </h3>
              <p className="text-xs text-text-muted">
                Student clubs require dean office sanction before venue allotment.
              </p>
            </div>
            <span className="text-xs font-bold text-accent">
              {pendingEvents.length} Awaiting Authorization
            </span>
          </div>

          {pendingEvents.length === 0 ? (
            <div className="p-8 text-center text-xs text-text-muted">
              All submitted club events have been reviewed and approved!
            </div>
          ) : (
            <div className="space-y-3">
              {pendingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl bg-surface-muted/60 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="accent" size="sm">
                        {evt.category}
                      </Badge>
                      <span className="text-xs font-bold text-primary">{evt.clubName}</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-primary">{evt.title}</h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      Proposed: {evt.date} • {evt.time} • Venue: {evt.venue}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() => handleApproveEvent(evt.id, evt.title)}
                      className="font-bold"
                    >
                      Authorize & Publish
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* TAB 3: OFFICIAL NOTICES MANAGEMENT */}
      {activeTab === 'notices' && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-base text-primary">
                Active College Notices & Circulars
              </h3>
              <p className="text-xs text-text-muted">
                Notices appear directly at the top of every student's daily home feed.
              </p>
            </div>
            <Button
              size="sm"
              variant="accent"
              onClick={() => setIsNoticeModalOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              New Circular
            </Button>
          </div>

          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-4 rounded-2xl bg-surface-muted/50 border border-border flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={notice.isPinned ? 'accent' : 'surface'} size="sm">
                      {notice.category}
                    </Badge>
                    {notice.isPinned && (
                      <span className="text-[10px] font-bold text-accent flex items-center gap-1">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                    <span className="text-xs text-text-muted">• {notice.date}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-primary">{notice.title}</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">{notice.content}</p>
                  <span className="text-[10px] text-text-muted block mt-2 font-medium">
                    Issued by: {notice.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: CLUBS ADMINISTRATION AUDIT TABLE */}
      {activeTab === 'clubs' && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-base text-primary">
                Student Organizations Governance
              </h3>
              <p className="text-xs text-text-muted">
                Accreditation data for NAAC / NIRF annual university reports.
              </p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Society Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Student Lead</TableHead>
                <TableHead>Roster Size</TableHead>
                <TableHead>Accreditation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubs.map((club) => (
                <TableRow key={club.id}>
                  <TableCell>
                    <strong className="text-primary font-heading block">{club.name}</strong>
                  </TableCell>
                  <TableCell>{club.category}</TableCell>
                  <TableCell>{club.leadName} ({club.leadRole})</TableCell>
                  <TableCell>{club.membersCount} Members</TableCell>
                  <TableCell>
                    <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-accent" /> Compliant
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Publish Notice Modal */}
      <Modal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        title="Issue Official Campus Notice"
        description="Broadcasted to all enrolled students and faculty on their dashboards."
        maxWidth="md"
      >
        <form onSubmit={handleCreateNotice} className="space-y-4 pt-2">
          <Input
            label="Notice Subject / Headline *"
            required
            placeholder="e.g. End Semester Exam Fee Deadline Extension"
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
          />

          <Select
            label="Notice Category"
            value={noticeCategory}
            onChange={(e) => setNoticeCategory(e.target.value as any)}
          >
            <option value="Exam">Examination</option>
            <option value="Academic">Academic Schedule</option>
            <option value="Holiday">Holidays & Closures</option>
            <option value="Placement">Training & Placement</option>
            <option value="General">General Campus Circular</option>
          </Select>

          <div className="space-y-1 text-left">
            <label className="block text-xs font-semibold text-primary uppercase font-heading">
              Notice Body Text *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Provide exact instructions, room allotments, or website links..."
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              className="w-full bg-surface text-text placeholder:text-text-muted/60 border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-heading font-semibold text-primary cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="rounded border-border text-accent focus:ring-accent"
            />
            <span>Pin to top banner of student feed</span>
          </label>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => setIsNoticeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="font-bold">
              Dispatch Notice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

