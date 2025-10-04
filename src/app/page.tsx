import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-bold text-white">LIMINAL 2.0</h1>
        <p className="text-slate-300 text-lg">Утро → 3 инсайта. Вечер → свёртка. История → твой путь.</p>
        <nav className="flex gap-4 justify-center flex-wrap">
          <Link className="px-6 py-3 rounded-lg bg-blue-600 text-white" href="/morning">Утреннее</Link>
          <Link className="px-6 py-3 rounded-lg bg-purple-600 text-white" href="/evening">Вечернее</Link>
          <Link className="px-6 py-3 rounded-lg bg-slate-600 text-white" href="/history">История</Link>
        </nav>
      </div>
    </main>
  );
}
