-- Migration: Create views, security policies, and final setup
-- Part 5: Database views, Row Level Security, and permissions

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

CREATE OR REPLACE VIEW dependent_age_analysis AS
SELECT 
    d.d_id,
    d.d_firstname,
    d.d_surname,
    d.d_birthdate,
    d.d_relation,
    d.policyno,
    m.firstname as member_firstname,
    m.surname as member_surname,
    d.student_until_age_25,
    d.disabled_status,
    d.promoted_to_member,
    d.manually_resolved,
    -- Calculate age from birthdate (assuming format YYYY-MM-DD or similar)
    CASE 
        WHEN d.d_birthdate ~ '^\d{4}-\d{2}-\d{2}$' THEN 
            EXTRACT(YEAR FROM AGE(CURRENT_DATE, d.d_birthdate::DATE))
        WHEN d.d_birthdate ~ '^\d{4}/\d{2}/\d{2}$' THEN 
            EXTRACT(YEAR FROM AGE(CURRENT_DATE, TO_DATE(d.d_birthdate, 'YYYY/MM/DD')))
        ELSE NULL
    END as calculated_age
FROM dependents d
JOIN members m ON d.policyno = m.policyno
WHERE d.is_archived = FALSE;

CREATE OR REPLACE VIEW overdue_payments AS
SELECT 
    m.policyno,
    m.firstname,
    m.surname,
    m.mobile,
    fp.planname,
    fp.monthlypm as monthly_premium,
    mp.mp_date as last_payment_date,
    EXTRACT(DAYS FROM CURRENT_DATE - mp.mp_date) as days_overdue
FROM members m
LEFT JOIN funeralplan fp ON m.f_id = fp.f_id
LEFT JOIN mempayment mp ON m.policyno = mp.policyno
WHERE mp.mp_date < CURRENT_DATE - INTERVAL '30 days'
    AND m.is_archived = FALSE
    AND mp.is_archived = FALSE
ORDER BY days_overdue DESC;

CREATE OR REPLACE VIEW field_agent_performance AS
SELECT 
    fa.id as agent_id,
    fa.full_name,
    fa.agent_code,
    fa.location,
    COUNT(mfal.member) as total_referrals,
    COUNT(CASE WHEN m.is_archived = FALSE THEN 1 END) as active_referrals,
    SUM(CASE WHEN m.is_archived = FALSE THEN COALESCE(fp.monthlypm, 0) ELSE 0 END) as total_monthly_premium
FROM fieldagent fa
LEFT JOIN memberfieldagentlink mfal ON fa.id = mfal.agent
LEFT JOIN members m ON mfal.member = m.policyno
LEFT JOIN funeralplan fp ON m.f_id = fp.f_id
WHERE fa.is_active = TRUE
GROUP BY fa.id, fa.full_name, fa.agent_code, fa.location;

-- Function to get payment status (simplified version)
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

-- Enable Row Level Security (RLS) for sensitive tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE dependents ENABLE ROW LEVEL SECURITY;
ALTER TABLE mempayment ENABLE ROW LEVEL SECURITY;
ALTER TABLE accountholder ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE funeralplan ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkt ENABLE ROW LEVEL SECURITY;
ALTER TABLE dependentsettings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fieldagent ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_certificates ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (you may want to customize these based on your auth requirements)
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

CREATE POLICY "Enable read access for authenticated users" ON funeralplan
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON linkt
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON dependentsettings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON fieldagent
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON member_certificates
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON user_activity
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON archives
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON notifications
    FOR SELECT USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Grant permissions on views
GRANT SELECT ON member_summary TO anon, authenticated;
GRANT SELECT ON payment_summary TO anon, authenticated;
GRANT SELECT ON account_holder_summary TO anon, authenticated;
GRANT SELECT ON dependent_age_analysis TO anon, authenticated;
GRANT SELECT ON overdue_payments TO anon, authenticated;
GRANT SELECT ON field_agent_performance TO anon, authenticated;

-- Create some sample data functions for testing
CREATE OR REPLACE FUNCTION create_sample_funeral_plan()
RETURNS VARCHAR(6) AS $$
DECLARE
    new_f_id VARCHAR(6);
