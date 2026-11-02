# CampusOS – One App for College Life

> *"Everything a student needs, all in one place."*

CampusOS is a complete, production-grade, fully responsive web application built for college life. It replaces the chaotic fragmentation of 15 WhatsApp groups, scattered Telegram PDF channels, lost Instagram event posters, and physical notice boards with a single, verified, unified digital operating system.For Educational purpose.

---

## 🏛️ Project Overview

- **Primary College Node**: Sunrise Institute of Technology, Mumbai (SIT Mumbai)
- **Tagline**: *"Everything a student needs, all in one place."*
- **Aesthetic**: Warm earthy editorial palette (`#E3DCD2` background, `#013328` deep forest green, `#CC8B65` warm copper accent).
- **Architecture**: Single Page Application with persistent client-side state in `localStorage` via Zustand persist middleware.

---

## ⚡ Tech Stack

- **Framework**: React 18 + Vite + TypeScript (Strict mode)
- **Styling**: Tailwind CSS with custom CSS variables & dynamic design tokens
- **Routing**: React Router DOM v6 with lazy-loaded chunk splitting
- **State Management**: Zustand v4 + `persist` middleware (full offline/refresh durability)
- **Icons**: Lucide React
- **Motion & UI**: Framer Motion & CSS custom micro-interactions
- **Analytics & Data Viz**: Recharts (LineChart, BarChart, PieChart)
- **Typography**: Google Fonts: *Plus Jakarta Sans* (headings) & *Inter* (body)
- **Confetti Engine**: `canvas-confetti` for celebratory interactions (claiming lost items, event ticket issuing, premium upgrades)

---


## 👥 Demo Roles & Switcher

A **"Demo as..."** switcher is available directly in the top navigation bar profile dropdown and login page:

1. **Student (Default)**:
   - **Name**: Aarav Sharma
   - **Credentials**: `aarav.sharma@sit.edu.in`
   - **Program**: B.Tech CSE, Semester 5
   - **View**: Personalized home feed, book trading, lost & found claims, ticket wallet, internship tracker, topper notes.
2. **College Admin / Dean**:
   - **Name**: Dr. Radhika Sen
   - **Credentials**: `dean.students@sit.edu.in`
   - **Role**: Dean of Student Affairs & Club Leader
   - **View**: Institutional KPI metrics, DAU traffic line charts, event sanctioning queue, official circular broadcasts, society compliance audits.
3. **Recruiter / Corporate Talent Partner**:
   - **Name**: Vikram Mehta
   - **Credentials**: `vikram.m@innovatelabs.in`
   - **Role**: Tech Talent Partner @ Zepto / InnovateLabs
   - **View**: Candidate ATS pipeline, status changer dropdowns, verified talent search by branch and skills, campus hiring drives.

---

## 🚀 Key Modules & End-to-End Flows

### 1. Home Dashboard (`/app`)
- Dynamic greeting based on time of day.
- Pinned official college circular strip from the Dean's office.
- Quick action tiles for one-tap posting.
- Active internship application stage progress tracker.
- "Happening This Week" campus events carousel.
- Trending used books & recent lost items.
- Campus Sustainability Impact Widget (books reused, money saved, paper waste avoided).

### 2. Used Books Marketplace (`/app/books`, `/app/books/:id`)
- Grid and list view toggles.
- Filter by department, semester (1–8), type (*Buy*, *Rent*, *Free Giveaway*), condition (*Like New*, *Good*, *Fair*), and price sorting.
- Live search with instant feedback.
- Detail page with cover photo gallery, condition notes, verified seller badge, and direct in-app chat launch.
- "Sell a Book" multi-field form with live `FileReader` image preview.

### 3. Lost & Found Hub (`/app/lost-found`)
- Segmented *Lost* vs *Found* tabs.
- Photo upload with category filtering (*ID Card*, *Wallet*, *Electronics*, *Keys*, *Calculator*, *Documents*).
- Masked in-app chat button ensuring personal phone numbers remain private.
- "Mark as Returned" button with celebratory confetti animations.

### 4. Campus Events & Digital Tickets (`/app/events`, `/app/events/:id`)
- Switch between interactive card grid and full month calendar view.
- Filter by *Workshops*, *Hackathons*, *Cultural*, *Sports*, and *Seminars*.
- Real-time seat inventory calculation.
- One-click event registration generating a verified digital pass with unique ticket ID and custom QR code matrix.
- Remind-me notifications toggle.

