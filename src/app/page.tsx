'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Dumbbell, Plus, Minus, User, CreditCard, Receipt, ChevronDown, ChevronRight } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

// Mock data for services
const mockServices = {
  beauty: [
    { id: 1, name: 'Hair Styling', price: 1500, category: 'Hair', duration: '45 min' },
    { id: 2, name: 'Hair Treatment', price: 2500, category: 'Hair', duration: '60 min' },
    { id: 3, name: 'Bridal Makeup', price: 5000, category: 'Makeup', duration: '120 min' },
    { id: 4, name: 'Party Makeup', price: 2000, category: 'Makeup', duration: '60 min' },
    { id: 5, name: 'Manicure', price: 800, category: 'Nails', duration: '30 min' },
    { id: 6, name: 'Pedicure', price: 1000, category: 'Nails', duration: '45 min' },
    { id: 7, name: 'Facial', price: 1800, category: 'Skincare', duration: '60 min' },
    { id: 8, name: 'Deep Cleansing', price: 2200, category: 'Skincare', duration: '75 min' },
    { id: 9, name: 'Full Body Waxing', price: 3000, category: 'Waxing', duration: '90 min' },
    { id: 10, name: 'Threading', price: 300, category: 'Waxing', duration: '15 min' },
  ],
  gym: [
    { id: 11, name: 'Personal Training (1 session)', price: 2000, category: 'Training', duration: '60 min' },
    { id: 12, name: 'Personal Training (5 sessions)', price: 9000, category: 'Training', duration: '5x60 min' },
    { id: 13, name: 'Strength Training', price: 1500, category: 'Training', duration: '45 min' },
    { id: 14, name: 'Cardio Program', price: 1200, category: 'Cardio', duration: '45 min' },
    { id: 15, name: 'HIIT Session', price: 1800, category: 'Cardio', duration: '30 min' },
    { id: 16, name: 'Body Transformation (Monthly)', price: 15000, category: 'Programs', duration: '30 days' },
    { id: 17, name: 'Weight Loss Program', price: 12000, category: 'Programs', duration: '30 days' },
    { id: 18, name: 'Muscle Building', price: 14000, category: 'Programs', duration: '30 days' },
  ]
};

// Mock customers
const mockCustomers = [
  { id: 1, name: 'Sarah Ahmed', phone: '0300-1234567' },
  { id: 2, name: 'Ayesha Khan', phone: '0301-2345678' },
  { id: 3, name: 'Fatima Ali', phone: '0302-3456789' },
  { id: 4, name: 'Zara Malik', phone: '0303-4567890' },
  { id: 5, name: 'Hira Shah', phone: '0304-5678901' },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  duration: string;
}

