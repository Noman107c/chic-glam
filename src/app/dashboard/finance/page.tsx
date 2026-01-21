'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Transaction, TransactionType, Invoice } from '@/types';
import { formatDate, formatCurrency } from '@/utils';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'income' as TransactionType,
    amount: 5000,
    description: 'Membership Payment',
    category: 'Membership',
    branchId: '1',
    paymentMethod: 'Card',
    date: new Date(),
    createdAt: new Date(),
  },
  {
    id: '2',
    type: 'expense' as TransactionType,
    amount: 2000,
    description: 'Staff Salary',
    category: 'Salaries',
    branchId: '1',
    paymentMethod: 'Bank Transfer',
    date: new Date(),
    createdAt: new Date(),
  },
  {
    id: '3',
    type: 'income' as TransactionType,
    amount: 3500,
    description: 'Service Income',
    category: 'Service',
    branchId: '2',
    paymentMethod: 'Cash',
    date: new Date(),
    createdAt: new Date(),
  },
];

const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    transactionId: 'TXN-001',
    customerId: '1',
    branchId: '1',
    items: [],
    subtotal: 5000,
    tax: 500,
    discount: 0,
    total: 5500,
    status: 'paid',
    paymentStatus: 'paid',
    issueDate: new Date(),
    dueDate: new Date(),
    paidDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'invoices'>('overview');
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [invoices, setInvoices] = useState(MOCK_INVOICES);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const transactionColumns: Column<Transaction>[] = [
    {
      key: 'date',
      label: 'Date',
      render: (value: Date) => formatDate(value),
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'category',
      label: 'Category',
    },
    {
      key: 'paymentMethod',
      label: 'Method',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value: number, row: Transaction) => (
        <span className={row.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
          {row.type === 'income' ? '+' : '-'}{formatCurrency(value)}
        </span>
      ),
    },
  ];

  const invoiceColumns: Column<Invoice>[] = [
    {
      key: 'invoiceNumber',
      label: 'Invoice #',
      sortable: true,
    },
    {
      key: 'customerId',
      label: 'Customer ID',
    },
    {
      key: 'total',
      label: 'Amount',
      render: (value: number) => formatCurrency(value),
    },
    {
      key: 'paymentStatus',
      label: 'Payment Status',
      render: (value: string) => (
        <Badge
          label={value}
          variant={value === 'paid' ? 'success' : 'warning'}
          size="sm"
        />
      ),
    },
    {
      key: 'issueDate',
      label: 'Date',
      render: (value: Date) => formatDate(value),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Finance</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage financial transactions and invoices</p>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Income
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalIncome)}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Expense
            </p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(totalExpense)}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Net Profit
            </p>
            <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatCurrency(netProfit)}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {['overview', 'transactions', 'invoices'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Recent Transactions" />
            <CardBody>
              <div className="space-y-3">
                {transactions.slice(0, 5).map(transaction => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.category}
                      </p>
                    </div>
                    <span
                      className={`text-lg font-bold ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Pending Invoices" />
            <CardBody>
              <div className="space-y-3">
                {invoices
                  .filter(i => i.paymentStatus !== 'paid')
                  .map(invoice => (
                    <div
                      key={invoice.id}
                      className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {invoice.invoiceNumber}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Due: {formatDate(invoice.dueDate)}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {formatCurrency(invoice.total)}
                      </span>
                    </div>
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <Button variant="primary">+ Add Transaction</Button>
          <DataTable
            columns={transactionColumns}
            data={transactions}
            title="All Transactions"
          />
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <Button variant="primary">+ Create Invoice</Button>
          <DataTable
            columns={invoiceColumns}
            data={invoices}
            title="All Invoices"
          />
        </div>
      )}
    </div>
  );
}
