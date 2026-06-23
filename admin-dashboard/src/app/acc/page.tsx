import AIChatPanel from '@/components/acc/AIChatPanel';
import GoalTaskPanel from '@/components/acc/GoalTaskPanel';
import BroadcastPanel from '@/components/acc/BroadcastPanel';
import YGIPanel from '@/components/acc/YGIPanel';

export default function ACCDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: AI Assistant & Communication */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex-1 flex flex-col min-h-[400px]">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            AI Assistant
          </h2>
          <AIChatPanel />
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-indigo-400">Broadcast Center</h2>
          <BroadcastPanel />
        </section>
      </div>

      {/* Right Column: Goals, Tasks, and YGI Manager */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-amber-400">Goals & Tasks Engine</h2>
          <GoalTaskPanel />
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-blue-400">YGI Management</h2>
          <YGIPanel />
        </section>
      </div>
      
    </div>
  );
}
