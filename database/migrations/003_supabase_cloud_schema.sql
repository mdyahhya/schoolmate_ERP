-- =============================================================================
-- COMPLETE CONSOLIDATED SUPABASE SCHEMA (Live Export from jjraluhoybumzpdikark)
-- Project URL: https://jjraluhoybumzpdikark.supabase.co
-- Generated: 2026-11-01
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
-- 1. Table: schools
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    erp_passcode TEXT DEFAULT 'admin123', -- School passcode required for ERP access
    logo_url TEXT,                        -- 90% compressed logo asset (< 10 KB)
    theme_color TEXT DEFAULT '#003d99',
    address TEXT,
    contact TEXT,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 2. Table: profiles (Users, Admins, Teachers, Parents)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    role TEXT CHECK (role IN ('school_admin', 'teacher', 'parent', 'staff')),
    phone TEXT,
    designation TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 3. Table: staff_profiles (Teacher & Staff Directory)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.staff_profiles (
    id UUID DEFAULT gen_random_uuid(),
    user_id UUID,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    designation TEXT,
    assigned_class TEXT,
    assigned_section TEXT,
    subjects TEXT[],
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 4. Table: students
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    parent_id UUID,
    full_name TEXT NOT NULL,
    roll_number TEXT NOT NULL,
    class_name TEXT NOT NULL,
    section TEXT NOT NULL,
    admission_number TEXT,
    date_of_birth DATE,
    gender TEXT,
    blood_group TEXT,
    guardian_name TEXT,
    guardian_phone TEXT,
    dob DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 5. Table: timetables
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.timetables (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    class_name TEXT NOT NULL,
    section TEXT NOT NULL,
    day_of_week TEXT NOT NULL,
    period_number INTEGER NOT NULL,
    subject TEXT NOT NULL,
    teacher_name TEXT,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 6. Table: transport_routes (Bus Routes & Driver Contacts)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.transport_routes (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    route_name TEXT NOT NULL,
    bus_number TEXT NOT NULL,
    driver_name TEXT,
    driver_phone TEXT,
    pickup_time TIME,
    drop_time TIME,
    stop_name TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 7. Table: fee_dues & fees (Fee Ledger)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fee_dues (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    due_date DATE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
    receipt_number TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.fees (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    due_date TIMESTAMPTZ,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
    receipt_number TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 8. Table: notices (Circulars & Push Broadcasts)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    author_id UUID,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    target_role TEXT DEFAULT 'all',
    attachment_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 9. Table: leave_requests (Student Leave Applications)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leave_requests (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    parent_id UUID,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    approved_by UUID,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 10. Table: homework (Daily Assignments & Tasks)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.homework (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    teacher_id UUID,
    class_name TEXT NOT NULL,
    section TEXT NOT NULL,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    attachment_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 11. Table: attendance (Daily Student Attendance)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half_day')),
    remarks TEXT,
    marked_by UUID,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- 12. Table: school_feed (Educational Curated Videos)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.school_feed (
    id UUID DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    youtube_url TEXT NOT NULL,
    youtube_video_id TEXT,
    thumbnail_url TEXT,
    category TEXT DEFAULT 'General',
    class_target TEXT DEFAULT 'all',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id)
);

-- =============================================================================
-- PERFORMANCE & DELTA-SYNC INDEXES (Zero Egress Overhead)
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_schools_code ON public.schools(code);
CREATE INDEX IF NOT EXISTS idx_students_school_class ON public.students(school_id, class_name, section, roll_number);
CREATE INDEX IF NOT EXISTS idx_attendance_school_date ON public.attendance(school_id, date);
CREATE INDEX IF NOT EXISTS idx_homework_school_class ON public.homework(school_id, class_name, section);
CREATE INDEX IF NOT EXISTS idx_notices_school_created ON public.notices(school_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fee_dues_student ON public.fee_dues(school_id, student_id, status);
CREATE INDEX IF NOT EXISTS idx_transport_school ON public.transport_routes(school_id);
CREATE INDEX IF NOT EXISTS idx_timetables_school_class ON public.timetables(school_id, class_name, section);
CREATE INDEX IF NOT EXISTS idx_school_feed_category ON public.school_feed(school_id, category);
