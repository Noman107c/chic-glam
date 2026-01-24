# 📊 Database Tables Schema - Ready to Create

## Summary
Your Chic & Glam POS system database has **12 tables** and **5 custom data types** defined and ready to be created in Supabase.

---

## 📋 Tables Overview

### 1. **users** - User Management
- Stores staff members and administrators
- Fields: id, email, password, name, role, phone, avatar, isActive, timestamps
- Role Types: SUPER_ADMIN, RECEPTIONIST, BEAUTICIAN

### 2. **beauticians** - Staff Information
- Beautician profiles and ratings
- Fields: id, userId, specialization[], experience, rating, isAvailable, hourlyRate, totalEarnings, servicesCount
- Links to: users table

### 3. **services** - Beauty Services
- Available services (haircut, spa, etc.)
- Fields: id, name, description, category, duration, price, isActive, image, timestamps
- Example categories: Hair, Nails, Spa, Makeup

### 4. **products** - Retail Products
- Products for sale (cosmetics, skincare, etc.)
- Fields: id, name, description, category, price, quantity, reorderLevel, supplier, image, isActive, timestamps
- Tracking: Available inventory and reorder levels

### 5. **appointments** - Booking System
- Customer appointments
- Fields: id, customerId, customerName, customerPhone, customerEmail, beauticianId, serviceId, appointmentDate, duration, status, notes, isWalkIn, timestamps
- Status Types: SCHEDULED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW

### 6. **transactions** - Sales Records
- All POS transactions
- Fields: id, transactionNo, customerId, customerName, customerPhone, receptionistId, subtotal, discount, discountType, tax, total, paid, balance, paymentStatus, paymentMethod, notes, appointmentId, couponId, membershipId, timestamps
- Payment Methods: CASH, CARD, ONLINE, CHEQUE, GIFT_CARD
- Payment Status: PENDING, PAID, PARTIAL, CANCELLED

### 7. **receipts** - Thermal Receipts
- Digital receipts for transactions
- Fields: id, receiptNumber, transactionId, businessName/phone/email/address/logo, customerName/phone/email, cashierName, items (JSONB), subtotal, discount, discountPercent, tax, total, paid, change, paymentMethod, paymentStatus, notes, timestamps
- Supports 80mm thermal printing

### 8. **transaction_items** - Line Items
- Individual items in a transaction
- Fields: id, transactionId, type, serviceId, productId, quantity, duration, unitPrice, amount, beauticianId
- Links to: transactions, services, products, beauticians

### 9. **payments** - Payment Tracking
- Detailed payment information
- Fields: id, transactionId, amount, paymentMethod, tip, reference, status, timestamps
- Supports tips and reference tracking

### 10. **inventory_logs** - Stock Management
- Product inventory history
- Fields: id, productId, type, quantity, reason, createdAt
- Types: IN, OUT, ADJUSTMENT, RETURN

### 11. **coupons** - Discount Codes
- Promotional coupon management
- Fields: id, code, discountType, discountValue, minAmount, maxUses, usedCount, validFrom, validUntil, isActive, timestamps
- Discount types: percentage, fixed

### 12. **membership_cards** - Loyalty Program
- Customer membership cards
- Fields: id, cardNumber, customerName, customerEmail, customerPhone, memberType, discountPercent, balance, isActive, timestamps
- Member Types: STANDARD, SILVER, GOLD, PLATINUM

---

## 🔗 Relationships

```
users (1) ──→ (M) beauticians
           └─→ (M) transactions

beauticians ──→ appointments
           └─→ transaction_items

services ──→ (M) appointments
        └─→ (M) transaction_items

products ──→ (M) transaction_items
        └─→ (M) inventory_logs

transactions (1) ──→ (1) receipts
            ├─→ (M) transaction_items
            ├─→ (M) payments
            ├─→ (0-1) coupons
            └─→ (0-1) membership_cards
```

---

## 📊 Total Field Count
- **Total Tables**: 12
- **Total Fields**: 150+
- **Foreign Keys**: 20+
- **Indexes**: 9
- **Custom Types (Enums)**: 5

---

## ✅ Data Types Used
- TEXT (strings)
- INTEGER (whole numbers)
- DOUBLE PRECISION (decimals)
- TIMESTAMP (date & time)
- BOOLEAN (true/false)
- TEXT[] (arrays)
- JSONB (complex JSON data)
- Custom ENUM types

---

## 🚀 Ready to Use

All tables are configured with:
- ✅ Primary keys
- ✅ Foreign key relationships
- ✅ Default values
- ✅ Unique constraints
- ✅ Timestamps for audit trail
- ✅ Proper indexing for performance

---

## 📝 Creation Options

Choose ONE method to create all tables:

### **Option A: Supabase Web UI (Easiest)** ⭐ Recommended
1. Go to Supabase SQL Editor
2. Copy SQL from: `prisma/migrations/0001_init_all_tables.sql`
3. Click Run
4. Done! Tables created instantly

### **Option B: Node.js Script**
```bash
node create-db-tables.js
```
(Requires correct DATABASE_URL password)

### **Option C: Prisma Migrations**
```bash
npx prisma migrate dev --name init_all_tables
```
(Requires correct DATABASE_URL password)

---

## 🔍 File Locations

- **SQL Migration**: `prisma/migrations/0001_init_all_tables.sql` (238 lines)
- **Prisma Schema**: `prisma/schema.prisma`
- **Node Setup Script**: `create-db-tables.js`
- **Setup Guide**: `DATABASE_SETUP.md`

---

## 💡 Next Steps

After table creation:

1. **Verify Tables**: Check Supabase Table Editor
2. **Test Connection**: Run `npm run test-db`
3. **Add Sample Data** (Optional): Run `node add-test-data.js`
4. **Start App**: Run `npm run dev`

---

🎉 **Your database is ready to create!**
