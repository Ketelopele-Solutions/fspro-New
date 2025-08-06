-- Migration: Create core tables for Hearth Guardian system
-- Part 1: Core tables (Members, Dependents, Funeral Plans, etc.)

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Password Reset Request Table
CREATE TABLE IF NOT EXISTS password_reset_request (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_resolved BOOLEAN DEFAULT FALSE
);

-- 2. Members Table
CREATE TABLE IF NOT EXISTS members (
    policyno VARCHAR(100) PRIMARY KEY,
    title TEXT,
    firstname TEXT,
    surname TEXT,
    gender TEXT,
    branch TEXT,
    birthdate TEXT,
    address TEXT,
    mobile TEXT,
    telh TEXT,
    telw TEXT,
    spousefn TEXT,
    spousesn TEXT,
    spouseid TEXT,
    account TEXT,
    datejoined TEXT DEFAULT NOW(),
    capture_date TEXT,
    nextpayd TEXT,
    effecd TEXT,
    expd TEXT,
    premium INTEGER,
    expired TEXT,
    overdue TEXT,
    spousin TEXT,
    ldp TEXT,
    mpf TEXT,
    claimd TEXT,
    activedate VARCHAR(16),
    montho TEXT,
    amounto TEXT,
    branchcode TEXT,
    premium_code TEXT,
    spolicyno TEXT,
    bsurn TEXT,
    bname TEXT,
    bid TEXT,
    btel TEXT,
    renewd TEXT,
    notes TEXT,
    pfa_main TEXT,
    fulllist TEXT,
    up_todate TEXT,
    oeindicator TEXT,
    tempid VARCHAR(20),
    empid VARCHAR(20),
    id TEXT,
    f_id VARCHAR(6),
    is_archived BOOLEAN DEFAULT FALSE,
    archived_date TIMESTAMP WITH TIME ZONE,
    archived_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by TEXT,
    is_duplicate_id BOOLEAN DEFAULT FALSE,
    duplicate_id_notes TEXT
);

-- 3. Funeral Plan Table
CREATE TABLE IF NOT EXISTS funeralplan (
    f_id VARCHAR(6) PRIMARY KEY,
    planname TEXT,
    plantypedesc TEXT,
    isactive BOOLEAN,
    coveramount DECIMAL(10,2),
    monthlyps DECIMAL(10,2),
    monthlypm DECIMAL(10,2),
    npaying_f INTEGER,
    npaying_t INTEGER,
    paying_f INTEGER,
    paying_t INTEGER,
    paying_pre DECIMAL(10,2),
    main_f INTEGER,
    main_t INTEGER,
    coveras DECIMAL(10,2),
    coveradep DECIMAL(10,2),
    maxe INTEGER,
    ince INTEGER,
    coverae DECIMAL(10,2),
    maxd INTEGER,
    coveradep1 DECIMAL(10,2),
    coveradep2 DECIMAL(10,2),
    coveradep3 DECIMAL(10,2),
    npaying_f1 INTEGER,
    npaying_f2 INTEGER,
    npaying_f3 INTEGER,
    npaying_t1 INTEGER,
    npaying_t2 INTEGER,
    npaying_t3 INTEGER,
    fun_id TEXT,
    plantype TEXT,
    sjoining TEXT,
    sjoiningfee DECIMAL(10,2),
    empid TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by TEXT
);

-- 4. Dependents Table
CREATE TABLE IF NOT EXISTS dependents (
    d_id INTEGER PRIMARY KEY,
    d_firstname TEXT,
    d_surname TEXT,
    d_birthdate TEXT,
    d_relation TEXT,
    d_premium TEXT,
    d_dateentered TEXT DEFAULT NOW(),
    d_student TEXT,
    policyno VARCHAR(100) REFERENCES members(policyno) ON DELETE CASCADE,
    claimd TEXT,
    f_id TEXT,
    u_id TEXT,
    empid TEXT,
    d_identityno TEXT,
    d_disabled TEXT,
    member_type TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    archived_date TIMESTAMP WITH TIME ZONE,
    archived_by TEXT,
    student_until_age_25 BOOLEAN DEFAULT FALSE,
    disabled_status BOOLEAN DEFAULT FALSE,
    promoted_to_member BOOLEAN DEFAULT FALSE,
    age_action_date TIMESTAMP WITH TIME ZONE,
    age_action_by TEXT,
    age_action_notes TEXT,
    new_policy_number VARCHAR(100),
    manually_resolved BOOLEAN DEFAULT FALSE,
    manual_resolution_date TIMESTAMP WITH TIME ZONE,
    manual_resolution_by TEXT,
    manual_resolution_notes TEXT
);

-- 5. Linkt Table (Links between policies and funeral plans)
CREATE TABLE IF NOT EXISTS linkt (
    l_id SERIAL PRIMARY KEY,
    u_id INTEGER,
    f_id VARCHAR(6) REFERENCES funeralplan(f_id) ON DELETE SET NULL,
    policyno VARCHAR(100) REFERENCES members(policyno) ON DELETE CASCADE,
    underwriter_pre DECIMAL(10,2),
    funeral_pre DECIMAL(10,2),
    expired TEXT,
    d_id INTEGER REFERENCES dependents(d_id) ON DELETE SET NULL,
    id INTEGER,
    empid TEXT
);

-- Create indexes for core tables
CREATE INDEX IF NOT EXISTS idx_members_policyno ON members(policyno);
CREATE INDEX IF NOT EXISTS idx_members_is_archived ON members(is_archived);
CREATE INDEX IF NOT EXISTS idx_dependents_policyno ON dependents(policyno);
CREATE INDEX IF NOT EXISTS idx_dependents_is_archived ON dependents(is_archived);
CREATE INDEX IF NOT EXISTS idx_funeralplan_f_id ON funeralplan(f_id);
CREATE INDEX IF NOT EXISTS idx_funeralplan_is_archived ON funeralplan(is_archived);
CREATE INDEX IF NOT EXISTS idx_linkt_policyno ON linkt(policyno);
CREATE INDEX IF NOT EXISTS idx_linkt_f_id ON linkt(f_id);

-- Add comments to core tables
COMMENT ON TABLE members IS 'Main members table containing all member information';
COMMENT ON TABLE dependents IS 'Dependents linked to members';
COMMENT ON TABLE funeralplan IS 'Funeral plan configurations and pricing';
COMMENT ON TABLE linkt IS 'Linking table between members and funeral plans'; 