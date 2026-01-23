-- Chic Glam Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles table
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamp DEFAULT now()
);

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  role_id uuid REFERENCES roles(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

-- Permissions table
CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL
);

-- Role permissions junction table
CREATE TABLE role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE
);

-- Services table
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  duration_minutes int,
  created_at timestamp DEFAULT now()
);

-- Appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  service_id uuid REFERENCES services(id),
  trainer_id uuid REFERENCES users(id),
  appointment_time timestamp,
  status text DEFAULT 'pending',
  sync_status text DEFAULT 'synced',
  created_at timestamp DEFAULT now()
);

-- Payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text,
  amount numeric NOT NULL,
  payment_method text,
  status text DEFAULT 'paid',
  sync_status text DEFAULT 'synced',
  created_at timestamp DEFAULT now()
);

-- Expenses table
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  amount numeric NOT NULL,
  sync_status text DEFAULT 'synced',
  created_at timestamp DEFAULT now()
);

-- Attendance table
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text,
  check_in timestamp,
  check_out timestamp,
  sync_status text DEFAULT 'synced'
);

-- Staff attendance table (for staff check-in/check-out)
CREATE TABLE staff_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  check_in timestamp NOT NULL,
  check_out timestamp,
  location_lat numeric,
  location_lng numeric,
  created_at timestamp DEFAULT now()
);

-- Salary table
CREATE TABLE salaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  month int NOT NULL,
  year int NOT NULL,
  base_salary numeric DEFAULT 0,
  bonuses numeric DEFAULT 0,
  deductions numeric DEFAULT 0,
  total_salary numeric,
  status text DEFAULT 'pending',
  created_at timestamp DEFAULT now(),
  UNIQUE(user_id, month, year)
);

-- Beautician sales table
CREATE TABLE beautician_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beautician_id uuid REFERENCES users(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  amount numeric NOT NULL,
  commission numeric DEFAULT 0,
  payment_method text,
  transaction_date timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);

-- Insert default permissions
INSERT INTO permissions (name) VALUES
  ('users.create'),
  ('users.read'),
  ('users.update'),
  ('users.delete'),
  ('roles.create'),
  ('roles.read'),
  ('roles.update'),
  ('roles.delete'),
  ('permissions.read'),
  ('attendance.create'),
  ('attendance.read'),
  ('services.read'),
  ('services.create'),
  ('booking.create'),
  ('booking.read'),
  ('booking.update'),
  ('payments.create'),
  ('payments.read');

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Administrator with full access'),
  ('trainer', 'Fitness trainer with access to gym facilities and client management'),
  ('beautician', 'Beauty specialist with access to salon services and client appointments');

-- Insert role permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin';

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.name IN ('user.read', 'booking.create', 'booking.read', 'booking.update', 'attendance.create', 'attendance.read')
WHERE r.name = 'trainer';

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.name IN ('user.read', 'booking.create', 'booking.read', 'booking.update', 'services.read', 'attendance.create', 'attendance.read')
WHERE r.name = 'beautician';
