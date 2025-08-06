-- Migration: Create functions, triggers, and views
-- Part 4: Helper functions, triggers, and database views

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

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

-- Create triggers for updated_at columns
CREATE TRIGGER update_fieldagent_updated_at BEFORE UPDATE ON fieldagent
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_member_certificates_updated_at BEFORE UPDATE ON member_certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 