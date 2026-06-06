import { Users, Calendar, Award, Database, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Disable static caching so data is fresh

export default async function AdminDashboard() {
  // Fetch real data from Supabase
  const { data: members, error: membersError } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const { count: totalMembers } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true });

  const { data: calendarItems } = await supabase
    .from('content_calendar')
    .select('*')
    .order('date_to_publish', { ascending: true })
    .limit(3);

  const recentMembers = members || [];
  const upcomingContent = calendarItems || [];
  const memberCount = totalMembers || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-700 text-white font-bold px-3 py-1 rounded-md">ORM</div>
          <span className="text-xl font-semibold">Admin Workspace</span>
        </div>
        <div className="flex space-x-4">
          <button className="text-sm font-medium hover:text-green-700 transition">Settings</button>
          <button className="text-sm font-medium hover:text-green-700 transition">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar Menu */}
        <aside className="md:col-span-3 flex flex-col space-y-2">
          <button className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-800 rounded-lg font-medium">
            <TrendingUp size={20} />
            <span>Overview</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">
            <Users size={20} />
            <span>Members (CRM)</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">
            <Calendar size={20} />
            <span>Content Calendar</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">
            <Award size={20} />
            <span>Leaderboard</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">
            <Database size={20} />
            <span>Sponsorships</span>
          </button>
        </aside>

        {/* Dashboard Panels */}
        <section className="md:col-span-9 space-y-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Total Members</h3>
              <p className="text-3xl font-bold mt-2">{memberCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">100 Future Leaders</h3>
              <p className="text-3xl font-bold mt-2 text-green-600">{memberCount} <span className="text-sm font-normal text-gray-400">/ 100</span></p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Active Referrals</h3>
              <p className="text-3xl font-bold mt-2">-</p>
            </div>
          </div>

          {/* Recent Members Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Recent 100 Future Leaders Applications</h2>
              <button className="text-sm text-green-600 font-medium hover:underline">View All</button>
            </div>
            {recentMembers.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                <Database size={32} className="mx-auto text-gray-300 mb-3" />
                <p>No members found. Form submissions will appear here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {recentMembers.map((member: any) => (
                  <li key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.phone} • {member.email}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {member.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Content Calendar Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Upcoming AI Content (NINUOYO TV)</h2>
              <button className="text-sm text-green-600 font-medium hover:underline">Manage Schedule</button>
            </div>
            {upcomingContent.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                <Calendar size={32} className="mx-auto text-gray-300 mb-3" />
                <p>No upcoming content. AI Agent will schedule posts here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {upcomingContent.map((content: any) => (
                  <li key={content.id} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{content.content_type} <span className="text-sm font-normal text-gray-500">on {content.platform}</span></p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{content.text_prompt}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      {content.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}
