# Hearth Guardian Database Setup

This directory contains the SQL migrations to set up the complete database schema for the Hearth Guardian funeral plan management system.

## Migration Files

The migrations are split into 5 parts for easier management:

1. **001_create_core_tables.sql** - Core tables (Members, Dependents, Funeral Plans, etc.)
2. **002_create_account_holder_tables.sql** - Account holder related tables
3. **003_create_system_tables.sql** - System tables (Employees, Activities, Archives, etc.)
4. **004_create_functions_and_triggers.sql** - Helper functions and triggers
5. **005_create_views_and_security.sql** - Database views, security policies, and final setup

## How to Run the Migrations

### Option 1: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run each migration file in order (001, 002, 003, 004, 005)
4. Each file should be executed completely before moving to the next

### Option 2: Using Supabase CLI

```bash
# Install Supabase CLI if you haven't already
# Option A: Using npm (local installation)
npm install supabase

# Option B: Using npx (recommended)
npx supabase --version

# Option C: Using Windows Package Manager (winget)
winget install Supabase.CLI

# Option D: Using Chocolatey
choco install supabase

# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref your-project-ref

# Run the migrations
npx supabase db push
```

### Option 3: Using psql (if you have direct database access)

```bash
psql -h your-supabase-host -U postgres -d postgres -f 001_create_core_tables.sql
psql -h your-supabase-host -U postgres -d postgres -f 002_create_account_holder_tables.sql
psql -h your-supabase-host -U postgres -d postgres -f 003_create_system_tables.sql
psql -h your-supabase-host -U postgres -d postgres -f 004_create_functions_and_triggers.sql
psql -h your-supabase-host -U postgres -d postgres -f 005_create_views_and_security.sql
```

## Database Schema Overview

### Core Tables

- **members** - Main member information and policy details
- **dependents** - Dependent information linked to members
- **funeralplan** - Funeral plan configurations and pricing
- **linkt** - Links between members and funeral plans

### Account Holder Tables

- **accountholder** - Account holders who can manage multiple policies
- **accountholder_policies** - Links between account holders and policies
- **accountholder_payments** - Payments made by account holders
- **accountholder_payment_details** - Details of individual policy payments
- **dependentsettings** - Settings for dependent management
- **mempayment** - Member payment records

### System Tables

- **employees** - Employee information and roles
- **profile** - User profile information
- **user_activity** - User activity tracking for audit purposes
- **archives** - Centralized archive for all archived items
- **notifications** - System notifications for users
- **fieldagent** - Field agents who refer members
- **memberfieldagentlink** - Links between members and field agents
- **member_certificates** - Certificates issued to members for achievements

## Key Features

### Automatic ID Generation

The database includes functions to automatically generate:
- Policy numbers (format: YYMMXXXX)
- Account numbers (format: AH-YYMM-XXXX)
- Funeral plan IDs (format: XXX999)
- Dependent IDs
- Certificate IDs and numbers
- Payment references
- Invoice numbers

### Row Level Security (RLS)

All sensitive tables have RLS enabled with basic policies for authenticated users. You may want to customize these policies based on your specific authentication and authorization requirements.

### Database Views

Several useful views are created for common queries:
- **member_summary** - Summary of members with plan and dependent info
- **payment_summary** - Summary of all payments
- **account_holder_summary** - Summary of account holders
- **dependent_age_analysis** - Analysis of dependents with calculated ages
- **overdue_payments** - Members with overdue payments
- **field_agent_performance** - Performance metrics for field agents

### Helper Functions

- **get_payment_status(policy_number)** - Get payment status for a policy
- **get_system_stats()** - Get overall system statistics
- **cleanup_old_archives(months_to_keep)** - Clean up old archived data
- **create_sample_funeral_plan()** - Create a sample funeral plan for testing
- **create_sample_member()** - Create a sample member for testing

## Testing the Setup

After running all migrations, you can test the setup by:

1. Creating a sample funeral plan:
```sql
SELECT create_sample_funeral_plan();
```

2. Creating a sample member:
```sql
SELECT create_sample_member();
```

3. Checking system statistics:
```sql
SELECT get_system_stats();
```

4. Viewing the member summary:
```sql
SELECT * FROM member_summary;
```

## Important Notes

1. **Foreign Key Constraints**: All tables have proper foreign key constraints to maintain data integrity.

2. **Indexes**: Performance indexes are created on commonly queried columns.

3. **Triggers**: Automatic triggers are set up for ID generation and timestamp updates.

4. **Permissions**: Basic permissions are granted to authenticated users, but you may need to adjust these based on your application's needs.

5. **Data Types**: The schema uses appropriate data types for each field, including:
   - TEXT for flexible string storage
   - VARCHAR for fixed-length strings
   - INTEGER for whole numbers
   - DECIMAL for monetary values
   - TIMESTAMP WITH TIME ZONE for dates with timezone awareness
   - JSONB for structured data storage

## Customization

You may want to customize:

1. **RLS Policies**: Modify the security policies based on your user roles and permissions
2. **Indexes**: Add additional indexes based on your query patterns
3. **Functions**: Modify or add functions based on your business logic
4. **Views**: Create additional views for your specific reporting needs

## Troubleshooting

If you encounter issues:

1. **Check the order**: Make sure migrations are run in the correct order (001, 002, 003, 004, 005)
2. **Check permissions**: Ensure your database user has the necessary permissions
3. **Check dependencies**: Some functions depend on tables being created first
4. **Check for conflicts**: If tables already exist, you may need to drop them first or use `CREATE TABLE IF NOT EXISTS`

## Support

For issues with the database setup, check:
1. Supabase documentation
2. PostgreSQL documentation
3. Your application's specific requirements 