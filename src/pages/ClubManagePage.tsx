import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Users,
  Calendar,
  Pin,
  Download,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowLeft,
  PieChart as ChartIcon,
  Check,
} from 'lucide-react';
import { useClubStore } from '../store/useClubStore';
import { useEventStore } from '../store/useEventStore';
import { useToastStore } from '../store/useToastStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ClubManagePage: React.FC = () => {
  const { clubs, members, meetings, approveMember, rejectMember, postAnnouncement, markAttendance, createMeeting } =
    useClubStore();
  const { events } = useEventStore();
  const { addToast } = useToastStore();
  const { addNotification } = useNotificationStore();

  const [activeTab, setActiveTab] = useState<'members' | 'announcements' | 'attendance' | 'registrations'>('members');

  // Announcement Form Modal State
  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');

  // New Meeting State
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('2026-11-04');
  const [meetingLocation, setMeetingLocation] = useState('Seminar Hall 2');

  const selectedClub = clubs[0]; // Coding Club SIT (demo lead Aarav/Ananya)

  const handleApprove = (memberId: string, name: string) => {
    approveMember(memberId);
    addToast({
      title: 'Member Approved',
      description: `${name} has been enrolled as an active club member.`,
      type: 'success',
    });
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    postAnnouncement({
      clubId: selectedClub.id,
      clubName: selectedClub.name,
      title: annTitle,
      content: annContent,
      authorName: 'Aarav Sharma (Club Lead)',
      isPinned: true,
    });

    addToast({
      title: 'Announcement Published! 📢',
      description: 'Your broadcast was pushed to all 420 club members feeds.',
      type: 'success',
    });

    addNotification({
      type: 'club',
      title: `Coding Club: ${annTitle}`,
      message: annContent.slice(0, 80) + '...',
      link: `/app/clubs/${selectedClub.id}`,
    });

    setAnnTitle('');
    setAnnContent('');
    setIsAnnounceModalOpen(false);
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTitle.trim()) return;

    createMeeting({
      clubId: selectedClub.id,
      title: meetingTitle,
      date: meetingDate,
      location: meetingLocation,
      attendees: members.map((m) => ({
        studentId: m.id,
        studentName: m.name,
        present: true,
      })),
    });

    addToast({
      title: 'Meeting Scheduled',
      description: `Roster created for "${meetingTitle}".`,
      type: 'success',
    });

    setMeetingTitle('');
    setIsMeetingModalOpen(false);
  };

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Student Name,Roll No,Department,Semester,Status', ...members.map((m) => `${m.name},${m.id},${m.department},${m.semester},${m.status}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Coding_Club_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      title: 'CSV File Exported',
      description: 'Downloaded club member roster with verified student IDs.',
      type: 'success',
    });
  };

  // Attendance Chart data calculation
  const attendanceChartData = meetings.map((m) => {
    const total = m.attendees.length;
    const presentCount = m.attendees.filter((a) => a.present).length;
    const pct = total > 0 ? Math.round((presentCount / total) * 100) : 0;
    return {
      meeting: m.title.slice(0, 15) + '...',
      attendance: pct,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/app/clubs" className="text-text-muted hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-primary tracking-tight">
              Club Leader Operations Panel
            </h1>
            <Badge variant="accent" size="sm">
              {selectedClub.name}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Manage society registrations, track meeting attendances, and dispatch official announcements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export to CSV
          </Button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsAnnounceModalOpen(true)}
            leftIcon={<Pin className="w-3.5 h-3.5" />}
            className="shadow-copper font-bold"
          >
            Post Announcement
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-surface p-1.5 rounded-2xl border border-border shadow-soft-sm overflow-x-auto scrollbar-none">
        {[
          { id: 'members', label: `Member Roster (${members.length})`, icon: Users },
          { id: 'attendance', label: 'Attendance & Meetings', icon: Calendar },
          { id: 'registrations', label: 'Event Registrations', icon: Download },
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

      {/* 1. MEMBERS APPROVAL TABLE */}
      {activeTab === 'members' && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-base text-primary">
                Membership Verification & Roster
              </h3>
              <p className="text-xs text-text-muted">
                Review pending join requests from students with verified college credentials.
              </p>
            </div>
            <span className="text-xs font-bold text-accent">
              {members.filter((m) => m.status === 'pending').length} Pending Review
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Society Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div>
                      <strong className="text-primary font-heading block">{member.name}</strong>
                      <span className="text-text-muted text-[11px]">{member.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>Semester {member.semester}</TableCell>
                  <TableCell>
                    <Badge variant="surface" size="sm">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        member.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {member.status === 'active' ? 'Active Member' : 'Pending Approval'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {member.status === 'pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="accent"
                          onClick={() => handleApprove(member.id, member.name)}
                          className="text-xs px-2.5 py-1"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => rejectMember(member.id)}
                          className="text-xs px-2 py-1 text-rose-600 hover:bg-rose-50"
                        >
                          Decline
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* 2. ATTENDANCE TRACKER & RECHARTS CHART */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Recharts Attendance % Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-primary">
                  Society Meeting Attendance Trends
                </h3>
                <p className="text-xs text-text-muted">
                  Average turnout rate across semester committee meetings
                </p>
              </div>
              <Button
                variant="accent"
                size="sm"
                onClick={() => setIsMeetingModalOpen(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Log New Meeting
              </Button>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(1, 51, 40, 0.1)" />
                  <XAxis dataKey="meeting" stroke="#013328" fontSize={11} />
                  <YAxis unit="%" stroke="#013328" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F3EEE7',
                      borderColor: 'rgba(1, 51, 40, 0.2)',
                      borderRadius: '12px',
                    }}
                  />
                  <Bar dataKey="attendance" fill="#013328" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Interactive Checkbox Grid per meeting */}
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-primary">
                      {meeting.title}
                    </h4>
                    <span className="text-xs text-text-muted">
                      {meeting.date} • {meeting.location}
                    </span>
                  </div>
                  <Badge variant="accent" size="sm">
                    {meeting.attendees.filter((a) => a.present).length} / {meeting.attendees.length} Present
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 border-t border-border">
                  {meeting.attendees.map((attendee) => (
                    <label
                      key={attendee.studentId}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        attendee.present
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-surface-muted/40 border-border text-text-muted'
                      }`}
                    >
                      <span className="text-xs truncate mr-1">{attendee.studentName}</span>
                      <input
                        type="checkbox"
                        checked={attendee.present}
                        onChange={(e) =>
                          markAttendance(meeting.id, attendee.studentId, e.target.checked)
                        }
                        className="rounded border-border text-accent focus:ring-accent"
                      />
                    </label>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 3. EVENT REGISTRATIONS COLLECTION */}
      {activeTab === 'registrations' && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-base text-primary">
                HackCampus SIT 2026 Registration Desk
              </h3>
              <p className="text-xs text-text-muted">
                298 participants registered with verified student badges.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportCSV}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export All to CSV
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>College Domain</TableHead>
                <TableHead>Team Status</TableHead>
                <TableHead>Check-in</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 'TCK-HC26-0814', name: 'Aarav Sharma', domain: 'sit.edu.in', team: 'Team NeuralByte (Lead)', status: 'Verified' },
                { id: 'TCK-HC26-0815', name: 'Sneha Patel', domain: 'sit.edu.in', team: 'Team NeuralByte', status: 'Verified' },
                { id: 'TCK-HC26-0816', name: 'Rohan Deshmukh', domain: 'sit.edu.in', team: 'Team RoverX', status: 'Verified' },
                { id: 'TCK-HC26-0817', name: 'Devansh Verma', domain: 'sit.edu.in', team: 'Team GenPulse', status: 'Verified' },
                { id: 'TCK-HC26-0818', name: 'Tanmay Kulkarni', domain: 'sit.edu.in', team: 'Team TurboCAD', status: 'Verified' },
              ].map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <span className="font-mono font-bold text-accent">{row.id}</span>
                  </TableCell>
                  <TableCell>
                    <strong className="text-primary font-heading">{row.name}</strong>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-text-muted">
                    {row.domain}
                  </TableCell>
                  <TableCell>{row.team}</TableCell>
                  <TableCell>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Badge Issued
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Post Announcement Modal */}
      <Modal
        isOpen={isAnnounceModalOpen}
        onClose={() => setIsAnnounceModalOpen(false)}
        title="Broadcast Announcement to Society"
        description="Pushed immediately to all 420 club members on their home dashboard."
        maxWidth="md"
      >
        <form onSubmit={handleCreateAnnouncement} className="space-y-4 pt-2">
          <Input
            label="Announcement Title *"
            required
            placeholder="e.g. Mandatory Hackathon Briefing This Friday"
            value={annTitle}
            onChange={(e) => setAnnTitle(e.target.value)}
          />

          <div className="space-y-1 text-left">
            <label className="block text-xs font-semibold text-primary uppercase font-heading">
              Announcement Message *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Write the full message details, room numbers, Zoom links..."
              value={annContent}
              onChange={(e) => setAnnContent(e.target.value)}
              className="w-full bg-surface text-text placeholder:text-text-muted/60 border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => setIsAnnounceModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="font-bold">
              Dispatch Announcement
            </Button>
          </div>
        </form>
      </Modal>

      {/* Log Meeting Modal */}
      <Modal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        title="Log Club Meeting Roster"
        description="Create an attendance roll call record for accreditation auditing."
        maxWidth="md"
      >
        <form onSubmit={handleCreateMeeting} className="space-y-4 pt-2">
          <Input
            label="Meeting Title *"
            required
            placeholder="e.g. Winter Project Sprint Review"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
            />
            <Input
              label="Location"
              value={meetingLocation}
              onChange={(e) => setMeetingLocation(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => setIsMeetingModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="font-bold">
              Create Roster
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

