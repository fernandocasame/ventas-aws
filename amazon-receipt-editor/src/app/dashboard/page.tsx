import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-12">Receipt Template Editors</h1>
        <div className="flex justify-center gap-8">
          <Link href="/amazon" className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Amazon Receipt
          </Link>
          <Link href="/ebay" className="px-6 py-3 text-lg font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
            eBay Receipt
          </Link>
          <Link href="/shopsimon" className="px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
            Shop Simon Receipt
          </Link>
          <Link href="/evanfischer" className="px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
            Evan Fischer Invoice
          </Link>
          <Link href="/shein" className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
            Shein Invoice
          </Link>
          <Link href="/temu" className="px-6 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            Temu Receipt
          </Link>
          <Link href="/rockauto" className="px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
            RockAuto Receipt
          </Link>
          <Link href="/rki-instruments" className="px-6 py-3 text-lg font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors">
            RKI Instruments Invoice
          </Link>
        </div>
      </div>
    </main>
  );
}