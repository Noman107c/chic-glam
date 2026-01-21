# Chic Glam - Enterprise Super Admin Dashboard

A modern, enterprise-level Super Admin Dashboard for **Beauty Salon & Gym Management System** built with Next.js, TypeScript, Tailwind CSS, and Recharts.

## 🎯 Features

### 📊 Dashboard Overview
- **8 Key Metrics Cards**: Total Salons, Total Gyms, Total Branches, Active Members, Staff Count, Today's Revenue, Monthly Revenue, Pending Payments
- Growth indicators with trend analysis
- Clickable navigation to detailed pages

### 📈 Advanced Analytics
- Revenue charts (Daily/Monthly/Yearly)
- Salon vs Gym performance comparison
- Membership growth tracking
- Peak hours analysis
- Most profitable branches
- Branch performance summary tables
- Export reports functionality

### 👥 Role-Based Access Control (RBAC)
- 9 predefined roles: Super Admin, Branch Admin, Salon Manager, Gym Manager, Trainer, Beautician, Receptionist, Accountant, Customer
- Create/Edit/Delete custom roles
- Permission assignment (CRUD-based)
- Audit logs for role changes
- Fine-grained permission control

### 🏢 Branch Management
- Add/Edit/Delete salon and gym branches
- Branch-wise configuration
- Working hours management (7 days)
- Operating status tracking
- Multi-location support

### 💰 Financial Management
- Transaction tracking (Income/Expense)
- Invoice management
- Real-time financial metrics
- Expense categorization
- Payment status tracking
- Financial dashboards

### 👤 User Management
- Complete user directory
- Role assignment
- Search and filter functionality
- Status management (Active/Inactive)
- User activity tracking

### 🎨 UI/UX Features
- **Dark/Light Mode**: Full theme switching support
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Professional Design**: Clean, modern admin interface
- **Interactive Charts**: Real-time data visualization with Recharts
- **Smooth Animations**: Professional transitions and interactions

## 🏗️ Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                 # Main dashboard
│   │   ├── layout.tsx               # Dashboard layout wrapper
│   │   ├── analytics/
│   │   │   └── page.tsx            # Analytics & Reports
│   │   ├── branches/
│   │   │   └── page.tsx            # Branch management
│   │   ├── finance/
│   │   │   └── page.tsx            # Financial management
│   │   ├── roles/
│   │   │   └── page.tsx            # Role & permission management
│   │   ├── users/
│   │   │   └── page.tsx            # User management
│   │   └── settings/
│   │       └── page.tsx            # System settings
│   └── auth/                         # Authentication pages
│
├── components/
│   ├── cards/
│   │   └── StatCard.tsx            # Dashboard stat cards
│   ├── charts/
│   │   └── DashboardCharts.tsx      # Revenue, comparison, pie charts
│   ├── tables/
│   │   └── DataTable.tsx            # Reusable data table component
│   ├── modals/                       # Modal components
│   ├── layout/
│   │   └── DashboardLayout.tsx      # Sidebar + topbar layout
│   └── ui/                           # Basic UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       ├── Loader.tsx
│       └── Toast.tsx
│
├── services/
│   ├── auth.service.ts             # Authentication API
│   ├── user.service.ts             # User & role management API
│   ├── finance.service.ts          # Financial data API
│   └── branch.service.ts           # Branch management API
│
├── hooks/
│   ├── usePagination.ts            # Pagination logic
│   ├── useTheme.ts                 # Dark/light mode hook
│   └── useAsync.ts                 # Async data fetching
│
├── types/
│   └── index.ts                    # TypeScript interfaces & types
│
├── constants/
│   └── index.ts                    # System constants & permissions
│
├── utils/
│   ├── index.ts                    # Utility functions
│   └── mockData.ts                 # Mock data for development
│
└── styles/
    └── globals.css                 # Global styles & animations
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 2.10
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Theme**: Dark/Light mode support
- **Responsive**: Mobile-first approach

## 📋 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
cd chic-glam
npm install --legacy-peer-deps

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 🚀 Features Breakdown

### Dashboard (Home)
- 8 KPI cards with growth metrics
- Revenue analytics chart
- Salon vs Gym comparison
- Membership growth chart
- Profit distribution pie charts
- Top performing branches section

### Analytics
- Multi-chart dashboard
- Date range filtering (Daily/Weekly/Monthly/Yearly)
- Chart type toggle (Line/Bar)
- Branch performance table
- Top services analysis
- Peak hours heatmap
- Export functionality

### Users Management
- Complete user directory
- Search functionality
- Role-based filtering
- Add/Edit/Delete operations
- Status management
- User joining dates

### Roles & Permissions
- 9 predefined roles
- Custom role creation
- Permission checkboxes
- CRUD permission mapping
- Role status management
- Permission reference guide

### Branches
- Salon & Gym management
- Location tracking
- Contact information
- Operating hours configuration
- Branch statistics
- Status tracking

### Finance
- Transaction history
- Income vs Expense tracking
- Invoice management
- Financial overview cards
- Transaction categorization
- Payment status tracking

### Settings
- Company information
- Theme customization
- Regional settings (Timezone, Currency, Language)
- Notification preferences
- Security settings
- Data management options

## 🎨 Responsive Design

The dashboard is fully responsive across all devices:
- **Desktop (1200px+)**: Full 4-column layouts
- **Tablet (768px-1199px)**: 2-column layouts
- **Mobile (<768px)**: Single column with collapsible sidebar

## 🌓 Theme Support

- Automatic detection of system preference
- Manual theme toggle in sidebar
- Persistent theme preference in localStorage
- Smooth transitions between themes

## 📊 Mock Data

The application includes comprehensive mock data for development:
- 8 dashboard statistics
- 7 days of revenue data
- 4 weeks of comparison data
- 5 months of membership data
- 4 branch performance metrics
- Multiple users and roles
- Branch information

## 🔐 Security Features

- Role-Based Access Control (RBAC)
- Permission validation
- User activity tracking
- Audit logs support
- Session management ready
- Secure password field types

## 🚦 Performance Optimizations

- Code splitting with Next.js
- Lazy loading of components
- Memoized components
- Optimized re-renders
- Image optimization ready
- CSS-in-JS with Tailwind

## 📱 Mobile Features

- Collapsible sidebar for mobile
- Touch-friendly buttons and controls
- Optimized font sizes
- Responsive grid layouts
- Mobile-optimized modals
- Horizontal scroll for tables

## 🔄 Future Enhancements

- Backend API integration
- Real-time data updates with WebSockets
- Advanced reporting features
- Membership freeze/pause functionality
- Commission system implementation
- Email/SMS notification system
- Data backup and restore
- Multiple currency support
- Advanced analytics dashboard

## 📝 Notes

- All data is currently mock data for demonstration
- API endpoints are ready for integration
- Services are structured for easy API connection
- Types are fully defined for type safety
- Components are reusable and customizable

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is part of the Chic Glam Beauty Salon & Gym Management System.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
