"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Trash2,
  CreditCard,
  ShoppingCart,
  CheckCircle,
  Clock,
  Scissors,
  Sparkles,
  Palette,
  Droplet,
  Dumbbell,
  Activity,
  Heart,
  Users,
  Timer,
  Zap,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Receipt } from "@/components/Receipt";

// Mock data for products/services with images
const mockProducts = [
  // Hair Category
  {
    id: 1,
    name: "Classic Haircut",
    price: 1500,
    category: "Hair",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    description: "Wash, cut and style by senior stylist",
  },
  {
    id: 2,
    name: "Keratin Hair Treatment",
    price: 8000,
    category: "Hair",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
    description: "Smooth and shine treatment for frizzy hair",
  },
  {
    id: 3,
    name: "Hair Coloring (Full)",
    price: 6000,
    category: "Hair",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
    description: "Professional full head hair coloring service",
  },

  // Makeup Category
  {
    id: 4,
    name: "Bridal Makeup Package",
    price: 25000,
    category: "Makeup",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    description: "Complete bridal look with trial session",
  },
  {
    id: 5,
    name: "Party Makeup",
    price: 2000,
    category: "Makeup",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400",
    description: "Evening party makeup for special occasions",
  },
  {
    id: 6,
    name: "HD Makeup",
    price: 3000,
    category: "Makeup",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    description: "High definition makeup for photoshoots",
  },

  // Nails Category
  {
    id: 7,
    name: "Manicure & Pedicure Spa",
    price: 2000,
    category: "Nails",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400",
    description: "Relaxing hand and foot care with massage",
  },
  {
    id: 8,
    name: "Gel Nail Art",
    price: 1500,
    category: "Nails",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
    description: "Custom gel designs and polish",
  },
  {
    id: 9,
    name: "Acrylic Extensions",
    price: 2500,
    category: "Nails",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=400",
    description: "Durable nail extensions with shaping",
  },

  // Skincare Category
  {
    id: 10,
    name: "HydraFacial Deluxe",
    price: 3500,
    category: "Skincare",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
    description: "Deep cleansing and hydration treatment",
  },
  {
    id: 11,
    name: "Deep Cleansing Facial",
    price: 2200,
    category: "Skincare",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400",
    description: "Thorough cleanse for glowing skin",
  },
  {
    id: 12,
    name: "Chemical Peel",
    price: 3000,
    category: "Skincare",
    serviceType: "Beauty Salon",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400",
    description: "Advanced skin resurfacing treatment",
  },

  // Gym Training Category
  {
    id: 13,
    name: "Personal Training Session",
    price: 2500,
    category: "Training",
    serviceType: "Gym",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    description: "1-on-1 session with certified trainer",
  },
  {
    id: 14,
    name: "CrossFit Session",
    price: 1200,
    category: "Training",
    serviceType: "Gym",
    image: "https://images.unsplash.com/photo-1517963879466-e9b5ce388d28?w=400",
    description: "Functional fitness training for strength",
  },
  {
    id: 15,
    name: "HIIT Group Class",
    price: 1000,
    category: "Classes",
    serviceType: "Gym",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    description: "High Intensity Interval Training",
  },
  {
    id: 16,
    name: "Yoga Class Drop-in",
    price: 800,
    category: "Classes",
    serviceType: "Gym",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    description: "Single session group yoga class",
  },
  {
    id: 17,
    name: "Zumba Dance Class",
    price: 800,
    category: "Classes",
    serviceType: "Gym",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400",
    description: "Fun and energetic dance workout party",
  },
  {
    id: 18,
    name: "Spin Class",
    price: 900,
    category: "Classes",
    serviceType: "Gym",
    image: "https://images.unsplash.com/photo-1534258936925-c48947387e3b?w=400",
    description: "High-energy indoor cycling workout",
  },
  {
    id: 19,
    name: "Monthly Gym Membership",
    price: 5000,
    category: "Membership",
    serviceType: "Gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    description: "Unlimited access to gym floor and equipment",
  },
  {
    id: 20,
    name: "Nutrition Consultation",
    price: 2000,
    category: "Wellness",
    serviceType: "Gym",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    description: "Diet plan and nutrition advice from experts",
  },
];

