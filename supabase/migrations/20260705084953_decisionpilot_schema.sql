/*
# DecisionPilot AI Database Schema

1. New Tables
- `profiles` - Extended user profile data (name, organization, avatar)
- `datasets` - Uploaded dataset metadata and analysis results
- `insights` - AI-generated insights from data analysis
- `recommendations` - AI-generated business recommendations
- `notifications` - User notification alerts
- `settings` - User application settings (API keys, preferences)

2. Security
- Enable RLS on all tables
- Owner-scoped CRUD: each authenticated user can only access their own data
- user_id defaults to auth.uid() for seamless inserts

3. Relationships
- All tables reference auth.users via user_id
- Cascade delete on user deletion for clean data removal
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text,
  organization text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create datasets table
CREATE TABLE IF NOT EXISTS datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  file_type text NOT NULL,
  file_size bigint,
  row_count integer,
  column_count integer,
  columns jsonb,
  stats jsonb,
  status text DEFAULT 'ready',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  dataset_id uuid REFERENCES datasets(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  description text,
  data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  dataset_id uuid REFERENCES datasets(id) ON DELETE CASCADE,
  priority text NOT NULL,
  problem text NOT NULL,
  reason text,
  suggested_action text,
  expected_outcome text,
  estimated_impact text,
  confidence integer,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text,
  read boolean DEFAULT false,
  priority text DEFAULT 'low',
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  gemini_api_key text,
  notifications_enabled boolean DEFAULT true,
  language text DEFAULT 'en',
  theme text DEFAULT 'dark',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "select_own_profiles" ON profiles;
CREATE POLICY "select_own_profiles" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profiles" ON profiles;
CREATE POLICY "insert_own_profiles" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profiles" ON profiles;
CREATE POLICY "update_own_profiles" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Datasets policies
DROP POLICY IF EXISTS "select_own_datasets" ON datasets;
CREATE POLICY "select_own_datasets" ON datasets FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_datasets" ON datasets;
CREATE POLICY "insert_own_datasets" ON datasets FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_datasets" ON datasets;
CREATE POLICY "update_own_datasets" ON datasets FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_datasets" ON datasets;
CREATE POLICY "delete_own_datasets" ON datasets FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Insights policies
DROP POLICY IF EXISTS "select_own_insights" ON insights;
CREATE POLICY "select_own_insights" ON insights FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_insights" ON insights;
CREATE POLICY "insert_own_insights" ON insights FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_insights" ON insights;
CREATE POLICY "delete_own_insights" ON insights FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Recommendations policies
DROP POLICY IF EXISTS "select_own_recommendations" ON recommendations;
CREATE POLICY "select_own_recommendations" ON recommendations FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_recommendations" ON recommendations;
CREATE POLICY "insert_own_recommendations" ON recommendations FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_recommendations" ON recommendations;
CREATE POLICY "update_own_recommendations" ON recommendations FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_recommendations" ON recommendations;
CREATE POLICY "delete_own_recommendations" ON recommendations FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Notifications policies
DROP POLICY IF EXISTS "select_own_notifications" ON notifications;
CREATE POLICY "select_own_notifications" ON notifications FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_notifications" ON notifications;
CREATE POLICY "insert_own_notifications" ON notifications FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_notifications" ON notifications;
CREATE POLICY "update_own_notifications" ON notifications FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_notifications" ON notifications;
CREATE POLICY "delete_own_notifications" ON notifications FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Settings policies
DROP POLICY IF EXISTS "select_own_settings" ON settings;
CREATE POLICY "select_own_settings" ON settings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_settings" ON settings;
CREATE POLICY "insert_own_settings" ON settings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_settings" ON settings;
CREATE POLICY "update_own_settings" ON settings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS datasets_user_id_idx ON datasets(user_id);
CREATE INDEX IF NOT EXISTS insights_user_id_idx ON insights(user_id);
CREATE INDEX IF NOT EXISTS recommendations_user_id_idx ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS datasets_created_at_idx ON datasets(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read) WHERE read = false;
