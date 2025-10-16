"use client";
import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Item {
  id: number;
  quantity: number;
  description: string;
  soldBy: string;
  condition: string;
  price: number;
}

const AmazonReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      quantity: 1,
      description: 'Purina Friskies Natural Cat Treats, Party Mix Natural Yums With Wild Caught Tuna and Added Vitamins, Minerals and Nutrients - 20 oz. Canister',
      soldBy: 'Amazon.com',
      condition: 'New',
      price: 8.49,
    },
    {
      id: 2,
      quantity: 1,
      description: 'Purina Friskies Made in USA Facilities, Natural Cat Treats, Party Mix Natural Yums Catnip Flavor - 20 oz. Canister',
      soldBy: 'Amazon.com',
      condition: 'New',
      price: 8.48,
    },
    {
      id: 3,
      quantity: 1,
      description: 'Purina Friskies Natural Cat Treats Party Mix Natural Yums With Real Salmon and Added Vitamins, Minerals and Nutrients - 20 Oz. Canister',
      soldBy: 'Amazon.com',
      condition: 'New',
      price: 8.48,
    },
  ]);

  const [shippingHandling, setShippingHandling] = useState(2.99);
  const [freeShipping, setFreeShipping] = useState(-2.99);
  const [salesTax, setSalesTax] = useState(0.00);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalBeforeTax = subtotal + shippingHandling + freeShipping;
  const totalForShipment = totalBeforeTax + salesTax;
  const grandTotal = totalForShipment;

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
      soldBy: 'Amazon.com',
      condition: 'New',
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" className="w-32 mx-auto" />
        </div>

        <div className="text-center my-6">
          <h1 contentEditable suppressContentEditableWarning className="text-xl font-semibold text-orange-600">Final Details for Order #112-8329345-8639432</h1>
          <p contentEditable suppressContentEditableWarning className="text-sm">Order Placed: September 29, 2025</p>
          <p contentEditable suppressContentEditableWarning className="text-sm">Amazon.com order number: 112-8329345-8639432</p>
          <p className="text-lg font-bold">Order Total: ${grandTotal.toFixed(2)}</p>
        </div>

        <div className="border-t-2 border-b-2 border-gray-300 py-4">
          <h2 contentEditable suppressContentEditableWarning className="text-lg font-bold mb-2">Shipped on September 29, 2025</h2>
          <h3 className="font-bold mb-2">Items Ordered</h3>

          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start mb-4 relative group">
              <div className="w-3/4">
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(item.id, 'description', e.currentTarget.innerText)}
                  className="text-sm"
                >
                  {item.quantity} of: {item.description}
                </p>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(item.id, 'soldBy', e.currentTarget.innerText)}
                  className="text-xs text-gray-600"
                >
                  Sold by: {item.soldBy}
                </p>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(item.id, 'condition', e.currentTarget.innerText)}
                  className="text-xs text-gray-600"
                >
                  Condition: {item.condition}
                </p>
              </div>
              <div className="w-1/4 text-right">
                <p className="font-bold">Price</p>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(item.id, 'price', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}
                  className="text-sm"
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

        <div className="flex justify-between mt-4">
          {/* ... Shipping Address ... */}
          <div>
            <h3 className="font-bold">Shipping Address:</h3>
            <p contentEditable suppressContentEditableWarning className="text-sm">JUAN PEREZ</p>
            <p contentEditable suppressContentEditableWarning className="text-sm">12345 NW 67 AVE</p>
            <p contentEditable suppressContentEditableWarning className="text-sm">Miami, FL 33177</p>
            <p contentEditable suppressContentEditableWarning className="text-sm">United States</p>

            <h3 className="font-bold mt-4">Shipping Speed:</h3>
            <p contentEditable suppressContentEditableWarning className="text-sm">Rush Shipping</p>
          </div>
          <div className="text-right">
            <div className="flex justify-between"><span className="mr-4">Item(s) Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="mr-4">Shipping & Handling:</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setShippingHandling(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${shippingHandling.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="mr-4">Free Shipping:</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setFreeShipping(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${freeShipping.toFixed(2)}</span></div>
            <div className="border-t border-gray-400 my-1"></div>
            <div className="flex justify-between"><span className="mr-4">Total before tax:</span><span>${totalBeforeTax.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="mr-4">Sales Tax:</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setSalesTax(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${salesTax.toFixed(2)}</span></div>
            <div className="border-t border-gray-400 my-1"></div>
            <div className="flex justify-between font-bold"><span className="mr-4">Total for this Shipment:</span><span>${totalForShipment.toFixed(2)}</span></div>
          </div>
        </div>

        {/* ... Payment Information ... */}
        <div className="border-t-2 border-b-2 border-gray-300 py-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Payment information</h2>
          <div className="flex justify-between">
              <div>
                  <h3 className="font-bold">Payment Method:</h3>
                  <p contentEditable suppressContentEditableWarning className="text-sm">American Express | Last digits: 1006</p>
                  <h3 className="font-bold mt-2">Billing address</h3>
                  <p contentEditable suppressContentEditableWarning className="text-sm">JUAN PEREZ</p>
                  <p contentEditable suppressContentEditableWarning className="text-sm">12345 NW 67 AVE</p>
                  <p contentEditable suppressContentEditableWarning className="text-sm">Miami, FL 33177</p>
                  <p contentEditable suppressContentEditableWarning className="text-sm">United States</p>
              </div>
              <div className="text-right">
                  <div className="flex justify-between"><span className="mr-4">Item(s) Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="mr-4">Shipping & Handling:</span><span>${shippingHandling.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="mr-4">Promotion applied:</span><span>${freeShipping.toFixed(2)}</span></div>
                  <div className="border-t border-gray-400 my-1"></div>
                  <div className="flex justify-between"><span className="mr-4">Total before tax:</span><span>${totalBeforeTax.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="mr-4">Estimated Tax:</span><span>${salesTax.toFixed(2)}</span></div>
                  <div className="border-t-2 border-gray-600 my-1"></div>
                  <div className="flex justify-between font-bold text-red-700"><span className="mr-4">Grand Total:</span><span>${grandTotal.toFixed(2)}</span></div>
              </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-300 py-2 mt-2">
          <p contentEditable suppressContentEditableWarning className="text-sm">Credit Card transactions American Express ending in 1006: September 30, 2025: ${grandTotal.toFixed(2)}</p>
        </div>

        <div className="text-center mt-6 text-sm text-blue-600">
          <p>To view the status of your order, return to <a href="#" className="underline">Order Summary</a>.</p>
        </div>

        <div className="text-center mt-4 text-xs text-gray-600">
          <p><a href="#" className="underline">Conditions of Use</a> | <a href="#" className="underline">Privacy Notice</a> © 1996-2020, Amazon.com, Inc.</p>
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

export default AmazonReceipt;