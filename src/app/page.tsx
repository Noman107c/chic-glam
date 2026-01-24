'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, X, CreditCard, DollarSign, ShoppingCart, User, Phone, CheckCircle, LogIn, Printer } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Receipt } from '@/components/Receipt';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

// Mock data for products/services with images
const mockProducts = [
  // Hair Category
  { id: 1, name: 'Hair Styling', price: 1500, category: 'Hair', serviceType: 'Beauty Salon', image: '💇', description: 'Professional hair styling' },
  { id: 2, name: 'Hair Treatment', price:2500, category: 'Hair', serviceType: 'Beauty Salon', image: '💆', description: 'Deep conditioning treatment' },
  { id: 3, name: 'Hair Coloring', price: 3500, category: 'Hair', serviceType: 'Beauty Salon', image: '💇‍♀️', description: 'Full hair color service' },

  // Makeup Category
  { id: 4, name: 'Bridal Makeup', price: 5000, category: 'Makeup', serviceType: 'Beauty Salon', image: '💄', description: 'Complete bridal look' },
  { id: 5, name: 'Party Makeup', price: 2000, category: 'Makeup', serviceType: 'Beauty Salon', image: '✨', description: 'Evening party makeup' },
  { id: 6, name: 'HD Makeup', price: 3000, category: 'Makeup', serviceType: 'Beauty Salon', image: '💅', description: 'High definition makeup' },

  // Nails Category
  { id: 7, name: 'Manicure', price: 800, category: 'Nails', serviceType: 'Beauty Salon', image: '💅', description: 'Hand nail care' },
  { id: 8, name: 'Pedicure', price: 1000, category: 'Nails', serviceType: 'Beauty Salon', image: '👣', description: 'Foot nail care' },
  { id: 9, name: 'Gel Nails', price: 1500, category: 'Nails', serviceType: 'Beauty Salon', image: '💎', description: 'Gel polish application' },

  // Skincare Category
  { id: 10, name: 'Facial', price: 1800, category: 'Skincare', serviceType: 'Beauty Salon', image: '🧖', description: 'Hydrating facial' },
  { id: 11, name: 'Deep Cleansing', price: 2200, category: 'Skincare', serviceType: 'Beauty Salon', image: '🌿', description: 'Deep pore cleansing' },
  { id: 12, name: 'Chemical Peel', price: 3000, category: 'Skincare', serviceType: 'Beauty Salon', image: '✨', description: 'Advanced skin treatment' },

  // Gym Training Category
  { id: 13, name: 'Personal Training', price: 2000, category: 'Personal Training', serviceType: 'Gym', image: '💪', description: '1 hour session' },
  { id: 14, name: 'Strength Training', price: 1500, category: 'Strength Training', serviceType: 'Gym', image: '🏋️', description: 'Muscle building' },
  { id: 15, name: 'Cardio Program', price: 1200, category: 'Cardio', serviceType: 'Gym', image: '🏃', description: 'Cardio fitness' },
  { id: 16, name: 'Yoga Session', price: 1800, category: 'Yoga', serviceType: 'Gym', image: '🧘', description: 'Relaxing yoga class' },
  { id: 17, name: 'CrossFit Training', price: 2500, category: 'CrossFit', serviceType: 'Gym', image: '🏋️‍♂️', description: 'High-intensity workout' },
  { id: 18, name: 'Boxing Training', price: 2200, category: 'Combat Sports', serviceType: 'Gym', image: '🥊', description: 'Boxing and combat training' },
  { id: 19, name: 'Swimming Lessons', price: 1600, category: 'Swimming', serviceType: 'Gym', image: '🏊', description: 'Swimming instruction' },
  { id: 20, name: 'Nutrition Consultation', price: 3000, category: 'Nutrition', serviceType: 'Gym', image: '🥗', description: 'Diet and nutrition advice' },
  { id: 21, name: 'Group Fitness Class', price: 1000, category: 'Group Fitness', serviceType: 'Gym', image: '👥', description: 'Group exercise session' },
  { id: 22, name: 'Pilates Session', price: 1900, category: 'Pilates', serviceType: 'Gym', image: '🤸', description: 'Core strengthening' },
  { id: 23, name: 'Martial Arts Training', price: 2400, category: 'Martial Arts', serviceType: 'Gym', image: '🥋', description: 'Self-defense and martial arts' },
  { id: 24, name: 'Zumba Dance Class', price: 1300, category: 'Dance Fitness', serviceType: 'Gym', image: '💃', description: 'Fun dance fitness' },
  { id: 25, name: 'HIIT Workout', price: 1700, category: 'HIIT', serviceType: 'Gym', image: '⚡', description: 'High-intensity interval training' },
  { id: 26, name: 'Spin Class', price: 1400, category: 'Cycling', serviceType: 'Gym', image: '🚴', description: 'Indoor cycling class' },
  { id: 27, name: 'Aerobics Class', price: 1100, category: 'Aerobics', serviceType: 'Gym', image: '🎵', description: 'Rhythmic exercise class' },
];

