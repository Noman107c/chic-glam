# Remove Branch Functionality Task

## Overview
Remove all branch-related functionality from the Chic Glam project as requested.

## Tasks

### 1. Database Schema Updates
- [ ] Remove branch-related tables (branches, branch_services, etc.)
- [ ] Remove branch_id columns from users, services, bookings, transactions, etc.
- [ ] Update foreign key constraints

### 2. Type Definitions
- [ ] Remove Branch interface from types/index.ts
- [ ] Remove branchId from User, Service, Booking, Transaction, etc. interfaces
- [ ] Remove BranchForm, BranchPerformance interfaces

### 3. Components and Pages
- [ ] Remove branches page (src/app/dashboard/branches/page.tsx)
- [ ] Remove branches link from sidebar (src/components/Sidebar.tsx)
- [ ] Update dashboard layout to remove branches navigation

### 4. Services
- [ ] Remove branchId parameters from finance.service.ts methods
- [ ] Update API calls to remove branch filtering

### 5. Constants
- [ ] Remove branch-related permissions from constants/index.ts
- [ ] Remove BRANCH_ADMIN role and branch permissions

### 6. Mock Data
- [ ] Remove branch-related mock data from utils/mockData.ts
- [ ] Update mock data structures to remove branch references

### 7. Analytics
- [ ] Remove branch performance charts from analytics page
- [ ] Remove branch revenue/profit distribution charts
- [ ] Remove branch performance summary table

### 8. API Routes
- [ ] Remove branch-related API endpoints
- [ ] Update existing endpoints to remove branch filtering

### 9. Testing and Cleanup
- [ ] Run tests to ensure no broken references
- [ ] Clean up any remaining branch references in code
- [ ] Update documentation
