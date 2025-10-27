
"use client";
import React, { useState, useRef, useMemo } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import temu from "@/../public/temu.png";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const TemuReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Teléfono móvil inteligente Android 13 con pantalla de 6,8 pulgadas, el último teléfono móvil 5G de 2025, almacenamiento de 8+256GB, memoria expandible, cámara dual de 50MP+108MP, batería ultra-larga de 6800mAh, carga rápida, función OTG, reconocimiento facial, teléfono móvil mini de 3,5 pulgadas, 720*1600, 2MP+13MP, carga rápida, 2600mAh, doble tarjeta, doble espera, completamente funcional, regalo ideal para vacaciones y cumpleaños.', price: 60.25, quantity: 1, imageUrl: '/temu.png' },
  ]);

  const [shipping, setShipping] = useState(0.00);
  const [tax, setTax] = useState(0.00);
  const [discount, setDiscount] = useState(0.00);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const total = useMemo(() => {
    return subtotal - discount + shipping + tax;
  }, [subtotal, discount, shipping, tax]);

  const handleItemChange = (id: number, field: keyof Item, value: string | number | File) => {
    if (field === 'imageUrl' && typeof value === 'object') {
      const file = value as File;
      const reader = new FileReader();
      reader.onload = (e) => {
        setItems(items.map(item => item.id === id ? { ...item, imageUrl: e.target?.result as string } : item));
      };
      reader.readAsDataURL(file);
    } else {
      setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    }
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now(),
      name: 'New Item',
      price: 0,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/80',
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
        <div ref={receiptRef} className="bg-white p-4 sm:p-8 max-w-4xl mx-auto font-sans text-sm text-gray-800">
            <header className="mb-4">
                <div contentEditable suppressContentEditableWarning className="text-right text-gray-500 mb-4">2025/07/16 23:20</div>
                <div className="flex items-center space-x-4 mb-4">
                    <Image src={temu} alt="TEMU" width={300} height={40}/>
                </div>
                <p contentEditable suppressContentEditableWarning className="text-sm text-gray-600">Para evitar el exceso de desperdicio en los empaques, no incluimos recibos de papel. Sin embargo, siempre puede imprimir uno para sus registros.</p>
            </header>

            <main>
                <h2 contentEditable suppressContentEditableWarning className="text-lg font-bold mb-2">Resumen del pedido</h2>
                <div className="border-t border-b py-2 space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">ID de pedido:</span><span contentEditable suppressContentEditableWarning>PQ-211-12602567516793331</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Tiempo de pedido:</span><span contentEditable suppressContentEditableWarning>29 jun 2025</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Total de artículos:</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Descuento de artículo(s):</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setDiscount(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>-${discount.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold"><span>Subtotal:</span><span>${(subtotal - discount).toFixed(2)}</span></div>
                </div>
                <div className="py-2 space-y-1">
                    <div className="flex justify-between"><span className="text-gray-600">Envío:</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setShipping(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)} className="text-green-600 font-bold">${shipping.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Impuesto de ventas:</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setTax(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${tax.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-lg"><span>Total del pedido:</span><span>${total.toFixed(2)}</span></div>
                </div>

                <div className="grid grid-cols-2 gap-8 my-6">
                    <div>
                        <h3 className="font-bold mb-1">Dirección de envío</h3>
                        <p contentEditable suppressContentEditableWarning className="text-gray-600">[Your Name] +1 (123)456-7890, [Your Address], [Your City], [Your State] [Your Zip Code], [Your Country]</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Método de pago</h3>
                        <div className="flex items-center space-x-2">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" width={40} height={20}/>
                            <div>
                                <p contentEditable suppressContentEditableWarning className="font-bold">Visa ...1234</p>
                                <p contentEditable suppressContentEditableWarning className="text-gray-500 text-xs">Pagado el [Date]</p>
                            </div>
                            <p className="ml-auto font-bold">${total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Dirección de facturación</h3>
                        <p contentEditable suppressContentEditableWarning className="text-gray-600">[Your Name] +1 (123)456-7890, [Your Address], [Your City], [Your State] [Your Zip Code], [Your Country]</p>
                    </div>
                </div>

                <h3 className="text-lg font-bold border-t pt-4 mt-6 mb-4">Detalles del artículo ({items.length})</h3>
                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="flex flex-row items-start">
                            <div className="w-[10vw]">
                                <Image src={item.imageUrl} width={100} height={100} alt={item.name} className=" object-cover" />
                                <input type="file" accept="image/*" onChange={(e) => e.target.files && handleItemChange(item.id, 'imageUrl', e.target.files[0])} className="absolute inset-0 w-[30vw] h-full opacity-0 cursor-pointer" />
                            </div>
                            <div className="w-[80vw]">
                                <p contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'name', e.currentTarget.innerText)} className="text-sm">{item.name}</p>
                            </div>
                            <div className="w-[10vw]">
                                <p contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'price', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)} className="font-bold">${item.price.toFixed(2)}</p>
                                <p className="text-gray-500">x<span contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'quantity', parseInt(e.currentTarget.innerText) || 0)}>{item.quantity}</span></p>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">X</button>
                        </div>
                    ))}
                </div>
                <button onClick={handleAddItem} className="mt-4 bg-green-500 no-print hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">Add Item</button>

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

export default TemuReceipt;