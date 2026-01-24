# Dashboard Quick Reference Guide

## 🎯 Dashboard URLs & Navigation

### Main Dashboard Routes
```
/dashboard                      → Dashboard Home
/dashboard/employees            → Employee Management System
/dashboard/inventory            → Inventory Tracking System
/dashboard/finance              → Finance & Accounting System
/dashboard/sales-reports        → Sales Analytics & Reports
/dashboard/services             → Services Management
/dashboard/pos-enhanced         → Enhanced POS System
/dashboard/analytics            → Analytics & KPIs
```

---

## 📊 Dashboard Features at a Glance

### 1️⃣ Employee Management (`/dashboard/employees`)
**Access:** http://localhost:3000/dashboard/employees

**What You Can Do:**
- ✅ Add new employees with details (name, email, phone, department, position, salary)
- ✅ Edit existing employee information
- ✅ Delete employee records
- ✅ Search employees by name or email
- ✅ View and manage leave requests
- ✅ Approve or reject leave requests
- ✅ Track daily attendance
- ✅ Monitor late arrivals and overtime

**Three Tabs:**
1. **Employees** - CRUD operations for staff
2. **Leaves** - Leave request management with status tracking
3. **Attendance** - Daily check-in/out logs with analytics

**Key Data:**
- Employee Name, Email, Phone, Department, Position, Salary
- Leave Type, Dates, Reason, Status (Pending/Approved/Rejected)
- Attendance Date, Check-in, Check-out, Late Status, Overtime (minutes)

---

### 2️⃣ Inventory Management (`/dashboard/inventory`)
**Access:** http://localhost:3000/dashboard/inventory

**What You Can Do:**
- ✅ Add new products with categories and pricing
- ✅ Edit product details and stock levels
- ✅ Delete products from inventory
- ✅ Search products by name or category
- ✅ Track low stock items automatically
- ✅ View inventory transactions (add/use/return)
- ✅ Calculate total inventory value
- ✅ Get low stock alerts

**Two Tabs:**
1. **Inventory** - Product management with real-time stock status
2. **Transactions** - Complete transaction history

**Key Data:**
- Product Name, Category, Quantity, Minimum Stock Level
- Price per Unit, Total Value (Qty × Price)
- Stock Status (Green=In-Stock, Yellow=Low, Red=Out-of-Stock)
- Transaction Type (ADD/USE/RETURN), Reason, Date

**Statistics Cards:**
- Total Products Count
- Low Stock Items Alert
- Total Inventory Value (Rs)

---

### 3️⃣ Finance & Accounting (`/dashboard/finance`)
**Access:** http://localhost:3000/dashboard/finance

**What You Can Do:**
- ✅ View comprehensive financial overview
- ✅ Monitor income and expense trends
- ✅ Analyze income by category
- ✅ Track monthly performance
- ✅ Filter transactions (income/expense)
- ✅ Generate financial reports
- ✅ Export reports for analysis

**Three Tabs:**
1. **Overview** - Summary cards + 3 advanced charts
2. **Records** - Transaction table with filtering
3. **Reports** - Financial summary & category analysis

**Charts Included:**
- 📈 Line Chart: Income vs Expense Trend (Monthly)
- 🥧 Pie Chart: Income Distribution by Category
- 📊 Bar Chart: Monthly Performance Comparison

**Key Data:**
- Transaction Date, Type, Category, Description
- Amount, Payment Method, Reference
- Summary: Total Income, Total Expense, Net Profit

---

### 4️⃣ Sales & Reports (`/dashboard/sales-reports`)
**Access:** http://localhost:3000/dashboard/sales-reports

**What You Can Do:**
- ✅ View real-time sales dashboard
- ✅ Monitor sales trends and patterns
- ✅ Analyze service performance
- ✅ Track payment methods used
- ✅ Filter sales by status (completed/pending/cancelled)
- ✅ Generate sales analysis reports
- ✅ Calculate key metrics (avg transaction, conversion rate)

**Three Tabs:**
1. **Overview** - Summary cards + 4 visualizations
2. **Records** - Detailed sales transaction table
3. **Analysis** - Deep dive analytics

