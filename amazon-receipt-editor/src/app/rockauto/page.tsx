"use client";
import React, { useState, useRef, useMemo } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';

interface Item {
  id: number;
  numeroRepuesto: string;
  tipoRepuesto: string;
  precio: number;
  deposito: number;
  cantidad: number;
}

const RockAutoReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    { id: 1, numeroRepuesto: 'HERI\n96573', tipoRepuesto: 'Eje de Junta Homocinética\nLiquidación de Mayorista - Garantía de\n30 Días', precio: 30.79, deposito: 0.00, cantidad: 1 },
  ]);

  const [envio, setEnvio] = useState(9.99);
  const [impuesto, setImpuesto] = useState(4.73);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }, [items]);

  const total = useMemo(() => {
    return subtotal + envio + impuesto;
  }, [subtotal, envio, impuesto]);

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now(),
      numeroRepuesto: 'New',
      tipoRepuesto: 'New Item',
      precio: 0,
      deposito: 0,
      cantidad: 1,
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
        pdf.save('rockauto-receipt.pdf');
      });
    }
  };

  return (
    <div>
      <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto font-sans text-sm text-gray-800">
        <header className="flex justify-between items-center mb-6">
          <div>
            <Image src="/rockauto-logo.png" alt="RockAuto" width={150} height={40} />
            <h1 contentEditable suppressContentEditableWarning className="text-xl font-bold">Confirmación de Factura Comercial</h1>
            <p contentEditable suppressContentEditableWarning className="text-sm text-gray-600">viernes, 18 de Abril, 2025 04:26 PM Horario Central EEUU</p>
          </div>
          <div contentEditable suppressContentEditableWarning className="text-right">
            <p className="font-bold">Orden 306925246</p>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="font-bold mb-2">Dirección de Envío:</h2>
              <p contentEditable suppressContentEditableWarning>Jimmy Javier Castillo Robalino</p>
              <p contentEditable suppressContentEditableWarning>6306 NW 99TH AVE</p>
              <p contentEditable suppressContentEditableWarning>Referencia: VI2729</p>
              <p contentEditable suppressContentEditableWarning>miami, FL 33178</p>
              <p contentEditable suppressContentEditableWarning>United States</p>
              <p contentEditable suppressContentEditableWarning>786-368-9111</p>
              <p contentEditable suppressContentEditableWarning>payasinjc10@gmail.com</p>
            </div>
            <div>
              <h2 className="font-bold mb-2">Dirección de Factura:</h2>
              <p contentEditable suppressContentEditableWarning>Jimmy Javier Castillo Robalino</p>
              <p contentEditable suppressContentEditableWarning>6306 NW 99TH AVE</p>
              <p contentEditable suppressContentEditableWarning>Referencia: VI2729</p>
              <p contentEditable suppressContentEditableWarning>miami, FL 33178</p>
              <p contentEditable suppressContentEditableWarning>United States</p>
              <p contentEditable suppressContentEditableWarning>786-368-9111</p>
              <p contentEditable suppressContentEditableWarning>payasinjc10@gmail.com</p>
            </div>
          </div>
          <p contentEditable suppressContentEditableWarning className='mb-2 text-sm'>1989 ISUZU I-MARK 1.5L L4</p>
          <table className="w-full border-collapse text-sm mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Número de Repuesto</th>
                <th className="text-left py-2">Tipo de Repuesto</th>
                <th className="text-right py-2">Precio</th>
                <th className="text-right py-2">Depósito</th>
                <th className="text-right py-2">Cantidad</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b group">
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'numeroRepuesto', e.currentTarget.innerText)} className="py-2 whitespace-pre-line">{item.numeroRepuesto}</td>
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'tipoRepuesto', e.currentTarget.innerText)} className="py-2 whitespace-pre-line">{item.tipoRepuesto}</td>
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'precio', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)} className="text-right py-2">${item.precio.toFixed(2)}</td>
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'deposito', parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)} className="text-right py-2">${item.deposito.toFixed(2)}</td>
                  <td contentEditable suppressContentEditableWarning onBlur={(e) => handleItemChange(item.id, 'cantidad', parseInt(e.currentTarget.innerText) || 0)} className="text-right py-2">{item.cantidad}</td>
                  <td className="text-right py-2">${(item.precio * item.cantidad).toFixed(2)}</td>
                  <button onClick={() => handleRemoveItem(item.id)} className="ml-2 text-red-500 opacity-0 group-hover:opacity-100">X</button>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddItem} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm mb-4">Add Item</button>


          <div className="flex justify-end mb-8">
            <div className="w-1/3">
              <div className="flex justify-between"><span className="text-gray-600">Envío Ground:</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setEnvio(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${envio.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Tax:</span><span contentEditable suppressContentEditableWarning onBlur={(e) => setImpuesto(parseFloat(e.currentTarget.innerText.replace('$', '')) || 0)}>${impuesto.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold border-t mt-1 pt-1"><span>Total de Orden:</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-red-500"><span className="text-gray-600">Visa:</span><span>-${total.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold border-t mt-1 pt-1"><span>Saldo Débito:</span><span>$0.00</span></div>
            </div>
          </div>
        </main>

        <footer className="text-xs text-center text-gray-600 space-y-2">
          <p contentEditable suppressContentEditableWarning>Cuando se envíe el último artículo de su orden, le enviaremos un correo electrónico con un listado de los números de guía para todos los artículos de la orden.</p>
          <p contentEditable suppressContentEditableWarning className="font-bold">PARA A VER EL ESTADO DE ORDEN, HACER CAMBIOS, ORGANIZAR UNA DEVOLUCIÓN (incluyendo Cores) o informarnos de un problema visitar https://www.rockauto.com/orderstatus</p>
          <p contentEditable suppressContentEditableWarning>Por favor imprima esta página como su recibo.</p>
          <div className="flex justify-center items-center space-x-4">
            <Image src="https://www.rockauto.com/Images/en/ra_icon_1.gif" alt="Repuestos" width={32} height={32} />
            <Image src="https://www.rockauto.com/Images/en/ra_icon_2.gif" alt="Ayuda" width={32} height={32} />
            <Image src="https://www.rockauto.com/Images/en/ra_icon_3.gif" alt="Devoluciones" width={32} height={32} />
          </div>
          <p contentEditable suppressContentEditableWarning>Por favor, no responda a este correo electrónico automatizado. Su dirección "noreply" no puede recibir respuestas.</p>
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

export default RockAutoReceipt;