"use client";
import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Item {
  id: number;
  quantity: number;
  description: string;
  price: number;
}

const TargetReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      quantity: 1,
      description: '92033161 - Pokémon Mega-Charizard 6" Action Figure (Target Exclusive)',
      price: 19.99,
    },
  ]);

  const [targetCircleCardDiscount, setTargetCircleCardDiscount] = useState(-1.00);
  const [salesTax, setSalesTax] = useState(1.33);

  const itemSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const subtotalAfterDiscount = itemSubtotal + targetCircleCardDiscount;
  const itemTotal = subtotalAfterDiscount + salesTax;
  const invoiceTotal = itemTotal;

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
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg" alt="Target Logo" className="w-32 mx-auto" />
        </div>

        <div className="my-6">
          <h1 className="text-2xl font-bold">Invoice 1 of 1</h1>
          <div className="mt-4">
            <h2 className="font-bold">Ship to</h2>
            <p contentEditable suppressContentEditableWarning>Mariabelen Rojas</p>
            <p contentEditable suppressContentEditableWarning>230 SW 134th Ave</p>
            <p contentEditable suppressContentEditableWarning>Miami, FL 33184</p>
          </div>
          <div className="mt-4">
            <p><span className="font-bold">Invoice date:</span> <span contentEditable suppressContentEditableWarning>Sat, May 17, 2025</span></p>
            <p><span className="font-bold">Invoice number:</span> <span contentEditable suppressContentEditableWarning>51373991033506785</span></p>
          </div>
        </div>

        <div className="border-t border-b border-gray-300 py-2">
          <div className="flex font-bold">
            <div className="w-3/5">Item</div>
            <div className="w-1/5 text-center">Qty.</div>
            <div className="w-1/5 text-right">Unit price</div>
            <div className="w-1/5 text-right">Amount</div>
          </div>
          {items.map(item => (
            <div key={item.id} className="flex border-b py-2 relative group">
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleItemChange(item.id, 'description', e.currentTarget.innerText)}
                className="w-3/5"
              >
                {item.description}
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleItemChange(item.id, 'quantity', parseInt(e.currentTarget.innerText) || 0)}
                className="w-1/5 text-center"
              >
                {item.quantity}
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleItemChange(item.id, 'price', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}
                className="w-1/5 text-right"
              >
                ${item.price.toFixed(2)}
              </div>
              <div className="w-1/5 text-right">${(item.quantity * item.price).toFixed(2)}</div>
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

        <div className="mt-4 flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between text-red-600">
              <span>Target Circle Card 5%</span>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => setTargetCircleCardDiscount(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>
                -${(-targetCircleCardDiscount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Item subtotal</span>
              <span>${subtotalAfterDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Sales tax</span>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => setSalesTax(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>
                ${salesTax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
              <span>Item total</span>
              <span>${itemTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t-2 border-gray-300 text-right">
          <div className="text-xl font-bold">Invoice total ${invoiceTotal.toFixed(2)}</div>
          <div className="mt-2">
            <span className="font-bold">Target Mastercard*4573</span>
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

export default TargetReceipt;