// Mock customers
const mockCustomers = [
  { id: 1, name: 'Sarah Ahmed', phone: '0300-1234567' },
  { id: 2, name: 'Ayesha Khan', phone: '0301-2345678' },
  { id: 3, name: 'Fatima Ali', phone: '0302-3456789' },
  { id: 4, name: 'Zara Malik', phone: '0303-4567890' },
  { id: 5, name: 'Hira Shah', phone: '0304-5678901' },
];

// Mock beauticians
const mockBeauticians = [
  { id: 1, name: 'Aisha Beauty Expert', phone: '0300-1111111' },
  { id: 2, name: 'Fatima Makeup Artist', phone: '0301-2222222' },
  { id: 3, name: 'Zara Hair Stylist', phone: '0302-3333333' },
  { id: 4, name: 'Hira Nail Artist', phone: '0303-4444444' },
];

// Mock trainers
const mockTrainers = [
  { id: 1, name: 'Ahmed Fitness Trainer', phone: '0300-5555555' },
  { id: 2, name: 'Bilal Gym Instructor', phone: '0301-6666666' },
  { id: 3, name: 'Omar Strength Coach', phone: '0302-7777777' },
  { id: 4, name: 'Usman Cardio Specialist', phone: '0303-8888888' },
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
  const [selectedCategory, setSelectedCategory] = useState<string>('Hair');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('Beauty Salon');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [cashReceived, setCashReceived] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [receipt, setReceipt] = useState<any>(null);
  const [isReceiptPreviewOpen, setIsReceiptPreviewOpen] = useState(false);
  const [previewReceipt, setPreviewReceipt] = useState<any>(null);

  // Filter products by service type
  const serviceFilteredProducts = mockProducts.filter(p => p.serviceType === selectedServiceType);

  // Get all unique categories for selected service type
  const categories = Array.from(new Set(serviceFilteredProducts.map(p => p.category)));

  // Filter products by selected category
  const filteredProducts = serviceFilteredProducts.filter(p => p.category === selectedCategory);

  // Cart functions
  const addToCart = (product: typeof mockProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        category: product.category,
        image: product.image
      }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setDiscountPercent(0);
    setCashReceived('');
    setReceipt(null);
    setCustomerName('');
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;

  const change = cashReceived ? Math.max(0, parseFloat(cashReceived) - total) : 0;
  const isPaymentValid = !cashReceived || parseFloat(cashReceived) < total;

  const handlePaymentComplete = () => {
    const receiptNumber = `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    setReceipt({
      receiptNumber,
      items: cart,
      subtotal,
      discount: discountAmount,
      discountPercent,
      tax: 0,
      total,
      paid: parseFloat(cashReceived) || 0,
      change,
      paymentMethod,
      cashierName: 'Receptionist',
    });

    setIsPaymentModalOpen(false);
    setIsReceiptModalOpen(true);

    // Auto-print receipt after payment completion
    setTimeout(() => {
      const receiptElement = document.querySelector('.receipt-print-area');
      if (receiptElement) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
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
                  </div>
                  <div class="items">
                    ${cart.map(item => `
                      <div class="item">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>Rs. ${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    `).join('')}
                  </div>
                  <div class="total">
                    <div class="item">
                      <span>Subtotal:</span>
                      <span>Rs. ${subtotal.toLocaleString()}</span>
                    </div>
                    ${discountPercent > 0 ? `
                      <div class="item">
                        <span>Discount (${discountPercent}%):</span>
                        <span>-Rs. ${discountAmount.toLocaleString()}</span>
                      </div>
                    ` : ''}
                    <div class="item">
                      <span>Total:</span>
                      <span>Rs. ${total.toLocaleString()}</span>
                    </div>
                    <div class="item">
                      <span>Paid:</span>
                      <span>Rs. ${(parseFloat(cashReceived) || 0).toLocaleString()}</span>
                    </div>
                    ${change > 0 ? `
                      <div class="item">
                        <span>Change:</span>
                        <span>Rs. ${change.toLocaleString()}</span>
                      </div>
                    ` : ''}
                  </div>
                  <div style="text-align: center; margin-top: 20px; font-size: 12px;">
                    <p>Thank you for your business!</p>
                    <p>${new Date().toLocaleString()}</p>
                  </div>
                </div>
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
        }
      }
    }, 1000); // Delay to ensure receipt modal is rendered
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#FAF9F6] overflow-hidden">
      {/* DESKTOP PANEL LAYOUT */}
      <div className="hidden lg:block lg:flex-1">
        <div className="flex h-full">
          {/* LEFT PANEL - CATEGORIES */}
          <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col shadow-sm overflow-auto">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#392d22] to-[#2d2018]">
              <h1 className="text-xl font-serif text-white">Chic & Glam</h1>
              <p className="text-xs text-gray-300 uppercase tracking-wider">POS System</p>
            </div>

            {/* Service Type Filter */}
            <div className="p-3 border-b border-gray-200 bg-[#FAF9F6]">
              <div className="flex gap-2">
                <motion.button
                  onClick={() => {
                    setSelectedServiceType('Beauty Salon');
                    setSelectedCategory('Hair'); // Reset to first category
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 p-3 rounded-lg font-medium text-sm transition-all ${
                    selectedServiceType === 'Beauty Salon'
                      ? 'bg-[#392d22] text-white shadow-md'
                      : 'bg-white text-[#392d22] hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  💄 Beauty Salon
                </motion.button>
                <motion.button
                  onClick={() => {
                    setSelectedServiceType('Gym');
                    setSelectedCategory('Training'); // Reset to first category
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 p-3 rounded-lg font-medium text-sm transition-all ${
                    selectedServiceType === 'Gym'
                      ? 'bg-[#392d22] text-white shadow-md'
                      : 'bg-white text-[#392d22] hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  💪 Gym
                </motion.button>
              </div>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-3 rounded-lg text-left transition-all font-medium text-sm uppercase tracking-wider ${
                    selectedCategory === category
                      ? 'bg-[#392d22] text-white shadow-md'
                      : 'bg-[#FAF9F6] text-[#392d22] hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {category === 'Hair' && '💇'}
                      {category === 'Makeup' && '💄'}
                      {category === 'Nails' && '💅'}
                      {category === 'Skincare' && '🧖'}
                      {category === 'Personal Training' && '💪'}
                      {category === 'Strength Training' && '🏋️'}
                      {category === 'Cardio' && '🏃'}
                      {category === 'Yoga' && '🧘'}
                      {category === 'CrossFit' && '🏋️‍♂️'}
                      {category === 'Combat Sports' && '🥊'}
                      {category === 'Swimming' && '🏊'}
                      {category === 'Nutrition' && '🥗'}
                      {category === 'Group Fitness' && '👥'}
                      {category === 'Pilates' && '🤸'}
                      {category === 'Martial Arts' && '🥋'}
                      {category === 'Dance Fitness' && '💃'}
                      {category === 'HIIT' && '⚡'}
                      {category === 'Cycling' && '🚴'}
                      {category === 'Aerobics' && '🎵'}
                    </span>
                    <span>{category}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Cart Count */}
            <div className="p-4 border-t border-gray-200 bg-[#FAF9F6]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#392d22]">Items:</span>
                <span className="text-2xl font-bold text-[#d4af37]">{cart.length}</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Total Qty: {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
            </div>
          </div>

          {/* CENTER PANEL - PRODUCTS (full width on mobile, 50-55% on desktop) */}
          <div className="flex-1 bg-[#FAF9F6] flex flex-col overflow-hidden">
            {/* Header with Mobile Category Tabs */}
            <div className="bg-gradient-to-r from-[#392d22] to-[#2d2018] px-4 py-3 shadow-sm">
              <h2 className="text-lg md:text-2xl font-serif text-white">{selectedCategory}</h2>

              {/* Mobile Service Type Tabs */}
              <div className="lg:hidden mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <motion.button
                  onClick={() => {
                    setSelectedServiceType('Beauty Salon');
                    setSelectedCategory('Hair');
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedServiceType === 'Beauty Salon' ? 'bg-white text-[#392d22] shadow-md' : 'bg-[#2d2018] text-white border border-gray-400 hover:border-white'
                  }`}
                >
                  💄 Beauty
                </motion.button>
                <motion.button
                  onClick={() => {
                    setSelectedServiceType('Gym');
                    setSelectedCategory('Personal Training');
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedServiceType === 'Gym' ? 'bg-white text-[#392d22] shadow-md' : 'bg-[#2d2018] text-white border border-gray-400 hover:border-white'
                  }`}
                >
                  💪 Gym
                </motion.button>
              </div>
            </div>

            {/* Mobile Category Tabs */}
            <div className="lg:hidden overflow-x-auto border-b border-gray-200 bg-white scrollbar-hide">
              <div className="flex gap-2 p-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category ? 'bg-[#392d22] text-white shadow-md' : 'bg-gray-100 text-[#392d22] hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Products Grid - Responsive (2 cols on mobile, 3 on tablet, 2 on desktop) */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 md:gap-4">
                <AnimatePresence mode="wait">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ translateY: -4 }}
                      onClick={() => addToCart(product)}
                      className="bg-white rounded-lg border border-gray-200 hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all cursor-pointer p-3 md:p-4 h-full flex flex-col"
                    >
                      <div className="text-3xl md:text-4xl mb-2 text-center">{product.image}</div>
                      <h3 className="font-semibold text-[#392d22] text-xs md:text-sm line-clamp-2 mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-600 flex-1 line-clamp-2">{product.description}</p>

                      {/* Additional Details - Hidden on mobile */}
                      <div className="hidden md:block mt-2 space-y-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>⏱️</span>
                          <span>{product.serviceType === 'Beauty Salon' ? '45-60 mins' : '60 mins'}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-600 uppercase tracking-wider hidden sm:inline">{product.category}</span>
                        <span className="text-base md:text-lg font-bold text-[#d4af37]">Rs. {product.price}</span>
                      </div>

                      {/* Add to Cart Button - Mobile optimized */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="mt-2 md:mt-3 w-full bg-[#392d22] text-white py-2 rounded text-xs font-medium text-center hover:bg-[#2d2018] transition-colors"
                      >
                        + Add
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No products found</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL - CART */}
          <div className="w-1/4 bg-white border-l border-gray-200 flex flex-col shadow-sm fixed lg:static bottom-0 left-0 right-0 lg:bottom-auto z-40 transition-all duration-300 max-h-96 lg:max-h-none overflow-hidden lg:overflow-visible"
            style={{ height: cart.length > 0 ? 'auto' : '0px', maxHeight: cart.length > 0 ? '24rem' : '0px' }}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-3 bg-[#FAF9F6] border-b border-gray-200">
          <h3 className="font-bold text-[#392d22]">💳 Bill</h3>
          <span className="text-sm font-bold text-[#d4af37]">Rs. {total.toLocaleString()}</span>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex lg:p-4 lg:bg-gradient-to-r lg:from-[#392d22] lg:to-[#2d2018]">
          <div className="flex items-center gap-2 text-white w-full">
            <CreditCard size={18} />
            <h3 className="font-serif text-lg">Bill / Receipt</h3>
          </div>
        </div>

        {/* Customer Selection */}
        <div className="p-3 lg:p-4 border-b border-gray-200 bg-[#FAF9F6]">
          <label className="text-xs font-medium text-gray-700 uppercase tracking-wider block mb-2">Customer</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="w-full px-2 py-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#392d22] text-black"
          />
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto divide-y">
          {cart.map((item) => (
            <div key={item.id} className="p-3 border-b border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="font-semibold text-[#392d22] text-xs md:text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">Rs. {item.price} × {item.quantity}</p>
                </div>
                <p className="font-bold text-[#d4af37] text-xs md:text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-xs font-medium text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-[#392d22] text-white rounded flex items-center justify-center hover:bg-[#2d2018] transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals Section - Sticky */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-3 lg:p-4 space-y-3 bg-white">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold text-[#392d22]">Rs. {subtotal.toLocaleString()}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount ({discountPercent}%):</span>
                  <span className="font-semibold">-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center gap-2 py-2 px-2 bg-[#FAF9F6] rounded">
                <span className="text-gray-700 text-xs">Disc %:</span>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                  min="0"
                  max="100"
                  className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#392d22]"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#392d22]">Total:</span>
                <span className="text-xl md:text-2xl font-bold text-[#d4af37]">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  const receiptNumber = `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
                  setPreviewReceipt({
                    receiptNumber,
                    items: cart,
                    subtotal,
                    discount: discountAmount,
                    discountPercent,
                    tax: 0,
                    total,
                    paid: 0,
                    change: 0,
                    paymentMethod: 'PENDING',
                    cashierName: 'Receptionist',
                  });
                  setIsReceiptPreviewOpen(true);
                }}
                className="w-full bg-blue-600 text-white py-2 lg:py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                Preview Receipt
              </button>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full bg-[#392d22] text-white py-2 lg:py-3 rounded-lg font-semibold text-sm hover:bg-[#2d2018] transition-colors"
              >
                Pay
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>

    {/* MOBILE LAYOUT - Show on small screens */}
    <div className="lg:hidden">
      {/* Mobile content would go here */}
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
          <h4 className="font-semibold text-[#392d22] mb-3 text-sm uppercase tracking-wider">Customer Information</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Customer Name</label>
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
          <h4 className="font-semibold text-[#392d22] mb-3 text-sm uppercase tracking-wider">Transaction Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Date & Time:</span>
              <span className="font-medium text-black">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Customer:</span>
              <span className="font-medium text-black">
                {customerName.trim() || 'Walk-in Customer'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Items:</span>
              <span className="font-medium text-black">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
          </div>
        </div>

        {/* Items Breakdown */}
        <div>
          <h4 className="font-semibold text-[#392d22] mb-2 text-sm uppercase tracking-wider">Items</h4>
          <div className="border border-gray-200 rounded-lg divide-y max-h-[200px] overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="p-2 flex justify-between text-xs">
                <span className="text-gray-700">{item.name} × {item.quantity}</span>
                <span className="font-semibold text-[#392d22]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amounts */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm border border-blue-200">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal:</span>
            <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
          </div>
          {discountPercent > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Discount ({discountPercent}%):</span>
              <span className="font-semibold">-Rs. {discountAmount.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-blue-200 pt-2 flex justify-between font-bold">
            <span>Total Amount:</span>
            <span className="text-[#d4af37] text-lg">Rs. {total.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <h4 className="font-semibold text-[#392d22] mb-3 text-sm uppercase tracking-wider">Payment Method</h4>
          <div className="space-y-2">
            <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#392d22] transition-colors"
              onClick={() => setPaymentMethod('cash')}>
              <input type="radio" checked={paymentMethod === 'cash'} readOnly className="mr-3" />
              <span className="font-medium text-sm text-black">Cash Payment</span>
            </label>
            <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#392d22] transition-colors"
              onClick={() => setPaymentMethod('card')}>
              <input type="radio" checked={paymentMethod === 'card'} readOnly className="mr-3" />
              <CreditCard size={18} className="text-blue-600 mr-2" />
              <span className="font-medium text-sm text-black">Card Payment</span>
            </label>
          </div>
        </div>

        {/* Cash Details (if cash selected) */}
        {paymentMethod === 'cash' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Cash Received (Rs.)</label>
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
              <div className={`p-3 rounded-lg text-sm font-semibold ${
                parseFloat(cashReceived) >= total
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                <div className="flex justify-between">
                  <span>Change:</span>
                  <span>Rs. {change.toLocaleString()}</span>
                </div>
              </div>
            )}
            {cashReceived && parseFloat(cashReceived) < total && (
              <p className="text-xs text-red-600 font-medium">⚠️ Insufficient amount</p>
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
            disabled={paymentMethod === 'cash' && isPaymentValid}
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
            customeName={customerName.trim() || 'Customer'}
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
  </div>
  );


}