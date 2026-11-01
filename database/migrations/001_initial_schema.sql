-- =============================================================================
-- SCHOOL ERP INITIAL DATABASE SCHEMA (001_initial_schema.sql)
-- Offline-First, Multi-Module, Production-Ready, Normalized with Mock Seeds
-- =============================================================================

-- 1. SYSTEM SETTINGS & CREDENTIALS
CREATE TABLE IF NOT EXISTS school_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    school_name TEXT NOT NULL DEFAULT 'My School ERP',
    school_address TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    accent_color TEXT DEFAULT 'Dark Blue', -- Default Accent Theme
    is_dark_mode INTEGER DEFAULT 0,       -- 0 = Light, 1 = Dark Mode
    logo_path TEXT,                       -- Path to uploaded school logo (future-ready)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'principal', 'teacher', 'accountant', 'receptionist')),
    full_name TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Default Settings and Admin User
INSERT OR IGNORE INTO school_settings (id, school_name, school_address, contact_phone, contact_email) 
VALUES (1, 'Greenwood International School', '128 Education Ave, Sector 4, New Delhi', '+91 11 2345 6789', 'info@greenwood.edu.in');

-- Default admin login: username=admin, password=admin123
INSERT OR IGNORE INTO users (id, username, password_hash, role, full_name, email) 
VALUES (1, 'admin', 'admin123', 'admin', 'System Administrator', 'admin@greenwood.edu.in');


-- 2. ACADEMICS SYSTEM
CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER NOT NULL,
    section_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(class_id) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE(class_id, section_name)
);

CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_name TEXT NOT NULL,
    subject_code TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Academics Meta
INSERT OR IGNORE INTO classes (id, class_name) VALUES (1, 'Class 9');
INSERT OR IGNORE INTO classes (id, class_name) VALUES (2, 'Class 10');
INSERT OR IGNORE INTO classes (id, class_name) VALUES (3, 'Class 11');

INSERT OR IGNORE INTO sections (id, class_id, section_name) VALUES (1, 1, 'Section A');
INSERT OR IGNORE INTO sections (id, class_id, section_name) VALUES (2, 1, 'Section B');
INSERT OR IGNORE INTO sections (id, class_id, section_name) VALUES (3, 2, 'Section A');
INSERT OR IGNORE INTO sections (id, class_id, section_name) VALUES (4, 3, 'Section A');

INSERT OR IGNORE INTO subjects (id, subject_name, subject_code) VALUES (1, 'Mathematics', 'MATH101');
INSERT OR IGNORE INTO subjects (id, subject_name, subject_code) VALUES (2, 'Physics', 'PHYS101');
INSERT OR IGNORE INTO subjects (id, subject_name, subject_code) VALUES (3, 'English Literature', 'ENGL101');
INSERT OR IGNORE INTO subjects (id, subject_name, subject_code) VALUES (4, 'Chemistry', 'CHEM101');


-- 3. HUMAN RESOURCES (TEACHERS & STAFF)
CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
    dob DATE,
    qualification TEXT,
    department TEXT,
    contact_number TEXT,
    email TEXT,
    joining_date DATE,
    photo_path TEXT,
    status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
    role TEXT NOT NULL, -- Office Staff, Support Staff, Librarian, etc.
    department TEXT,
    contact_number TEXT,
    email TEXT,
    joining_date DATE,
    status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Faculty & Staff
INSERT OR IGNORE INTO teachers (id, employee_id, full_name, gender, dob, qualification, department, contact_number, email, joining_date, status)
VALUES (1, 'TCH-1001', 'Dr. Sarah Jenkins', 'Female', '1984-05-14', 'Ph.D. in Mathematics', 'Sciences', '+91 98765 43210', 'sarah.j@greenwood.edu.in', '2018-06-15', 'Active');
INSERT OR IGNORE INTO teachers (id, employee_id, full_name, gender, dob, qualification, department, contact_number, email, joining_date, status)
VALUES (2, 'TCH-1002', 'Mr. Robert Chen', 'Male', '1988-11-22', 'M.Sc. in Physics, B.Ed.', 'Sciences', '+91 87654 32109', 'robert.c@greenwood.edu.in', '2020-07-10', 'Active');

