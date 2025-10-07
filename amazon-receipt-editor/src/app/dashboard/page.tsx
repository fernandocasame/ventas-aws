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
        </div>
      </div>
    </main>
  );
}