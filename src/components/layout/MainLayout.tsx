import { Bell, Search, Sparkles } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1">
          <header className="border-b border-slate-800/80 bg-slate-950/70 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Resumen financiero</p>
                <h1 className="mt-1 text-2xl font-semibold text-white">Bienvenido de nuevo</h1>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-400">
                  <Search className="size-4" />
                  <input
                    className="w-32 bg-transparent outline-none sm:w-48"
                    placeholder="Buscar"
                    aria-label="Buscar"
                  />
                </label>

                <button className="rounded-xl border border-slate-800 bg-slate-900/70 p-2.5 text-slate-300 transition hover:border-cyan-400/40 hover:text-white">
                  <Bell className="size-4" />
                </button>

                <div className="flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2">
                  <Sparkles className="size-4 text-cyan-300" />
                  <span className="text-sm font-medium text-cyan-200">Pro</span>
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}