INSERT OR IGNORE INTO staff (id, employee_id, full_name, gender, role, department, contact_number, email, joining_date, status)
VALUES (1, 'STF-2001', 'Mr. John Doe', 'Male', 'Accountant', 'Finance', '+91 76543 21098', 'john.d@greenwood.edu.in', '2019-01-08', 'Active');
INSERT OR IGNORE INTO staff (id, employee_id, full_name, gender, role, department, contact_number, email, joining_date, status)
VALUES (2, 'STF-2002', 'Mrs. Maria Gomez', 'Female', 'Librarian', 'Administration', '+91 65432 10987', 'maria.g@greenwood.edu.in', '2021-03-01', 'Active');


-- 4. STUDENT INFORMATION SYSTEM
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
    dob DATE,
    class_id INTEGER NOT NULL,
    section_id INTEGER NOT NULL,
    roll_number INTEGER NOT NULL,
    parent_name TEXT,
    parent_phone TEXT,
    address TEXT,
    admission_date DATE,
    photo_path TEXT,
    status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive', 'Alumni')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(class_id) REFERENCES classes(id),
    FOREIGN KEY(section_id) REFERENCES sections(id),
    UNIQUE(class_id, section_id, roll_number)
);

-- Seed Active Students
INSERT OR IGNORE INTO students (id, student_id, full_name, gender, dob, class_id, section_id, roll_number, parent_name, parent_phone, address, admission_date, status)
VALUES (1, 'ST-100293', 'James Carter', 'Male', '2011-04-12', 2, 3, 1, 'William Carter', '+91 99887 76655', 'Apartment 4B, Sector 2, New Delhi', '2023-04-10', 'Active');
INSERT OR IGNORE INTO students (id, student_id, full_name, gender, dob, class_id, section_id, roll_number, parent_name, parent_phone, address, admission_date, status)
VALUES (2, 'ST-100294', 'Emily Watson', 'Female', '2011-08-30', 2, 3, 2, 'Clara Watson', '+91 88776 65544', 'Villa 12, Block C, Gurgaon', '2023-04-10', 'Active');
INSERT OR IGNORE INTO students (id, student_id, full_name, gender, dob, class_id, section_id, roll_number, parent_name, parent_phone, address, admission_date, status)
VALUES (3, 'ST-100295', 'Liam Davis', 'Male', '2012-01-15', 1, 1, 1, 'Arthur Davis', '+91 77665 54433', 'H-18, Green Park, New Delhi', '2024-04-05', 'Active');


-- 5. ADMISSION ENQUIRY
CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_name TEXT NOT NULL,
    parent_name TEXT,
    contact_number TEXT NOT NULL,
    class_requested INTEGER,
    status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Follow-up', 'Registered', 'Admitted', 'Rejected')),
    follow_up_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(class_requested) REFERENCES classes(id)
);

-- Seed Enquiries
INSERT OR IGNORE INTO enquiries (id, candidate_name, parent_name, contact_number, class_requested, status, follow_up_notes)
VALUES (1, 'Sophia Martinez', 'Clara Martinez', '+91 99999 88888', 2, 'Follow-up', 'Requires discount check on transport route fee.');
INSERT OR IGNORE INTO enquiries (id, candidate_name, parent_name, contact_number, class_requested, status, follow_up_notes)
VALUES (2, 'Oliver Taylor', 'Gregory Taylor', '+91 88888 77777', 1, 'Pending', 'Scheduled walk-through of the science laboratories on Monday.');


-- 6. ATTENDANCE SYSTEM
CREATE TABLE IF NOT EXISTS student_attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    date DATE NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Present', 'Absent', 'Late', 'Half-Day')),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE(student_id, date)
);

