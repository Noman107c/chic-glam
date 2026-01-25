"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertTriangle, Plus, Minus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  reorderLevel: number;
  supplier: string;
}

export default function SalonSuppliesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "low-stock" | "out-of-stock">(
    "all",
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pos/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "low-stock"
          ? p.quantity > 0 && p.quantity <= p.reorderLevel
          : p.quantity === 0;
    return matchesSearch && matchesFilter;
  });

  const lowStockProducts = products.filter(
    (p) => p.quantity > 0 && p.quantity <= p.reorderLevel,
  );
  const outOfStockProducts = products.filter((p) => p.quantity === 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Salon Supplies</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <p className="text-gray-600 text-sm">Total Products</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-gray-600 text-sm">Low Stock</p>
            <p className="text-2xl font-bold text-orange-600">
              {lowStockProducts.length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-gray-600 text-sm">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600">
              {outOfStockProducts.length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-gray-600 text-sm">Total Supplies Value</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{totalValue.toFixed(2)}
            </p>
          </Card>
        </div>

        {/* Alerts */}
        {outOfStockProducts.length > 0 && (
          <Card className="p-4 bg-red-50 border-l-4 border-red-500 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-800">Out of Stock Alert</h3>
                <p className="text-sm text-red-700">
                  {outOfStockProducts.length} products are out of stock
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Search & Filter */}
        <Card className="p-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-64"
            />
            <div className="flex gap-2">
              {["all", "low-stock", "out-of-stock"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 rounded font-semibold text-sm ${
                    filter === f
                      ? "bg-pink-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {f === "all"
                    ? "All"
                    : f === "low-stock"
                      ? "Low Stock"
                      : "Out of Stock"}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Products Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Product Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">Price</th>
                  <th className="px-4 py-3 text-center font-semibold">Stock</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Reorder Level
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Supplier
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const isLowStock =
                    product.quantity > 0 &&
                    product.quantity <= product.reorderLevel;
                  const isOutOfStock = product.quantity === 0;

                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold">
                        ₹{product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded font-semibold ${
                            isOutOfStock
                              ? "bg-red-100 text-red-800"
                              : isLowStock
                                ? "bg-orange-100 text-orange-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {product.reorderLevel}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {product.supplier}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isOutOfStock ? (
                          <span className="text-red-600 font-semibold">
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="text-orange-600 font-semibold">
                            Low Stock
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
