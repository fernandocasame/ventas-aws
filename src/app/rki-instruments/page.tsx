"use client";
import React, { useState, useRef, useMemo } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Item {
  id: number;
  quantityOrdered: number;
  quantityShipped: number;
  quantityBackOrdered: string;
  itemCodeAndDesc: string;
  unitPrice: number;
}

const RKIInstrumentsInvoice = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    { id: 1, quantityOrdered: 2, quantityShipped: 2, quantityBackOrdered: '0 Each', itemCodeAndDesc: '65-2645RK-05 M2A sensor/transmitter w/j-box, 0 - 100 ppm H2S, CSA version\nSerial Numbers: M2A4Z228 [M2A4Z266]', unitPrice: 1085.50 },
    { id: 2, quantityOrdered: 3, quantityShipped: 3, quantityBackOrdered: '0 Each', itemCodeAndDesc: '57-1280RK-03 Terminale/relay board,potted, H2S,M2A Transmitter\n***57-128RK-103 IS OBSOLETE,USE 57-128RK-03***', unitPrice: 286.00 },
    { id: 3, quantityOrdered: 2, quantityShipped: 2, quantityBackOrdered: '0 Each', itemCodeAndDesc: '57-1281RK-01 Terminale/relay board,potted, LEL,M2A Transmitter\n***57-1281RK-101 IS OBS,USE 57-128RK-01***', unitPrice: 286.00 },
    { id: 4, quantityOrdered: 2, quantityShipped: 2, quantityBackOrdered: '0 Each', itemCodeAndDesc: '61-0140RK-05 Sensor, LEL, 1/2 NPT,NC -6241,CSA classified', unitPrice: 208.00 },
  ]);

  const [shippingHandling, setShippingHandling] = useState(150.00);
  const [credits, setCredits] = useState(4167.00);

  const subTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.unitPrice * item.quantityShipped, 0);
  }, [items]);

  const totalAmountDue = useMemo(() => {
    return subTotal + shippingHandling - credits;
  }, [subTotal, shippingHandling, credits]);

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now(),
      quantityOrdered: 1,
      quantityShipped: 1,
      quantityBackOrdered: '0 Each',
      itemCodeAndDesc: 'New Item',
      unitPrice: 0,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div>
      <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto font-sans text-xs text-gray-800 border">
        <header className="grid grid-cols-2 gap-4 mb-4 border-b pb-4">
          <div>
            <p contentEditable suppressContentEditableWarning className="font-bold">Remit to address</p>
            <h1 contentEditable suppressContentEditableWarning className="font-bold text-lg">RKI Instruments, Inc.</h1>
            <p contentEditable suppressContentEditableWarning>33248 Central Avenue</p>
            <p contentEditable suppressContentEditableWarning>Union City CA 94587</p>
            <p contentEditable suppressContentEditableWarning>Phone: 510-441-5656, Fax: 510-441-5655</p>
          </div>
          <div className="text-right">
            <p contentEditable suppressContentEditableWarning>Invoice # <span className="font-bold">526402</span></p>
            <p contentEditable suppressContentEditableWarning>Invoice Date <span className="font-bold">December 30, 2024</span></p>
            <p contentEditable suppressContentEditableWarning>Order # <span className="font-bold">1169169</span></p>
            <p contentEditable suppressContentEditableWarning>Due Date <span className="font-bold">12/30/2024</span></p>
            <p contentEditable suppressContentEditableWarning>Packing List # <span className="font-bold">440128</span></p>
          </div>
        </header>

        <h2 className="text-center text-2xl font-bold mb-4">INVOICE</h2>

        <main>
          <div className="grid grid-cols-2 gap-4 mb-4 border-b pb-4">
            <div>
              <p className="font-bold">Sold to: <span contentEditable suppressContentEditableWarning className="font-normal">Customer Code 9235</span></p>
              <p contentEditable suppressContentEditableWarning>Daya Vi Roberth Ortiz</p>
              <p contentEditable suppressContentEditableWarning>Angel de Ugarte N 13-08 y Antonio Cabrera</p>
              <p contentEditable suppressContentEditableWarning>#593994497269</p>
              <p contentEditable suppressContentEditableWarning>Francisco de Orellana, Orellana ECUADOR</p>
              <p contentEditable suppressContentEditableWarning>Fax # EMAIL</p>
            </div>
            <div>
              <p className="font-bold">Ship to</p>
              <p contentEditable suppressContentEditableWarning>Daya Vi Roberth Ortiz</p>
              <p contentEditable suppressContentEditableWarning>6306 NW 99 TH Av.</p>
              <p contentEditable suppressContentEditableWarning>Phone Number: 786-368-9111</p>
              <p contentEditable suppressContentEditableWarning>Miami, FL 33178 USA</p>
              <p contentEditable suppressContentEditableWarning>Attn: REF# VI2729</p>
              <p contentEditable suppressContentEditableWarning>Tracking # 1Z874E280359579427</p>
            </div>
          </div>
          <div className="border-b pb-4 mb-4">
            <p className="font-bold">Send Invoice To</p>
            <p contentEditable suppressContentEditableWarning>A/P Contact ** by eMail</p>
          </div>
          <table className="w-full text-center mb-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-1 px-2 font-bold">Date Shipped</th>
                <th className="py-1 px-2 font-bold">Ship Via</th>
                <th className="py-1 px-2 font-bold">Shipping Terms</th>
                <th className="py-1 px-2 font-bold">Customer P.O. #</th>
                <th className="py-1 px-2 font-bold">Payment Terms</th>
                <th className="py-1 px-2 font-bold">Sales Rep</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td contentEditable suppressContentEditableWarning className="py-1 px-2">12/30/2024</td>
                <td contentEditable suppressContentEditableWarning className="py-1 px-2">Ground</td>
                <td contentEditable suppressContentEditableWarning className="py-1 px-2">FOB</td>
                <td contentEditable suppressContentEditableWarning className="py-1 px-2">EMAIL 12/13/14</td>
                <td contentEditable suppressContentEditableWarning className="py-1 px-2">Payment in Advance</td>
                <td contentEditable suppressContentEditableWarning className="py-1 px-2">International</td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="border-2 border-black">
                <th className="p-1 text-center font-bold">Quantity Ordered</th>
                <th className="p-1 text-center font-bold">Quantity This Shipment</th>
                <th className="p-1 text-center font-bold">Quantity Back Ordered Unit</th>
                <th className="p-1 text-center font-bold">Item Code & Description</th>
                <th className="p-1 text-center font-bold">Unit Price</th>
                <th className="p-1 text-center font-bold">Extension</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="group">
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'quantityOrdered', parseInt(e.currentTarget.innerText) || 0)} className="p-1 text-center">{item.quantityOrdered}</td>
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'quantityShipped', parseInt(e.currentTarget.innerText) || 0)} className="p-1 text-center">{item.quantityShipped}</td>
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'quantityBackOrdered', e.currentTarget.innerText)} className="p-1 text-center">{item.quantityBackOrdered}</td>
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'itemCodeAndDesc', e.currentTarget.innerText)} className="p-1 text-left whitespace-pre-line">{item.itemCodeAndDesc}</td>
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.currentTarget.innerText.replace(/,/g, '')) || 0)} className="p-1 text-right">{item.unitPrice.toFixed(2)}</td>
                  <td className="p-1 text-right">{ (item.unitPrice * item.quantityShipped).toFixed(2) }</td>
                  <td className="p-1 text-right"><button onClick={() => handleRemoveItem(item.id)} className="ml-2 text-red-500 opacity-0 group-hover:opacity-100">X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddItem} className="bg-green-500 no-print hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs mb-4">Add Item</button>
          <div className="flex justify-end">
            <div className="w-1/3 mt-4">
              <div className="flex justify-between border-t-2 border-black pt-1"><span className="font-bold">Sub-Total</span><span>{subTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span contentEditable suppressContentEditableWarning>Shipping & Handling</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setShippingHandling(parseFloat(e.currentTarget.innerText) || 0)}>{shippingHandling.toFixed(2)}</span></div>
              <div className="flex justify-between"><span contentEditable suppressContentEditableWarning>Other State Tax</span><span></span></div>
              <div className="flex justify-between"><span contentEditable suppressContentEditableWarning>CA Tax</span><span></span></div>
              <div className="flex justify-between"><span contentEditable suppressContentEditableWarning>Credits</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setCredits(parseFloat(e.currentTarget.innerText) || 0)}>{credits.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-black mt-1 pt-1"><span className="font-bold">Total Amount Due US$</span><span className="font-bold">{totalAmountDue.toFixed(2)}</span></div>
            </div>
          </div>
        </main>
      </div>
      <div className="text-center my-8">
        <button onClick={handleDownloadPdf} className="bg-blue-500 no-print hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default RKIInstrumentsInvoice;