// Mock customers
const mockCustomers = [
  { id: 1, name: "Sarah Ahmed", phone: "0300-1234567" },
  { id: 2, name: "Ayesha Khan", phone: "0301-2345678" },
  { id: 3, name: "Fatima Ali", phone: "0302-3456789" },
  { id: 4, name: "Zara Malik", phone: "0303-4567890" },
  { id: 5, name: "Hira Shah", phone: "0304-5678901" },
];

// Mock beauticians
const mockBeauticians = [
  { id: 1, name: "Aisha Beauty Expert", phone: "0300-1111111" },
  { id: 2, name: "Fatima Makeup Artist", phone: "0301-2222222" },
  { id: 3, name: "Zara Hair Stylist", phone: "0302-3333333" },
  { id: 4, name: "Hira Nail Artist", phone: "0303-4444444" },
];

// Mock trainers
const mockTrainers = [
  { id: 1, name: "Ahmed Fitness Trainer", phone: "0300-5555555" },
  { id: 2, name: "Bilal Gym Instructor", phone: "0301-6666666" },
  { id: 3, name: "Omar Strength Coach", phone: "0302-7777777" },
  { id: 4, name: "Usman Cardio Specialist", phone: "0303-8888888" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

export default function POSPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Hair");
  const [selectedServiceType, setSelectedServiceType] =
    useState<string>("Beauty Salon");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [cashReceived, setCashReceived] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [receipt, setReceipt] = useState<any>(null);

  // Splash Screen Timer
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Filter products by service type
  const serviceFilteredProducts = mockProducts.filter(
    (p) => p.serviceType === selectedServiceType,
  );

  // Get all unique categories for selected service type
  const categories = Array.from(
    new Set(serviceFilteredProducts.map((p) => p.category)),
  );

  // Filter products by selected category
  const filteredProducts = serviceFilteredProducts.filter(
    (p) => p.category === selectedCategory,
  );

  // Cart functions
  const addToCart = (product: (typeof mockProducts)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          category: product.category,
          image: product.image,
        },
      ];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setDiscountPercent(0);
    setCashReceived("");
    setReceipt(null);
    setCustomerName("");
  };

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;

  const change = cashReceived
    ? Math.max(0, parseFloat(cashReceived) - total)
    : 0;
  const isPaymentValid = !cashReceived || parseFloat(cashReceived) < total;

  const handlePaymentComplete = async () => {
    try {
      // Generate receipt number
      const receiptNumber = `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

      // Create sale data for local storage
      const saleData = {
        id: receiptNumber,
        customerName: customerName.trim() || "Walk-in Customer",
        items: cart.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
        })),
        subtotal,
        discount: discountAmount,
        discountPercent,
        total,
        paymentMethod,
        cashReceived: parseFloat(cashReceived) || 0,
        change,
        receiptNumber,
        timestamp: new Date().toISOString(),
      };

      // Save to localStorage
      const existingSales = JSON.parse(
        localStorage.getItem("chic_glam_sales") || "[]",
      );
      existingSales.push(saleData);
      localStorage.setItem("chic_glam_sales", JSON.stringify(existingSales));

      console.log("Sale saved locally:", saleData);

      // Print receipt directly
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        const itemsHTML = cart
          .map(
            (item) =>
              `<div class="item">
            <span>${item.name} × ${item.quantity}</span>
            <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
          </div>`,
          )
          .join("");

        const discountHTML =
          discountPercent > 0
            ? `
          <div class="item">
            <span>Discount (${discountPercent}%):</span>
            <span>-Rs. ${discountAmount.toLocaleString()}</span>
          </div>`
            : "";

        const changeHTML =
          change > 0
            ? `
          <div class="item">
            <span>Change:</span>
            <span>Rs. ${change.toLocaleString()}</span>
          </div>`
            : "";

        const receiptHTML = `
          <html>
            <head>
              <title>Receipt - ${receiptNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .receipt { max-width: 300px; margin: 0 auto; }
                .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 10px; }
                .item { display: flex; justify-content: space-between; margin: 5px 0; }
                .total { border-top: 1px solid #000; padding-top: 10px; font-weight: bold; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              <div class="receipt">
                <div class="header">
                  <h2>Chic & Glam</h2>
                  <p>Premium Beauty & Fitness Services</p>
                  <p>Receipt: ${receiptNumber}</p>
                  <p>Customer: ${customerName.trim() || "Walk-in Customer"}</p>
                  <p>Date: ${new Date().toLocaleString()}</p>
                </div>
                <div class="items">
                  ${itemsHTML}
                </div>
                <div class="total">
                  <div class="item">
                    <span>Subtotal:</span>
                    <span>Rs. ${subtotal.toLocaleString()}</span>
                  </div>
                  ${discountHTML}
                  <div class="item">
                    <span>Total:</span>
                    <span>Rs. ${total.toLocaleString()}</span>
                  </div>
                  <div class="item">
                    <span>Paid:</span>
                    <span>Rs. ${(parseFloat(cashReceived) || 0).toLocaleString()}</span>
                  </div>
                  ${changeHTML}
                  <div class="item">
                    <span>Payment Method:</span>
                    <span>${paymentMethod === "cash" ? "Cash" : "Card"}</span>
                  </div>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px;">
                  <p>Thank you for your business!</p>
                  <p>© 2023 Chic & Glam</p>
                </div>
              </div>
            </body>
          </html>
        `;
        printWindow.document.write(receiptHTML);
        printWindow.document.close();
        printWindow.print();
      }

      // Clear cart and close modal
      clearCart();
      setIsPaymentModalOpen(false);

      // Show success message
      alert(
        "Payment completed successfully! Inventory updated and receipt printed.",
      );
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Error processing payment. Please try again.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#FAF9F6] flex items-center justify-center flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              layoutId="brand-logo"
              className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl mb-8"
              transition={{ duration: 0.8, ease: "circInOut" }}
            >
              <img
                src="/chic-logo.jpg"
                alt="Chic & Glam Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#392d22]"
            >
              Chic & Glam
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              className="h-1 w-24 bg-[#392d22] mt-4 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-[#FAF9F6] overflow-y-auto lg:overflow-hidden">
        {/* RESPONSIVE PANEL LAYOUT */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* LEFT PANEL - CATEGORIES */}
          <div className="hidden lg:flex w-full lg:w-1/4 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex-col shadow-sm overflow-auto">
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-100 min-h-[64px] flex items-center gap-3">
              <motion.div
                layoutId="brand-logo"
                className="h-10 w-10 rounded-full overflow-hidden border border-gray-100 shadow-sm flex-shrink-0"
              >
                <img
                  src="/chic-logo.jpg"
                  alt="Chic & Glam"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold text-[#392d22] font-serif tracking-tight leading-tight">
                  Chic & Glam
                </h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-tight">
                  Point of Sale
                </p>
              </div>
            </div>

            {/* Service Type Filter */}
            <div className="p-4 border-b border-gray-100 bg-white">
              <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                <motion.button
                  onClick={() => {
                    setSelectedServiceType("Beauty Salon");
                    setSelectedCategory("Hair");
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    selectedServiceType === "Beauty Salon"
                      ? "bg-white text-[#392d22] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Scissors size={16} />
                  <span>Salon</span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setSelectedServiceType("Gym");
                    setSelectedCategory("Training");
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    selectedServiceType === "Gym"
                      ? "bg-white text-[#392d22] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Dumbbell size={16} />
                  <span>Gym</span>
                </motion.button>
              </div>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
                Categories
              </h3>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all font-medium text-sm flex items-center justify-between group ${
                    selectedCategory === category
                      ? "bg-[#392d22] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#392d22]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`transition-transform duration-300 ${selectedCategory === category ? "scale-110" : "group-hover:scale-110"}`}
                    >
                      {category === "Hair" && <Scissors size={18} />}
                      {category === "Makeup" && <Palette size={18} />}
                      {category === "Nails" && <Sparkles size={18} />}
                      {category === "Skincare" && <Droplet size={18} />}

                      {category === "Training" && <Dumbbell size={18} />}
                      {category === "Classes" && <Users size={18} />}
                      {category === "Membership" && <CreditCard size={18} />}
                      {category === "Wellness" && <Heart size={18} />}
                      {category === "Cardio" && <Activity size={18} />}
                      {category === "Yoga" && <Heart size={18} />}
                    </span>
                    <span>{category}</span>
                  </div>
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Cart Count */}
            <div className="p-4 border-t border-gray-200 bg-[#FAF9F6]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#392d22]">
                  Items:
                </span>
                <span className="text-2xl font-bold text-[#d4af37]">
                  {cart.length}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Total Qty: {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
            </div>
          </div>

          {/* CENTER PANEL - PRODUCTS (full width on mobile, 50-55% on desktop) */}
          <div className="flex-1 bg-[#FAF9F6] flex flex-col lg:overflow-hidden lg:h-full relative h-auto">
            {/* Mobile Header */}
            <div className="lg:hidden p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-30 sticky top-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                  <img
                    src="/chic-logo.jpg"
                    alt="Chic & Glam"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="font-bold text-[#392d22] font-serif">
                  Chic & Glam
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#FAF9F6] p-2 rounded-full relative">
                  <ShoppingCart size={20} className="text-[#392d22]" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#d4af37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cart.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Header with Category Tabs */}
            <div className="bg-gradient-to-r from-[#392d22] to-[#2d2018] px-4 py-3 shadow-sm lg:rounded-tl-2xl z-20">
              <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-2xl font-serif text-white">
                  {selectedCategory}
                </h2>
                {/* Mobile Service Type Toggles within Header */}
                <div className="lg:hidden flex bg-[#00000030] p-1 rounded-lg">
                  <button
                    onClick={() => {
                      setSelectedServiceType("Beauty Salon");
                      setSelectedCategory("Hair");
                    }}
                    className={`p-1.5 rounded transition-all ${selectedServiceType === "Beauty Salon" ? "bg-white text-[#392d22]" : "text-white/70"}`}
                  >
                    <Scissors size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedServiceType("Gym");
                      setSelectedCategory("Training");
                    }}
                    className={`p-1.5 rounded transition-all ${selectedServiceType === "Gym" ? "bg-white text-[#392d22]" : "text-white/70"}`}
                  >
                    <Dumbbell size={14} />
                  </button>
                </div>
              </div>

              {/* Mobile Category Tabs */}
              <div className="lg:hidden mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? "bg-white text-[#392d22] shadow-sm"
                        : "bg-[#00000030] text-white/90 hover:bg-[#00000040]"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Products Grid - Responsive (2 cols on mobile, 3 on tablet, 2 on desktop) */}
            <div className="lg:flex-1 lg:overflow-y-auto p-3 md:p-6 pb-24 lg:pb-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 md:gap-4">
                <AnimatePresence mode="wait">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onClick={() => addToCart(product)}
                      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative"
                    >
                      {/* Selection Overlay */}
                      <div className="absolute inset-0 bg-[#392d22]/0 group-hover:bg-[#392d22]/5 transition-colors z-0" />

                      {/* Image/Icon Area */}
                      <div className="relative h-40 bg-gray-50 flex items-center justify-center overflow-hidden group-hover:bg-gray-100 transition-colors">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <div className="bg-white p-1.5 rounded-full shadow-sm text-[#392d22]">
                            <Plus size={16} strokeWidth={3} />
                          </div>
                        </div>
                        {/* Category Badge */}
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md shadow-sm border border-gray-100">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                            {product.category}
                          </p>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-4 flex flex-col flex-1 relative z-10 bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-[#392d22] text-sm md:text-base leading-tight line-clamp-2">
                            {product.name}
                          </h3>
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1 font-medium">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-100 mt-auto">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                            <Clock size={12} />
                            <span>
                              {product.serviceType === "Beauty Salon"
                                ? "60m"
                                : "45m"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#392d22] font-bold">
                            <span className="text-xs text-gray-400 font-normal">
                              PKR
                            </span>
                            <span className="text-lg">
                              {product.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <ShoppingCart
                      size={48}
                      className="mx-auto text-gray-400 mb-4"
                    />
                    <p className="text-gray-500">No products found</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL - CART */}
          <div className="w-full lg:w-1/4 bg-white border-l border-gray-100 flex flex-col shadow-xl z-20">
            {/* Desktop Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#392d22]">
                <div className="bg-[#FAF9F6] p-2 rounded-lg">
                  <CreditCard size={18} />
                </div>
                <h3 className="font-bold text-lg">Current Order</h3>
              </div>
              <button
                onClick={() => (window.location.href = "/auth/login")}
                className="px-4 py-1.5 bg-[#392d22] text-white rounded-lg text-xs font-bold hover:bg-[#2d2018] transition-colors"
                title="Admin Login"
              >
                Login
              </button>
            </div>

            {/* Customer Selection */}
            <div className="p-4 bg-gray-50/50 border-b border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Customer Details
                </label>
                {customerName && (
                  <button
                    onClick={() => setCustomerName("")}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Walk-in Customer"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="text-lg">👤</span>
                </div>
              </div>
            </div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center space-y-3">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingCart size={24} className="opacity-50" />
                  </div>
                  <p className="text-sm font-medium">Your cart is empty</p>
                  <p className="text-xs">
                    Select items from the list to add them to the order
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-bold text-[#392d22] text-sm line-clamp-2 leading-tight">
                              {item.name}
                            </p>
                            <p className="font-bold text-[#392d22] text-sm whitespace-nowrap ml-2">
                              {(item.price * item.quantity) / 1000 >= 1
                                ? `${((item.price * item.quantity) / 1000).toFixed(1)}k`
                                : (item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#392d22] hover:bg-gray-100 rounded transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#392d22] hover:bg-gray-100 rounded transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          title="Remove Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Totals Section - Sticky */}
            <div className="bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Discount Input */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Discount</span>
                  <div className="flex items-center gap-2">
                    <div className="relative w-16">
                      <input
                        type="number"
                        value={discountPercent}
                        onChange={(e) =>
                          setDiscountPercent(
                            Math.max(0, Math.min(100, Number(e.target.value))),
                          )
                        }
                        className="w-full text-right pr-6 py-1 border-b border-gray-200 focus:border-[#392d22] focus:outline-none text-gray-900 font-medium bg-transparent"
                      />
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                        %
                      </span>
                    </div>
                    <span className="text-red-500 font-medium min-w-[60px] text-right">
                      -{" "}
                      {discountAmount > 0
                        ? discountAmount.toLocaleString()
                        : "0"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-3 border-t border-dashed border-gray-200">
                  <div>
                    <span className="block text-xs text-gray-500 mb-0.5">
                      Total Payable
                    </span>
                    <span className="block text-2xl font-black text-[#392d22]">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      {cart.reduce((a, b) => a + b.quantity, 0)} items
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsPaymentModalOpen(true)}
                disabled={cart.length === 0}
                className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
                  cart.length > 0
                    ? "bg-[#392d22] text-white hover:bg-[#2a2119] hover:shadow-xl"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                }`}
              >
                <span>Proceed to Payment</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">
                  F4
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      <Modal
        isOpen={isPaymentModalOpen}
        title="Payment Confirmation"
        onClose={() => setIsPaymentModalOpen(false)}
        size="lg"
      >
        <div className="space-y-6">
          {/* Customer Name Input */}
          <div className="bg-[#FAF9F6] rounded-lg p-4">
            <h4 className="font-semibold text-[#392d22] mb-3 text-sm uppercase tracking-wider">
              Customer Information
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] text-sm text-black"
                />
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="bg-[#FAF9F6] rounded-lg p-4">
            <h4 className="font-semibold text-[#392d22] mb-3 text-sm uppercase tracking-wider">
              Transaction Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Date & Time:</span>
                <span className="font-medium text-black">
                  {new Date().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Customer:</span>
                <span className="font-medium text-black">
                  {customerName.trim() || "Walk-in Customer"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Items:</span>
                <span className="font-medium text-black">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div>
            <h4 className="font-semibold text-[#392d22] mb-2 text-sm uppercase tracking-wider">
              Items
            </h4>
            <div className="border border-gray-200 rounded-lg divide-y max-h-[200px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="p-2 flex justify-between text-xs">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold text-[#392d22]">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Amounts */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm border border-blue-200">
            <div className="flex justify-between">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Discount ({discountPercent}%):</span>
                <span className="font-semibold">
                  -Rs. {discountAmount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="border-t border-blue-200 pt-2 flex justify-between font-bold">
              <span>Total Amount:</span>
              <span className="text-[#d4af37] text-lg">
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h4 className="font-semibold text-[#392d22] mb-3 text-sm uppercase tracking-wider">
              Payment Method
            </h4>
            <div className="space-y-2">
              <label
                className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#392d22] transition-colors"
                onClick={() => setPaymentMethod("cash")}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "cash"}
                  readOnly
                  className="mr-3"
                />
                <span className="font-medium text-sm text-black">
                  Cash Payment
                </span>
              </label>
              <label
                className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#392d22] transition-colors"
                onClick={() => setPaymentMethod("card")}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  readOnly
                  className="mr-3"
                />
                <CreditCard size={18} className="text-blue-600 mr-2" />
                <span className="font-medium text-sm text-black">
                  Card Payment
                </span>
              </label>
            </div>
          </div>

          {/* Cash Details (if cash selected) */}
          {paymentMethod === "cash" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
                  Cash Received (Rs.)
                </label>
                <input
                  type="number"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  placeholder="Enter cash amount"
                  min={total}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] text-sm text-black"
                />
              </div>
              {cashReceived && (
                <div
                  className={`p-3 rounded-lg text-sm font-semibold ${
                    parseFloat(cashReceived) >= total
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>Change:</span>
                    <span>Rs. {change.toLocaleString()}</span>
                  </div>
                </div>
              )}
              {cashReceived && parseFloat(cashReceived) < total && (
                <p className="text-xs text-red-600 font-medium">
                  ⚠️ Insufficient amount
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handlePaymentComplete}
              disabled={paymentMethod === "cash" && !cashReceived}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-bold flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} />
              Complete Payment
            </button>
          </div>
        </div>
      </Modal>

      {/* RECEIPT MODAL */}
      {isReceiptModalOpen && receipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <Receipt
              receiptNumber={receipt.receiptNumber}
              customerName={customerName.trim() || "Customer"}
              items={receipt.items}
              subtotal={receipt.subtotal}
              discount={receipt.discount}
              discountPercent={receipt.discountPercent}
              tax={receipt.tax}
              total={receipt.total}
              paid={receipt.paid}
              change={receipt.change}
              paymentMethod={receipt.paymentMethod}
              paymentStatus="PAID"
              cashierName={receipt.cashierName}
              onClose={() => {
                setIsReceiptModalOpen(false);
                clearCart();
              }}
              isModal={true}
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
