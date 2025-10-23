"use client";
import { useState, useMemo, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "@/../public/logo_shein.png";
import Image from "next/image";

type Item = {
  id: number;
  description: string;
  quantity: number;
  amount: number;
};

export default function SheinInvoice() {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      description: "DAZY Blusa Sin Mangas Color Sólido",
      quantity: 1,
      amount: 5.85,
    },
    {
      id: 2,
      description: "Zapatos Planos de Mujer con Puntera Cuadrada",
      quantity: 1,
      amount: 18.9,
    },
  ]);

  const [shippingFee, setShippingFee] = useState(0.0);
  const [handlingFee, setHandlingFee] = useState(0.0);
  const [salesTax, setSalesTax] = useState(1.4);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now(), description: "New Item", quantity: 1, amount: 0.0 },
    ]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: number,
    field: keyof Item,
    value: string
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const parsedValue =
            field === "quantity" || field === "amount"
              ? parseFloat(value) || 0
              : value;
          return { ...item, [field]: parsedValue };
        }
        return item;
      })
    );
  };

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity * item.amount, 0);
  }, [items]);

  const grandTotal = useMemo(() => {
    return subtotal + shippingFee + handlingFee + salesTax;
  }, [subtotal, shippingFee, handlingFee, salesTax]);

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className=" min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 sm:p-10" ref={invoiceRef}>
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center">
              <Image src={logo} alt="Shein Logo" className="w-12 h-12 mr-4" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold" contentEditable suppressContentEditableWarning>SHEIN US SERVICES, LLC</h1>
                <p className="text-xs sm:text-sm" contentEditable suppressContentEditableWarning>777 S. Alameda Street, Floor 4, Los Angeles, CA 90021</p>
              </div>
            </div>
            <div className="bg-black black text-white px-4 py-2">
              <h2 className="text-lg sm:text-xl font-bold">Sales Invoice</h2>
            </div>
          </div>

          {/* Billing and Invoice Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 text-xs sm:text-sm">
            <div>
              <div className="mb-2">
                <strong className="font-bold">Bill To:</strong>
                <span contentEditable suppressContentEditableWarning> Laura Pinzon</span>
              </div>
              <div className="mb-2">
                <strong className="font-bold">Billing Address:</strong>
                <p contentEditable suppressContentEditableWarning>4221 W 91st Pl Ste 900 Viva2729, Hialeah, FLORIDA 33018-3912</p>
              </div>
              <div>
                <strong className="font-bold">Delivery Address:</strong>
                <p contentEditable suppressContentEditableWarning>4221 W 91st Pl Ste 900 Viva2729, Hialeah, FLORIDA 33018-3912</p>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="mb-2">
                <strong className="font-bold">Invoice No.:</strong>
                <span contentEditable suppressContentEditableWarning> INVUS20250918001260742</span>
              </div>
              <div>
                <strong className="font-bold">Invoice Date:</strong>
                <span contentEditable suppressContentEditableWarning> 2025-09-18</span>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-bold border-b-2 border-[#000000] pb-1 mb-2">Order Information</h3>
            <div className="grid md:grid-cols-2 gap-8 text-xs sm:text-sm">
              <div>
                <strong className="font-bold">Order Number:</strong>
                <p contentEditable suppressContentEditableWarning>GSU13X21Q00MNJ1</p>
              </div>
              <div>
                <strong className="font-bold">Order Date:</strong>
                <p contentEditable suppressContentEditableWarning>2025-09-18</p>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-bold border-b-2 border-[#000000] pb-1 mb-2">Seller Information</h3>
            <div className="grid md:grid-cols-2 gap-8 text-xs sm:text-sm">
              <div>
                <strong className="font-bold">Sold By:</strong>
                <p contentEditable suppressContentEditableWarning>Xiyim Shop</p>
              </div>
              <div>
                <strong className="font-bold">Address:</strong>
                <p contentEditable suppressContentEditableWarning>777 S. Alameda St, Floor 4, Los Angeles, CA 90021-1657</p>
              </div>
            </div>
          </div>

          {/* Invoice Detail */}
          <div>
            <h3 className="text-base sm:text-lg font-bold border-b-2 border-[#000000] pb-1 mb-2">Invoice Detail</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="p-2">Description</th>
                            <th className="p-2 text-right">Quantity</th>
                            <th className="p-2 text-right">Amount(USD)</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="p-2" contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, "description", e.currentTarget.textContent || "")}>{item.description}</td>
                                <td className="p-2 text-right" contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, "quantity", e.currentTarget.textContent || "")}>{item.quantity}</td>
                                <td className="p-2 text-right" contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, "amount", e.currentTarget.textContent || "")}>{item.amount.toFixed(2)}</td>
                                <td className="p-2 text-center no-print"><button onClick={() => handleRemoveItem(item.id)} className="text-red-500 text-xs hover:text-red-700">Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end mt-6">
                <div className="w-full max-w-xs text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b">
                        <span>Item(s) Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                        <span>Shipping Fee:</span>
                        <span>$<span contentEditable suppressContentEditableWarning onBlur={(e) => setShippingFee(parseFloat(e.currentTarget.textContent || "0"))}>{shippingFee.toFixed(2)}</span></span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                        <span>Handling Fee:</span>
                        <span>$<span contentEditable suppressContentEditableWarning onBlur={(e) => setHandlingFee(parseFloat(e.currentTarget.textContent || "0"))}>{handlingFee.toFixed(2)}</span></span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                        <span>Sales Tax:</span>
                        <span>$<span contentEditable suppressContentEditableWarning onBlur={(e) => setSalesTax(parseFloat(e.currentTarget.textContent || "0"))}>{salesTax.toFixed(2)}</span></span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-base">
                        <span>Grand Total:</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button id="add-item-btn" onClick={handleAddItem} className="no-print bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Item</button>
          <button id="download-pdf-btn" onClick={downloadPDF} className="no-print bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Download as PDF</button>
        </div>
      </div>
    </div>
  );
}