export default function POSPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'beauty' | 'gym'>('beauty');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [cashReceived, setCashReceived] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid'>('pending');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'beauty', name: 'Beauty Parlor', icon: Scissors, color: '#392d22' },
    { id: 'gym', name: 'Fitness Gym', icon: Dumbbell, color: '#d4af37' },
  ];

  const filteredServices = mockServices[selectedCategory].filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (service: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
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

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setCashReceived('');
    setPaymentStatus('pending');
  };

  const groupServicesByCategory = (services: any[]) => {
    return services.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {} as Record<string, any[]>);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="flex h-screen bg-[#FAF9F6]">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-serif text-[#392d22] mb-2">Chic & Glam POS</h1>
          <p className="text-sm text-gray-600 uppercase tracking-wider">Point of Sale</p>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as 'beauty' | 'gym')}
                  className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#392d22] text-white'
                      : 'bg-[#FAF9F6] text-[#392d22] hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium uppercase tracking-wider">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-[#FAF9F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent"
          />
        </div>

        {/* Services List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {(Object.entries(groupServicesByCategory(mockServices[selectedCategory])) as [string, any[]][]).map(([category, services]) => (
              <div key={category} className="border border-gray-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-3 bg-[#FAF9F6] hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-[#392d22] text-sm uppercase tracking-wider">{category}</span>
                  {expandedCategories.has(category) ? (
                    <ChevronDown size={16} className="text-[#392d22]" />
                  ) : (
                    <ChevronRight size={16} className="text-[#392d22]" />
                  )}
                </button>
                {expandedCategories.has(category) && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="space-y-2 p-3">
                      {services.filter(service =>
                        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        service.category.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-[#FAF9F6] p-3 rounded-lg border border-gray-100 hover:border-[#392d22] transition-all cursor-pointer"
                          onClick={() => addToCart(service)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-[#392d22] text-sm">{service.name}</h3>
                            <span className="text-[#d4af37] font-semibold text-sm">Rs. {service.price}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span className="uppercase tracking-wider">{service.category}</span>
                            <span>{service.duration}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Login Option */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full px-4 py-2 bg-[#392d22] text-white rounded-lg hover:bg-[#2d2018] transition-colors font-medium flex items-center justify-center gap-2"
          >
            <User size={16} />
            Login
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-serif text-[#392d22]">Daily Service Count</h2>
              <p className="text-sm text-gray-600">Total services: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Clear All
              </button>
              <button className="px-6 py-2 bg-[#392d22] text-white rounded-lg hover:bg-[#2d2018] transition-colors text-sm font-medium flex items-center gap-2">
                <Receipt size={16} />
                Generate Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Customer Selection */}
        <div className="bg-white border-b border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <User size={20} className="text-[#392d22]" />
            <label className="text-sm font-medium text-[#392d22] uppercase tracking-wider">
              Select {selectedCategory === 'beauty' ? 'Beautician' : 'Trainer'}:
            </label>
            <select
              value={selectedCustomer || ''}
              onChange={(e) => setSelectedCustomer(Number(e.target.value) || null)}
              className="flex-1 px-4 py-2 bg-[#FAF9F6] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent"
            >
              <option value="">Select</option>
              {mockCustomers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-[#FAF9F6] rounded-full flex items-center justify-center mb-4">
                <Plus size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-serif text-gray-600 mb-2">No items selected</h3>
              <p className="text-sm text-gray-500">Click on services from the sidebar to add them</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-[#392d22]">{item.name}</h4>
                      <p className="text-sm text-gray-600 uppercase tracking-wider">{item.category} • {item.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#d4af37] font-semibold">Rs. {item.price}</p>
                      <p className="text-xs text-gray-500">per unit</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-medium text-[#392d22] min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-[#392d22] text-white rounded-full flex items-center justify-center hover:bg-[#2d2018] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#392d22]">Rs. {item.price * item.quantity}</p>
                      <button
                        onClick={() => updateQuantity(item.id, 0)}
                        className="text-xs text-red-600 hover:text-red-700 uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-serif text-[#392d22]">Total Amount</span>
              <span className="text-2xl font-bold text-[#d4af37]">Rs. {getTotal().toLocaleString()}</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsCashModalOpen(true)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <CreditCard size={16} />
                Cash Payment
              </button>
              <button className="flex-1 px-6 py-3 bg-[#392d22] text-white rounded-lg hover:bg-[#2d2018] transition-colors font-medium flex items-center justify-center gap-2">
                <CreditCard size={16} />
                Card Payment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cash Payment Modal */}
      <Modal
        isOpen={isCashModalOpen}
        title="Cash Payment Transaction"
        onClose={() => setIsCashModalOpen(false)}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsCashModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setPaymentStatus('paid');
                setIsCashModalOpen(false);
              }}
              disabled={!cashReceived || parseFloat(cashReceived) < getTotal()}
              className="px-6 py-2 bg-[#392d22] text-white rounded-lg hover:bg-[#2d2018] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save Payment
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Transaction Header */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-[#392d22]">Transaction Details</h3>
              <span className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">
                {selectedCustomer
                  ? mockCustomers.find(c => c.id === selectedCustomer)?.name
                  : 'Walk-in Customer'
                }
              </span>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            <h4 className="font-medium text-[#392d22] uppercase tracking-wider text-sm">Items</h4>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-[#392d22]">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-[#d4af37]">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-[#392d22]">Total Amount:</span>
              <span className="text-[#d4af37]">Rs. {getTotal().toLocaleString()}</span>
            </div>
          </div>

          {/* Cash Received Input */}
          <div className="space-y-3">
            <h4 className="font-medium text-[#392d22] uppercase tracking-wider text-sm">Cash Payment Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cash Received</label>
                <input
                  type="number"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  placeholder="Enter amount received"
                  min={getTotal()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return Amount</label>
                <div className={`px-4 py-2 border rounded-lg text-lg font-bold ${
                  cashReceived && parseFloat(cashReceived) >= getTotal()
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-red-50 border-red-300 text-red-700'
                }`}>
                  Rs. {cashReceived ? Math.max(0, parseFloat(cashReceived) - getTotal()).toLocaleString() : '0'}
                </div>
              </div>
            </div>
            {cashReceived && parseFloat(cashReceived) < getTotal() && (
              <p className="text-red-600 text-sm">Cash received is less than total amount</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Cash Payment</p>
                <p className="text-sm text-green-600">Payment method selected</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}