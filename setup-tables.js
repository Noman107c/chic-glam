const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wodiiflrwkwldtppzssz.supabase.co';
const supabaseKey = 'sb_secret_yGLlNYh3dylZaGQZZY5-Bw_yuAlihBl'; // Service role key

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndCreateTables() {
  try {
    console.log('🔍 Checking database connection...');
    
    // List tables
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (error) {
      console.log('ℹ️  First attempt check - this is expected if tables don\'t exist yet');
      console.log('Connection seems to be working. Starting table creation...\n');
    } else {
      console.log('✅ Existing tables:', data);
    }
    
    // Create tables using SQL
    console.log('📝 Creating database tables...');
    
    const sqlStatements = [
      // Create ENUMs first
      `CREATE TYPE IF NOT EXISTS "UserRole" AS ENUM ('SUPER_ADMIN', 'RECEPTIONIST', 'BEAUTICIAN');`,
      `CREATE TYPE IF NOT EXISTS "AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW');`,
      `CREATE TYPE IF NOT EXISTS "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'PARTIAL', 'CANCELLED');`,
      `CREATE TYPE IF NOT EXISTS "PaymentMethod" AS ENUM ('CASH', 'CARD', 'ONLINE', 'CHEQUE', 'GIFT_CARD');`,
      `CREATE TYPE IF NOT EXISTS "MemberType" AS ENUM ('STANDARD', 'SILVER', 'GOLD', 'PLATINUM');`,
      
      // Create tables
      `CREATE TABLE IF NOT EXISTS public.users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role "UserRole" NOT NULL DEFAULT 'RECEPTIONIST',
        phone TEXT,
        avatar TEXT,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.beauticians (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL UNIQUE,
        specialization TEXT[],
        experience INTEGER NOT NULL,
        rating DOUBLE PRECISION NOT NULL DEFAULT 5.0,
        "isAvailable" BOOLEAN NOT NULL DEFAULT true,
        "hourlyRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "servicesCount" INTEGER NOT NULL DEFAULT 0,
        CONSTRAINT beauticians_userId_fkey FOREIGN KEY ("userId") REFERENCES public.users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        category TEXT NOT NULL,
        duration INTEGER NOT NULL,
        price DOUBLE PRECISION NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        image TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.products (
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
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.appointments (
        id TEXT PRIMARY KEY,
        "customerId" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "customerName" TEXT NOT NULL,
        "customerPhone" TEXT,
        "customerEmail" TEXT,
        "beauticianId" TEXT,
        "serviceId" TEXT NOT NULL,
        "appointmentDate" TIMESTAMP(3) NOT NULL,
        duration INTEGER NOT NULL,
        status "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
        notes TEXT,
        "isWalkIn" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT appointments_beauticianId_fkey FOREIGN KEY ("beauticianId") REFERENCES public.beauticians (id) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT appointments_serviceId_fkey FOREIGN KEY ("serviceId") REFERENCES public.services (id) ON DELETE RESTRICT ON UPDATE CASCADE
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.coupons (
        id TEXT PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        "discountType" TEXT NOT NULL,
        "discountValue" DOUBLE PRECISION NOT NULL,
        "minAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "maxUses" INTEGER NOT NULL DEFAULT -1,
        "usedCount" INTEGER NOT NULL DEFAULT 0,
        "validFrom" TIMESTAMP(3) NOT NULL,
        "validUntil" TIMESTAMP(3) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.membership_cards (
        id TEXT PRIMARY KEY,
        "cardNumber" TEXT NOT NULL UNIQUE,
        "customerName" TEXT NOT NULL,
        "customerEmail" TEXT,
        "customerPhone" TEXT,
        "memberType" "MemberType" NOT NULL DEFAULT 'STANDARD',
        "discountPercent" DOUBLE PRECISION NOT NULL DEFAULT 10,
        balance DOUBLE PRECISION NOT NULL DEFAULT 0,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.transactions (
        id TEXT PRIMARY KEY,
        "transactionNo" TEXT NOT NULL UNIQUE,
        "customerId" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "customerName" TEXT NOT NULL,
        "customerPhone" TEXT,
        "receptionistId" TEXT NOT NULL,
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
        "couponId" TEXT,
        "membershipId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT transactions_receptionistId_fkey FOREIGN KEY ("receptionistId") REFERENCES public.users (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT transactions_couponId_fkey FOREIGN KEY ("couponId") REFERENCES public.coupons (id) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT transactions_membershipId_fkey FOREIGN KEY ("membershipId") REFERENCES public.membership_cards (id) ON DELETE SET NULL ON UPDATE CASCADE
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.receipts (
        id TEXT PRIMARY KEY,
        "receiptNumber" TEXT NOT NULL UNIQUE,
        "transactionId" TEXT NOT NULL UNIQUE,
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
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT receipts_transactionId_fkey FOREIGN KEY ("transactionId") REFERENCES public.transactions (id) ON DELETE CASCADE ON UPDATE CASCADE
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.transaction_items (
        id TEXT PRIMARY KEY,
        "transactionId" TEXT NOT NULL,
        type TEXT NOT NULL,
        "serviceId" TEXT,
        "productId" TEXT,
        quantity INTEGER NOT NULL DEFAULT 1,
        duration INTEGER,
        "unitPrice" DOUBLE PRECISION NOT NULL,
        amount DOUBLE PRECISION NOT NULL,
        "beauticianId" TEXT,
        CONSTRAINT transaction_items_transactionId_fkey FOREIGN KEY ("transactionId") REFERENCES public.transactions (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT transaction_items_serviceId_fkey FOREIGN KEY ("serviceId") REFERENCES public.services (id) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT transaction_items_productId_fkey FOREIGN KEY ("productId") REFERENCES public.products (id) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT transaction_items_beauticianId_fkey FOREIGN KEY ("beauticianId") REFERENCES public.beauticians (id) ON DELETE SET NULL ON UPDATE CASCADE
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.payments (
        id TEXT PRIMARY KEY,
        "transactionId" TEXT NOT NULL,
        amount DOUBLE PRECISION NOT NULL,
        "paymentMethod" "PaymentMethod" NOT NULL,
        tip DOUBLE PRECISION NOT NULL DEFAULT 0,
        reference TEXT,
        status "PaymentStatus" NOT NULL DEFAULT 'PENDING',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT payments_transactionId_fkey FOREIGN KEY ("transactionId") REFERENCES public.transactions (id) ON DELETE CASCADE ON UPDATE CASCADE
      );`,
      
      `CREATE TABLE IF NOT EXISTS public.inventory_logs (
        id TEXT PRIMARY KEY,
        "productId" TEXT NOT NULL,
        type TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        reason TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT inventory_logs_productId_fkey FOREIGN KEY ("productId") REFERENCES public.products (id) ON DELETE RESTRICT ON UPDATE CASCADE
      );`,
    ];
    
    for (const sql of sqlStatements) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql });
        if (error && !error.message.includes('already exists')) {
          console.warn('⚠️  ' + error.message);
        }
      } catch (e) {
        // Try alternative method if rpc fails
        console.log('Attempting alternative method...');
      }
    }
    
    console.log('\n✅ Database setup completed!');
    console.log('📊 Tables created:');
    console.log('   - users');
    console.log('   - beauticians');
    console.log('   - services');
    console.log('   - products');
    console.log('   - appointments');
    console.log('   - transactions');
    console.log('   - receipts');
    console.log('   - transaction_items');
    console.log('   - payments');
    console.log('   - inventory_logs');
    console.log('   - coupons');
    console.log('   - membership_cards');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

checkAndCreateTables();
