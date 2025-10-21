"use client";
import { useState, useMemo, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";

const EvanFischerPage = () => {
  const [items, setItems] = useState([
    {
      product: "Fender For Dodge Journey 2009-2020 Front Driver Side",
      qty: 1,
      unitPrice: 138.11,
    },
  ]);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleAddItem = () => {
    setItems([
      ...items,
      { product: "New Item", qty: 1, unitPrice: 0.0 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (
    index: number,
    field: keyof (typeof items)[0],
    value: string | number
  ) => {
    const newItems = [...items];
    const item = { ...newItems[index] };

    if (field === "qty" || field === "unitPrice") {
      const numericValue =
        typeof value === "string"
          ? parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0
          : value;
      item[field] = numericValue;
    } else {
      item[field] = value as string;
    }

    newItems[index] = item;
    setItems(newItems);
  };

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0);
  }, [items]);

  const downloadPdf = () => {
    if (invoiceRef.current) {
      html2canvas(invoiceRef.current, {
        scale: 2,
        onclone: (document) => {
          const contentEditableElements =
            document.querySelectorAll<HTMLElement>("[contentEditable=true]");
          contentEditableElements.forEach((el) => {
            el.setAttribute("contentEditable", "false");
            // Optional: add a class to style them as plain text for the PDF
            el.style.border = "none";
            el.style.padding = "0";
          });
        },
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "p",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("invoice-evanfischer.pdf");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPdf}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download as PDF
          </button>
        </div>
        <div ref={invoiceRef} className="bg-white p-8 shadow-lg">
          <header className="flex justify-between items-start mb-10">
            <h1
              className="text-5xl font-bold"
              contentEditable
              suppressContentEditableWarning
            >
              INVOICE
            </h1>
            <div className="text-right">
              <Image
                src="https://i.ibb.co/L1PCW6f/evanfischer-logo.png"
                alt="Evan Fischer Auto Parts"
                width={192}
                height={68}
                className="w-48 mb-4 ml-auto"
              />
              <p contentEditable suppressContentEditableWarning>
                Evan Fischer Auto Parts
              </p>
              <p contentEditable suppressContentEditableWarning>
                2050 W. 190th St
              </p>
              <p contentEditable suppressContentEditableWarning>
                Suite 400
              </p>
              <p contentEditable suppressContentEditableWarning>
                Torrance
              </p>
              <p contentEditable suppressContentEditableWarning>
                California 90504
              </p>
              <p contentEditable suppressContentEditableWarning>
                United States
              </p>
            </div>
          </header>

          <section className="flex justify-between mb-10">
            <div className="w-1/2">
              <div contentEditable suppressContentEditableWarning>
                <strong>Camila Cornejo</strong>
              </div>
              <div contentEditable suppressContentEditableWarning>
                4221 W 91 st Pl
              </div>
              <div contentEditable suppressContentEditableWarning>
                Ste 900
              </div>
              <div contentEditable suppressContentEditableWarning>
                Hialeah
              </div>
              <div contentEditable suppressContentEditableWarning>
                FL 33018-3912
              </div>
              <div contentEditable suppressContentEditableWarning>
                United States
              </div>
            </div>
            <div className="w-1/2 text-left">
              <p contentEditable suppressContentEditableWarning>
                <strong>eBay</strong>
              </p>
              <p contentEditable suppressContentEditableWarning>
                Order number: <strong>20-13602-77488</strong>
              </p>
              <p contentEditable suppressContentEditableWarning>
                Ordered: <strong>23rd September 2025</strong>
              </p>
              <p contentEditable suppressContentEditableWarning>
                Dispatched: <strong>24th September 2025</strong>
              </p>
              <p contentEditable suppressContentEditableWarning>
                Paid: <strong>23rd September 2025</strong>
              </p>
            </div>
          </section>

          <section>
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="w-3/5 pb-2">PRODUCT</th>
                  <th className="w-1/5 pb-2 text-center">QTY</th>
                  <th className="w-1/5 pb-2 text-right">UNIT PRICE</th>
                  <th className="w-1/5 pb-2 text-right">TOTAL</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td
                      className="py-2 pr-2"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleItemChange(
                          index,
                          "product",
                          e.currentTarget.textContent || ""
                        )
                      }
                    >
                      {item.product}
                    </td>
                    <td
                      className="py-2 px-2 text-center"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleItemChange(
                          index,
                          "qty",
                          e.currentTarget.textContent || "0"
                        )
                      }
                    >
                      {item.qty}
                    </td>
                    <td
                      className="py-2 px-2 text-right"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleItemChange(
                          index,
                          "unitPrice",
                          e.currentTarget.textContent || "0"
                        )
                      }
                    >
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-2 pl-2 text-right">
                      ${(item.qty * item.unitPrice).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleAddItem}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Item
              </button>
            </div>
          </section>

          <section className="flex justify-end mt-10">
            <div className="w-1/3">
              <div className="flex justify-between border-t-2 border-black pt-2">
                <span className="font-bold text-lg">TOTAL</span>
                <span className="font-bold text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          <footer className="text-center text-xs text-gray-500 mt-20 pt-4 border-t">
            <p contentEditable suppressContentEditableWarning>
              Registration No. 68-0623433. Registered address 2050 W. 190th St
              Suite 400, Torrance, United States.
            </p>
            <p contentEditable suppressContentEditableWarning>
              Telephone: 3107198666
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default EvanFischerPage;