CREATE TABLE IF NOT EXISTS teacher_attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id INTEGER NOT NULL,
    date DATE NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Present', 'Absent', 'Late', 'Half-Day')),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    UNIQUE(teacher_id, date)
);

-- Seed Today's Student Attendance
INSERT OR IGNORE INTO student_attendance (student_id, date, status, remarks) VALUES (1, date('now'), 'Present', 'Arrived on time');
INSERT OR IGNORE INTO student_attendance (student_id, date, status, remarks) VALUES (2, date('now'), 'Present', 'Arrived on time');
INSERT OR IGNORE INTO student_attendance (student_id, date, status, remarks) VALUES (3, date('now'), 'Absent', 'Family emergency');


-- 7. TIMETABLES & SCHEDULING
CREATE TABLE IF NOT EXISTS timetables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER NOT NULL,
    section_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL,
    day_of_week TEXT NOT NULL CHECK(day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    start_time TEXT NOT NULL, -- Format: HH:MM
    end_time TEXT NOT NULL,   -- Format: HH:MM
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY(section_id) REFERENCES sections(id) ON DELETE CASCADE,
    FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY(teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);

-- Seed Timetable Slots
INSERT OR IGNORE INTO timetables (id, class_id, section_id, subject_id, teacher_id, day_of_week, start_time, end_time)
VALUES (1, 2, 3, 1, 1, 'Monday', '09:00', '10:00');
INSERT OR IGNORE INTO timetables (id, class_id, section_id, subject_id, teacher_id, day_of_week, start_time, end_time)
VALUES (2, 2, 3, 2, 2, 'Monday', '10:00', '11:00');


-- 8. EXAMINATION & RESULTS
CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_name TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exam_schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    exam_date DATE NOT NULL,
    max_marks INTEGER NOT NULL,
    passing_marks INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE CASCADE,
    FOREIGN KEY(class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exam_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_schedule_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    marks_obtained REAL NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(exam_schedule_id) REFERENCES exam_schedules(id) ON DELETE CASCADE,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE(exam_schedule_id, student_id)
);

-- Seed Exam Terms & Marks
INSERT OR IGNORE INTO exams (id, exam_name, academic_year, start_date, end_date)
VALUES (1, 'First Term Evaluation', '2026-2027', '2026-09-10', '2026-09-20');

INSERT OR IGNORE INTO exam_schedules (id, exam_id, class_id, subject_id, exam_date, max_marks, passing_marks)
VALUES (1, 1, 2, 1, '2026-09-11', 100, 40);

INSERT OR IGNORE INTO exam_results (id, exam_schedule_id, student_id, marks_obtained, remarks)
VALUES (1, 1, 1, 85.5, 'Outstanding Performance');
INSERT OR IGNORE INTO exam_results (id, exam_schedule_id, student_id, marks_obtained, remarks)
VALUES (2, 1, 2, 72.0, 'Good; can improve geometry');


-- 9. FEES & FINANCE
CREATE TABLE IF NOT EXISTS fee_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_name TEXT NOT NULL UNIQUE, -- Tuition Fee, Bus Fee, Exam Fee, etc.
    default_amount REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_fee_allocations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    fee_type_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    due_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Unpaid' CHECK(status IN ('Unpaid', 'Partially Paid', 'Paid')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY(fee_type_id) REFERENCES fee_types(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fee_payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    allocation_id INTEGER NOT NULL,
    amount_paid REAL NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method TEXT CHECK(payment_method IN ('Cash', 'Cheque', 'Bank Transfer', 'Card')),
    transaction_id TEXT,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(allocation_id) REFERENCES student_fee_allocations(id) ON DELETE CASCADE
);

