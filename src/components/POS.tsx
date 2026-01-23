'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/utils';
import { Service, User, Role } from '@/types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CartItem {
  id: string;
  service: Service;
  beautician: User;
  quantity: number;
  price: number;
}

interface PaymentData {
  customerName: string;
  paymentMethod: string;
  cashReceived: number;
  change: number;
}

export const POS: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [beauticians, setBeauticians] = useState<User[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedBeautician, setSelectedBeautician] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    customerName: '',
    paymentMethod: 'cash',
    cashReceived: 0,
    change: 0,
  });
  const [receiptData, setReceiptData] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'gym' | 'beauty'>('beauty');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchServices();
    fetchBeauticians();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchBeauticians = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setBeauticians(data);
    } catch (error) {
      console.error('Error fetching beauticians:', error);
    }
  };

  const getFilteredBeauticians = () => {
    return beauticians.filter((user: User) => {
      const roleName = typeof user.role === 'string' ? user.role : (user.role as Role)?.name;
      if (selectedType === 'beauty') {
        return roleName === 'beautician';
      } else {
        return roleName === 'trainer';
      }
    });
  };

  const groupServicesByCategory = () => {
    const filteredServices = services.filter(service => {
      // Assuming category contains type info like "Beauty - Hair" or "Gym - Weights"
      const categoryLower = service.category.toLowerCase();
      if (selectedType === 'beauty') {
        return categoryLower.includes('beauty') || categoryLower.includes('hair') || categoryLower.includes('nail') || categoryLower.includes('facial');
      } else {
        return categoryLower.includes('gym') || categoryLower.includes('fitness') || categoryLower.includes('weight') || categoryLower.includes('cardio');
      }
    });

    const grouped = filteredServices.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {} as Record<string, Service[]>);

    return grouped;
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

  const selectService = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const addToCart = () => {
    if (!selectedService || !selectedBeautician) return;

    const service = services.find(s => s.id === selectedService);
    const beautician = beauticians.find(b => b.id === selectedBeautician);

    if (!service || !beautician) return;

    const cartItem: CartItem = {
      id: `${selectedService}-${selectedBeautician}-${Date.now()}`,
      service,
      beautician,
      quantity,
      price: service.price * quantity,
    };

    setCart([...cart, cartItem]);
    setSelectedService('');
    setSelectedBeautician('');
    setQuantity(1);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handlePayment = () => {
    setIsPaymentModalOpen(true);
  };

  const processPayment = async () => {
    if (paymentData.cashReceived < getTotal()) return;

    const change = paymentData.cashReceived - getTotal();

    // Save sales data
    for (const item of cart) {
      try {
        await fetch('/api/beautician-sales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            beauticianId: item.beautician.id,
            serviceId: item.service.id,
            customerName: paymentData.customerName,
            amount: item.price,
            paymentMethod: paymentData.paymentMethod,
          }),
        });
      } catch (error) {
        console.error('Error saving sale:', error);
      }
    }

    setPaymentData({ ...paymentData, change });
    setIsPaymentModalOpen(false);
    generateReceipt();
  };

  const generateReceipt = () => {
    const receipt = {
      receiptNumber: `RCP-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      customerName: paymentData.customerName,
      items: cart,
      subtotal: getTotal(),
      tax: 0,
      total: getTotal(),
      paymentMethod: paymentData.paymentMethod,
      cashReceived: paymentData.cashReceived,
      change: paymentData.change,
    };

    setReceiptData(receipt);
    setIsReceiptModalOpen(true);
    setCart([]);
    setPaymentData({
      customerName: '',
      paymentMethod: 'cash',
      cashReceived: 0,
      change: 0,
    });
  };

  const printReceipt = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 300px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 20px; }
              .item { display: flex; justify-content: space-between; margin: 5px 0; }
              .total { border-top: 1px solid #000; padding-top: 10px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>Chic Glam Salon</h2>
              <p>Receipt #${receiptData.receiptNumber}</p>
              <p>${receiptData.date} ${receiptData.time}</p>
            </div>
            <div>
              <p><strong>Customer:</strong> ${receiptData.customerName}</p>
              ${receiptData.items.map((item: CartItem) => `
                <div class="item">
                  <span>${item.service.name} (${item.beautician.name})</span>
                  <span>${formatCurrency(item.price)}</span>
                </div>
              `).join('')}
              <div class="total">
                <div class="item">
                  <span>Total:</span>
                  <span>${formatCurrency(receiptData.total)}</span>
                </div>
                <div class="item">
                  <span>Payment:</span>
                  <span>${receiptData.paymentMethod}</span>
                </div>
                ${receiptData.paymentMethod === 'cash' ? `
                  <div class="item">
                    <span>Cash Received:</span>
                    <span>${formatCurrency(receiptData.cashReceived)}</span>
                  </div>
                  <div class="item">
                    <span>Change:</span>
                    <span>${formatCurrency(receiptData.change)}</span>
                  </div>
                ` : ''}
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Point of Sale</h1>
        <p className="text-gray-700">Process customer transactions and generate receipts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <Card>
          <CardHeader title="Service Categories" />
          <CardBody>
            <div className="space-y-4">
              {/* Main Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedType === 'beauty' ? 'primary' : 'secondary'}
                    onClick={() => setSelectedType('beauty')}
                    className="flex-1"
                  >
                    Beauty Parlor
                  </Button>
                  <Button
                    variant={selectedType === 'gym' ? 'primary' : 'secondary'}
                    onClick={() => setSelectedType('gym')}
                    className="flex-1"
                  >
                    Gym
                  </Button>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                {Object.entries(groupServicesByCategory()).map(([category, categoryServices]) => (
                  <div key={category}>
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-sm">{category}</span>
                      {expandedCategories.has(category) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                    {expandedCategories.has(category) && (
                      <div className="ml-4 mt-2 space-y-1">
                        {categoryServices.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => selectService(service.id)}
                            className={`w-full text-left p-2 rounded-lg text-sm hover:bg-gray-50 transition-colors ${
                              selectedService === service.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
                            }`}
                          >
                            {service.name} - {formatCurrency(service.price)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Service Selection */}
        <Card>
          <CardHeader title="Add Service" />
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Selected Service</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {selectedService ? (
                    <div>
                      <p className="font-medium">
                        {services.find(s => s.id === selectedService)?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(services.find(s => s.id === selectedService)?.price || 0)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No service selected</p>
                  )}
                </div>
              </div>

              <Select
                label={selectedType === 'beauty' ? 'Beautician' : 'Trainer'}
                value={selectedBeautician}
                onChange={(e) => setSelectedBeautician(e.target.value)}
                options={getFilteredBeauticians().map(user => ({
                  value: user.id,
                  label: user.name
                }))}
              />

              <Input
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />

              <Button
                variant="primary"
                onClick={addToCart}
                disabled={!selectedService || !selectedBeautician}
                className="w-full"
              >
                Add to Cart
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Cart */}
        <Card>
          <CardHeader title="Cart" />
          <CardBody>
            <div className="space-y-3">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.service.name}</p>
                      <p className="text-sm text-gray-600">{item.beautician.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{formatCurrency(item.price)}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              )}

              {cart.length > 0 && (
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(getTotal())}</span>
                  </div>
                  <Button
                    variant="primary"
                    onClick={handlePayment}
                    className="w-full mt-3"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Payment"
      >
        <div className="space-y-4">
          <Input
            label="Customer Name"
            value={paymentData.customerName}
            onChange={(e) => setPaymentData({ ...paymentData, customerName: e.target.value })}
          />

          <Select
            label="Payment Method"
            value={paymentData.paymentMethod}
            onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
            options={[
              { value: 'cash', label: 'Cash' },
              { value: 'card', label: 'Card' },
              { value: 'upi', label: 'UPI' },
            ]}
          />

          {paymentData.paymentMethod === 'cash' && (
            <Input
              label="Cash Received"
              type="number"
              value={paymentData.cashReceived}
              onChange={(e) => setPaymentData({
                ...paymentData,
                cashReceived: Number(e.target.value),
                change: Number(e.target.value) - getTotal()
              })}
              min={getTotal()}
            />
          )}

          <div className="text-lg font-bold">
            Total: {formatCurrency(getTotal())}
          </div>

          {paymentData.paymentMethod === 'cash' && (
            <div className="text-lg">
              Change: {formatCurrency(Math.max(0, paymentData.change))}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={processPayment}
              disabled={paymentData.paymentMethod === 'cash' && paymentData.cashReceived < getTotal()}
              className="flex-1"
            >
              Complete Payment
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsPaymentModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Receipt Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        title="Receipt"
      >
        <div className="space-y-4">
          <div className="border p-4 rounded-lg bg-gray-50">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold">Chic Glam Salon</h3>
              <p>Receipt #{receiptData?.receiptNumber}</p>
              <p>{receiptData?.date} {receiptData?.time}</p>
            </div>

            <div className="mb-4">
              <p><strong>Customer:</strong> {receiptData?.customerName}</p>
            </div>

            <div className="space-y-2 mb-4">
              {receiptData?.items?.map((item: CartItem, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{item.service.name} ({item.beautician.name})</span>
                  <span>{formatCurrency(item.price)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatCurrency(receiptData?.total || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span>{receiptData?.paymentMethod}</span>
              </div>
              {receiptData?.paymentMethod === 'cash' && (
                <>
                  <div className="flex justify-between">
                    <span>Cash Received:</span>
                    <span>{formatCurrency(receiptData?.cashReceived || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Change:</span>
                    <span>{formatCurrency(receiptData?.change || 0)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={printReceipt}
              className="flex-1"
            >
              Print Receipt
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsReceiptModalOpen(false)}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
