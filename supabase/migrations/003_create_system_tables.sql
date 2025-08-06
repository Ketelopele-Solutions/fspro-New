-- Migration: Create system tables
-- Part 3: Employees, Profiles, User Activities, Archives, Notifications, etc.

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

-- Create indexes for system tables
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_timestamp ON user_activity(timestamp);
CREATE INDEX IF NOT EXISTS idx_user_activity_type_timestamp ON user_activity(activity_type, timestamp);
CREATE INDEX IF NOT EXISTS idx_archives_item_type ON archives(item_type);
CREATE INDEX IF NOT EXISTS idx_archives_policy_no ON archives(policy_no);
CREATE INDEX IF NOT EXISTS idx_archives_type_deleted ON archives(item_type, is_permanently_deleted);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_member_certificates_member ON member_certificates(member);
CREATE INDEX IF NOT EXISTS idx_member_certificates_status ON member_certificates(status);
CREATE INDEX IF NOT EXISTS idx_fieldagent_agent_code ON fieldagent(agent_code);
CREATE INDEX IF NOT EXISTS idx_fieldagent_id_number ON fieldagent(id_number);

-- Add comments to system tables
COMMENT ON TABLE employees IS 'Employee information and roles';
COMMENT ON TABLE profile IS 'User profile information';
COMMENT ON TABLE user_activity IS 'User activity tracking for audit purposes';
COMMENT ON TABLE archives IS 'Centralized archive for all archived items';
COMMENT ON TABLE notifications IS 'System notifications for users';
COMMENT ON TABLE fieldagent IS 'Field agents who refer members';
COMMENT ON TABLE memberfieldagentlink IS 'Links between members and field agents';
COMMENT ON TABLE member_certificates IS 'Certificates issued to members for achievements'; 