-- Seed Financial Invoices & Collection Logs
INSERT OR IGNORE INTO fee_types (id, type_name, default_amount) VALUES (1, 'Quarter 1 Tuition Fee', 1500);
INSERT OR IGNORE INTO fee_types (id, type_name, default_amount) VALUES (2, 'Annual Security Deposit', 500);

INSERT OR IGNORE INTO student_fee_allocations (id, student_id, fee_type_id, amount, due_date, status)
VALUES (1, 1, 1, 1500, '2026-07-01', 'Partially Paid');
INSERT OR IGNORE INTO student_fee_allocations (id, student_id, fee_type_id, amount, due_date, status)
VALUES (2, 2, 1, 1500, '2026-07-01', 'Paid');
INSERT OR IGNORE INTO student_fee_allocations (id, student_id, fee_type_id, amount, due_date, status)
VALUES (3, 3, 2, 500, '2026-07-15', 'Unpaid');

INSERT OR IGNORE INTO fee_payments (id, allocation_id, amount_paid, payment_date, payment_method, transaction_id, remarks)
VALUES (1, 1, 500, '2026-06-18', 'Cash', 'TXN-9028', 'Paid partial amount');
INSERT OR IGNORE INTO fee_payments (id, allocation_id, amount_paid, payment_date, payment_method, transaction_id, remarks)
VALUES (2, 2, 1500, '2026-06-19', 'Bank Transfer', 'TXN-8390', 'Paid full tuition');


-- 10. TRANSPORT
CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_number TEXT NOT NULL UNIQUE,
    vehicle_model TEXT,
    capacity INTEGER,
    driver_name TEXT,
    driver_phone TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_name TEXT NOT NULL,
    start_point TEXT,
    end_point TEXT,
    vehicle_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS transport_allocations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL UNIQUE,
    route_id INTEGER NOT NULL,
    pickup_point TEXT,
    monthly_fee REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY(route_id) REFERENCES routes(id) ON DELETE CASCADE
);

-- Seed Buses & Routes
INSERT OR IGNORE INTO vehicles (id, registration_number, vehicle_model, capacity, driver_name, driver_phone)
VALUES (1, 'DL-3C-AS-5829', 'Swaraj Mazda 42s', 42, 'Ramesh Kumar', '+91 99112 23344');

INSERT OR IGNORE INTO routes (id, route_name, start_point, end_point, vehicle_id)
VALUES (1, 'South Ext Route', 'Vasant Kunj Stop C', 'Main Campus Gate', 1);

INSERT OR IGNORE INTO transport_allocations (id, student_id, route_id, pickup_point, monthly_fee)
VALUES (1, 1, 1, 'Green Apartments Stop', 150);


