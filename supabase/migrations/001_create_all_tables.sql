-- Migration: Create all tables for Hearth Guardian system
-- This migration creates all the tables based on the Django models

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

-- 6. Account Holder Table
CREATE TABLE IF NOT EXISTS accountholder (
    account_no VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    surname VARCHAR(100),
    cellphone_no VARCHAR(10),
    address TEXT,
    id_number VARCHAR(13),
    policyno VARCHAR(100) UNIQUE REFERENCES members(policyno) ON DELETE CASCADE
);

-- 7. Account Holder Policy Links Table
CREATE TABLE IF NOT EXISTS accountholder_policies (
    id SERIAL PRIMARY KEY,
    account_holder VARCHAR(50) REFERENCES accountholder(account_no) ON DELETE CASCADE,
    policy VARCHAR(100) REFERENCES members(policyno) ON DELETE CASCADE,
    linked_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    linked_by INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    UNIQUE(account_holder, policy)
);

-- 8. Account Holder Payment Table
CREATE TABLE IF NOT EXISTS accountholder_payments (
    id SERIAL PRIMARY KEY,
    account_holder VARCHAR(50) REFERENCES accountholder(account_no) ON DELETE CASCADE,
    payment_reference VARCHAR(100) UNIQUE,
    total_amount DECIMAL(10,2),
    payment_method VARCHAR(20) CHECK (payment_method IN ('Cash', 'EFT', 'Debit Order', 'Other')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    payment_date DATE,
    capture_date TIMESTAMP WITH TIME ZONE,
    processed_by INTEGER,
    notes TEXT
);

-- 9. Account Holder Payment Details Table
CREATE TABLE IF NOT EXISTS accountholder_payment_details (
    id SERIAL PRIMARY KEY,
    account_holder_payment INTEGER REFERENCES accountholder_payments(id) ON DELETE CASCADE,
    policy VARCHAR(100) REFERENCES members(policyno) ON DELETE CASCADE,
    amount DECIMAL(10,2),
    months_covered VARCHAR(255),
    individual_payment VARCHAR(100)
);

-- 10. Dependent Settings Table
CREATE TABLE IF NOT EXISTS dependentsettings (
    ds_id VARCHAR(90) PRIMARY KEY,
    f_id VARCHAR(6) REFERENCES funeralplan(f_id) ON DELETE CASCADE,
    member_type VARCHAR(90),
    min_age INTEGER,
    max_age INTEGER,
    no_of_members INTEGER,
    cover_amount DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    empid VARCHAR(50)
);

-- 11. Member Payment Table
CREATE TABLE IF NOT EXISTS mempayment (
    mp_id VARCHAR(100) PRIMARY KEY,
    mp_desc TEXT,
    mp_payable INTEGER,
    mp_paid INTEGER,
    mp_vat FLOAT,
    mp_excl FLOAT,
    policyno VARCHAR(100) REFERENCES members(policyno) ON DELETE CASCADE,
    mp_date DATE,
    mp_pdate TEXT,
    mp_dateto TEXT,
    mp_capture_date TIMESTAMP WITH TIME ZONE,
    em_id INTEGER,
    mp_arr INTEGER,
    mp_gen INTEGER,
    surname TEXT,
    firstname TEXT,
    f_id INTEGER,
    u_id INTEGER,
    underwriter_pre INTEGER,
    mp_mont TEXT,
    acctype INTEGER,
    closingb INTEGER,
    branchcode INTEGER,
    reason TEXT,
    processed_by VARCHAR(45),
    invoice_no VARCHAR(50) UNIQUE,
    is_archived BOOLEAN DEFAULT FALSE
);

-- 12. Employee Table
CREATE TABLE IF NOT EXISTS employees (
    em_id VARCHAR(50) PRIMARY KEY,
    em_fn TEXT NOT NULL,
    em_sn TEXT NOT NULL,
    em_iden TEXT NOT NULL,
    em_tel INTEGER NOT NULL,
    em_addr TEXT NOT NULL,
    em_role VARCHAR(45)
);

-- 13. Profile Table
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    phone VARCHAR(30),
    location VARCHAR(100)
);

