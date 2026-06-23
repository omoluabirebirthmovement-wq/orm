"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function GoalTaskPanel() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    // Use the anon client since this runs on the client side
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (data) setTasks(data);
    setLoading(false);
  };

  const toggleTask = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
    fetchTasks();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-slate-300 text-sm font-medium">Recent Priority Tasks</h3>
        <button onClick={fetchTasks} className="text-xs text-indigo-400 hover:text-indigo-300">Refresh</button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500 animate-pulse">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-sm text-slate-500">No active tasks found. Ask the AI to create one!</div>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task.id} className="flex items-start gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <button onClick={() => toggleTask(task.id, task.status)} className="mt-0.5 shrink-0">
                {task.status === 'completed' 
                  ? <CheckCircle2 size={18} className="text-emerald-500" />
                  : <Circle size={18} className="text-slate-500" />
                }
              </button>
              <div className="flex-1">
                <p className={`text-sm ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-xs text-slate-500 mt-1">{task.description}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold 
                    ${task.priority === 'high' ? 'bg-rose-500/10 text-rose-400' : 
                      task.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' : 
                      'bg-slate-700/50 text-slate-400'}`}>
                    {task.priority}
                  </span>
                  {task.due_date && (
                    <span className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Clock size={10} />
                      {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