-- 11. HOSTEL
CREATE TABLE IF NOT EXISTS hostels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hostel_name TEXT NOT NULL UNIQUE,
    hostel_type TEXT CHECK(hostel_type IN ('Boys', 'Girls', 'Mixed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hostel_rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hostel_id INTEGER NOT NULL,
    room_number TEXT NOT NULL,
    room_type TEXT,
    capacity INTEGER NOT NULL,
    monthly_fee REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
    UNIQUE(hostel_id, room_number)
);

CREATE TABLE IF NOT EXISTS hostel_allocations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL UNIQUE,
    room_id INTEGER NOT NULL,
    allocation_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY(room_id) REFERENCES hostel_rooms(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS visitor_register (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_name TEXT NOT NULL,
    purpose TEXT,
    contact_number TEXT,
    host_type TEXT NOT NULL CHECK(host_type IN ('Student', 'Staff')),
    host_id INTEGER NOT NULL,
    check_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    check_out TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Hostel Wing
INSERT OR IGNORE INTO hostels (id, hostel_name, hostel_type) VALUES (1, 'Vidyasagar Boys Hostel', 'Boys');
INSERT OR IGNORE INTO hostel_rooms (id, hostel_id, room_number, room_type, capacity, monthly_fee)
VALUES (1, 1, '101', 'Double Occupancy', 2, 250);


-- 12. COMMUNICATIONS (ANNOUNCEMENTS, NOTICES, CIRCULARS)
CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    target_audience TEXT DEFAULT 'All' CHECK(target_audience IN ('All', 'Teachers', 'Students', 'Staff')),
    publish_date DATE DEFAULT (date('now')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Circular Notices
INSERT OR IGNORE INTO announcements (id, title, content, target_audience, publish_date)
VALUES (1, 'Academic Year Reopening', 'We welcome all students back for the new term starting this Monday. Uniform compliance is mandatory.', 'All', date('now', '-2 days'));
INSERT OR IGNORE INTO announcements (id, title, content, target_audience, publish_date)
VALUES (2, 'Advisory Meeting Scheduled', 'There will be a mandatory faculty meeting to discuss Q1 exams results in Conference Hall at 2 PM.', 'Teachers', date('now'));


-- 13. CALENDAR & HOLIDAYS
CREATE TABLE IF NOT EXISTS calendar_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    event_type TEXT DEFAULT 'Event' CHECK(event_type IN ('Event', 'Holiday', 'Exam', 'Function')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Calendar events
INSERT OR IGNORE INTO calendar_events (id, title, description, start_date, end_date, event_type)
VALUES (1, 'Annual Science Fair', 'Project demonstrations and evaluation in auditorium', date('now', '+3 days'), date('now', '+3 days'), 'Event');
INSERT OR IGNORE INTO calendar_events (id, title, description, start_date, end_date, event_type)
VALUES (2, 'National Holiday Break', 'School campus completely closed', date('now', '+10 days'), date('now', '+10 days'), 'Holiday');


-- 14. BACKUP SERVICE LOGS
CREATE TABLE IF NOT EXISTS backups_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    backup_path TEXT NOT NULL,
    backup_type TEXT NOT NULL CHECK(backup_type IN ('Manual', 'Auto')),
    status TEXT NOT NULL CHECK(status IN ('Success', 'Failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 15. INDEXES FOR PERFORMANCE OPTIMIZATION (SUPPORT 10,000+ Students, 100,000+ Attendance)
CREATE INDEX IF NOT EXISTS idx_students_class_section ON students(class_id, section_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_date ON student_attendance(date, student_id);
CREATE INDEX IF NOT EXISTS idx_teacher_attendance_date ON teacher_attendance(date, teacher_id);
CREATE INDEX IF NOT EXISTS idx_fee_allocations_student ON student_fee_allocations(student_id);
CREATE INDEX IF NOT EXISTS idx_fee_payments_allocation ON fee_payments(allocation_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_schedule_student ON exam_results(exam_schedule_id, student_id);
CREATE INDEX IF NOT EXISTS idx_timetables_class_section ON timetables(class_id, section_id);


-- Triggers to auto-update updated_at columns
CREATE TRIGGER IF NOT EXISTS trg_school_settings_update AFTER UPDATE ON school_settings
BEGIN
    UPDATE school_settings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_users_update AFTER UPDATE ON users
BEGIN
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_students_update AFTER UPDATE ON students
BEGIN
    UPDATE students SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_teachers_update AFTER UPDATE ON teachers
BEGIN
    UPDATE teachers SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_staff_update AFTER UPDATE ON staff
BEGIN
    UPDATE staff SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_enquiries_update AFTER UPDATE ON enquiries
BEGIN
    UPDATE enquiries SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_student_attendance_update AFTER UPDATE ON student_attendance
BEGIN
    UPDATE student_attendance SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_teacher_attendance_update AFTER UPDATE ON teacher_attendance
BEGIN
    UPDATE teacher_attendance SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_exams_update AFTER UPDATE ON exams
BEGIN
    UPDATE exams SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_exam_results_update AFTER UPDATE ON exam_results
BEGIN
    UPDATE exam_results SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_fee_allocations_update AFTER UPDATE ON student_fee_allocations
BEGIN
    UPDATE student_fee_allocations SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
