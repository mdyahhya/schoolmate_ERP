# School ERP & Mobile Application — Context & Project Master Plan

> **Date Created:** October 30, 2026  
> **Purpose:** Comprehensive project context, technical architecture, Supabase integration details, and workspace status for seamless continuation in new chat sessions.

---

## 1. Project Overview & Workspace Structure

This workspace hosts a hybrid educational management ecosystem consisting of:
1. **School ERP Desktop & Web Application** (Commercial offline-first multi-page Electron & Web app).
2. **School Android Mobile App** (Cross-platform Flutter application for students & parents).
3. **Supabase Cloud Backend** (Shared cloud database providing real-time data sync, push alerts, and fee ledger coordination between the ERP and mobile app).

### Directory Hierarchy
```text
D:\School\ (Parent Directory)
│
├── School ERP New (Directory Junction -> D:\School ERP New)
│   ├── assets/
│   │   ├── css/style.css
│   │   └── js/
│   │       ├── app.js               # Core ERP client logic
│   │       ├── browser-bridge.js    # Universal browser API fallback for electronAPI
│   │       ├── i18n.js              # Offline multi-language (EN, HI, MR, KN, UR)
│   │       ├── icons.js             # SVG icon repository
│   │       └── shell.js             # Shared navigation, theme, & shell components
│   ├── database/
│   │   ├── db.js                    # SQLite connection & helper routines
│   │   ├── migration.js             # Database migration engine
│   │   └── migrations/
│   │       ├── 001_initial_schema.sql
│   │       └── 002_mpa_compat.sql
│   ├── electron/
│   │   ├── main.js                  # Electron main process (IPC handlers, backups, window lifecycle)
│   │   └── preload.js               # IPC bridge exposing electronAPI
│   ├── finance.html                 # Fees ledger with live Supabase cloud sync & reminder dispatch
│   ├── index.html                   # ERP login portal
│   ├── server.js                    # Lightweight Node.js HTTP server for browser preview
│   └── package.json                 # Node dependencies and scripts
│
└── School Android App (Directory Junction -> D:\School ERP New\school_android_app)
    ├── lib/
    │   ├── main.dart                # App entrypoint, theme, provider setup, Supabase initialization
    │   ├── core/
    │   │   ├── constants/
    │   │   │   └── supabase_constants.dart # Cloud API keys, URLs, and table definitions
    │   │   └── theme/
    │   │       └── app_theme.dart   # Greenfield modern navy/blue design system
    │   ├── models/
    │   │   ├── student_model.dart   # Student profile schema
    │   │   ├── fee_model.dart       # Fee payment & invoice schema
    │   │   ├── notice_model.dart    # Circulars and push notifications schema
    │   │   └── attendance_model.dart# Daily attendance schema
    │   ├── providers/
    │   │   └── school_data_provider.dart # State provider, student switcher, payment action
    │   ├── services/
    │   │   └── supabase_service.dart# Supabase queries, streams, fee settlement
    │   ├── screens/
    │   │   ├── main_navigation_screen.dart # 4-tab bottom navigation shell
    │   │   ├── dashboard_screen.dart       # Student profile card, quick balance, circulars
    │   │   ├── fees_screen.dart            # Tabbed fees ledger (All, Pending, Paid Receipts)
    │   │   ├── attendance_screen.dart      # Attendance records and statistics
    │   │   └── notices_screen.dart         # Circulars, announcements & payment alerts
    │   └── widgets/
    │       ├── fee_card.dart        # Fee item card with pay action
    │       └── pay_fee_modal.dart   # Payment modal (UPI, Cards, NetBanking simulation)
    └── pubspec.yaml                 # Flutter dependencies (supabase_flutter, provider, etc.)
```

---

## 2. Supabase Cloud Configuration

Both the ERP application and Flutter mobile app communicate directly with Supabase:

