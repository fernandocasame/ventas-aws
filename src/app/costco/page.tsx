"use client";
import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Item {
  id: number;
  description: string;
  itemNumber: string;
  price: number;
  quantity: number;
  status: string;
  totalPrice: number;
}

const CostcoReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      description: 'Orgain Organic Protein and Superfoods Plant Based Protein Powder, Vanilla Bean, 2.7 lbs',
      itemNumber: '1195611',
      price: 33.99,
      quantity: 2,
      status: 'Cancelled',
      totalPrice: 0.00,
    },
  ]);

  const [shipping, setShipping] = useState(0.00);
  const [tax, setTax] = useState(0.00);

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const orderTotal = subtotal + shipping + tax;

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
      itemNumber: '000000',
      price: 0.0,
      quantity: 1,
      status: 'Ordered',
      totalPrice: 0.0,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleDownloadPdf = () => {
    const input = receiptRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('costco-receipt.pdf');
      });
    }
  };

  return (
    <div>
      <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto font-sans">
        {/* ... Header and other static sections ... */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Costco_old_logo.svg" alt="Costco Logo" className="w-48" />
          </div>
          <div className="text-right">
            <p>Orders & Purchases</p>
            <p className="text-sm text-gray-500">10/6/25, 11:13 PM</p>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p><span className="font-bold">Order Number</span></p>
              <p contentEditable suppressContentEditableWarning>1190550619</p>
              <p className="mt-4"><span className="font-bold">Order Date</span></p>
              <p contentEditable suppressContentEditableWarning>04/19/2025</p>
              <p className="mt-4"><span className="font-bold">Membership Number</span></p>
              <p contentEditable suppressContentEditableWarning>111936601210</p>
            </div>
            <div>
              <p><span className="font-bold">Payment Method</span></p>
              <p contentEditable suppressContentEditableWarning>Mastercard ending in 4913</p>
              <p className="mt-4"><span className="font-bold">Shipping Address</span></p>
              <p contentEditable suppressContentEditableWarning>Mariabelen Rojas</p>
              <p contentEditable suppressContentEditableWarning>230 SW 134TH AVE</p>
              <p contentEditable suppressContentEditableWarning>MIAMI, FL 33184-1122</p>
              <p contentEditable suppressContentEditableWarning>7863485508</p>
            </div>
            <div>
              <p><span className="font-bold">Billing Address</span></p>
              <p contentEditable suppressContentEditableWarning>Waldrick Price</p>
              <p contentEditable suppressContentEditableWarning>15369 SW 40TH TER</p>
              <p contentEditable suppressContentEditableWarning>MIAMI, FL 33185</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-center py-2">Quantity</th>
                <th className="text-center py-2">Status</th>
                <th className="text-right py-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b relative group">
                  <td className="py-4">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleItemChange(item.id, 'description', e.currentTarget.innerText)}
                      className="font-semibold"
                    >
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Item #<span contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'itemNumber', e.currentTarget.innerText)}>{item.itemNumber}</span>
                    </p>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleItemChange(item.id, 'price', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}
                      className="text-sm"
                    >
                      ${item.price.toFixed(2)}
                    </p>
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(item.id, 'quantity', parseInt(e.currentTarget.innerText) || 0)}
                    className="text-center"
                  >
                    {item.quantity}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(item.id, 'status', e.currentTarget.innerText)}
                    className="text-center"
                  >
                    {item.status}
                  </td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(item.id, 'totalPrice', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}
                    className="text-right"
                  >
                    ${item.totalPrice.toFixed(2)}
                  </td>
                  <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                X
              </button>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddItem} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">
            Add Item
          </button>
        </div>

        <div className="mt-8 flex justify-end">
          <div className="w-1/3">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between">
              <p>Subtotal ({items.length} Items)</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Shipping</p>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => setShipping(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Tax</p>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => setTax(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${tax.toFixed(2)}</p>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg">
              <p>Order Total</p>
              <p>${orderTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 mb-8">
        <button onClick={handleDownloadPdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default CostcoReceipt;