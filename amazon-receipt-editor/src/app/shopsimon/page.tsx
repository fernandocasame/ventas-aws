"use client";
import React, { useState, useRef, useMemo } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Item {
  id: number;
  name: string;
  details: string;
  price: number;
  size: string;
  quantity: number;
  status: string;
  imageUrl: string;
}

const ShopSimonReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Men's Adidas Entrada", details: '22 Jersey - Large / White', price: 7.00, size: 'Large / White', quantity: 1, status: 'Shipped', imageUrl: 'https://via.placeholder.com/80' },
    { id: 2, name: "Women's Adidas Team Base Tee - Large / Team Light Grey", details: 'Large / Team Light Grey', price: 7.00, size: 'Large / Team Light Grey', quantity: 1, status: 'Shipped', imageUrl: 'https://via.placeholder.com/80' },
    { id: 3, name: "Women's Adidas Entrada 22 Jersey - Medium / Team Grey Four", details: 'Medium / Team Grey Four', price: 5.00, size: 'Medium / Team Grey Four', quantity: 1, status: 'Shipped', imageUrl: 'https://via.placeholder.com/80' },
    { id: 4, name: "Men's Adidas Hoops 4.0 Sneaker - US 6 - White / White / Cloud White / Core Black", details: 'US / Cloud White / Cloud 6 - White / Core Black', price: 21.00, size: '6', quantity: 1, status: 'Shipped', imageUrl: 'https://via.placeholder.com/80' },
  ]);

  const [shipping, setShipping] = useState(0.00);
  const [tax, setTax] = useState(2.80);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const total = useMemo(() => {
    return subtotal + shipping + tax;
  }, [subtotal, shipping, tax]);

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now(),
      name: 'New Item',
      details: 'Details',
      price: 0,
      size: 'Size',
      quantity: 1,
      status: 'Shipped',
      imageUrl: 'https://via.placeholder.com/80',
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleDownloadPdf = () => {
    const input = receiptRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('shopsimon-receipt.pdf');
      });
    }
  };

  return (
    <div>
        <div ref={receiptRef} className="bg-white p-4 sm:p-8 max-w-5xl mx-auto font-sans text-sm text-gray-800">
        <header className="border-b pb-2 mb-2">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
            <div className="flex space-x-4">
                <span contentEditable suppressContentEditableWarning>SHOPSIMON.COM</span>
                <span contentEditable suppressContentEditableWarning>MALLS</span>
                <span contentEditable suppressContentEditableWarning>PREMIUM OUTLETS®</span>
            </div>
            <div>
                <span contentEditable suppressContentEditableWarning>Order SPO415998138 | ShopSimon</span>
            </div>
            </div>
            <div className="bg-black text-white text-center py-1 text-xs">
            <span contentEditable suppressContentEditableWarning>ADIDAS | EXTRA 40% OFF</span>
            </div>
        </header>

        <div className="flex justify-between items-center py-4 border-b">
            {/* Static header content */}
        </div>

        <nav className="flex justify-center space-x-8 py-4 text-sm font-medium">
            {/* Static nav content */}
        </nav>

        <main className="flex">
            <aside className="w-1/4 pr-8 space-y-4 text-sm">
            <h2 contentEditable suppressContentEditableWarning className="font-bold">Hi EDWARD</h2>
            <p contentEditable suppressContentEditableWarning>Sign Out</p>
            <div className="space-y-2">
                <p contentEditable suppressContentEditableWarning>Profile</p>
                <p className="font-bold">Orders</p>
                <p contentEditable suppressContentEditableWarning>Addresses</p>
                <p contentEditable suppressContentEditableWarning>Simon+</p>
                <p contentEditable suppressContentEditableWarning>Centers</p>
                <p contentEditable suppressContentEditableWarning>Favorites</p>
                <p contentEditable suppressContentEditableWarning>Style Quiz</p>
                <p contentEditable suppressContentEditableWarning>Influencer Program</p>
                <p contentEditable suppressContentEditableWarning>Notifications</p>
                <p contentEditable suppressContentEditableWarning>Password</p>
            </div>
            </aside>

            <section className="w-3/4">
            <div className="flex justify-between items-center mb-6">
                <div>
                <a href="#" className="flex items-center space-x-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg><span>Back</span></a>
                <h1 contentEditable suppressContentEditableWarning className="text-2xl font-bold mt-2">SPO415998138</h1>
                </div>
                <p contentEditable suppressContentEditableWarning className="text-sm text-gray-500">Date Ordered: Oct 06, 2025</p>
            </div>

            <div className="space-y-4">
                {items.map(item => (
                <div key={item.id} className="flex items-start space-x-4 border-t pt-4 relative group">
                    <div className="w-1/4">
                    <p contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'status', e.currentTarget.innerText)} className="font-bold">{item.status}</p>
                    <p className="text-xs text-gray-500 mt-2">TRACK</p>
                    </div>
                    <div className="w-3/4 flex items-start space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover" />
                    <div className="flex-grow">
                        <p contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'name', e.currentTarget.innerText)} className="font-bold">{item.name}</p>
                        <p contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'details', e.currentTarget.innerText)}>{item.details}</p>
                        <p contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'price', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)} className="text-red-600 font-bold">${item.price.toFixed(2)}</p>
                        <p contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'size', e.currentTarget.innerText)} className="text-xs text-gray-500">{item.size}</p>
                        <p className="text-xs text-gray-500">Qty: <span contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'quantity', parseInt(e.currentTarget.innerText) || 0)}>{item.quantity}</span></p>
                    </div>
                    <div className="text-right">
                        <p contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'status', e.currentTarget.innerText)} className="font-bold">{item.status}</p>
                        <button className="mt-1 text-xs border border-black px-4 py-1 rounded-full">TRACK</button>
                    </div>
                    </div>
                    <button onClick={() => handleRemoveItem(item.id)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">X</button>
                </div>
                ))}
            </div>
            <button onClick={handleAddItem} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">Add Item</button>

            <div className="border-t pt-4 mt-6 text-sm">
                <div className="flex justify-end">
                <div className="w-1/3">
                    <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setShipping(parseFloat(e.currentTarget.innerText.split('$')[1]) || 0)}>FREE: 2 to 5 Days - ${shipping.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Tax</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setTax(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${tax.toFixed(2)}</span></div>
                </div>
                </div>
            </div>
            <p contentEditable suppressContentEditableWarning className="text-xs text-gray-500 mt-2">https://shop.simon.com/account/orders/fb2cc388ed7a8a8d7ffdf2085ae7d01</p>
            </section>
        </main>

        <footer className="border-t mt-8 pt-4">
            <div className="flex justify-between items-center mb-4">
            <div className="text-xs text-gray-500"><span contentEditable suppressContentEditableWarning>20/10/25, 7:20 p.m.</span></div>
            <div className="font-bold">
                <span>Total</span>
                <span contentEditable suppressContentEditableWarning className="ml-4">Order SPO415998138 | ShopSimon</span>
                <span className="ml-8 text-lg">${total.toFixed(2)} USD</span>
            </div>
            </div>
            <div className="flex justify-between text-sm">
            <div>
                <p><span className="font-bold">Shipping Address:</span> <span contentEditable suppressContentEditableWarning>MARCO CHORASHOP - 4221 W 91st Pl Ste 900, VIVA7859, Hialeah, Florida 33018, United States</span></p>
                <p><span className="font-bold">Payment:</span> <span contentEditable suppressContentEditableWarning>PayPal</span></p>
            </div>
            </div>
            <div className="flex justify-between items-center mt-6 border-t pt-6">
            <p contentEditable suppressContentEditableWarning className="text-xs text-gray-600 w-2/3">Returns are easy! We accept unused or defective items within 30 days of the delivery date unless the item is marked as Final Sale when purchased. View our <a href="#" className="underline">Return Policy</a>.</p>
            <button className="border border-black px-6 py-2 rounded-full font-bold">START A RETURN</button>
            </div>
        </footer>
        </div>
        <div className="text-center my-8">
            <button onClick={handleDownloadPdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download as PDF
            </button>
        </div>
    </div>
  );
};

export default ShopSimonReceipt;