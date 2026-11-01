-- =============================================================================
-- MIGRATION 002: MPA Compatibility Layer
-- Adds/aliases tables and columns to match the HTML module pages.
-- All CREATE TABLE and INSERT statements are guarded with IF NOT EXISTS / OR IGNORE.
-- ALTER TABLE statements are split to individual steps (each transaction handles 1).
-- NOTE: SQLite does not support "ADD COLUMN IF NOT EXISTS", so we handle this
--       by checking PRAGMA table_info at the app level. This migration
--       creates new clean tables where necessary to avoid ALTER conflicts.
-- =============================================================================

-- 1. ADMISSIONS TABLE (MPA-compatible flat structure)
CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_name TEXT NOT NULL,
    parent_name TEXT,
    contact_phone TEXT,
    class_requested TEXT,
    status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending','Follow-up','Registered','Admitted','Rejected')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate existing enquiries into admissions (safe)
INSERT OR IGNORE INTO admissions (id, candidate_name, parent_name, contact_phone, status, created_at)
SELECT id, candidate_name, parent_name, contact_number, status, created_at FROM enquiries;


-- 2. NOTICES TABLE (MPA communication.html)
CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT,
    audience TEXT DEFAULT 'All',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate existing announcements
INSERT OR IGNORE INTO notices (id, title, body, audience, created_at)
SELECT id, title, content, target_audience, created_at FROM announcements;


-- 3. HOSTEL VISITORS TABLE (MPA hostel.html)
CREATE TABLE IF NOT EXISTS hostel_visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_name TEXT NOT NULL,
    contact_phone TEXT,
    purpose TEXT,
    host_name TEXT,
    visit_date DATE DEFAULT (date('now')),
    check_in_time TEXT,
    check_out_time TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from visitor_register
INSERT OR IGNORE INTO hostel_visitors (id, visitor_name, contact_phone, purpose, visit_date, check_in_time, check_out_time)
SELECT id, visitor_name, contact_number, purpose, date(check_in), time(check_in), time(check_out)
FROM visitor_register;


-- 4. FEE PAYMENTS V2 (MPA finance.html — flat, no allocation_id)
CREATE TABLE IF NOT EXISTS fee_payments_mpa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    fee_type_id INTEGER,
    amount_paid REAL NOT NULL,
    payment_date DATE DEFAULT (date('now')),
    payment_method TEXT DEFAULT 'Cash',
    receipt_number TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE SET NULL,
    FOREIGN KEY(fee_type_id) REFERENCES fee_types(id) ON DELETE SET NULL
);

-- Migrate existing payments via allocations
INSERT OR IGNORE INTO fee_payments_mpa (id, student_id, fee_type_id, amount_paid, payment_date, payment_method)
SELECT fp.id, sfa.student_id, sfa.fee_type_id, fp.amount_paid, fp.payment_date, fp.payment_method
FROM fee_payments fp
LEFT JOIN student_fee_allocations sfa ON fp.allocation_id = sfa.id;


-- 5. EXAM RESULTS V2 (MPA exams.html — flat with exam_id directly)
CREATE TABLE IF NOT EXISTS exam_results_mpa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    subject_id INTEGER,
    max_marks REAL DEFAULT 100,
    marks_obtained REAL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exam_id, student_id, subject_id),
    FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE CASCADE,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Migrate existing exam results
INSERT OR IGNORE INTO exam_results_mpa (id, exam_id, student_id, subject_id, max_marks, marks_obtained, remarks)
SELECT er.id, es.exam_id, er.student_id, es.subject_id, es.max_marks, er.marks_obtained, er.remarks
FROM exam_results er
JOIN exam_schedules es ON er.exam_schedule_id = es.id;


-- 6. VIEWS to alias old tables with new column names

-- fee_types_mpa view: exposes fee_name, amount alongside original type_name, default_amount
CREATE VIEW IF NOT EXISTS fee_types_mpa AS
    SELECT id, type_name AS fee_name, default_amount AS amount, created_at FROM fee_types;

-- teachers_mpa view: exposes contact_phone, joining_date
CREATE VIEW IF NOT EXISTS teachers_mpa AS
    SELECT id, employee_id, full_name, gender, dob AS date_of_birth,
           qualification, department, contact_number AS contact_phone,
           email, joining_date, status, created_at FROM teachers;

-- staff_mpa view: exposes contact_phone
CREATE VIEW IF NOT EXISTS staff_mpa AS
    SELECT id, employee_id, full_name, gender, role, department,
           contact_number AS contact_phone, email, joining_date, status, created_at FROM staff;

-- vehicles_mpa view: exposes registration_no, model
CREATE VIEW IF NOT EXISTS vehicles_mpa AS
    SELECT id, registration_number AS registration_no, vehicle_model AS model,
           capacity, driver_name, driver_phone, created_at FROM vehicles;

-- routes_mpa view: exposes origin, destination
CREATE VIEW IF NOT EXISTS routes_mpa AS
    SELECT id, route_name, start_point AS origin, end_point AS destination,
           vehicle_id, created_at FROM routes;

-- students_mpa view: exposes date_of_birth, parent_phone (already exists)
CREATE VIEW IF NOT EXISTS students_mpa AS
    SELECT id, student_id, full_name, gender, dob AS date_of_birth,
           class_id, section_id, roll_number, parent_name, parent_phone,
           address, status, created_at FROM students;

-- calendar_events_mpa view: exposes event_date (mapped from start_date)
CREATE VIEW IF NOT EXISTS calendar_events_mpa AS
    SELECT id, title, description, start_date AS event_date, event_type, created_at
    FROM calendar_events;

-- exams_mpa view: exposes exam_date, description
CREATE VIEW IF NOT EXISTS exams_mpa AS
    SELECT id, exam_name, start_date AS exam_date, end_date, academic_year,
           '' AS description, created_at FROM exams;

-- school_settings_mpa: exposes address, phone, email alongside original columns
CREATE VIEW IF NOT EXISTS school_settings_mpa AS
    SELECT id, school_name, school_address AS address,
           contact_phone AS phone, contact_email AS email,
           accent_color, is_dark_mode, created_at FROM school_settings;
