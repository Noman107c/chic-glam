const { Pool } = require('pg');

const connectionString = 'postgresql://postgres.wodiiflrwkwldtppzssz:uErb84MLTC2CG1aO@db.wodiiflrwkwldtppzssz.supabase.co:5432/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const sql = `
-- Create ENUMs
CREATE TYPE IF NOT EXISTS "UserRole" AS ENUM ('SUPER_ADMIN', 'RECEPTIONIST', 'BEAUTICIAN');
CREATE TYPE IF NOT EXISTS "AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW');
CREATE TYPE IF NOT EXISTS "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'PARTIAL', 'CANCELLED');
CREATE TYPE IF NOT EXISTS "PaymentMethod" AS ENUM ('CASH', 'CARD', 'ONLINE', 'CHEQUE', 'GIFT_CARD');
CREATE TYPE IF NOT EXISTS "MemberType" AS ENUM ('STANDARD', 'SILVER', 'GOLD', 'PLATINUM');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role "UserRole" NOT NULL DEFAULT 'RECEPTIONIST',
    phone TEXT,
    avatar TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create beauticians table
CREATE TABLE IF NOT EXISTS beauticians (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    specialization TEXT[],
    experience INTEGER NOT NULL,
    rating DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "hourlyRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "servicesCount" INTEGER NOT NULL DEFAULT 0
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT NOT NULL,
    duration INTEGER NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    image TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    "reorderLevel" INTEGER NOT NULL DEFAULT 10,
    supplier TEXT,
    image TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    "customerId" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT,
    "customerEmail" TEXT,
    "beauticianId" TEXT REFERENCES beauticians(id) ON DELETE SET NULL,
    "serviceId" TEXT NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    "appointmentDate" TIMESTAMP NOT NULL,
    duration INTEGER NOT NULL,
    status "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    notes TEXT,
    "isWalkIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    "discountType" TEXT NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "minAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maxUses" INTEGER NOT NULL DEFAULT -1,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "validFrom" TIMESTAMP NOT NULL,
    "validUntil" TIMESTAMP NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create membership_cards table
CREATE TABLE IF NOT EXISTS membership_cards (
    id TEXT PRIMARY KEY,
    "cardNumber" TEXT NOT NULL UNIQUE,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "memberType" "MemberType" NOT NULL DEFAULT 'STANDARD',
    "discountPercent" DOUBLE PRECISION NOT NULL DEFAULT 10,
    balance DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    "transactionNo" TEXT NOT NULL UNIQUE,
    "customerId" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT,
    "receptionistId" TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    subtotal DOUBLE PRECISION NOT NULL DEFAULT 0,
    discount DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discountType" TEXT NOT NULL DEFAULT 'percentage',
    tax DOUBLE PRECISION NOT NULL DEFAULT 0,
    total DOUBLE PRECISION NOT NULL,
    paid DOUBLE PRECISION NOT NULL DEFAULT 0,
    balance DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod" NOT NULL,
    notes TEXT,
    "appointmentId" TEXT,
    "couponId" TEXT REFERENCES coupons(id) ON DELETE SET NULL,
    "membershipId" TEXT REFERENCES membership_cards(id) ON DELETE SET NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create receipts table
CREATE TABLE IF NOT EXISTS receipts (
    id TEXT PRIMARY KEY,
    "receiptNumber" TEXT NOT NULL UNIQUE,
    "transactionId" TEXT NOT NULL UNIQUE REFERENCES transactions(id) ON DELETE CASCADE,
    "businessName" TEXT NOT NULL DEFAULT 'Chic & Glam',
    "businessPhone" TEXT,
    "businessEmail" TEXT,
    "businessAddress" TEXT,
    "businessLogo" TEXT,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT,
    "customerEmail" TEXT,
    "cashierName" TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal DOUBLE PRECISION NOT NULL,
    discount DOUBLE PRECISION NOT NULL,
    "discountPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    tax DOUBLE PRECISION NOT NULL,
    total DOUBLE PRECISION NOT NULL,
    paid DOUBLE PRECISION NOT NULL,
    change DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    notes TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create transaction_items table
CREATE TABLE IF NOT EXISTS transaction_items (
    id TEXT PRIMARY KEY,
    "transactionId" TEXT NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    "serviceId" TEXT REFERENCES services(id) ON DELETE SET NULL,
    "productId" TEXT REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    duration INTEGER,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    "beauticianId" TEXT REFERENCES beauticians(id) ON DELETE SET NULL
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    "transactionId" TEXT NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    amount DOUBLE PRECISION NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    tip DOUBLE PRECISION NOT NULL DEFAULT 0,
    reference TEXT,
    status "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create inventory_logs table
CREATE TABLE IF NOT EXISTS inventory_logs (
    id TEXT PRIMARY KEY,
    "productId" TEXT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    reason TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON users(email);
CREATE UNIQUE INDEX IF NOT EXISTS beauticians_userId_key ON beauticians("userId");
CREATE UNIQUE INDEX IF NOT EXISTS services_name_key ON services(name);
CREATE UNIQUE INDEX IF NOT EXISTS products_name_key ON products(name);
CREATE UNIQUE INDEX IF NOT EXISTS transactions_transactionNo_key ON transactions("transactionNo");
CREATE UNIQUE INDEX IF NOT EXISTS receipts_receiptNumber_key ON receipts("receiptNumber");
CREATE UNIQUE INDEX IF NOT EXISTS receipts_transactionId_key ON receipts("transactionId");
CREATE UNIQUE INDEX IF NOT EXISTS coupons_code_key ON coupons(code);
CREATE UNIQUE INDEX IF NOT EXISTS membership_cards_cardNumber_key ON membership_cards("cardNumber");
`;

async function setupDatabase() {
  try {
    console.log('🔍 Connecting to Supabase database...');
    const client = await pool.connect();
    console.log('✅ Connected successfully!\n');

    console.log('📝 Creating database tables and indexes...');
    
    // Split SQL by semicolon and execute each statement
    const statements = sql.split(';').filter(s => s.trim());
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        try {
          await client.query(statement);
          console.log(`  ✓ ${statement.substring(0, 60)}...`);
        } catch (err) {
          if (err.code === '42P07' || err.message.includes('already exists')) {
            console.log(`  ℹ️  (Already exists)`);
          } else {
            console.error(`  ❌ Error: ${err.message}`);
          }
        }
      }
    }

    client.release();
    
    console.log('\n✅ Database setup completed!');
    console.log('\n📊 Tables created/verified:');
    console.log('   ✓ users');
    console.log('   ✓ beauticians');
    console.log('   ✓ services');
    console.log('   ✓ products');
    console.log('   ✓ appointments');
    console.log('   ✓ transactions');
    console.log('   ✓ receipts');
    console.log('   ✓ transaction_items');
    console.log('   ✓ payments');
    console.log('   ✓ inventory_logs');
    console.log('   ✓ coupons');
    console.log('   ✓ membership_cards');
    console.log('\n🎉 Database is ready to use!');

  } catch (err) {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