**Charts Included:**
- 📉 Sales Trend: Weekly sales pattern
- 📊 Transaction Count: Daily transaction volume
- 📈 Service Performance: Revenue by service type
- 🥧 Payment Methods: Payment type distribution

**Key Metrics:**
- Total Sales Amount (Rs)
- Number of Transactions
- Average Transaction Value
- Top Service & Top Customer
- Conversion Rate (%)

---

### 5️⃣ Services Management (`/dashboard/services`)
**Access:** http://localhost:3000/dashboard/services

**What You Can Do:**
- ✅ Add new services with pricing
- ✅ Edit service details
- ✅ Delete services
- ✅ Search services by name or category
- ✅ Manage service categories
- ✅ Assign staff to services
- ✅ Track bookings and ratings
- ✅ Monitor service status

**Two Tabs:**
1. **Services** - Service cards with CRUD operations
2. **Categories** - Category management and service count

**Service Card Shows:**
- Service Name & Category
- Description & Duration (minutes)
- Price (Rs)
- Star Rating
- Booking Count
- Assigned Staff Members
- Active/Inactive Status

**Statistics Cards:**
- Total Services Count
- Total Bookings
- Average Rating
- Number of Categories

---

### 6️⃣ Enhanced POS System (`/dashboard/pos-enhanced`)
**Access:** http://localhost:3000/dashboard/pos-enhanced

**What You Can Do:**
- ✅ Manage 3-panel layout (Categories | Products | Bill)
- ✅ Search and filter products in real-time
- ✅ Add items to cart with quantity
- ✅ Apply discounts (percentage-based)
- ✅ Calculate taxes automatically (17% GST)
- ✅ Process multiple payment methods
- ✅ Generate receipts with print/export
- ✅ Track inventory in real-time

**Features:**
- Desktop: Resizable 3-panel layout with drag-to-resize
- Mobile: Tab-based interface (Products/Cart)
- Cart Management: Add, remove, update quantities
- Discount System: Percentage discount on subtotal
- Payment Methods: Cash, Card, Online
- Receipt: Print or export as CSV

---

## 🔑 Quick Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Add New Record | `Ctrl/Cmd + N` (in modals) |
| Search | `Ctrl/Cmd + F` (focus search) |
| Tab Navigation | `Tab` key |
| Modal Close | `Escape` key |
| Sort Table | Click column header |
| Export | `Ctrl/Cmd + E` (where available) |

---

## 🎨 Color Coding Reference

### Status Colors
- 🟢 **Green** = Active, Complete, In-Stock, Approved
- 🟡 **Yellow** = Pending, Low-Stock, Warning
- 🔴 **Red** = Inactive, Error, Out-of-Stock, Rejected
- 🔵 **Blue** = Information, Process, Default

### Dashboard Colors
- 🟣 **Purple** = Primary actions (buttons, tabs)
- 🟠 **Pink** = Secondary highlights
- 🔷 **Blue/Green** = Analytics and positive indicators

---

## 📱 Responsive Breakpoints

| Device | Breakpoint | View |
|--------|-----------|------|
| Mobile | < 768px | Single column, tab-based |
| Tablet | 768px - 1024px | 2 columns, adaptive |
| Desktop | > 1024px | 3+ columns, full layouts |
| Extra Large | > 1280px | Optimized spacing |

---

## ⚙️ Settings & Configuration

### To Access Settings:
1. Go to `/dashboard`
2. Look for gear icon (⚙️) in top navigation
3. Configure preferences:
   - Theme (Light/Dark)
   - Currency (Default: Rs - Pakistani Rupees)
   - Date Format
   - Notifications

---

## 📈 Key Metrics Explained

### Finance Dashboard Metrics
- **Total Income:** Sum of all income transactions
- **Total Expense:** Sum of all expense transactions
- **Net Profit:** Income - Expense
- **Pending Payments:** Outstanding payments due

### Sales Dashboard Metrics
- **Total Sales:** Sum of all transaction amounts
- **Avg Transaction:** Total Sales ÷ Number of Transactions
- **Conversion Rate:** (Completed Sales ÷ Total Interactions) × 100
- **Top Service:** Service with highest revenue

