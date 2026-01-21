# API Documentation - Chic Glam Dashboard

## Base URL
```
http://localhost:3000/api
```

## Endpoints Overview

### Users Management
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Roles Management
- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create new role
- `GET /api/roles/:id` - Get role by ID
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role

### Permissions
- `GET /api/permissions` - Get all permissions
- `POST /api/permissions` - Create new permission

### Attendance
- `GET /api/attendance?limit=100&offset=0` - Get attendance records
- `POST /api/attendance` - Check-in/Check-out

### Expenses
- `GET /api/expenses?limit=100&offset=0` - Get all expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Payments
- `GET /api/payments?limit=100&offset=0` - Get all payments
- `POST /api/payments` - Create payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment

### Services (Salon/Gym Services)
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Appointments
- `GET /api/appointments?limit=100&offset=0` - Get all appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

---

## Detailed Endpoint Documentation

### Users Endpoints

#### GET /api/users
Get all users in the system.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "full_name": "Ahmed Khan",
      "email": "ahmed@example.com",
      "role_id": "uuid",
      "is_active": true,
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "full_name": "Ali Raza",
  "email": "ali@example.com",
  "role_id": "uuid-of-role",
  "is_active": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "Ali Raza",
    "email": "ali@example.com",
    "role_id": "uuid-of-role",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

#### GET /api/users/:id
Get a specific user.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "Ahmed Khan",
    "email": "ahmed@example.com",
    "role_id": "uuid",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

#### PUT /api/users/:id
Update a user.

**Request Body:**
```json
{
  "full_name": "Ahmed Khan Updated",
  "is_active": false
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated user */ }
}
```

#### DELETE /api/users/:id
Delete a user.

**Response:**
```json
{
  "success": true,
  "message": "User deleted"
}
```

---

### Roles Endpoints

#### GET /api/roles
Get all roles.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Admin",
      "description": "Administrator role",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### POST /api/roles
Create a new role.

**Request Body:**
```json
{
  "name": "Manager",
  "description": "Manager role"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Manager",
    "description": "Manager role",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

#### PUT /api/roles/:id
Update a role.

**Request Body:**
```json
{
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* updated role */ }
}
```

#### DELETE /api/roles/:id
Delete a role.

**Response:**
```json
{
  "success": true,
  "message": "Role deleted"
}
```

---

### Attendance Endpoints

#### GET /api/attendance
Get attendance records with pagination.

**Query Parameters:**
- `limit` (default: 100) - Number of records
- `offset` (default: 0) - Starting position

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "customer_name": "John Doe",
      "check_in": "2024-01-01T09:00:00Z",
      "check_out": "2024-01-01T18:00:00Z",
      "sync_status": "synced"
    }
  ],
  "count": 150,
  "limit": 100,
  "offset": 0
}
```

#### POST /api/attendance
Check-in or check-out.

**Request Body (Check-In):**
```json
{
  "action": "check-in",
  "customerName": "John Doe"
}
```

**Request Body (Check-Out):**
```json
{
  "action": "check-out",
  "attendanceId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "customer_name": "John Doe",
    "check_in": "2024-01-01T09:00:00Z",
    "check_out": null,
    "sync_status": "synced"
  }
}
```

---

### Expenses Endpoints

#### GET /api/expenses
Get all expenses with pagination.