-- 14. User Activity Table
CREATE TABLE IF NOT EXISTS user_activity (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    activity_type VARCHAR(50) DEFAULT 'login',
    activity_category VARCHAR(20) DEFAULT 'system',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details TEXT,
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(100),
    related_object_type VARCHAR(50),
    related_object_id VARCHAR(100),
    related_object_name VARCHAR(255),
    changes_made JSONB,
    action_result VARCHAR(20) DEFAULT 'success' CHECK (action_result IN ('success', 'failure', 'partial')),
    error_message TEXT,
    execution_time FLOAT,
    request_path VARCHAR(255),
    request_method VARCHAR(10)
);

-- 15. Archives Table
CREATE TABLE IF NOT EXISTS archives (
    archive_id SERIAL PRIMARY KEY,
    item_type VARCHAR(20) CHECK (item_type IN ('member', 'dependent', 'payment', 'funeral_plan', 'account_holder', 'dependent_setting')),
    item_id VARCHAR(100),
    item_name VARCHAR(255),
    policy_no VARCHAR(100),
    original_data JSONB,
    archived_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    archived_by VARCHAR(100),
    archived_reason TEXT,
    restored_date TIMESTAMP WITH TIME ZONE,
    restored_by VARCHAR(100),
    is_permanently_deleted BOOLEAN DEFAULT FALSE,
    permanently_deleted_date TIMESTAMP WITH TIME ZONE,
    permanently_deleted_by VARCHAR(100)
);

-- 16. Notification Table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    notification_type VARCHAR(50) CHECK (notification_type IN (
        'member_registration', 'payment_received', 'plan_created', 'member_archived',
        'dependent_added', 'account_holder_promoted', 'payment_overdue', 'plan_expired',
        'system_alert', 'dependent_age_reminder', 'dependent_age_warning', 'dependent_age_critical',
        'dependent_marked_student', 'dependent_marked_disabled', 'dependent_promoted_member',
        'dependent_manually_resolved'
    )),
    title VARCHAR(255),
    message TEXT,
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    related_policy_no VARCHAR(100),
    related_member_name VARCHAR(255),
    related_dependent_id INTEGER,
    related_amount DECIMAL(10,2),
    related_plan_id VARCHAR(50),
    recipient INTEGER,
    requires_action BOOLEAN DEFAULT FALSE
);

