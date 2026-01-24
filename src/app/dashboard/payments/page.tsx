'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Receipt } from '@/components/Receipt';

interface Payment {
  id: string;
  customer_name: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    amount: '',
    payment_method: 'credit_card',
    status: 'paid',
  });

  const fetchPayments = async () => {
    try {
      setLoading(true);
      // For now, just return mock data since APIs are not available
      const mockPayments = [
        {
          id: 'pay-001',
          customer_name: 'John Doe',
          amount: 150.00,
          payment_method: 'credit_card',
          status: 'paid',
          created_at: new Date().toISOString(),
        },
        {
          id: 'pay-002',
          customer_name: 'Jane Smith',
          amount: 200.00,
          payment_method: 'cash',
          status: 'paid',
          created_at: new Date().toISOString(),
        },
        {
          id: 'pay-003',
          customer_name: 'Bob Johnson',
          amount: 75.50,
          payment_method: 'upi',
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ];
      setPayments(mockPayments);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching payments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Starting payment creation...');

      const paymentData = {
        customer_name: formData.customer_name,
        amount: parseFloat(formData.amount),
        payment_method: formData.payment_method,
        status: formData.status,
      };

      // Validate required fields
      if (!paymentData.customer_name || !paymentData.amount) {
        throw new Error('Please fill in all required fields');
      }

      // For now, just log the data to console
      console.log('Payment Data:', paymentData);

      // Clear any existing errors
      setError(null);

      // Simulate successful payment creation
      setTimeout(() => {
        console.log('Payment completed successfully!');
        setFormData({ customer_name: '', amount: '', payment_method: 'credit_card', status: 'paid' });
        setShowForm(false);
      }, 1000);

    } catch (err) {
      console.error('Error creating payment:', err);
      setError(err instanceof Error ? err.message : 'Error processing payment. Please try again.');
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <Loader />;

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    return status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const handleGenerateReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowReceipt(true);
  };

  const getPaymentMethodForReceipt = (method: string) => {
    switch (method) {
      case 'credit_card':
      case 'debit_card':
        return 'card';
      case 'cash':
        return 'cash';
      case 'upi':
        return 'online';
      default:
        return 'cash';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payments</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Payment'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-gray-600 text-sm">Total Amount</p>
          <p className="text-3xl font-bold text-blue-600">${totalAmount.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">Paid Amount</p>
          <p className="text-3xl font-bold text-green-600">${paidAmount.toFixed(2)}</p>
        </Card>
      </div>

      {showForm && (
        <Card>
          <form onSubmit={handleCreatePayment} className="space-y-4">
            <input
              type="text"
              placeholder="Customer Name"
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
            </select>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
            <Button type="submit">Create Payment</Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {payments.map((payment) => (
          <Card key={payment.id}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold">{payment.customer_name}</h3>
                <p className="text-sm text-gray-600">{payment.payment_method.replace('_', ' ')}</p>
                <p className="text-xs text-gray-500">
                  {new Date(payment.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <div>
                  <p className="font-bold text-lg">${payment.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </div>
                {payment.status === 'paid' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleGenerateReceipt(payment)}
                    className="text-xs"
                  >
                    Generate Receipt
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {payments.length === 0 && !loading && (
        <Card className="text-center py-8 text-gray-500">
          No payments found
        </Card>
      )}

      {/* Receipt Modal */}
      {showReceipt && selectedPayment && (
        <Receipt
          receiptNumber={`PAY-${selectedPayment.id.slice(-6).toUpperCase()}`}
          customerName={selectedPayment.customer_name}
          cashierName="Admin"
          items={[
            {
              name: 'Payment',
              quantity: 1,
              price: selectedPayment.amount,
              total: selectedPayment.amount,
              category: 'Payment',
            },
          ]}
          subtotal={selectedPayment.amount}
          discount={0}
          discountPercent={0}
          tax={0}
          total={selectedPayment.amount}
          paid={selectedPayment.amount}
          change={0}
          paymentMethod={getPaymentMethodForReceipt(selectedPayment.payment_method)}
          paymentStatus="Paid"
          isModal={true}
          onClose={() => {
            setShowReceipt(false);
            setSelectedPayment(null);
          }}
        />
      )}
    </div>
  );
}
