# 🗄️ Database Setup Guide - Complete Instructions

## Current Status
✅ Your Supabase project is configured: `wodiiflrwkwldtppzssz`
⏳ Database tables need to be created

## Option 1: Using Supabase SQL Editor (Recommended & Fastest)

### Step 1: Open Supabase SQL Editor
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Login to your account
3. Click on project `wodiiflrwkwldtppzssz`
4. Click **SQL Editor** in the left sidebar
5. Click **New Query** button

### Step 2: Copy & Paste the SQL
The complete SQL to create all tables is in: `prisma/migrations/0001_init_all_tables.sql`

Full SQL is available in this folder:
- File: `c:\Users\irfa2\Desktop\chic-glam\prisma\migrations\0001_init_all_tables.sql`

### Step 3: Run the Query
1. Paste all SQL from the migration file
2. Click **Run** button (or press `Ctrl+Enter`)
3. Wait for confirmation message

### Step 4: Verify Tables
1. Go to **Table Editor** in left sidebar
2. You should see all these tables:
   - ✓ users
   - ✓ beauticians
   - ✓ services
   - ✓ products
   - ✓ appointments
   - ✓ transactions
   - ✓ receipts
   - ✓ transaction_items
   - ✓ payments
   - ✓ inventory_logs
   - ✓ coupons
   - ✓ membership_cards

---

## Option 2: Fix DATABASE_URL and Use Node Script

### Step 1: Get Correct Database Password
1. Go to [Supabase Dashboard](https://app.supabase.com/projects)
2. Click your project: `wodiiflrwkwldtppzssz`
3. Click **Settings** → **Database**
4. Look for **Connection string**
5. Copy the PostgreSQL connection string

It should look like:
```
postgresql://postgres.wodiiflrwkwldtppzssz:[YOUR_PASSWORD]@db.wodiiflrwkwldtppzssz.supabase.co:5432/postgres
```

### Step 2: Update .env.local
Replace the DATABASE_URL line in `.env.local` with the correct connection string:

```dotenv
DATABASE_URL=postgresql://postgres.wodiiflrwkwldtppzssz:[YOUR_PASSWORD]@db.wodiiflrwkwldtppzssz.supabase.co:5432/postgres
```

### Step 3: Run Node Script
```bash
node create-db-tables.js
```

### Step 4: Verify
```bash
node verify-test-data.js
```

---

## Option 3: Use Prisma Migrations

### Step 1: Get DATABASE_URL (Same as Option 2)

### Step 2: Update .env.local with correct password

### Step 3: Run Migration
```bash
npx prisma migrate dev --name init_all_tables
```

### Step 4: Generate Prisma Client
```bash
npx prisma generate
```

---

## ⚠️ Important Notes

- **Password Characters**: If your database password contains special characters like `@`, `#`, `%`, they need to be URL-encoded:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`
  - Example: `pass@word` → `postgresql://postgres.wodiiflrwkwldtppzssz:pass%40word@...`

- **SSL Connection**: Supabase requires SSL. The Node script already handles this.

- **Reset Password**: If you forgot the password, you can reset it in Supabase Settings → Database → Reset Password

---

## ✅ Next Steps After Setup

Once tables are created:

1. **Verify Connection**:
   ```bash
   npm run test-db
   ```

2. **Test APIs**:
   ```bash
   npm run test-apis
   ```

3. **Seed Sample Data** (Optional):
   ```bash
   node add-test-data.js
   ```

4. **Run Application**:
   ```bash
   npm run dev
   ```

---

## 🆘 Troubleshooting

### "Password authentication failed"
- ❌ DATABASE_URL password is incorrect
- ✅ Go to Supabase Settings → Database and copy the correct password

### "Connection refused"
- ❌ Network issue or incorrect host
- ✅ Ensure you're online and using correct project ID: `wodiiflrwkwldtppzssz`

### "Database already exists"
- ℹ️ This is normal if you've run the script before
- ✅ You can safely run it again (uses `IF NOT EXISTS`)

### Tables not appearing in Table Editor
- ⏳ Refresh the browser page
- 🔄 Log out and back into Supabase
- ✅ Check SQL Editor to verify query ran successfully

---

## 📞 Need Help?

Check these files for more information:
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- [README.md](README.md)
- [POS_SYSTEM_COMPLETE.md](POS_SYSTEM_COMPLETE.md)

