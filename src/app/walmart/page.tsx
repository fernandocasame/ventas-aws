"use client";
import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Item {
  id: number;
  quantity: number;
  description: string;
  price: number;
  arrivesBy: string;
  soldBy: string;
}

const WalmartReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      quantity: 1,
      description: 'Custom Birthday Shirt, Personalized Birthday Shirt, Birthday Girl Shirt, Birthday Boy Shirt',
      price: 24.99,
      arrivesBy: 'Fri, Oct 17',
      soldBy: 'PRINT_ON_DEMAND',
    },
  ]);

  const [shipping, setShipping] = useState(0.00);
  const [taxes, setTaxes] = useState(2.36);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shipping + taxes;

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
      quantity: 1,
      description: 'New Item - Click to Edit',
      price: 0.0,
      arrivesBy: 'Date',
      soldBy: 'Vendor',
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
        <div className="text-center mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Walmart_logo_(2025).svg" alt="Walmart Logo" className="w-48 mx-auto" />
        </div>

        <div className="text-center my-6">
          <h1 className="text-xl font-bold">Purchase Details</h1>
          <p contentEditable suppressContentEditableWarning className="text-sm">Order date: Oct 12, 2025</p>
          <p contentEditable suppressContentEditableWarning className="text-sm">Order #: 4782231-303008</p>
        </div>

        <div className="border-t border-b border-gray-300 py-2">
          {items.map(item => (
            <div key={item.id} className="py-4 border-b relative group">
              <div className="flex justify-between">
                <div className="w-3/4">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(item.id, 'description', e.currentTarget.innerText)}
                    className="font-bold"
                  >
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    Arrives by <span contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'arrivesBy', e.currentTarget.innerText)}>{item.arrivesBy}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Sold by <span contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'soldBy', e.currentTarget.innerText)}>{item.soldBy}</span>
                  </p>
                </div>
                <div className="w-1/4 text-right">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(item.id, 'price', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}
                    className="font-bold"
                  >
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm">Qty: <span contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'quantity', parseInt(e.currentTarget.innerText) || 1)}>{item.quantity}</span></p>
                </div>
                <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                X
              </button>
              </div>
            </div>
          ))}
           <button onClick={handleAddItem} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm no-print">
            Add Item
          </button>
        </div>

        <div className="mt-6 flex">
          <div className="w-1/2">
            <h2 className="font-bold">Ship to</h2>
            <p contentEditable suppressContentEditableWarning>Mariabelen Rojas</p>
            <p contentEditable suppressContentEditableWarning>230 SW 134th Ave</p>
            <p contentEditable suppressContentEditableWarning>Miami, FL 33184</p>
          </div>
          <div className="w-1/2 text-right">
            <div className="flex justify-between"><span className="mr-4">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="mr-4">Shipping</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setShipping(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${shipping.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="mr-4">Taxes</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setTaxes(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${taxes.toFixed(2)}</span></div>
            <div className="border-t border-gray-400 my-2"></div>
            <div className="flex justify-between font-bold text-lg"><span className="mr-4">Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t-2 border-gray-300">
          <div className="font-bold">Payment method</div>
          <div className="flex justify-between">
            <p contentEditable suppressContentEditableWarning>Visa ending in 4022</p>
            <p>${total.toFixed(2)}</p>
          </div>
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

export default WalmartReceipt;