-- 17. Field Agent Table
CREATE TABLE IF NOT EXISTS fieldagent (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    id_number VARCHAR(20) UNIQUE NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    agent_code VARCHAR(20) UNIQUE NOT NULL,
    location VARCHAR(100) NOT NULL,
    compensation_type VARCHAR(20) DEFAULT 'Percentage' CHECK (compensation_type IN ('Percentage', 'Fixed')),
    compensation_value DECIMAL(10,2) DEFAULT 0,
    payment_day VARCHAR(20) DEFAULT 'Immediate' CHECK (payment_day IN ('Immediate', 'End of Month')),
    payment_mode VARCHAR(20) DEFAULT 'Once Off' CHECK (payment_mode IN ('Once Off', 'Monthly')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. Member Field Agent Link Table
CREATE TABLE IF NOT EXISTS memberfieldagentlink (
    id SERIAL PRIMARY KEY,
    member VARCHAR(100) REFERENCES members(policyno) ON DELETE CASCADE,
    agent INTEGER REFERENCES fieldagent(id) ON DELETE CASCADE,
    referred_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(member, agent)
);

-- 19. Member Certificate Table
CREATE TABLE IF NOT EXISTS member_certificates (
    certificate_id VARCHAR(50) PRIMARY KEY,
    member VARCHAR(100) REFERENCES members(policyno) ON DELETE CASCADE,
    certificate_type VARCHAR(30) CHECK (certificate_type IN (
        'registration', 'first_payment', 'six_months', 'one_year', 'five_years',
        'ten_years', 'loyalty', 'premium', 'account_holder', 'special_achievement'
    )),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'issued', 'delivered', 'expired', 'cancelled')),
    certificate_number VARCHAR(100) UNIQUE,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expiry_date TIMESTAMP WITH TIME ZONE,
    delivered_date TIMESTAMP WITH TIME ZONE,
    title VARCHAR(200),
    description TEXT,
    achievement_details TEXT,
    funeral_plan VARCHAR(6) REFERENCES funeralplan(f_id) ON DELETE SET NULL,
    cover_amount DECIMAL(10,2),
    premium_amount DECIMAL(10,2),
    issued_by INTEGER,
    issued_by_employee VARCHAR(100),
    branch_issued VARCHAR(100),
    delivery_method VARCHAR(50) DEFAULT 'digital' CHECK (delivery_method IN ('email', 'postal', 'hand_delivery', 'digital', 'sms')),
    delivery_address TEXT,
    delivery_contact VARCHAR(100),
    certificate_file TEXT,
    certificate_url TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_policyno ON members(policyno);
CREATE INDEX IF NOT EXISTS idx_members_is_archived ON members(is_archived);
CREATE INDEX IF NOT EXISTS idx_dependents_policyno ON dependents(policyno);
CREATE INDEX IF NOT EXISTS idx_dependents_is_archived ON dependents(is_archived);
CREATE INDEX IF NOT EXISTS idx_funeralplan_f_id ON funeralplan(f_id);
CREATE INDEX IF NOT EXISTS idx_funeralplan_is_archived ON funeralplan(is_archived);
CREATE INDEX IF NOT EXISTS idx_linkt_policyno ON linkt(policyno);
CREATE INDEX IF NOT EXISTS idx_linkt_f_id ON linkt(f_id);
CREATE INDEX IF NOT EXISTS idx_accountholder_policyno ON accountholder(policyno);
CREATE INDEX IF NOT EXISTS idx_mempayment_policyno ON mempayment(policyno);
CREATE INDEX IF NOT EXISTS idx_mempayment_is_archived ON mempayment(is_archived);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_timestamp ON user_activity(timestamp);
CREATE INDEX IF NOT EXISTS idx_archives_item_type ON archives(item_type);
CREATE INDEX IF NOT EXISTS idx_archives_policy_no ON archives(policy_no);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_member_certificates_member ON member_certificates(member);
CREATE INDEX IF NOT EXISTS idx_member_certificates_status ON member_certificates(status);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_members_archived_date ON members(is_archived, archived_date);
CREATE INDEX IF NOT EXISTS idx_dependents_archived_date ON dependents(is_archived, archived_date);
CREATE INDEX IF NOT EXISTS idx_user_activity_type_timestamp ON user_activity(activity_type, timestamp);
CREATE INDEX IF NOT EXISTS idx_archives_type_deleted ON archives(item_type, is_permanently_deleted);

-- Add comments to tables for documentation
COMMENT ON TABLE members IS 'Main members table containing all member information';
COMMENT ON TABLE dependents IS 'Dependents linked to members';
COMMENT ON TABLE funeralplan IS 'Funeral plan configurations and pricing';
COMMENT ON TABLE linkt IS 'Linking table between members and funeral plans';
COMMENT ON TABLE accountholder IS 'Account holders who can manage multiple policies';
COMMENT ON TABLE mempayment IS 'Member payment records';
COMMENT ON TABLE user_activity IS 'User activity tracking for audit purposes';
COMMENT ON TABLE archives IS 'Centralized archive for all archived items';
COMMENT ON TABLE notifications IS 'System notifications for users';
COMMENT ON TABLE fieldagent IS 'Field agents who refer members';
COMMENT ON TABLE member_certificates IS 'Certificates issued to members for achievements';

-- Enable Row Level Security (RLS) for sensitive tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE dependents ENABLE ROW LEVEL SECURITY;
ALTER TABLE mempayment ENABLE ROW LEVEL SECURITY;
ALTER TABLE accountholder ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies (basic - you may want to customize these based on your auth requirements)
-- Example policy for members table
CREATE POLICY "Enable read access for authenticated users" ON members
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON members
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON members
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Similar policies for other tables
CREATE POLICY "Enable read access for authenticated users" ON dependents
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON mempayment
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON accountholder
    FOR SELECT USING (auth.role() = 'authenticated');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_fieldagent_updated_at BEFORE UPDATE ON fieldagent
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_member_certificates_updated_at BEFORE UPDATE ON member_certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate policy numbers
CREATE OR REPLACE FUNCTION generate_policy_number()
RETURNS INTEGER AS $$
DECLARE
    new_policy INTEGER;
    today_prefix VARCHAR(4);
    latest_policy VARCHAR(100);
    sequence INTEGER;
BEGIN
    today_prefix := TO_CHAR(NOW(), 'YYMM');
    
    -- Find the highest policy number for today's YYMM pattern
    SELECT MAX(policyno) INTO latest_policy
    FROM members
    WHERE policyno LIKE today_prefix || '%';
    
    IF latest_policy IS NOT NULL THEN
        -- Extract and increment the sequence number
        sequence := CAST(SUBSTRING(latest_policy FROM 5) AS INTEGER) + 1;
    ELSE
        -- First policy of the month
        sequence := 1;
    END IF;
    
    -- Format with leading zeros
    new_policy := CAST(today_prefix || LPAD(sequence::TEXT, 4, '0') AS INTEGER);
    
    -- Double-check uniqueness
    WHILE EXISTS (SELECT 1 FROM members WHERE policyno = new_policy::TEXT) LOOP
        sequence := sequence + 1;
        new_policy := CAST(today_prefix || LPAD(sequence::TEXT, 4, '0') AS INTEGER);
    END LOOP;
    
    RETURN new_policy;
END;
$$ LANGUAGE plpgsql;

-- Function to generate account numbers
CREATE OR REPLACE FUNCTION generate_account_number()
RETURNS VARCHAR(50) AS $$
DECLARE
    new_account VARCHAR(50);
    today_prefix VARCHAR(10);
    latest_account VARCHAR(50);
    sequence INTEGER;
BEGIN
    today_prefix := 'AH-' || TO_CHAR(NOW(), 'YYMM') || '-';
    
    -- Find the highest account number for today's YYMM pattern
    SELECT MAX(account_no) INTO latest_account
    FROM accountholder
    WHERE account_no LIKE today_prefix || '%';
    
    IF latest_account IS NOT NULL THEN
        -- Extract and increment the sequence number
        sequence := CAST(SUBSTRING(latest_account FROM LENGTH(today_prefix) + 1) AS INTEGER) + 1;
    ELSE
        sequence := 1;
    END IF;
    
    -- Format with leading zeros
    new_account := today_prefix || LPAD(sequence::TEXT, 4, '0');
    
    -- Double-check uniqueness
    WHILE EXISTS (SELECT 1 FROM accountholder WHERE account_no = new_account) LOOP
        sequence := sequence + 1;
        new_account := today_prefix || LPAD(sequence::TEXT, 4, '0');
    END LOOP;
    
    RETURN new_account;
END;
$$ LANGUAGE plpgsql;

-- Function to generate F_ID for funeral plans
CREATE OR REPLACE FUNCTION generate_f_id()
RETURNS VARCHAR(6) AS $$
DECLARE
    new_f_id VARCHAR(6);
    letters VARCHAR(3);
    numbers VARCHAR(3);
BEGIN
    LOOP
        -- Generate 3 random letters
        letters := '';
        FOR i IN 1..3 LOOP
            letters := letters || CHR(65 + (RANDOM() * 25)::INTEGER);
        END LOOP;
        
        -- Generate 3 random numbers
        numbers := LPAD((RANDOM() * 999)::INTEGER::TEXT, 3, '0');
        
        new_f_id := letters || numbers;
        
        -- Check if it already exists
        EXIT WHEN NOT EXISTS (SELECT 1 FROM funeralplan WHERE f_id = new_f_id);
    END LOOP;
    
    RETURN new_f_id;
END;
$$ LANGUAGE plpgsql;

-- Function to generate dependent ID
CREATE OR REPLACE FUNCTION generate_dependent_id()
RETURNS INTEGER AS $$
DECLARE
    max_id INTEGER;
BEGIN
    SELECT COALESCE(MAX(d_id), 0) INTO max_id FROM dependents;
    
    IF max_id = 0 THEN
        -- If no dependents exist, start with current year + 0001
        RETURN CAST(TO_CHAR(NOW(), 'YYYY') || '0001' AS INTEGER);
    ELSE
        RETURN max_id + 1;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to generate DS_ID for dependent settings
CREATE OR REPLACE FUNCTION generate_ds_id()
RETURNS VARCHAR(90) AS $$
DECLARE
    new_ds_id VARCHAR(90);
    last_number INTEGER;
    random_offset INTEGER;
BEGIN
    -- Get the highest DS_ID
    SELECT COALESCE(MAX(CAST(SUBSTRING(ds_id FROM 3) AS INTEGER)), 0) INTO last_number
    FROM dependentsettings
    WHERE ds_id ~ '^DS\d+$';
    
    -- Add some randomness to avoid conflicts
    random_offset := (RANDOM() * 9)::INTEGER;
    last_number := last_number + 1 + random_offset;
    
    new_ds_id := 'DS' || LPAD(last_number::TEXT, 4, '0');
    
    -- Double-check uniqueness
    WHILE EXISTS (SELECT 1 FROM dependentsettings WHERE ds_id = new_ds_id) LOOP
        random_offset := (RANDOM() * 9)::INTEGER;
        last_number := last_number + 1 + random_offset;
        new_ds_id := 'DS' || LPAD(last_number::TEXT, 4, '0');
    END LOOP;
    
    RETURN new_ds_id;
END;
$$ LANGUAGE plpgsql;

-- Function to generate certificate ID
CREATE OR REPLACE FUNCTION generate_certificate_id()
RETURNS VARCHAR(50) AS $$
DECLARE
    new_cert_id VARCHAR(50);
    timestamp_part VARCHAR(14);
    random_chars VARCHAR(6);
BEGIN
    timestamp_part := TO_CHAR(NOW(), 'YYYYMMDDHH24MISS');
    
    -- Generate 6 random alphanumeric characters
    random_chars := '';
    FOR i IN 1..6 LOOP
        IF RANDOM() > 0.5 THEN
            -- Letter
            random_chars := random_chars || CHR(65 + (RANDOM() * 25)::INTEGER);
        ELSE
            -- Number
            random_chars := random_chars || (RANDOM() * 9)::INTEGER::TEXT;
        END IF;
    END LOOP;
    
    new_cert_id := 'CERT' || timestamp_part || random_chars;
    
    RETURN new_cert_id;
END;
$$ LANGUAGE plpgsql;

-- Function to generate certificate number
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS VARCHAR(100) AS $$
DECLARE
    new_cert_number VARCHAR(100);
    year_part VARCHAR(4);
    random_digits VARCHAR(6);
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    random_digits := LPAD((RANDOM() * 999999)::INTEGER::TEXT, 6, '0');
    
    new_cert_number := 'FSPRO-' || year_part || '-' || random_digits;
    
    -- Double-check uniqueness
    WHILE EXISTS (SELECT 1 FROM member_certificates WHERE certificate_number = new_cert_number) LOOP
        random_digits := LPAD((RANDOM() * 999999)::INTEGER::TEXT, 6, '0');
        new_cert_number := 'FSPRO-' || year_part || '-' || random_digits;
    END LOOP;
    
    RETURN new_cert_number;
END;
$$ LANGUAGE plpgsql;

-- Function to generate payment reference
CREATE OR REPLACE FUNCTION generate_payment_reference()
RETURNS VARCHAR(100) AS $$
DECLARE
    new_ref VARCHAR(100);
    uuid_part VARCHAR(8);
BEGIN
    uuid_part := SUBSTRING(gen_random_uuid()::TEXT FROM 1 FOR 8);
    new_ref := 'AHP-' || UPPER(uuid_part);
    
    -- Double-check uniqueness
    WHILE EXISTS (SELECT 1 FROM accountholder_payments WHERE payment_reference = new_ref) LOOP
        uuid_part := SUBSTRING(gen_random_uuid()::TEXT FROM 1 FOR 8);
        new_ref := 'AHP-' || UPPER(uuid_part);
    END LOOP;
    
    RETURN new_ref;
END;
$$ LANGUAGE plpgsql;

-- Function to generate MP_ID for member payments
CREATE OR REPLACE FUNCTION generate_mp_id()
RETURNS VARCHAR(100) AS $$
DECLARE
    new_mp_id VARCHAR(100);
    timestamp_part BIGINT;
    random_suffix INTEGER;
BEGIN
    timestamp_part := EXTRACT(EPOCH FROM NOW())::BIGINT;
    random_suffix := (RANDOM() * 8999 + 1000)::INTEGER;
    
    new_mp_id := (timestamp_part * 10000 + random_suffix)::TEXT;
    
    -- Double-check uniqueness
    WHILE EXISTS (SELECT 1 FROM mempayment WHERE mp_id = new_mp_id) LOOP
        random_suffix := (RANDOM() * 8999 + 1000)::INTEGER;
        new_mp_id := (timestamp_part * 10000 + random_suffix)::TEXT;
    END LOOP;
    
    RETURN new_mp_id;
END;
$$ LANGUAGE plpgsql;

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS VARCHAR(50) AS $$
DECLARE
    new_invoice VARCHAR(50);
    now_part VARCHAR(14);
    random_suffix INTEGER;
BEGIN
    now_part := TO_CHAR(NOW(), 'YYYYMMDDHH24MISS');
    random_suffix := (RANDOM() * 8999 + 1000)::INTEGER;
    
    new_invoice := 'INV-' || now_part || '-' || random_suffix::TEXT;
    
    -- Double-check uniqueness
    WHILE EXISTS (SELECT 1 FROM mempayment WHERE invoice_no = new_invoice) LOOP
        random_suffix := (RANDOM() * 8999 + 1000)::INTEGER;
        new_invoice := 'INV-' || now_part || '-' || random_suffix::TEXT;
    END LOOP;
    
    RETURN new_invoice;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic ID generation
CREATE OR REPLACE FUNCTION set_dependent_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.d_id IS NULL THEN
        NEW.d_id := generate_dependent_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_dependent_id_trigger
    BEFORE INSERT ON dependents
    FOR EACH ROW
    EXECUTE FUNCTION set_dependent_id();

CREATE OR REPLACE FUNCTION set_ds_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ds_id IS NULL THEN
        NEW.ds_id := generate_ds_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_ds_id_trigger
    BEFORE INSERT ON dependentsettings
    FOR EACH ROW
    EXECUTE FUNCTION set_ds_id();

CREATE OR REPLACE FUNCTION set_certificate_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.certificate_id IS NULL THEN
        NEW.certificate_id := generate_certificate_id();
    END IF;
    IF NEW.certificate_number IS NULL THEN
        NEW.certificate_number := generate_certificate_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_certificate_id_trigger
    BEFORE INSERT ON member_certificates
    FOR EACH ROW
    EXECUTE FUNCTION set_certificate_id();

CREATE OR REPLACE FUNCTION set_payment_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payment_reference IS NULL THEN
        NEW.payment_reference := generate_payment_reference();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_payment_reference_trigger
    BEFORE INSERT ON accountholder_payments
    FOR EACH ROW
    EXECUTE FUNCTION set_payment_reference();

CREATE OR REPLACE FUNCTION set_mp_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.mp_id IS NULL THEN
        NEW.mp_id := generate_mp_id();
    END IF;
    IF NEW.invoice_no IS NULL THEN
        NEW.invoice_no := generate_invoice_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_mp_id_trigger
    BEFORE INSERT ON mempayment
    FOR EACH ROW
    EXECUTE FUNCTION set_mp_id();

-- Create views for common queries
CREATE OR REPLACE VIEW member_summary AS
SELECT 
    m.policyno,
    m.firstname,
    m.surname,
    m.mobile,
    m.premium,
    m.is_archived,
    fp.planname as plan_name,
    fp.coveramount as cover_amount,
    COUNT(d.d_id) as dependent_count,
    COUNT(CASE WHEN d.is_archived = FALSE THEN 1 END) as active_dependent_count
FROM members m
LEFT JOIN funeralplan fp ON m.f_id = fp.f_id
LEFT JOIN dependents d ON m.policyno = d.policyno
GROUP BY m.policyno, m.firstname, m.surname, m.mobile, m.premium, m.is_archived, fp.planname, fp.coveramount;

CREATE OR REPLACE VIEW payment_summary AS
SELECT 
    mp.policyno,
    m.firstname,
    m.surname,
    mp.mp_date,
    mp.mp_paid,
    mp.mp_payable,
    mp.invoice_no,
    mp.is_archived
FROM mempayment mp
JOIN members m ON mp.policyno = m.policyno
ORDER BY mp.mp_date DESC;

CREATE OR REPLACE VIEW account_holder_summary AS
SELECT 
    ah.account_no,
    ah.name,
    ah.surname,
    ah.cellphone_no,
    COUNT(ahp.policy) as linked_policies_count,
    SUM(COALESCE(fp.monthlypm, 0)) as total_monthly_premium
FROM accountholder ah
LEFT JOIN accountholder_policies ahp ON ah.account_no = ahp.account_holder AND ahp.is_active = TRUE
LEFT JOIN members m ON ahp.policy = m.policyno
LEFT JOIN funeralplan fp ON m.f_id = fp.f_id
GROUP BY ah.account_no, ah.name, ah.surname, ah.cellphone_no;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create a function to get payment status (simplified version)
CREATE OR REPLACE FUNCTION get_payment_status(policy_number VARCHAR(100))
RETURNS JSON AS $$
DECLARE
    member_record RECORD;
    latest_payment RECORD;
    monthly_premium DECIMAL(10,2) := 0;
    status_info JSON;
BEGIN
    -- Get member information
    SELECT * INTO member_record FROM members WHERE policyno = policy_number;
    
    IF NOT FOUND THEN
        RETURN json_build_object(
            'status', 'Not Found',
            'last_payment_date', NULL,
            'amount_paid', 0,
            'amount_due', 0,
            'monthly_premium', 0,
            'is_overdue', FALSE,
            'is_lapsed', FALSE
        );
    END IF;
    
    -- Get latest payment
    SELECT * INTO latest_payment 
    FROM mempayment 
    WHERE policyno = policy_number AND is_archived = FALSE
    ORDER BY mp_date DESC 
    LIMIT 1;
    
    -- Get monthly premium from linkt table
    SELECT COALESCE(linkt.funeral_pre, member_record.premium, 0) INTO monthly_premium
    FROM linkt 
    WHERE linkt.policyno = policy_number 
    ORDER BY linkt.l_id DESC 
    LIMIT 1;
    
    -- Build status information
    status_info := json_build_object(
        'status', CASE 
            WHEN latest_payment IS NULL THEN 'Unpaid'
            WHEN latest_payment.mp_date < CURRENT_DATE - INTERVAL '90 days' THEN 'Lapsed'
            ELSE 'Paid'
        END,
        'last_payment_date', latest_payment.mp_date,
        'amount_paid', COALESCE(latest_payment.mp_paid, 0),
        'monthly_premium', monthly_premium,
        'is_overdue', latest_payment.mp_date < CURRENT_DATE - INTERVAL '30 days',
        'is_lapsed', latest_payment.mp_date < CURRENT_DATE - INTERVAL '90 days'
    );
    
    RETURN status_info;
END;
$$ LANGUAGE plpgsql; 