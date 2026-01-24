-- Add password_hash column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash text;

-- Add role column if it doesn't exist (as text instead of role_id)
ALTER TABLE users ADD COLUMN IF NOT EXISTS role text;
