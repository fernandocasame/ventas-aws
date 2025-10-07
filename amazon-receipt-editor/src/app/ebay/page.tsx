"use client";
import React, { useState, useRef, useMemo } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Item {
  id: number;
  quantity: number;
  name: string;
  shippingService: string;
  price: number;
}

interface OrderGroup {
  id: number;
  sellerName: string;
  orderNumber: string;
  items: Item[];
}

const EbayReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [orderGroups, setOrderGroups] = useState<OrderGroup[]>([
    {
      id: 1,
      sellerName: 'wholesalepartsstore',
      orderNumber: '18-09125-95029',
      items: [
        { id: 1, quantity: 1, name: 'Melling Camshaft fits Jeep Grand Cherokee 1993-1995 4.0L 6 Cyl VIN: S OHV 56RKWY (402408294719)', shippingService: 'Economy Shipping', price: 135.92 },
      ],
    },
    {
      id: 2,
      sellerName: 'panthersales',
      orderNumber: '18-09125-95028',
      items: [
        { id: 1, quantity: 1, name: 'Fits AMC Jeep 4.0 4.2 Cam Bolt with Spring prevents cam walk (254556279540)', shippingService: 'USPS First Class', price: 24.96 },
      ],
    },
    {
        id: 3,
        sellerName: 'autogadgets2015',
        orderNumber: '18-09125-95027',
        items: [
            { id: 1, quantity: 1, name: '6Pcs Spark Plug Wire Set For 97-03 Mitsubishi Montero Sport 3.0L-V6 NEW (164153567866)', shippingService: 'DGM SmartMail Expedited', price: 23.95 },
        ],
    },
    {
        id: 4,
        sellerName: 'sixityauto',
        orderNumber: '18-09125-95026',
        items: [
            { id: 1, quantity: 1, name: '6 pcs NGK V-Power Spark Plugs for 1994-2002 Mitsubishi Montero 3.5L V6 - xu (292018847352)', shippingService: 'Standard Shipping', price: 17.54 },
        ],
    },
  ]);

  const [shipping, setShipping] = useState(6.00);
  const [tax, setTax] = useState(19.51);

  const totals = useMemo(() => {
    const totalItems = orderGroups.reduce((acc, group) => acc + group.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0), 0);
    const subtotal = orderGroups.reduce((acc, group) => acc + group.items.reduce((itemAcc, item) => itemAcc + item.price * item.quantity, 0), 0);
    const orderTotal = subtotal + shipping + tax;
    return { totalItems, subtotal, orderTotal };
  }, [orderGroups, shipping, tax]);

  const handleGroupChange = (id: number, field: keyof OrderGroup, value: string) => {
    setOrderGroups(
      orderGroups.map((group) =>
        group.id === id ? { ...group, [field]: value } : group
      )
    );
  };

  const handleItemChange = (groupId: number, itemId: number, field: keyof Item, value: string | number) => {
    setOrderGroups(
      orderGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              items: group.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : group
      )
    );
  };

  const handleAddGroup = () => {
    const newGroup: OrderGroup = {
      id: Date.now(),
      sellerName: 'New Seller',
      orderNumber: '00-00000-00000',
      items: [],
    };
    setOrderGroups([...orderGroups, newGroup]);
  };

  const handleRemoveGroup = (id: number) => {
    setOrderGroups(orderGroups.filter((group) => group.id !== id));
  };

  const handleAddItem = (groupId: number) => {
    const newItem: Item = {
      id: Date.now(),
      quantity: 1,
      name: 'New Item - Click to Edit',
      shippingService: 'Standard Shipping',
      price: 0.0,
    };
    setOrderGroups(
      orderGroups.map((group) =>
        group.id === groupId ? { ...group, items: [...group.items, newItem] } : group
      )
    );
  };

  const handleRemoveItem = (groupId: number, itemId: number) => {
    setOrderGroups(
      orderGroups.map((group) =>
        group.id === groupId
          ? { ...group, items: group.items.filter((item) => item.id !== itemId) }
          : group
      )
    );
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
        pdf.save('ebay-receipt.pdf');
      });
    }
  };

  return (
    <div>
      <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto font-sans text-gray-800">
        <header className="flex justify-between items-center mb-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" alt="eBay Logo" className="w-24" />
        </header>

        <section className="grid grid-cols-3 gap-8 mb-8">
          {/* ... Order Information and Shipping Address ... */}
          <div>
            <h2 className="font-bold text-lg mb-2">Order information</h2>
            <div className="text-sm">
                <p contentEditable suppressContentEditableWarning><span className="font-semibold">Buyer</span> patovan7472011</p>
                <p contentEditable suppressContentEditableWarning><span className="font-semibold">Placed on</span> Sep 21, 2022</p>
                <p contentEditable suppressContentEditableWarning><span className="font-semibold">Payment method</span> PayPal</p>
                <p contentEditable suppressContentEditableWarning><span className="font-semibold">Paid on</span> Sep 21, 2022</p>
            </div>
            </div>
            <div>
            <h2 className="font-bold text-lg mb-2">Shipping address</h2>
            <div className="text-sm">
                <p contentEditable suppressContentEditableWarning>Patricio Pazmino</p>
                <p contentEditable suppressContentEditableWarning>2826 NW 72nd Ave, # SERV45096</p>
                <p contentEditable suppressContentEditableWarning>miami, Florida 33122-1310</p>
                <p contentEditable suppressContentEditableWarning>United States</p>
            </div>
            </div>
          <div>
            <h2 className="font-bold text-lg mb-2">Order total</h2>
            <div className="text-sm">
              <div className="flex justify-between"><span>{totals.totalItems} items</span><span>${totals.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setShipping(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between border-b border-gray-300 pb-1"><span>Tax</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setTax(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold pt-1"><span>Order total</span><span>${totals.orderTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </section>

        <div className="space-y-4">
          {orderGroups.map((group) => (
            <div key={group.id} className="border-t border-gray-200 pt-4 relative group">
              <h2 contentEditable suppressContentEditableWarning onBlur={(e) => handleGroupChange(group.id, 'sellerName', e.currentTarget.innerText.replace('Items bought from ',''))} className="font-bold text-xl mb-1">Items bought from {group.sellerName}</h2>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => handleGroupChange(group.id, 'orderNumber', e.currentTarget.innerText.replace('Order number: ',''))} className="text-sm text-gray-600 mb-4">Order number: {group.orderNumber}</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="font-normal w-1/12 pb-2">Quantity</th>
                    <th className="font-normal w-6/12 pb-2">Item name</th>
                    <th className="font-normal w-3/12 pb-2">Shipping service</th>
                    <th className="font-normal w-2/12 pb-2 text-right">Item price</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map(item => (
                    <tr key={item.id} className="border-t border-gray-200 relative item-row">
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(group.id, item.id, 'quantity', parseInt(e.currentTarget.innerText) || 0)} className="pt-2">{item.quantity}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(group.id, item.id, 'name', e.currentTarget.innerText)} className="pt-2">{item.name}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(group.id, item.id, 'shippingService', e.currentTarget.innerText)} className="pt-2">{item.shippingService}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(group.id, item.id, 'price', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)} className="pt-2 text-right">${item.price.toFixed(2)}</td>
                       <button onClick={() => handleRemoveItem(group.id, item.id)} className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 item-remove-btn">X</button>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => handleAddItem(group.id)} className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">Add Item</button>
              <button onClick={() => handleRemoveGroup(group.id)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">X</button>
            </div>
          ))}
          <button onClick={handleAddGroup} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Seller Section</button>
        </div>
      </div>
      <div className="text-center my-8">
        <button onClick={handleDownloadPdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download as PDF
        </button>
      </div>
       <style jsx>{`
        .item-row:hover .item-remove-btn {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default EbayReceipt;