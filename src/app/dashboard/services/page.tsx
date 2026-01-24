'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Search, Filter, Clock, Users, Star, Zap } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number; // in minutes
  price: number;
  rating: number;
  bookings: number;
  staff: string[];
  image?: string;
  status: 'active' | 'inactive';
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  serviceCount: number;
}

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Classic Facial',
    category: 'Facial',
    description: 'Deep cleansing and hydrating facial treatment',
    duration: 60,
    price: 3000,
    rating: 4.8,
    bookings: 145,
    staff: ['Aisha Khan', 'Fatima Ali'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Hair Styling',
    category: 'Hair',
    description: 'Professional hair cut and styling',
    duration: 45,
    price: 2500,
    rating: 4.7,
    bookings: 98,
    staff: ['Sara Khan'],
    status: 'active',
  },
  {
    id: '3',
    name: 'Full Body Massage',
    category: 'Massage',
    description: 'Relaxing full body therapeutic massage',
    duration: 90,
    price: 5000,
    rating: 4.9,
    bookings: 120,
    staff: ['Hina Shah', 'Aisha Khan'],
    status: 'active',
  },
  {
    id: '4',
    name: 'Bridal Makeup',
    category: 'Makeup',
    description: 'Complete bridal makeup package',
    duration: 120,
    price: 8000,
    rating: 5.0,
    bookings: 67,
    staff: ['Fatima Ali'],
    status: 'active',
  },
];

const mockCategories: Category[] = [
  { id: '1', name: 'Facial', icon: '✨', color: 'purple', serviceCount: 8 },
  { id: '2', name: 'Hair', icon: '💇', color: 'pink', serviceCount: 6 },
  { id: '3', name: 'Massage', icon: '🧖', color: 'blue', serviceCount: 5 },
  { id: '4', name: 'Makeup', icon: '💄', color: 'red', serviceCount: 4 },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [activeTab, setActiveTab] = useState<'services' | 'categories'>('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter services
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Save service
  const handleSaveService = () => {
    if (editingId) {
      setServices(services.map((s) => (s.id === editingId ? { ...s, ...formData } : s)));
      setEditingId(null);
    } else {
      const newService: Service = {
        id: Math.random().toString(),
        name: formData.name || '',
        category: formData.category || '',
        description: formData.description || '',
        duration: formData.duration || 30,
        price: formData.price || 0,
        rating: 0,
        bookings: 0,
        staff: formData.staff || [],
        status: 'active',
      };
      setServices([...services, newService]);
    }
    setFormData({});
    setIsModalOpen(false);
  };

  // Delete service
  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure?')) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  // Services Tab
  const ServicesTab = () => (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Services', value: services.length, icon: Zap, color: 'purple' },
          {
            label: 'Total Bookings',
            value: services.reduce((sum, s) => sum + s.bookings, 0),
            icon: Users,
            color: 'green',
          },
          {
            label: 'Avg Rating',
            value: (services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1),
            icon: Star,
            color: 'yellow',
          },
          { label: 'Categories', value: categories.length, icon: Filter, color: 'blue' },
        ].map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br from-${card.color}-50 to-${card.color}-100 p-4 rounded-lg border border-${card.color}-200`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 font-medium">{card.label}</div>
                <div className="text-3xl font-bold text-gray-800 mt-2">{card.value}</div>
              </div>
              <card.icon className={`text-${card.color}-600`} size={28} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Add */}
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>
        <button
          onClick={() => {
            setFormData({});
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-700"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* Card Header */}
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.category}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    service.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {service.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

              {/* Service Details */}
              <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-200">
                <div className="text-center">
                  <Clock size={18} className="mx-auto mb-1 text-purple-600" />
                  <div className="text-xs font-semibold text-gray-800">{service.duration}m</div>
                </div>
                <div className="text-center">
                  <Star size={18} className="mx-auto mb-1 text-yellow-600" />
                  <div className="text-xs font-semibold text-gray-800">{service.rating}</div>
                </div>
                <div className="text-center">
                  <Users size={18} className="mx-auto mb-1 text-blue-600" />
                  <div className="text-xs font-semibold text-gray-800">{service.bookings}</div>
                </div>
              </div>

              {/* Price and Staff */}
              <div className="mb-4">
                <div className="text-2xl font-bold text-purple-600 mb-2">Rs {service.price}</div>
                <div className="text-xs text-gray-600">
                  <p className="font-semibold mb-1">Staff:</p>
                  <p>{service.staff.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 px-6 pb-4">
              <button
                onClick={() => {
                  setFormData(service);
                  setEditingId(service.id);
                  setIsModalOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-200 transition"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Categories Tab
  const CategoriesTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 p-6 rounded-lg border-2 border-${category.color}-200 cursor-pointer hover:shadow-lg transition`}
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-600">
              {category.serviceCount} service{category.serviceCount !== 1 ? 's' : ''}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-300">
              <button
                onClick={() => {
                  const categoryServices = services.filter((s) => s.category === category.name);
                  setSearchQuery(category.name);
                }}
                className={`w-full bg-${category.color}-600 text-white py-2 rounded font-semibold hover:bg-${category.color}-700 transition`}
              >
                View Services
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Services Management</h1>
          <p className="text-gray-600">Manage salon and gym services with pricing and staffing</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {(['services', 'categories'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearchQuery('');
              }}
              className={`px-4 py-3 font-semibold capitalize border-b-2 transition ${
                activeTab === tab
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'categories' && <CategoriesTab />}

        {/* Service Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Service' : 'Add Service'}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? 'Edit Service' : 'Add Service'}
            </h2>

            <input
              type="text"
              placeholder="Service Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows={3}
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={formData.duration || ''}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Price (Rs)"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveService}
                className="flex-1 bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