BEGIN
    new_f_id := generate_f_id();
    
    INSERT INTO funeralplan (
        f_id, planname, plantypedesc, isactive, coveramount, 
        monthlypm, npaying_f, npaying_t, paying_f, paying_t,
        paying_pre, main_f, main_t, coveras, coveradep
    ) VALUES (
        new_f_id, 'Basic Funeral Plan', 'Basic coverage for individuals', 
        TRUE, 15000.00, 150.00, 1, 1, 1, 1, 150.00, 1, 1, 15000.00, 5000.00
    );
    
    RETURN new_f_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_sample_member()
RETURNS VARCHAR(100) AS $$
DECLARE
    new_policy VARCHAR(100);
    sample_f_id VARCHAR(6);
BEGIN
    -- Create a sample funeral plan if none exists
    SELECT f_id INTO sample_f_id FROM funeralplan LIMIT 1;
    IF sample_f_id IS NULL THEN
        sample_f_id := create_sample_funeral_plan();
    END IF;
    
    -- Generate policy number
    new_policy := generate_policy_number()::TEXT;
    
    INSERT INTO members (
        policyno, firstname, surname, mobile, premium, f_id, 
        datejoined, created_at
    ) VALUES (
        new_policy, 'John', 'Doe', '0123456789', 150, sample_f_id,
        NOW()::TEXT, NOW()
    );
    
    RETURN new_policy;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance on composite queries
CREATE INDEX IF NOT EXISTS idx_members_archived_date ON members(is_archived, archived_date);
CREATE INDEX IF NOT EXISTS idx_dependents_archived_date ON dependents(is_archived, archived_date);
CREATE INDEX IF NOT EXISTS idx_mempayment_date_policyno ON mempayment(mp_date, policyno);
CREATE INDEX IF NOT EXISTS idx_user_activity_category_timestamp ON user_activity(activity_category, timestamp);
CREATE INDEX IF NOT EXISTS idx_notifications_type_created ON notifications(notification_type, created_at);
CREATE INDEX IF NOT EXISTS idx_fieldagent_active_location ON fieldagent(is_active, location);

-- Add comments to views
COMMENT ON VIEW member_summary IS 'Summary view of members with their plan and dependent information';
COMMENT ON VIEW payment_summary IS 'Summary view of all payments with member information';
COMMENT ON VIEW account_holder_summary IS 'Summary view of account holders with linked policies and premiums';
COMMENT ON VIEW dependent_age_analysis IS 'Analysis view of dependents with calculated ages and status';
COMMENT ON VIEW overdue_payments IS 'View of members with overdue payments';
COMMENT ON VIEW field_agent_performance IS 'Performance metrics for field agents';

-- Create a function to clean up old archived data (optional)
CREATE OR REPLACE FUNCTION cleanup_old_archives(months_to_keep INTEGER DEFAULT 12)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM archives 
    WHERE archived_date < CURRENT_DATE - INTERVAL '1 month' * months_to_keep
    AND is_permanently_deleted = TRUE;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get system statistics
CREATE OR REPLACE FUNCTION get_system_stats()
RETURNS JSON AS $$
DECLARE
    stats JSON;
BEGIN
    SELECT json_build_object(
        'total_members', (SELECT COUNT(*) FROM members WHERE is_archived = FALSE),
        'total_dependents', (SELECT COUNT(*) FROM dependents WHERE is_archived = FALSE),
        'total_payments', (SELECT COUNT(*) FROM mempayment WHERE is_archived = FALSE),
        'total_funeral_plans', (SELECT COUNT(*) FROM funeralplan WHERE is_archived = FALSE),
        'total_account_holders', (SELECT COUNT(*) FROM accountholder),
        'total_field_agents', (SELECT COUNT(*) FROM fieldagent WHERE is_active = TRUE),
        'overdue_payments', (SELECT COUNT(*) FROM overdue_payments),
        'total_notifications', (SELECT COUNT(*) FROM notifications WHERE is_read = FALSE)
    ) INTO stats;
    
    RETURN stats;
END;
$$ LANGUAGE plpgsql; 