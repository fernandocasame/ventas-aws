"use client";
import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Item {
  id: number;
  description: string;
  price: number;
}

const AppleReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      description: 'Apple Watch\nSeries 9 GPS 45mm Starlight Aluminium Case with Starlight Sport Loop',
      price: 429.00,
    },
  ]);

  const [shipping, setShipping] = useState(0.00);
  const [estimatedTax, setEstimatedTax] = useState(35.40);

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + shipping + estimatedTax;

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now(),
      description: 'New Item - Click to Edit',
      price: 0.0,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleDownloadPdf = () => {
     window.print();
  };

  return (
    <div>
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto font-sans">
        {/* ... Header and other static sections ... */}
        <div className="text-center mb-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Logo" className="w-16 mx-auto" />
        </div>

        <div className="text-center my-6">
          <h1 className="text-3xl font-bold">Thanks for your order.</h1>
          <p className="text-lg mt-2">Order number <span contentEditable suppressContentEditableWarning>W062711651</span></p>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <h2 className="text-xl font-bold">Shipped</h2>
          <p className="text-gray-600">Ships Jan 22 — Jan 24</p>

          <div className="mt-4 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-start relative group">
                <div>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(item.id, 'description', e.currentTarget.innerText)}
                    className="font-semibold"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(item.id, 'price', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}
                    className="font-semibold"
                  >
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                X
              </button>
              </div>
            ))}
             <button onClick={handleAddItem} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm no-print">
            Add Item
          </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-300 text-right">
          <div className="flex justify-end">
            <div className="w-1/2">
              <div className="flex justify-between"><span className="mr-4">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="mr-4">Shipping</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setShipping(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="mr-4">Estimated Tax</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setEstimatedTax(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${estimatedTax.toFixed(2)}</span></div>
              <div className="border-t border-gray-400 my-2"></div>
              <div className="flex justify-between font-bold text-lg"><span className="mr-4">Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t-2 border-gray-300">
          <p contentEditable suppressContentEditableWarning>
            Your order will be shipped to: Mariabelen Rojas, 230 SW 134th Ave, Miami, FL 33184
          </p>
        </div>
      </div>
      <div className="text-center mt-4 mb-8">
        <button onClick={handleDownloadPdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-print">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default AppleReceipt;