### 5. Verified Internships & Jobs (`/app/internships`, `/app/internships/:id`)
- High-growth startup roles (Zepto, Razorpay, CRED, Swiggy, Groww, Postman).
- Stipends clearly listed in ₹ with zero scam postings.
- One-click application modal with verified resume attachment.
- 4-stage pipeline tracker (*Applied* → *Shortlisted* → *Interview* → *Offer*).
- Priority application badge indicator for premium members.

### 6. Clubs & Societies Hub (`/app/clubs`, `/app/clubs/:id`, `/app/clubs/manage`)
- Directory of 10 student organizations (*Coding Club*, *Robotics*, *E-Cell*, *Cultural Committee*, etc.).
- Instant Join / Leave toggle.
- **Club Leader Operations Panel (`/app/clubs/manage`)**:
  - Member verification table with Approve/Decline actions.
  - Meeting scheduler & interactive attendance checkbox grid with Recharts turnout percentage visualization.
  - Hackathon & event attendee roster with one-click **CSV export**.
  - Announcement broadcasting pushed directly to member feeds.

### 7. Peer Notes & PYQ Archive (`/app/notes`)
- Organized hierarchically by *Department* → *Semester* → *Subject*.
- Topper handwritten notes, past 5-year solved papers, and lab manuals with outputs.
- Simulated PDF preview card with document excerpts and peer star ratings.
- Free-tier storage meter (*"3 of 5 note slots used"*) with seamless upgrade paths.

### 8. Masked Messaging (`/app/chat`)
- Two-pane desktop chat interface (conversation list + active message thread).
- Context headers display listing provenance (e.g. *"About: Introduction to Algorithms (CLRS)"*).
- Simulated peer typing reply after 1.5 seconds.

### 9. Notification Center (`/app/notifications`)
- Categorized by *Today* and *Earlier*.
- Grouped by event passes, internship status movements, club alerts, and circulars.
- Automated simulated campus alerts dispatched every ~45 seconds.

### 10. Student Premium & Resume Builder (`/app/premium`)
- Free vs Premium tier comparison with Monthly (`₹99`) and Annual (`₹199`) toggle.
- Mock checkout modal for zero-friction demo upgrades.
- **ATS Resume Builder**: Two-pane live interactive form that renders a clean, printable single-page engineering resume with browser print export.

### 11. College Admin Dashboard (`/app/college-dashboard`)
- Institutional KPI scorecards (Active Students, Events, Reused Books, Campus Engagement).
- Recharts visualizations: DAU traffic trendline, category breakdown donut, society roster rankings, and feature usage distribution.
- Sanctioning queue for pending club events.
- Notice broadcast modal for high-priority campus announcements.

### 12. Recruiter Portal (`/app/recruiter`)
- Candidate ATS pipeline table with stage changer dropdowns.
- Talent directory searching across verified students by branch and skills.
- Post-a-job form with copper "Featured" listing spotlight.
- Campus hiring drive schedule tracker.

### 13. Monetization & Affiliate Surfaces (`/app`)
- Tasteful sponsored card slot in feeds (hidden for Premium users).
- Student Perks & Deals grid featuring verified discounts on Apple, GitHub, Coursera, Spotify, and Notion.

### 14. Roadmap & Future Features (`/app/coming-soon`)
- Interactive community backlog featuring smart attendance bunker calculators, AI flashcard engines, live bus GPS tracking, and hostel laundry booking.
- Real-time upvoting buttons persisted in `localStorage`.

---

## 💼 Business Model & Monetization

CampusOS is structured with a sustainable multi-sided business model:

1. **B2C Student Premium Subscription (SaaS)**:
   - Pricing: `₹99/month` or `₹199/year`.
   - Value: Unlimited cloud note storage, priority job applicant spotlight, ATS resume builder, offline bookmarks, and ad-free browsing.
2. **B2B College Enterprise Licenses**:
   - Pricing: `₹50,000` to `₹2,00,000` / year / campus.
   - Value: Official domain SSO gating, centralized administrative notice board, student society governance tools, audit-ready NAAC/NIRF accreditation reports, and event ticketing control.
3. **Recruiter & Corporate Talent Partnerships**:
   - Pricing: Featured listing sponsorship (`₹1,500` / posting) and campus drive coordination packages (`₹25,000` / drive).
   - Value: Direct access to verified engineering candidates filtered by department, semester, and validated technical skills.
4. **Tasteful Contextual Sponsorships**:
   - Native sponsored cards for student loans, laptops, GRE coaching, and certifications (removable via Premium).
5. **Student Affiliate Marketing**:
   - Revenue-sharing affiliate partnerships with education and tech providers (Apple Education, Coursera, GitHub, Spotify Student).

---

## 📁 Folder Structure

