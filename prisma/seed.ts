import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create users
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@chicglam.com" },
    update: {},
    create: {
      email: "admin@chicglam.com",
      password: await bcrypt.hash("admin123", 10),
      name: "Admin User",
      role: "SUPER_ADMIN",
      phone: "+91-9876543210",
    },
  });

  const receptionist = await prisma.user.upsert({
    where: { email: "receptionist@chicglam.com" },
    update: {},
    create: {
      email: "receptionist@chicglam.com",
      password: await bcrypt.hash("recept123", 10),
      name: "Priya Sharma",
      role: "RECEPTIONIST",
      phone: "+91-9876543211",
    },
  });

  // Create beauticians
  const beautician1 = await prisma.user.upsert({
    where: { email: "neha@chicglam.com" },
    update: {},
    create: {
      email: "neha@chicglam.com",
      password: await bcrypt.hash("neha123", 10),
      name: "Neha Verma",
      role: "BEAUTICIAN",
      phone: "+91-9876543212",
    },
  });

  const beautician2 = await prisma.user.upsert({
    where: { email: "anjali@chicglam.com" },
    update: {},
    create: {
      email: "anjali@chicglam.com",
      password: await bcrypt.hash("anjali123", 10),
      name: "Anjali Singh",
      role: "BEAUTICIAN",
      phone: "+91-9876543213",
    },
  });

  const beautician3 = await prisma.user.upsert({
    where: { email: "riya@chicglam.com" },
    update: {},
    create: {
      email: "riya@chicglam.com",
      password: await bcrypt.hash("riya123", 10),
      name: "Riya Patel",
      role: "BEAUTICIAN",
      phone: "+91-9876543214",
    },
  });

  // Create beautician profiles
  await prisma.beautician.upsert({
    where: { userId: beautician1.id },
    update: {},
    create: {
      userId: beautician1.id,
      specialization: ["Haircut", "Hair Coloring", "Hair Treatment"],
      experience: 5,
      rating: 4.8,
      hourlyRate: 500,
    },
  });

  await prisma.beautician.upsert({
    where: { userId: beautician2.id },
    update: {},
    create: {
      userId: beautician2.id,
      specialization: ["Facial", "Makeup", "Threading"],
      experience: 4,
      rating: 4.7,
      hourlyRate: 450,
    },
  });

  await prisma.beautician.upsert({
    where: { userId: beautician3.id },
    update: {},
    create: {
      userId: beautician3.id,
      specialization: ["Manicure", "Pedicure", "Waxing"],
      experience: 3,
      rating: 4.6,
      hourlyRate: 400,
    },
  });

  // Create services
  const services = [
    {
      name: "Haircut",
      category: "Hair",
      duration: 30,
      price: 300,
      description: "Professional haircut with styling",
    },
    {
      name: "Hair Coloring",
      category: "Hair",
      duration: 60,
      price: 1500,
      description: "Full head coloring with premium products",
    },
    {
      name: "Hair Treatment",
      category: "Hair",
      duration: 45,
      price: 800,
      description: "Protein treatment for damaged hair",
    },
    {
      name: "Facial",
      category: "Skincare",
      duration: 45,
      price: 700,
      description: "Deep cleansing facial treatment",
    },
    {
      name: "Makeup",
      category: "Makeup",
      duration: 60,
      price: 1000,
      description: "Professional makeup application",
    },
    {
      name: "Threading",
      category: "Hair Removal",
      duration: 20,
      price: 150,
      description: "Eyebrow/facial hair threading",
    },
    {
      name: "Manicure",
      category: "Nails",
      duration: 30,
      price: 400,
      description: "Complete nail care and polish",
    },
    {
      name: "Pedicure",
      category: "Nails",
      duration: 45,
      price: 600,
      description: "Foot care with polish",
    },
    {
      name: "Waxing",
      category: "Hair Removal",
      duration: 30,
      price: 350,
      description: "Full body or specific area waxing",
    },
    {
      name: "Bridal Makeup",
      category: "Makeup",
      duration: 90,
      price: 3000,
      description: "Special bridal makeup package",
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: {},
      create: service,
    });
  }

  // Create products
  const products = [
    {
      name: "Hair Oil",
      category: "Hair Care",
      price: 500,
      quantity: 50,
      supplier: "Himalaya",
      reorderLevel: 10,
    },
    {
      name: "Hair Shampoo",
      category: "Hair Care",
      price: 400,
      quantity: 30,
      supplier: "Dove",
      reorderLevel: 8,
    },
    {
      name: "Hair Conditioner",
      category: "Hair Care",
      price: 450,
      quantity: 25,
      supplier: "Dove",
      reorderLevel: 8,
    },
    {
      name: "Facial Cream",
      category: "Skincare",
      price: 800,
      quantity: 20,
      supplier: "Olay",
      reorderLevel: 5,
    },
    {
      name: "Face Wash",
      category: "Skincare",
      price: 350,
      quantity: 40,
      supplier: "Neutrogena",
      reorderLevel: 10,
    },
    {
      name: "Makeup Primer",
      category: "Makeup",
      price: 600,
      quantity: 15,
      supplier: "MAC",
      reorderLevel: 5,
    },
    {
      name: "Foundation",
      category: "Makeup",
      price: 1200,
      quantity: 12,
      supplier: "MAC",
      reorderLevel: 3,
    },
    {
      name: "Nail Polish",
      category: "Nails",
      price: 200,
      quantity: 60,
      supplier: "Lakme",
      reorderLevel: 15,
    },
    {
      name: "Nail File",
      category: "Nails",
      price: 100,
      quantity: 100,
      supplier: "Generic",
      reorderLevel: 20,
    },
    {
      name: "Wax Strips",
      category: "Hair Removal",
      price: 300,
      quantity: 50,
      supplier: "Veet",
      reorderLevel: 15,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }

  // Create coupons
  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      discountType: "percentage",
      discountValue: 10,
      minAmount: 500,
      maxUses: 100,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.coupon.create({
    data: {
      code: "SPRING500",
      discountType: "fixed",
      discountValue: 500,
      minAmount: 2000,
      maxUses: 50,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    },
  });

  // Create membership cards
  await prisma.membershipCard.create({
    data: {
      cardNumber: "MEM001",
      customerName: "Priya Gupta",
      customerEmail: "priya@example.com",
      customerPhone: "+91-9999999999",
      memberType: "GOLD",
      discountPercent: 15,
      balance: 5000,
    },
  });

  await prisma.membershipCard.create({
    data: {
      cardNumber: "MEM002",
      customerName: "Ananya Singh",
      customerEmail: "ananya@example.com",
      customerPhone: "+91-8888888888",
      memberType: "SILVER",
      discountPercent: 10,
      balance: 2000,
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
