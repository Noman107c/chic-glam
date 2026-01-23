'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader } from '@/components/ui/Loader';
import { Search, Plus, Minus, X, Printer, DollarSign, User } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

interface Beautician {
  id: string;
  user: {
    name: string;
    phone: string;
  };
  hourlyRate: number;
  specialization: string[];
}

interface CartItem {
  id: string;
  type: 'service' | 'product';
  name: string;
  price: number;
  quantity: number;
  beautician?: Beautician;
  duration?: number;
}

export default function POSPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [beauticians, setBeauticians] = useState<Beautician[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'services' | 'products'>('services');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'ONLINE'>('CASH');
  const [couponCode, setCouponCode] = useState('');
  const [membershipCard, setMembershipCard] = useState('');
  const [tip, setTip] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, productsRes, beauticiansRes] = await Promise.all([
          fetch('/api/pos/services'),
          fetch('/api/pos/products'),
          fetch('/api/pos/beauticians'),
        ]);

        if (servicesRes.ok) setServices(await servicesRes.json().then(d => d.data));
        if (productsRes.ok) setProducts(await productsRes.json().then(d => d.data));
        if (beauticiansRes.ok) setBeauticians(await beauticiansRes.json().then(d => d.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = discountType === 'percentage' ? (subtotal * discount) / 100 : discount;
  const tax = (subtotal - discountAmount) * 0.18; // 18% GST
  const total = subtotal - discountAmount + tax;

  // Add to cart
  const addToCart = (item: Service | Product, type: 'service' | 'product') => {
    const cartItem: CartItem = {
      id: item.id,
      type,
      name: item.name,
      price: item.price,
      quantity: 1,
      duration: type === 'service' ? (item as Service).duration : undefined,
    };

    const existing = cart.find(c => c.id === item.id && c.type === type);
    if (existing) {
      setCart(cart.map(c =>
        c.id === item.id && c.type === type ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      setCart([...cart, cartItem]);
    }
  };

  // Remove from cart
  const removeFromCart = (id: string, type: 'service' | 'product') => {
    setCart(cart.filter(item => !(item.id === id && item.type === type)));
  };

  // Update quantity
  const updateQuantity = (id: string, type: 'service' | 'product', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, type);
    } else {
      setCart(cart.map(item =>
        item.id === id && item.type === type ? { ...item, quantity } : item
      ));
    }
  };

  // Filter items
  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    if (!customerName.trim()) {
      alert('Please enter customer name');
      return;
    }

    try {
      const response = await fetch('/api/pos/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          receptionistId: 'default-receptionist-id', // TODO: Get from auth
          subtotal,
          discount: discountAmount,
          discountType,
          tax,
          total,
          paid: total, // For now, assume full payment
          balance: 0,
          paymentMethod,
          tip,
          items: cart.map(item => ({
            type: item.type,
            serviceId: item.type === 'service' ? item.id : null,
            productId: item.type === 'product' ? item.id : null,
            quantity: item.quantity,
            duration: item.duration,
            unitPrice: item.price,
            amount: item.price * item.quantity,
          })),
        }),
      });

      if (response.ok) {
        const transaction = await response.json();
        alert('Transaction completed! Invoice #' + transaction.data.transactionNo);
        // Reset
        setCart([]);
        setCustomerName('');
        setCustomerPhone('');
        setDiscount(0);
        setTip(0);
        setCouponCode('');
        setMembershipCard('');
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Failed to create transaction');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT PANEL - Services & Products */}
      <div className="w-1/3 bg-white border-r overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Chic Glam POS</h1>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedTab('services')}
            className={`flex-1 py-2 px-3 rounded text-sm font-semibold ${
              selectedTab === 'services'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setSelectedTab('products')}
            className={`flex-1 py-2 px-3 rounded text-sm font-semibold ${
              selectedTab === 'products'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Products
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid gap-2">
          {selectedTab === 'services' &&
            filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => addToCart(service, 'service')}
                className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded cursor-pointer hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{service.name}</h4>
                    <p className="text-xs text-gray-600">{service.category}</p>
                    <p className="text-xs text-gray-500">{service.duration} min</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-pink-600">₹{service.price}</p>
                    <Plus className="w-4 h-4 text-pink-600 ml-auto mt-1" />
                  </div>
                </div>
              </div>
            ))}

          {selectedTab === 'products' &&
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => product.quantity > 0 && addToCart(product, 'product')}
                className={`p-3 border rounded cursor-pointer transition ${
                  product.quantity > 0
                    ? 'bg-blue-50 border-blue-200 hover:shadow-md'
                    : 'bg-gray-100 border-gray-300 opacity-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-600">{product.category}</p>
                    <p className={`text-xs ${product.quantity > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                      Stock: {product.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">₹{product.price}</p>
                    {product.quantity > 0 && (
                      <Plus className="w-4 h-4 text-blue-600 ml-auto mt-1" />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* CENTER PANEL - Service Selection & Cart Preview */}
      <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Cart ({cart.length} items)</h2>

        {cart.length === 0 ? (
          <Card className="text-center py-8 text-gray-500">
            No items in cart
          </Card>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={`${item.id}-${item.type}`} className="p-3 bg-gray-50 rounded border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.type)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                      className="p-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, item.type, parseInt(e.target.value) || 1)}
                      className="w-12 px-2 py-1 border rounded text-center"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                      className="p-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT PANEL - Billing */}
      <div className="w-1/3 bg-gradient-to-b from-purple-50 to-pink-50 p-4 overflow-y-auto flex flex-col">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" /> Billing
        </h2>

        {/* Customer Details */}
        <Card className="mb-4 p-3">
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-1">
            <User className="w-4 h-4" /> Customer
          </h3>
          <Input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Phone Number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </Card>

        {/* Discount & Membership */}
        <Card className="mb-4 p-3">
          <h3 className="font-semibold text-sm mb-2">Discount</h3>
          <div className="flex gap-2 mb-2">
            <Input
              type="number"
              placeholder="Amount"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              className="flex-1"
            />
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
              className="px-2 py-1 border rounded"
            >
              <option value="percentage">%</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>

          <Input
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Membership Card"
            value={membershipCard}
            onChange={(e) => setMembershipCard(e.target.value)}
          />
        </Card>

        {/* Bill Summary */}
        <Card className="mb-4 p-4 bg-white">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discountType === 'percentage' ? discount + '%' : 'Fixed'})</span>
                <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax (18% GST)</span>
              <span className="font-semibold">₹{tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold text-pink-600">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="mb-4 p-3">
          <h3 className="font-semibold text-sm mb-2">Payment Method</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="ONLINE">Online</option>
          </select>

          <Input
            type="number"
            placeholder="Tip Amount"
            value={tip}
            onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
            className="mt-2"
          />
        </Card>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <Button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded font-bold disabled:opacity-50"
          >
            Checkout ({cart.length})
          </Button>
          <Button
            onClick={() => {
              setCart([]);
              setCustomerName('');
              setCustomerPhone('');
            }}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