```
CampusOS/
├── public/
│   ├── logo.svg              # CampusOS arch logo brandmark
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/           # Button, Card, Badge, Input, Select, Modal, Tabs, Table, Stepper, Skeleton, Avatar, etc.
│   │   ├── layout/           # Sidebar, TopBar, MobileNav, FloatingActionBtn
│   │   ├── books/            # SellBookModal, etc.
│   │   ├── lostfound/        # ReportLostFoundModal, etc.
│   │   ├── events/           # CreateEventModal, TicketModal, etc.
│   │   └── notes/            # UploadNoteModal, etc.
│   ├── data/                 # Realistic Indian college mock data
│   │   ├── colleges.ts       # 6 top universities
│   │   ├── users.ts          # 40+ verified student & faculty accounts
│   │   ├── books.ts          # 24 textbooks across branches & semesters
│   │   ├── lostFound.ts      # 16 lost & found items
│   │   ├── events.ts         # 20 events with relative dynamic dates
│   │   ├── internships.ts    # 18 tech internships & applications
│   │   ├── clubs.ts          # 10 student societies with members & attendance
│   │   ├── notes.ts          # 30 topper notes & past papers
│   │   ├── chats.ts          # 8 pre-seeded buyer-seller masked chats
│   │   ├── notifications.ts  # 25 grouped notification records
│   │   ├── analytics.ts      # Recharts metrics datasets
│   │   ├── notices.ts        # Official college circulars
│   │   ├── deals.ts          # Student affiliate perks
│   │   └── roadmap.ts        # Upvotable feature backlog
│   ├── layouts/
│   │   ├── AppLayout.tsx     # Shell: Left sidebar + Topbar + Floating button + Toasts + Mobile Nav
│   │   └── PublicLayout.tsx  # Landing & auth shell
│   ├── lib/
│   │   ├── utils.ts          # cn helper, formatCurrency, relative time
│   │   └── confetti.ts       # canvas-confetti wrapper
│   ├── pages/                # All application screens
│   │   ├── LandingPage.tsx   # 14-section marketing landing page
│   │   ├── LoginPage.tsx     # Mock login with 1-click role buttons
│   │   ├── SignupPage.tsx    # College domain verification signup
│   │   ├── DashboardPage.tsx # Student home feed
│   │   ├── BooksPage.tsx     # Used books marketplace
│   │   ├── BookDetailPage.tsx# Book detail with gallery & chat
│   │   ├── LostFoundPage.tsx # Lost & found hub
│   │   ├── EventsPage.tsx    # Events list + month calendar
│   │   ├── EventDetailPage.tsx # Event detail & registration ticket
│   │   ├── InternshipsPage.tsx # Internship board
│   │   ├── InternshipDetailPage.tsx # Internship detail & 1-click apply
│   │   ├── ClubsPage.tsx     # Clubs directory
│   │   ├── ClubDetailPage.tsx# Club roster & announcements
│   │   ├── ClubManagePage.tsx# Club leader attendance & CSV export
│   │   ├── NotesPage.tsx     # Hierarchical notes repository & preview
│   │   ├── ChatPage.tsx      # Two-pane masked messaging with typing simulation
│   │   ├── NotificationsPage.tsx # Notification center
│   │   ├── ProfilePage.tsx   # Profile & demo data reset
│   │   ├── PremiumPage.tsx   # Pricing & interactive ATS resume builder
│   │   ├── CollegeDashboardPage.tsx # Admin analytics & event approval
│   │   ├── RecruiterPage.tsx # Recruiter candidate tracking & talent search
│   │   ├── ComingSoonPage.tsx# Feature roadmap with persistent voting
│   │   └── NotFoundPage.tsx  # 404 page
│   ├── store/                # Zustand stores with persist middleware
│   │   ├── useAuthStore.ts
│   │   ├── useBookStore.ts
│   │   ├── useLostFoundStore.ts
│   │   ├── useEventStore.ts
│   │   ├── useInternshipStore.ts
│   │   ├── useClubStore.ts
│   │   ├── useNoteStore.ts
│   │   ├── useChatStore.ts
│   │   ├── useNotificationStore.ts
│   │   ├── useRoadmapStore.ts
│   │   └── useToastStore.ts
│   ├── types/                # TypeScript interfaces
│   ├── App.tsx               # Route definitions & lazy code-splitting
│   ├── index.css             # Tailwind directives & CSS design tokens
│   └── main.tsx              # React DOM entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Setup & Local Execution

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Steps to Run

1. Clone or navigate to the repository directory:
   ```bash
   cd "CampusOS"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

5. To create an optimized production build:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📄 License

Built for demonstration and educational purposes under the MIT License.
© 2026 CampusOS Technologies.

