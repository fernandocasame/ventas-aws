"use client";
import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EbayReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleDownloadPdf = async () => {
    const input = receiptRef.current;
    if (!input) return;
    setLoading(true);

    // 🧩 Clonamos el elemento y limpiamos colores no soportados
    const clone = input.cloneNode(true) as HTMLElement;
    sanitizeUnsupportedColors(clone);

    // Temporalmente ocultamos el original y añadimos el clon al DOM
    input.style.display = "none";
    document.body.appendChild(clone);

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("ebay-receipt.pdf");
    } catch (error) {
      console.error("Error generando PDF:", error);
    } finally {
      input.style.display = "";
      clone.remove();
      setLoading(false);
    }
  };

  /**
   * 🔧 Limpia cualquier color CSS con funciones no soportadas: lab(), oklch(), lch(), var().
   * Los reemplaza por colores seguros (#000, #fff, #ccc).
   */
  const sanitizeUnsupportedColors = (element: HTMLElement) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT);

    while (walker.nextNode()) {
      const el = walker.currentNode as HTMLElement;
      const style = window.getComputedStyle(el);

      const props = ["color", "backgroundColor", "borderColor"];
      for (const prop of props) {
        const val = style[prop as keyof CSSStyleDeclaration] as string;
        if (
          typeof val === "string" &&
          (val.includes("lab(") ||
            val.includes("lch(") ||
            val.includes("oklch(") ||
            val.includes("var("))
        ) {
          // Reemplazamos según el tipo
          if (prop === "color") el.style.color = "#000";
          else if (prop === "backgroundColor") el.style.backgroundColor = "#fff";
          else el.style.borderColor = "#000";
        }
      }
    }
  };


  return (
    <div>
      <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto font-sans text-gray-800">
        <header className="flex justify-between items-center mb-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" alt="eBay Logo" className="w-24" />
        </header>

        <section className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h2 contentEditable suppressContentEditableWarning className="font-bold text-lg mb-2">Order information</h2>
            <div className="text-sm">
              <p contentEditable suppressContentEditableWarning><span className="font-semibold">Buyer</span> patovan7472011</p>
              <p contentEditable suppressContentEditableWarning><span className="font-semibold">Placed on</span> Sep 21, 2022</p>
              <p contentEditable suppressContentEditableWarning><span className="font-semibold">Payment method</span> PayPal</p>
              <p contentEditable suppressContentEditableWarning><span className="font-semibold">Paid on</span> Sep 21, 2022</p>
            </div>
          </div>
          <div>
            <h2 contentEditable suppressContentEditableWarning className="font-bold text-lg mb-2">Shipping address</h2>
            <div className="text-sm">
              <p contentEditable suppressContentEditableWarning>Patricio Pazmino</p>
              <p contentEditable suppressContentEditableWarning>2826 NW 72nd Ave, # SERV45096</p>
              <p contentEditable suppressContentEditableWarning>miami, Florida 33122-1310</p>
              <p contentEditable suppressContentEditableWarning>United States</p>
            </div>
          </div>
          <div>
            <h2 contentEditable suppressContentEditableWarning className="font-bold text-lg mb-2">Order total</h2>
            <div className="text-sm">
              <div className="flex justify-between">
                <span contentEditable suppressContentEditableWarning>6 items</span>
                <span contentEditable suppressContentEditableWarning>$272.61</span>
              </div>
              <div className="flex justify-between">
                <span contentEditable suppressContentEditableWarning>Shipping</span>
                <span contentEditable suppressContentEditableWarning>$6.00</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span contentEditable suppressContentEditableWarning>Tax</span>
                <span contentEditable suppressContentEditableWarning>$19.51</span>
              </div>
              <div className="flex justify-between font-bold pt-1">
                <span contentEditable suppressContentEditableWarning>Order total</span>
                <span contentEditable suppressContentEditableWarning>$298.12</span>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <div className="border-t border-gray-200 pt-4">
            <h2 contentEditable suppressContentEditableWarning className="font-bold text-xl mb-1">Items bought from wholesalepartsstore</h2>
            <p contentEditable suppressContentEditableWarning className="text-sm text-gray-600 mb-4">Order number: 18-09125-95029</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th contentEditable suppressContentEditableWarning className="font-normal w-1/12 pb-2">Quantity</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-6/12 pb-2">Item name</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-3/12 pb-2">Shipping service</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-2/12 pb-2 text-right">Item price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td contentEditable suppressContentEditableWarning className="pt-2">1</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2">Melling Camshaft fits Jeep Grand Cherokee 1993-1995 4.0L 6 Cyl VIN: S OHV 56RKWY (402408294719)</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2">Economy Shipping</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2 text-right">$135.92</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 contentEditable suppressContentEditableWarning className="font-bold text-xl mb-1">Items bought from panthersales</h2>
            <p contentEditable suppressContentEditableWarning className="text-sm text-gray-600 mb-4">Order number: 18-09125-95028</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th contentEditable suppressContentEditableWarning className="font-normal w-1/12 pb-2">Quantity</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-6/12 pb-2">Item name</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-3/12 pb-2">Shipping service</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-2/12 pb-2 text-right">Item price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td contentEditable suppressContentEditableWarning className="pt-2">1</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2">Fits AMC Jeep 4.0 4.2 Cam Bolt with Spring prevents cam walk (254556279540)</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2">USPS First Class</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2 text-right">$24.96</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 contentEditable suppressContentEditableWarning className="font-bold text-xl mb-1">Items bought from autogadgets2015</h2>
            <p contentEditable suppressContentEditableWarning className="text-sm text-gray-600 mb-4">Order number: 18-09125-95027</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th contentEditable suppressContentEditableWarning className="font-normal w-1/12 pb-2">Quantity</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-6/12 pb-2">Item name</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-3/12 pb-2">Shipping service</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-2/12 pb-2 text-right">Item price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td contentEditable suppressContentEditableWarning className="pt-2">1</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2">6Pcs Spark Plug Wire Set For 97-03 Mitsubishi Montero Sport 3.0L-V6 NEW (164153567866)</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2">DGM SmartMail Expedited</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2 text-right">$23.95</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 contentEditable suppressContentEditableWarning className="font-bold text-xl mb-1">Items bought from sixityauto</h2>
            <p contentEditable suppressContentEditableWarning className="text-sm text-gray-600 mb-4">Order number: 18-09125-95026</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th contentEditable suppressContentEditableWarning className="font-normal w-1/12 pb-2">Quantity</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-6/12 pb-2">Item name</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-3/12 pb-2">Shipping service</th>
                  <th contentEditable suppressContentEditableWarning className="font-normal w-2/12 pb-2 text-right">Item price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td contentEditable suppressContentEditableWarning className="pt-2">1</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2">6 pcs NGK V-Power Spark Plugs for 1994-2002 Mitsubishi Montero 3.5L V6 - xu (292018847352)</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2">Standard Shipping</td>
                  <td contentEditable suppressContentEditableWarning className="pt-2 text-right">$17.54</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={handleDownloadPdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default EbayReceipt;