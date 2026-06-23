import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Command Center | ORM Admin",
  description: "Your personal AI operating system for leadership, education, and influence.",
};

export default function ACCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20">
              AC
            </div>
            <h1 className="text-xl font-semibold tracking-tight">AI Command Center</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="text-indigo-400">Dashboard</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Goals & Tasks</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Broadcasts</a>
            <a href="#" className="hover:text-slate-200 transition-colors">YGI Manager</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
