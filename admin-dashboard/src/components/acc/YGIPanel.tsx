"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function YGIPanel() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('acc_ygi_members')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (data) setMembers(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Active Members</p>
            <p className="text-2xl font-bold text-slate-200">124</p>
          </div>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Current Cohort</p>
            <p className="text-2xl font-bold text-slate-200">#4</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-slate-300 text-sm font-medium">Recent Registrations</h3>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <UserPlus size={12} /> Add New
          </button>
        </div>

        {loading ? (
          <div className="text-sm text-slate-500 animate-pulse">Loading members...</div>
        ) : members.length === 0 ? (
          <div className="text-sm text-slate-500">No YGI members registered yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-3 py-2 rounded-tl-lg rounded-bl-lg">Student</th>
                  <th className="px-3 py-2">Age/Class</th>
                  <th className="px-3 py-2 rounded-tr-lg rounded-br-lg">Parent Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {members.map(member => (
                  <tr key={member.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-3 py-3 text-slate-200 font-medium">{member.student_name}</td>
                    <td className="px-3 py-3 text-slate-400">{member.age} • {member.class}</td>
                    <td className="px-3 py-3 text-slate-400 font-mono text-xs">{member.parent_phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