- **Project URL:** `https://jjraluhoybumzpdikark.supabase.co`
- **Anon Public Key:**  
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcmFsdWhveWJ1bXpwZGlrYXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTMxODMsImV4cCI6MjA5Nzk2OTE4M30.N1_17ZWppfiHlyhZUjkmvoYf98_1qyiAWJ5uEihQx2M`
- **Primary School ID (Greenfield International Academy):**  
  `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`

### Supabase Table Schemas

1. **`schools`**:
   - Fields: `id` (UUID), `name`, `code`, `logo_url`, `theme_color`, `address`, `contact`, `email`.
2. **`students`**:
   - Fields: `id` (UUID), `school_id`, `full_name`, `roll_number`, `class_name`, `section`, `admission_number`, `guardian_name`, `guardian_phone`, `blood_group`.
3. **`fees`**:
   - Fields: `id` (UUID), `school_id`, `student_id`, `title`, `amount`, `due_date`, `status` (`paid`, `pending`), `receipt_number`, `created_at`.
4. **`notices`**:
   - Fields: `id` (UUID), `school_id`, `author_id`, `title`, `content`, `category` (`Fees`, `General`), `target_role` (`all`, `parent`), `attachment_url`, `created_at`.
5. **`attendance`**:
   - Fields: `id` (UUID), `school_id`, `student_id`, `date`, `status` (`present`, `absent`, `late`), `remarks`.
6. **`homework`**:
   - Fields: `id` (UUID), `school_id`, `class_name`, `section`, `subject`, `title`, `description`, `due_date`.

---

## 3. School ERP Application

### Key Capabilities
- **Desktop (Electron):** Runs with local SQLite database at `data/database/school-erp.db`. Features native database transactions, automated backup creation, and PDF report printing.
- **Web Browser Support:** `assets/js/browser-bridge.js` polyfills `window.electronAPI` so that all modules run seamlessly in any browser without errors.
- **Live HTTP Server:** `server.js` serves the application over HTTP:
  - Local URL: `http://localhost:3000`
  - Network URL: `http://192.168.1.3:3000` (Accessible on phones/tablets on the local WiFi)
- **Live Supabase Sync in `finance.html`:**
  - Pulls live fee registers and student lists directly from Supabase.
  - Recording a payment in the ERP updates the Supabase `fees` table and dispatches an instant receipt notice to the parent mobile app.
  - "Send Reminder" button pushes a fee reminder notification directly into the mobile app's circulars feed.
  - Periodic polling (12s) automatically reflects payments made by parents in the mobile app onto the desktop ERP ledger.

### NPM Scripts
- `npm start`: Launch Electron desktop application.
- `npm run live` / `npm run serve`: Launch the live HTTP server (`server.js`).
- `npm run pack` / `npm run dist`: Build Electron desktop distribution binaries.

---

## 4. School Android App (Flutter)

### Environment & Tooling
- **Flutter Version:** 3.24.5 (Channel stable)
- **Dart SDK:** 3.5.4
- **Target Platforms:** Android (Primary), iOS
- **Package Name:** `com.schoolerp.app.school_android_app`
- **Location:** `d:\School ERP New\school_android_app`

### Installed Packages (`pubspec.yaml`)
- `supabase_flutter: ^2.15.4` — Official client for REST queries & real-time streams.
- `provider: ^6.1.5+1` — Reactive state management.
- `google_fonts: ^6.3.0` — Clean Inter typography.
- `intl: ^0.20.2` — Currency (`₹` INR) & date formatting.
- `shared_preferences: ^2.5.3` — Local student profile selection persistence.

### App Screens & Features
1. **Home / Dashboard Screen (`dashboard_screen.dart`):**
   - Student ID profile card with avatar and class details.
   - Student switcher dialog (switching between enrolled children/students).
   - Fee summary banner (Total Paid, Remaining Due, Due status badge).
   - Quick attendance and notice summary statistics.
   - Live announcements feed.
2. **Fees Ledger Screen (`fees_screen.dart`):**
   - Filter tabs: *All Fees*, *Pending*, *Paid Receipts*.
   - Dynamic fee cards displaying amount, due date, receipt number, and status.
   - Interactive checkout modal (`pay_fee_modal.dart`) with UPI / Card / NetBanking options.
   - Real-time updates directly to Supabase (`status: 'paid'`).
3. **Attendance Screen (`attendance_screen.dart`):**
   - Aggregate statistics (Present count, Absent count, Attendance rate percentage).
   - Historical daily attendance log cards with presence badges and remarks.
4. **Notices & Circulars Screen (`notices_screen.dart`):**
   - Real-time list of school circulars and fee payment reminders sent from the ERP.
   - Category tags, formatted timestamps, and optional banner attachments.

---

## 5. Quick Commands Reference

| Action | Command / Location |
| :--- | :--- |
| **Start ERP in Desktop Electron** | `npm start` in `d:\School ERP New` |
| **Start ERP Live Web Server** | `node server.js` or `npm run live` |
| **Run Flutter Mobile App** | `flutter run` in `d:\School ERP New\school_android_app` |
| **Analyze Flutter Code** | `flutter analyze` in `d:\School ERP New\school_android_app` |
| **Add Flutter Packages** | `flutter pub add <package>` in `school_android_app` |
| **ERP Web Access** | `http://localhost:3000` |
| **ERP Finance Ledger** | `http://localhost:3000/finance.html` |
