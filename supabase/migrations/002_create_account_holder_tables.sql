-- Migration: Create account holder related tables
-- Part 2: Account Holder, Payments, and related tables

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

-- Create indexes for account holder tables
CREATE INDEX IF NOT EXISTS idx_accountholder_policyno ON accountholder(policyno);
CREATE INDEX IF NOT EXISTS idx_mempayment_policyno ON mempayment(policyno);
CREATE INDEX IF NOT EXISTS idx_mempayment_is_archived ON mempayment(is_archived);
CREATE INDEX IF NOT EXISTS idx_accountholder_payments_account_holder ON accountholder_payments(account_holder);
CREATE INDEX IF NOT EXISTS idx_accountholder_payment_details_payment ON accountholder_payment_details(account_holder_payment);

-- Add comments to account holder tables
COMMENT ON TABLE accountholder IS 'Account holders who can manage multiple policies';
COMMENT ON TABLE accountholder_policies IS 'Links between account holders and policies';
COMMENT ON TABLE accountholder_payments IS 'Payments made by account holders';
COMMENT ON TABLE accountholder_payment_details IS 'Details of individual policy payments within account holder payments';
COMMENT ON TABLE dependentsettings IS 'Settings for dependent management';
COMMENT ON TABLE mempayment IS 'Member payment records'; 