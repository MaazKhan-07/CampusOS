export type Role = 'student' | 'admin' | 'recruiter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  collegeId: string;
  collegeName: string;
  department?: string;
  semester?: number;
  bio?: string;
  isVerified: boolean;
  studentId?: string;
  skills?: string[];
  isPremium?: boolean;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  domain: string;
  logo: string;
  totalStudents: number;
  verified: boolean;
}

export type BookCondition = 'Like New' | 'Good' | 'Fair' | 'Acceptable';
export type BookType = 'Buy' | 'Rent' | 'Free';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  department: string;
  semester: number;
  edition?: string;
  price: number;
  originalPrice: number;
  condition: BookCondition;
  type: BookType;
  rentPeriod?: string; // e.g. "per semester", "per month"
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  sellerDepartment: string;
  images: string[];
  description: string;
  isAvailable: boolean;
  createdAt: string;
  location: string;
}

export type LostFoundType = 'lost' | 'found';
export type LostFoundCategory = 'ID Card' | 'Wallet' | 'Electronics' | 'Keys' | 'Calculator' | 'Clothing' | 'Documents' | 'Other';
export type LostFoundStatus = 'open' | 'claimed';

export interface LostFoundItem {
  id: string;
  type: LostFoundType;
  title: string;
  category: LostFoundCategory;
  description: string;
  location: string;
  date: string;
  status: LostFoundStatus;
  image: string;
  reportedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  contactMaskedId: string;
  claimedAt?: string;
}

export type EventCategory = 'Workshops' | 'Sports' | 'Hackathons' | 'Cultural' | 'Seminars';

export interface EventScheduleItem {
  time: string;
  activity: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string; // ISO date string or YYYY-MM-DD
  time: string;
  venue: string;
  clubId: string;
  clubName: string;
  clubLogo: string;
  banner: string;
  totalSeats: number;
  registeredCount: number;
  isRegistered?: boolean;
  isReminderSet?: boolean;
  isApproved: boolean;
  price: number | 'Free';
  schedule: EventScheduleItem[];
  organizerEmail?: string;
  ticketId?: string;
}

export type InternshipType = 'Internship' | 'Part-time' | 'Campus Ambassador' | 'Training';
export type ApplicationStatus = 'Applied' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected';

export interface Internship {
  id: string;
  company: string;
  logo: string;
  role: string;
  type: InternshipType;
  stipend: string;
  location: string;
  isRemote: boolean;
  deadline: string;
  skills: string[];
  isFeatured: boolean;
  isSaved?: boolean;
  description: string;
  requirements: string[];
  perks: string[];
  applicantsCount: number;
  postedDate: string;
}

export interface Application {
  id: string;
  internshipId: string;
  userId: string;
  applicantName: string;
  applicantEmail: string;
  applicantCollege: string;
  applicantSkills: string[];
  resumeName: string;
  coverNote?: string;
  appliedAt: string;
  status: ApplicationStatus;
  company: string;
  role: string;
}

export interface ClubMember {
  id: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  role: 'President' | 'Vice President' | 'Secretary' | 'Lead' | 'Core Member' | 'Member';
  joinedDate: string;
  status: 'active' | 'pending';
}

export interface ClubAnnouncement {
  id: string;
  clubId: string;
  clubName: string;
  title: string;
  content: string;
  date: string;
  authorName: string;
  isPinned?: boolean;
}

export interface ClubMeeting {
  id: string;
  clubId: string;
  title: string;
  date: string;
  location: string;
  attendees: {
    studentId: string;
    studentName: string;
    present: boolean;
  }[];
}

export interface Club {
  id: string;
  name: string;
  category: string;
  logo: string;
  cover: string;
  description: string;
  leadId: string;
  leadName: string;
  leadRole: string;
  membersCount: number;
  isMember?: boolean;
  meetingSchedule: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  announcements?: ClubAnnouncement[];
}

export type NoteType = 'Notes' | 'PYQ' | 'Assignment' | 'Lab Manual';

export interface Note {
  id: string;
  title: string;
  subject: string;
  department: string;
  semester: number;
  type: NoteType;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  pages: number;
  uploaderId: string;
  uploaderName: string;
  uploaderAvatar: string;
  downloads: number;
  rating: number;
  ratingCount: number;
  uploadedAt: string;
  verifiedBadge: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  contextType: 'book' | 'lost_found' | 'general';
  contextTitle: string;
  contextId?: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    online: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export type NotificationType = 'event' | 'internship' | 'chat' | 'lost_item' | 'club' | 'college';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  link?: string;
  actionLabel?: string;
}

export interface CollegeNotice {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: 'Exam' | 'Academic' | 'Holiday' | 'Placement' | 'General';
  isPinned: boolean;
  priority: 'High' | 'Normal';
}

export interface RoadmapFeature {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  hasVoted?: boolean;
  status: 'In Planning' | 'Under Development' | 'Next Up';
}

export interface StudentDeal {
  id: string;
  title: string;
  partner: string;
  category: string;
  discount: string;
  code?: string;
  link: string;
  image: string;
  tag: string;
}

