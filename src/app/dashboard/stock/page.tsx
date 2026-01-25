"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  AlertTriangle,
  Package,
  DollarSign,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  lastUpdated: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

interface StockTransaction {
  id: string;
  productName: string;
  type: "ADD" | "USE" | "RETURN";
  quantity: number;
  reason?: string;
  date: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Facial Cleanser",
    category: "Skincare",
    quantity: 45,
    minStock: 20,
    price: 1500,
    lastUpdated: "2024-01-24",
    status: "in-stock",
  },
  {
    id: "2",
    name: "Hair Oil",
    category: "Hair Care",
    quantity: 12,
    minStock: 20,
    price: 800,
    lastUpdated: "2024-01-24",
    status: "low-stock",
  },
  {
    id: "3",
    name: "Face Mask",
    category: "Skincare",
    quantity: 0,
    minStock: 15,
    price: 2000,
    lastUpdated: "2024-01-23",
    status: "out-of-stock",
  },
];

const mockTransactions: StockTransaction[] = [
  {
    id: "1",
    productName: "Facial Cleanser",
    type: "USE",
    quantity: 5,
    reason: "Facial service session",
    date: "2024-01-24",
  },
  {
    id: "2",
    productName: "Hair Oil",
    type: "ADD",
    quantity: 20,
    reason: "Purchase order",
    date: "2024-01-24",
  },
];

export default function SalonSuppliesPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [transactions, setTransactions] =
    useState<StockTransaction[]>(mockTransactions);
  const [activeTab, setActiveTab] = useState<"stock" | "history">("stock");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter(
    (prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    lowStockItems: products.filter(
      (p) => p.status === "low-stock" || p.status === "out-of-stock",
    ).length,
    totalValue: products.reduce((sum, p) => sum + p.quantity * p.price, 0),
  };

  // Update product status
  const getProductStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) return "out-of-stock" as const;
    if (quantity <= minStock) return "low-stock" as const;
    return "in-stock" as const;
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
                status: getProductStatus(
                  formData.quantity || prod.quantity,
                  formData.minStock || prod.minStock,
                ),
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : prod,
        ),
      );
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: Math.random().toString(),
        name: formData.name || "",
        category: formData.category || "",
        quantity: formData.quantity || 0,
        minStock: formData.minStock || 10,
        price: formData.price || 0,
        lastUpdated: new Date().toISOString().split("T")[0],
        status: getProductStatus(
          formData.quantity || 0,
          formData.minStock || 10,
        ),
      };
      setProducts([...products, newProduct]);
    }
    setFormData({});
    setIsModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((prod) => prod.id !== id));
    }
  };

  // Stock Tab
  const StockTab = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalProducts}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                Total Products
              </div>
            </div>
            <Package className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {stats.lowStockItems}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                Low Stock Items
              </div>
            </div>
            <AlertTriangle className="text-red-600" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                Rs {stats.totalValue.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                Total Value
              </div>
            </div>
            <DollarSign className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
          />
        </div>
        <Button
          onClick={() => {
            setFormData({});
            setEditingId(null);
            setIsModalOpen(true);
          }}
          style={{
            backgroundColor: "#392d22",
            color: "white",
          }}
          className="hover:opacity-90 transition-opacity font-medium px-5 py-2.5 shadow-md whitespace-nowrap"
        >
          <Plus size={18} className="inline mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Product
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Category
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Quantity
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Min Stock
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Price
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {product.category}
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-900">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {product.minStock}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    Rs {product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        product.status === "in-stock"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : product.status === "low-stock"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {product.status.replace("-", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setFormData(product);
                          setEditingId(product.id);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Package size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No products found</p>
          </div>
        )}
      </div>
    </div>
  );

  // Transactions Tab
  const TransactionsTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Product
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Type
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Quantity
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Reason
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans) => (
                <tr
                  key={trans.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {trans.productName}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        trans.type === "ADD"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : trans.type === "USE"
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {trans.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-900">
                    {trans.quantity}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {trans.reason || "-"}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {trans.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Salon Supplies</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Salon Supplies
            </h1>
            <p className="text-sm text-gray-600">
              Track products, stock levels, and usage history.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 border-b-2 border-gray-200 overflow-x-auto">
        {(
          [
            ["stock", "Current Stock"],
            ["history", "Usage History"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as "stock" | "history")}
            className={`px-4 sm:px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === id
                ? "border-[#392d22] text-[#392d22]"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "stock" && <StockTab />}
      {activeTab === "history" && <TransactionsTab />}

      {/* Product Modal */}
      <Modal
        isOpen={isModalOpen}
        title={editingId ? "Edit Product" : "Add Product"}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({});
          setEditingId(null);
        }}
        footer={
          <div className="flex gap-3 w-full">
            <Button
              onClick={() => {
                setIsModalOpen(false);
                setFormData({});
                setEditingId(null);
              }}
              style={{
                backgroundColor: "white",
                color: "#392d22",
                border: "2px solid #392d22",
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProduct}
              style={{
                backgroundColor: "#392d22",
                color: "white",
              }}
              className="flex-1"
            >
              {editingId ? "Update" : "Save"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Product Name"
              type="text"
              placeholder="e.g., Facial Cleanser"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              label="Category"
              type="text"
              placeholder="e.g., Skincare"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Quantity"
              type="number"
              placeholder="0"
              value={formData.quantity || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
              required
            />
            <Input
              label="Min Stock"
              type="number"
              placeholder="10"
              value={formData.minStock || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minStock: parseInt(e.target.value) || 0,
                })
              }
              required
            />
            <Input
              label="Price (Rs)"
              type="number"
              placeholder="0"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