### Inventory Metrics
- **Low Stock Items:** Count of items below minimum level
- **Total Value:** Sum of (Quantity × Price) for all products
- **Stock Turnover:** How quickly inventory moves

---

## 🔄 Workflow Examples

### Example 1: Employee Leave Management Workflow
```
1. Employee submits leave request
   → Employees > Leaves Tab > View Pending
2. Manager reviews leave request
3. Manager approves/rejects leave
   → Status changes to APPROVED or REJECTED
4. Attendance is auto-adjusted for leave period
```

### Example 2: Inventory Update Workflow
```
1. Service used requires product
   → Inventory > Check Stock
2. If low, add new stock
   → Inventory > Add Product
3. Create transaction log
   → Inventory > Transactions Tab shows history
4. System alerts when reaching minimum stock
```

### Example 3: Sales to Report Workflow
```
1. Process sale at POS System
   → /dashboard/pos-enhanced
2. Generate receipt
3. View sale in Sales Reports
   → /dashboard/sales-reports > Records Tab
4. Analyze trends in Analytics
   → Overview Tab shows charts and metrics
```

---

## 🆘 Common Tasks

### How to Add an Employee?
1. Go to `/dashboard/employees`
2. Click "+ Add Employee" button
3. Fill in: Name, Email, Phone, Department, Position, Salary
4. Click "Save"

### How to Check Inventory Levels?
1. Go to `/dashboard/inventory`
2. Check summary cards at top:
   - Total Products
   - Low Stock Items (⚠️ Warning)
   - Total Inventory Value
3. View detailed product table below

### How to Generate Sales Report?
1. Go to `/dashboard/sales-reports`
2. Click "Overview" tab
3. View charts and summary cards
4. Click "Export Report" for detailed analysis

### How to Manage Services?
1. Go to `/dashboard/services`
2. View all services in grid layout
3. Click "Edit" to modify pricing/duration
4. Switch to "Categories" tab to manage categories

### How to Process a Sale?
1. Go to `/dashboard/pos-enhanced`
2. Browse products (center panel)
3. Add items to bill (right panel)
4. Apply discount if needed
5. Select payment method
6. Generate receipt
7. Print or export as CSV

---

## 🔐 Access Levels

### Super Admin
- ✅ Access all dashboards
- ✅ Manage all data
- ✅ System settings
- ✅ User management

### Manager
- ✅ Employee management
- ✅ Inventory tracking
- ✅ Finance reports
- ✅ Sales analytics

### Staff/Employee
- ✅ Submit leave requests
- ✅ View attendance
- ✅ Access POS system

### HR
- ✅ Employee data
- ✅ Leave management
- ✅ Attendance reports

---

## 📞 Support Resources

### Getting Help
- Check this guide first
- Review DASHBOARD_COMPLETE.md for detailed info
- Check API_DOCUMENTATION.md for backend details
- Review error messages in browser console (F12)

### Common Error Messages
| Error | Solution |
|-------|----------|
| Modal won't open | Check browser console for JS errors |
| Chart not displaying | Verify Recharts is installed |
| Search not working | Check field is focused |
| Table empty | Verify mock data or API connection |
| Mobile layout broken | Clear cache and refresh |

---

## 🚀 Quick Links

- **Main Dashboard:** `/dashboard`
- **Employees:** `/dashboard/employees`
- **Inventory:** `/dashboard/inventory`
- **Finance:** `/dashboard/finance`
- **Sales:** `/dashboard/sales-reports`
- **Services:** `/dashboard/services`
- **POS:** `/dashboard/pos-enhanced`
- **API Docs:** `API_DOCUMENTATION.md`
- **Complete Guide:** `DASHBOARD_COMPLETE.md`

---

## ✅ Verification Checklist

Before going live, verify:
- [ ] All dashboard pages load without errors
- [ ] Mock data displays correctly
- [ ] Search/filter functions work
- [ ] Forms can be submitted
- [ ] Charts render properly
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Build passes: `npm run build`

---

**Happy Dashboard Usage! 🎉**

For detailed information, refer to `DASHBOARD_COMPLETE.md`
For API integration, refer to `API_DOCUMENTATION.md`
