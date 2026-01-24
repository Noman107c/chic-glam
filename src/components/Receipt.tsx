'use client';

import React, { useRef } from 'react';
import { Printer, Download, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  category: string;
}

interface ReceiptProps {
  receiptNumber: string;
  customeName?: string;
  customerPhone?: string;
  cashierName?: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  discountPercent: number;
  tax: number;
  total: number;
  paid: number;
  change: number;
  paymentMethod: 'cash' | 'card' | 'online';
  paymentStatus: string;
  onClose?: () => void;
  isModal?: boolean;
}

export const Receipt = ({
  receiptNumber,
  customeName = 'Customer',
  customerPhone,
  cashierName = 'Cashier',
  items,
  subtotal,
  discount,
  discountPercent,
  tax,
  total,
  paid,
  change,
  paymentMethod,
  paymentStatus,
  onClose,
  isModal = false,
}: ReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '', 'height=700,width=800');
      if (printWindow) {
        printWindow.document.write(receiptRef.current.innerHTML);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      }
    }
  };

  const handleDownloadPDF = () => {
    // This would require a library like jsPDF
    // For now, we'll just print to PDF via browser
    handlePrint();
  };

  const paymentMethodLabel = {
    cash: '💵 Cash',
    card: '💳 Card',
    online: '🌐 Online',
  };

  return (
    <>
      {isModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#392d22] to-[#2d2018] text-white p-4 flex justify-between items-center z-10">
              <h2 className="font-bold text-lg">Receipt</h2>
              {onClose && (
                <button
                  onClick={onClose}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Receipt Content */}
            <div ref={receiptRef} className="p-6 space-y-4 text-sm">
              <ReceiptContent
                receiptNumber={receiptNumber}
                customeName={customeName}
                customerPhone={customerPhone}
                cashierName={cashierName}
                items={items}
                subtotal={subtotal}
                discount={discount}
                discountPercent={discountPercent}
                tax={tax}
                total={total}
                paid={paid}
                change={change}
                paymentMethod={paymentMethod}
                paymentStatus={paymentStatus}
              />
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 space-y-2">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 bg-[#392d22] text-white py-2 rounded-lg hover:bg-[#2d2018] transition-colors font-medium"
              >
                <Printer size={18} />
                Print Receipt
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {!isModal && (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm print:shadow-none">
          <div ref={receiptRef} className="space-y-4 text-sm">
            <ReceiptContent
              receiptNumber={receiptNumber}
              customeName={customeName}
              customerPhone={customerPhone}
              cashierName={cashierName}
              items={items}
              subtotal={subtotal}
              discount={discount}
              discountPercent={discountPercent}
              tax={tax}
              total={total}
              paid={paid}
              change={change}
              paymentMethod={paymentMethod}
              paymentStatus={paymentStatus}
            />
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-[#392d22] text-white py-2 rounded-lg hover:bg-[#2d2018] transition-colors font-medium"
            >
              <Printer size={18} />
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download size={18} />
              PDF
            </button>
          </div>
        </div>
      )}
    </>
  );
};

interface ReceiptContentProps {
  receiptNumber: string;
  customeName?: string;
  customerPhone?: string;
  cashierName?: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  discountPercent: number;
  tax: number;
  total: number;
  paid: number;
  change: number;
  paymentMethod: 'cash' | 'card' | 'online';
  paymentStatus: string;
}

const ReceiptContent = ({
  receiptNumber,
  customeName,
  customerPhone,
  cashierName,
  items,
  subtotal,
  discount,
  discountPercent,
  tax,
  total,
  paid,
  change,
  paymentMethod,
  paymentStatus,
}: ReceiptContentProps) => {
  const paymentMethodLabel = {
    cash: '💵 Cash',
    card: '💳 Card',
    online: '🌐 Online',
  };

  return (
    <>
      {/* Business Header */}
      <div className="text-center border-b-2 border-gray-300 pb-3 print:pb-2">
        <div className="text-2xl font-bold text-[#d4af37] mb-1 print:text-xl">Chic & Glam</div>
        <p className="text-xs text-gray-600">Premium Beauty & Fitness Services</p>
        <p className="text-xs text-gray-500 mt-1">📞 +92 300 123 4567</p>
      </div>

      {/* Receipt Number & Date */}
      <div className="grid grid-cols-2 gap-4 text-xs border-b border-gray-200 pb-3">
        <div>
          <p className="text-gray-600">Receipt #</p>
          <p className="font-semibold text-[#392d22]">{receiptNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Date & Time</p>
          <p className="font-semibold text-[#392d22]">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Customer & Cashier Info */}
      <div className="grid grid-cols-2 gap-4 text-xs border-b border-gray-200 pb-3">
        <div>
          <p className="text-gray-600">Customer</p>
          <p className="font-semibold text-[#392d22]">{customeName || 'Customer'}</p>
          {customerPhone && <p className="text-gray-600">{customerPhone}</p>}
        </div>
        <div className="text-right">
          <p className="text-gray-600">Cashier</p>
          <p className="font-semibold text-[#392d22]">{cashierName || 'Cashier'}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="border-b-2 border-gray-300 pb-3">
        <div className="grid grid-cols-12 gap-1 mb-2 text-xs font-bold text-[#392d22] border-b border-gray-200 pb-2">
          <div className="col-span-5">Item</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-3 text-right">Total</div>
        </div>

        {items.map((item, idx) => (
          <div key={idx} className="mb-2">
            <div className="grid grid-cols-12 gap-1 text-xs">
              <div className="col-span-5">
                <p className="font-semibold text-[#392d22] truncate">{item.name}</p>
                <p className="text-gray-600 text-xs">{item.category}</p>
              </div>
              <div className="col-span-2 text-right">{item.quantity}</div>
              <div className="col-span-2 text-right">Rs.{item.price}</div>
              <div className="col-span-3 text-right font-semibold text-[#d4af37]">
                Rs.{item.total.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-1 border-b-2 border-gray-300 pb-3 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold text-[#392d22]">Rs.{subtotal.toLocaleString()}</span>
        </div>

        {discountPercent > 0 && (
          <div className="flex justify-between text-red-600">
            <span>Discount ({discountPercent}%):</span>
            <span className="font-semibold">-Rs.{discount.toLocaleString()}</span>
          </div>
        )}

        {tax > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (0%):</span>
            <span className="font-semibold text-[#392d22]">Rs.{tax.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-base font-bold text-[#392d22] border-t border-gray-300 pt-2 mt-2">
          <span>Grand Total:</span>
          <span className="text-[#d4af37]">Rs.{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-1 border-b border-gray-200 pb-3 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method:</span>
          <span className="font-semibold text-[#392d22]">
            {paymentMethodLabel[paymentMethod as keyof typeof paymentMethodLabel]}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Amount Paid:</span>
          <span className="font-semibold text-[#392d22]">Rs.{paid.toLocaleString()}</span>
        </div>

        {change > 0 && (
          <div className="flex justify-between text-green-600 font-semibold">
            <span>Change:</span>
            <span>Rs.{change.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Status:</span>
          <span className={`font-bold px-2 py-1 rounded text-white ${
            paymentStatus === 'PAID' ? 'bg-green-600' : 'bg-yellow-600'
          }`}>
            ✓ {paymentStatus}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 space-y-1 pt-3">
        <p className="font-semibold">Thank you for your purchase!</p>
        <p>Please keep this receipt for your records</p>
        <p className="text-gray-400 mt-2">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none;
          }
          @page {
            size: 80mm auto;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Receipt;
