'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, X, CreditCard, DollarSign, ShoppingCart, User, Phone, CheckCircle, LogIn } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

// Mock data for products/services with images
const mockProducts = [
  // Hair Category
  { id: 1, name: 'Hair Styling', price: 1500, category: 'Hair', serviceType: 'Beauty Salon', image: '💇', description: 'Professional hair styling' },
  { id: 2, name: 'Hair Treatment', price: 2500, category: 'Hair', serviceType: 'Beauty Salon', image: '💆', description: 'Deep conditioning treatment' },
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
  const [cashReceived, setCashReceived] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

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
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;

  const change = cashReceived ? Math.max(0, parseFloat(cashReceived) - total) : 0;
  const isPaymentValid = !cashReceived || parseFloat(cashReceived) < total;

  return (
    <div className="flex h-screen bg-[#FAF9F6] overflow-hidden">
      {/* LEFT PANEL - CATEGORIES (20-25%) */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col shadow-sm">
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

      {/* CENTER PANEL - PRODUCTS (50-55%) */}
      <div className="flex-1 bg-[#FAF9F6] flex flex-col overflow-hidden">
        {/* Category Header */}
        <div className="bg-gradient-to-r from-[#392d22] to-[#2d2018] px-5 py-3 shadow-sm">
          <h2 className="text-2xl font-serif text-white">{selectedCategory} Services</h2>
          <p className="text-sm text-gray-300">Click to add items to cart</p>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ translateY: -4 }}
                  onClick={() => addToCart(product)}
                  className="bg-white rounded-lg border border-gray-200 hover:border-[#d4af37] shadow-sm hover:shadow-md transition-all cursor-pointer p-4 h-full flex flex-col"
                >
                  <div className="text-4xl mb-2 text-center">{product.image}</div>
                  <h3 className="font-semibold text-[#392d22] text-sm line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-600 flex-1">{product.description}</p>

                  {/* Additional Details */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>⏱️</span>
                      <span>{product.serviceType === 'Beauty Salon' ? '45-60 mins' : '60 mins'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>⭐</span>
                      <span>Professional Service</span>
                    </div>
                    {product.serviceType === 'Gym' && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>💪</span>
                        <span>Expert Trainer</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-end mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-600 uppercase tracking-wider">{product.category}</span>
                    <span className="text-lg font-bold text-[#d4af37]">Rs. {product.price}</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mt-3 w-full bg-[#392d22] text-white py-2 rounded text-xs font-medium text-center"
                  >
                    + Add to Cart
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No products in this category</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - BILL/RECEIPT (20-25%) */}
      <div className="w-1/4 bg-white border-l border-gray-200 flex flex-col shadow-sm">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#392d22] to-[#2d2018] py-3">
          <div className="flex items-center justify-between text-white mb-2">
            <div className="flex items-center gap-2">
              <CreditCard size={18} />
              <h3 className="font-serif text-lg">Bill / Receipt</h3>
            </div>
            <Link
              href="/auth/login"
              className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium transition-colors"
              title="Login"
            >
              <LogIn size={14} />
              Login
            </Link>
          </div>
          <p className="text-xs text-gray-300">{new Date().toLocaleDateString()}</p>
        </div>

        {/* Customer Selection */}
        <div className="p-4 border-b border-gray-200 bg-[#FAF9F6]">
          <label className="text-xs font-medium text-gray-700 uppercase tracking-wider block mb-2">
            {selectedServiceType === 'Beauty Salon' ? 'Beautician' : 'Trainer'}
          </label>
          <select
            value={selectedCustomer || ''}
            onChange={(e) => setSelectedCustomer(Number(e.target.value) || null)}
            className="w-full px-2 py-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#392d22] text-black"
          >
            <option value="">
              {selectedServiceType === 'Beauty Salon' ? 'Select Beautician' : 'Select Trainer'}
            </option>
            {(selectedServiceType === 'Beauty Salon' ? mockBeauticians : mockTrainers).map(person => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <ShoppingCart size={36} className="text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No items added</p>
              <p className="text-xs text-gray-400">Add services from the center</p>
            </div>
          ) : (
            <div className="divide-y">
              {cart.map((item) => (
                <div key={item.id} className="p-3 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-[#392d22] text-xs">{item.name}</p>
                      <p className="text-xs text-gray-600">Rs. {item.price} × {item.quantity}</p>
                    </div>
                    <p className="font-bold text-[#d4af37] text-xs">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-[#392d22] text-white rounded flex items-center justify-center hover:bg-[#2d2018] transition-colors"
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
          )}
        </div>

        {/* Totals and Discount */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="space-y-2 text-xs">
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
                <span className="text-gray-700">Discount %:</span>
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
                <span className="text-2xl font-bold text-[#d4af37]">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full bg-[#392d22] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#2d2018] transition-colors"
              >
                Pay Now
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
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
              onClick={() => {
                setIsPaymentModalOpen(false);
                clearCart();
                alert('Payment successful! Receipt printed.');
              }}
              disabled={paymentMethod === 'cash' && isPaymentValid}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-bold flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} />
              Complete Payment
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}