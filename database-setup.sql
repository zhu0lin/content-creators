-- Content Creators App Database Setup
-- Run this in your Supabase SQL editor

-- Create the creators table
CREATE TABLE creators (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  imageURL TEXT
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for development)
-- In production, you should create more restrictive policies
CREATE POLICY "Allow all operations" ON creators FOR ALL USING (true);

-- Create an index on the name column for better performance
CREATE INDEX idx_creators_name ON creators(name);

-- Create an index on created_at for sorting


-- Optional: Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_creators_updated_at 
    BEFORE UPDATE ON creators 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
