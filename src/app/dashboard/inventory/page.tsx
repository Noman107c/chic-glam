'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  AlertTriangle,
  TrendingDown,
  Package,
  DollarSign,
  Download,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';


interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface InventoryTransaction {
  id: string;
  productName: string;
  type: 'ADD' | 'USE' | 'RETURN';
  quantity: number;
  reason?: string;
  date: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Facial Cleanser',
    category: 'Skincare',
    quantity: 45,
    minStock: 20,
    price: 1500,
    lastUpdated: '2024-01-24',
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Hair Oil',
    category: 'Hair Care',
    quantity: 12,
    minStock: 20,
    price: 800,
    lastUpdated: '2024-01-24',
    status: 'low-stock',
  },
  {
    id: '3',
    name: 'Face Mask',
    category: 'Skincare',
    quantity: 0,
    minStock: 15,
    price: 2000,
    lastUpdated: '2024-01-23',
    status: 'out-of-stock',
  },
];

const mockTransactions: InventoryTransaction[] = [
  {
    id: '1',
    productName: 'Facial Cleanser',
    type: 'USE',
    quantity: 5,
    reason: 'Facial service session',
    date: '2024-01-24',
  },
  {
    id: '2',
    productName: 'Hair Oil',
    type: 'ADD',
    quantity: 20,
    reason: 'Purchase order',
    date: '2024-01-24',
  },
];

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>(mockTransactions);
  const [activeTab, setActiveTab] = useState<'inventory' | 'transactions'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter(
    (prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    lowStockItems: products.filter((p) => p.status === 'low-stock' || p.status === 'out-of-stock').length,
    totalValue: products.reduce((sum, p) => sum + p.quantity * p.price, 0),
  };

  // Update product status
  const getProductStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) return 'out-of-stock' as const;
    if (quantity <= minStock) return 'low-stock' as const;
    return 'in-stock' as const;
  };

  // Save product
  const handleSaveProduct = () => {
    if (editingId) {
      setProducts(
        products.map((prod) =>
          prod.id === editingId
            ? {
                ...prod,
                ...formData,
                status: getProductStatus(formData.quantity || prod.quantity, formData.minStock || prod.minStock),
                lastUpdated: new Date().toISOString().split('T')[0],
              }
            : prod
        )
      );
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: Math.random().toString(),
        name: formData.name || '',
        category: formData.category || '',
        quantity: formData.quantity || 0,
        minStock: formData.minStock || 10,
        price: formData.price || 0,
        lastUpdated: new Date().toISOString().split('T')[0],
        status: getProductStatus(formData.quantity || 0, formData.minStock || 10),
      };
      setProducts([...products, newProduct]);
    }
    setFormData({});
    setIsModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure?')) {
      setProducts(products.filter((prod) => prod.id !== id));
    }
  };

  // Inventory Tab
  const InventoryTab = () => (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'blue' },
          {
            label: 'Low Stock Items',
            value: stats.lowStockItems,
            icon: AlertTriangle,
            color: 'red',
          },
          { label: 'Total Value', value: `Rs ${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: 'green' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 p-6 rounded-lg border border-${stat.color}-200 flex items-start justify-between`}
          >
            <div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
            <stat.icon className={`text-${stat.color}-600`} size={32} />
          </div>
        ))}
      </div>

      {/* Search and Add */}
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
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
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Min Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{product.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.minStock}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Rs {product.price}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'in-stock'
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'low-stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm flex gap-2">
                    <button
                      onClick={() => {
                        setFormData(product);
                        setEditingId(product.id);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Transactions Tab
  const TransactionsTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Reason</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans) => (
                <tr key={trans.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{trans.productName}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        trans.type === 'ADD'
                          ? 'bg-green-100 text-green-800'
                          : trans.type === 'USE'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {trans.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{trans.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{trans.reason || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{trans.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Track products, stock levels, and inventory transactions</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {(['inventory', 'transactions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
        {activeTab === 'inventory' && <InventoryTab />}
        {activeTab === 'transactions' && <TransactionsTab />}

        {/* Product Modal */}
        <Modal isOpen={isModalOpen} title={editingId ? 'Edit Product' : 'Add Product'} onClose={() => setIsModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? 'Edit Product' : 'Add Product'}
            </h2>

            <input
              type="text"
              placeholder="Product Name"
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
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity || ''}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Min Stock Level"
              value={formData.minStock || ''}
              onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) })}
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
                onClick={handleSaveProduct}
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
