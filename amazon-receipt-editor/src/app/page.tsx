"use client";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AmazonReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const input = receiptRef.current;
    if (!input) return;

    // 🔧 Limpia colores no soportados (lab(), oklch()) antes de capturar
    cleanUnsupportedColors(input);

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff", // fondo blanco garantizado
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("amazon-receipt.pdf");
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  };

  /**
   * 🔧 Limpia colores CSS con funciones no soportadas (lab(), oklch()).
   */
  const cleanUnsupportedColors = (element: HTMLElement) => {
    const elements = element.querySelectorAll<HTMLElement>("*");
    elements.forEach((el) => {
      const style = getComputedStyle(el);
      const colorProps: (keyof CSSStyleDeclaration & string)[] = [
        "color",
        "backgroundColor",
        "borderColor",
      ];
      colorProps.forEach((prop) => {
        const val = style[prop];
        if (typeof val === "string" && (val.includes("lab(") || val.includes("oklch("))) {
          (el.style as any)[prop] = "#000";
        }
      });
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto font-sans shadow-lg rounded-lg">
        <div className="text-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className="w-32 mx-auto"
            crossOrigin="anonymous"
          />
        </div>

        <div className="my-6">
          <h1
            contentEditable
            suppressContentEditableWarning
            className="text-xl font-semibold"
            style={{ color: "#ff9900" }}
          >
            Final Details for Order #112-8329345-8639432
          </h1>
          <p contentEditable suppressContentEditableWarning className="text-sm">
            Order Placed: September 29, 2025
          </p>
          <p contentEditable suppressContentEditableWarning className="text-sm">
            Amazon.com order number: 112-8329345-8639432
          </p>
          <p contentEditable suppressContentEditableWarning className="text-lg font-bold">
            Order Total: $25.45
          </p>
        </div>

        <div className="border-2 border-gray-300">
          <div className="border-b-2 border-gray-300">
            <h2
              contentEditable
              suppressContentEditableWarning
              className="text-lg text-center font-bold mb-2"
            >
              Shipped on September 29, 2025
            </h2>
          </div>
          <div className="p-2">
            <div className="flex justify-between items-start mb-4">
              <div className="w-3/4">
                <h3 className="font-bold">Items Ordered</h3>
                <p contentEditable suppressContentEditableWarning className="text-sm">
                  1 of: Purina Friskies Natural Cat Treats, Party Mix Natural Yums With Wild
                  Caught Tuna and Added Vitamins, Minerals and Nutrients - 20 oz. Canister
                </p>
                <p className="text-xs text-gray-600">Sold by: Amazon.com</p>
                <p className="text-xs text-gray-600">Condition: New</p>
              </div>
              <div className="w-1/4 text-right">
                <p className="font-bold">Price</p>
                <p contentEditable suppressContentEditableWarning className="text-sm">
                  $8.49
                </p>
              </div>
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className="w-3/4">
                <p contentEditable suppressContentEditableWarning className="text-sm">
                  1 of: Purina Friskies Made in USA Facilities, Natural Cat Treats, Party Mix
                  Natural Yums Catnip Flavor - 20 oz. Canister
                </p>
                <p className="text-xs text-gray-600">Sold by: Amazon.com</p>
                <p className="text-xs text-gray-600">Condition: New</p>
              </div>
              <div className="w-1/4 text-right">
                <p contentEditable suppressContentEditableWarning className="text-sm">
                  $8.48
                </p>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div className="w-3/4">
                <p contentEditable suppressContentEditableWarning className="text-sm">
                  1 of: Purina Friskies Natural Cat Treats Party Mix Natural Yums With Real
                  Salmon and Added Vitamins, Minerals and Nutrients - 20 Oz. Canister
                </p>
                <p className="text-xs text-gray-600">Sold by: Amazon.com</p>
                <p className="text-xs text-gray-600">Condition: New</p>
              </div>
              <div className="w-1/4 text-right">
                <p contentEditable suppressContentEditableWarning className="text-sm">
                  $8.48
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between border-2 border-gray-300 p-2 mt-2">
          <div>
            <h3 className="font-bold">Shipping Address:</h3>
            <p contentEditable suppressContentEditableWarning className="text-sm">
              EDISON PAREDES
            </p>
            <p contentEditable suppressContentEditableWarning className="text-sm">
              11047 NW 84TH ST
            </p>
            <p contentEditable suppressContentEditableWarning className="text-sm">
              DORAL, FL 33178-5264
            </p>
            <p contentEditable suppressContentEditableWarning className="text-sm">
              United States
            </p>

            <h3 className="font-bold mt-4">Shipping Speed:</h3>
            <p contentEditable suppressContentEditableWarning className="text-sm">
              Rush Shipping
            </p>
          </div>

          <div className="text-right">
            <div className="flex justify-between">
              <span className="mr-4">Item(s) Subtotal:</span>
              <span>$25.45</span>
            </div>
            <div className="flex justify-between">
              <span className="mr-4">Shipping & Handling:</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between">
              <span className="mr-4">Free Shipping:</span>
              <span>-$2.99</span>
            </div>
            <div className="border-t border-gray-400 my-1"></div>
            <div className="flex justify-between font-bold">
              <span className="mr-4">Total:</span>
              <span>$25.45</span>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-300 mt-4">
          <div className="border-b-2 border-gray-300">
            <h2 className="text-lg text-center font-bold mb-2">Payment information</h2>
          </div>
          <div className="flex justify-between p-2">
            <div>
              <h3 className="font-bold">Payment Method:</h3>
              <p contentEditable suppressContentEditableWarning className="text-sm">
                American Express | Last digits: 1006
              </p>
              <h3 className="font-bold mt-2">Billing address</h3>
              <p className="text-sm">EDISON PAREDES</p>
              <p className="text-sm">11047 NW 84TH ST</p>
              <p className="text-sm">DORAL, FL 33178-5264</p>
              <p className="text-sm">United States</p>
            </div>
            <div className="text-right">
              <div className="flex justify-between font-bold text-red-700">
                <span className="mr-4">Grand Total:</span>
                <span>$25.45</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-300 p-2 flex flex-row justify-between">
          <p className="text-sm">Credit Card transactions</p>
          <p className="text-sm">
            American Express ending in 1006: September 30, 2025: $25.45
          </p>
        </div>

        <div className="text-center mt-6 text-sm" style={{ color: "#1a73e8" }}>
          <p>
            To view the status of your order, return to{" "}
            <a href="#" className="underline">
              Order Summary
            </a>
            .
          </p>
        </div>

        <div className="text-center mt-4 text-xs text-gray-600">
          <p>
            <a href="#" className="underline">
              Conditions of Use
            </a>{" "}
            |{" "}
            <a href="#" className="underline">
              Privacy Notice
            </a>{" "}
            © 1996-2025, Amazon.com, Inc.
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handleDownloadPdf}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default AmazonReceipt;