**Query Parameters:**
- `limit` (default: 100)
- `offset` (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Office Supplies",
      "amount": 2500,
      "sync_status": "synced",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ],
  "count": 50,
  "limit": 100,
  "offset": 0
}
```

#### POST /api/expenses
Create an expense.

**Request Body:**
```json
{
  "title": "Equipment Purchase",
  "amount": 50000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Equipment Purchase",
    "amount": 50000,
    "sync_status": "synced",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

---

### Payments Endpoints

#### GET /api/payments
Get all payments with pagination.

**Query Parameters:**
- `limit` (default: 100)
- `offset` (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "customer_name": "Ahmed Khan",
      "amount": 5000,
      "payment_method": "Card",
      "status": "paid",
      "sync_status": "synced",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ],
  "count": 200,
  "limit": 100,
  "offset": 0
}
```

#### POST /api/payments
Create a payment.

**Request Body:**
```json
{
  "customer_name": "Ahmed Khan",
  "amount": 5000,
  "payment_method": "Card",
  "status": "paid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "customer_name": "Ahmed Khan",
    "amount": 5000,
    "payment_method": "Card",
    "status": "paid",
    "sync_status": "synced",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

---

### Services Endpoints

#### GET /api/services
Get all services.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Hair Styling",
      "price": 1500,
      "duration_minutes": 60,
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### POST /api/services
Create a service.

**Request Body:**
```json
{
  "name": "Facial Treatment",
  "price": 2500,
  "duration_minutes": 45
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Facial Treatment",
    "price": 2500,
    "duration_minutes": 45,
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

---

### Appointments Endpoints

#### GET /api/appointments
Get all appointments with pagination.

**Query Parameters:**
- `limit` (default: 100)
- `offset` (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "customer_name": "Ahmed Khan",
      "service_id": "uuid",
      "trainer_id": "uuid",
      "appointment_time": "2024-01-05T14:00:00Z",
      "status": "pending",
      "sync_status": "synced",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ],
  "count": 80,
  "limit": 100,
  "offset": 0
}
```

#### POST /api/appointments
Create an appointment.

**Request Body:**
```json
{
  "customer_name": "Ahmed Khan",
  "service_id": "uuid",
  "trainer_id": "uuid",
  "appointment_time": "2024-01-05T14:00:00Z",
  "status": "pending"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "customer_name": "Ahmed Khan",
    "service_id": "uuid",
    "trainer_id": "uuid",
    "appointment_time": "2024-01-05T14:00:00Z",
    "status": "pending",
    "sync_status": "synced",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

---

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

**HTTP Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Client-Side Usage

### Using the API Client

```typescript
import { usersApi, expensesApi, appointmentsApi } from '@/lib/api-client';

// Get all users
const { success, data } = await usersApi.getAll();

// Create a user
const { success, data } = await usersApi.create({
  full_name: 'Ali Raza',
  email: 'ali@example.com',
  role_id: 'uuid',
  is_active: true,
});

// Get expenses with pagination
const { success, data, count } = await expensesApi.getAll(10, 0);

// Create an expense
const { success, data } = await expensesApi.create({
  title: 'Office Supplies',
  amount: 2500,
});

// Check-in an employee
const { success, data } = await attendanceApi.checkIn('John Doe');

// Check-out an employee
const { success, data } = await attendanceApi.checkOut('attendance-uuid');
```

---

## Database Tables Schema

### users
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  role_id uuid REFERENCES roles(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);
```

### roles
```sql
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamp DEFAULT now()
);
```

### permissions
```sql
CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL
);
```

### attendance
```sql
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text,
  check_in timestamp,
  check_out timestamp,
  sync_status text DEFAULT 'synced'
);
```

### expenses
```sql
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  amount numeric NOT NULL,
  sync_status text DEFAULT 'synced',
  created_at timestamp DEFAULT now()
);
```

### payments
```sql
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text,
  amount numeric NOT NULL,
  payment_method text,
  status text DEFAULT 'paid',
  sync_status text DEFAULT 'synced',
  created_at timestamp DEFAULT now()
);
```

### services
```sql
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  duration_minutes int,
  created_at timestamp DEFAULT now()
);
```

### appointments
```sql
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
```

---

## Notes
- All timestamps are in ISO 8601 format (UTC)
- UUIDs are generated automatically by Supabase
- Pagination uses limit/offset pattern
- All requests should include `Content-Type: application/json` header for POST/PUT requests
- All responses follow a consistent format with `success` and `data`/`error` fields
