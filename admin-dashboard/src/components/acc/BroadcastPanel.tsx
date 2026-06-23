"use client";

import { useState, useEffect } from "react";
import { Send, MessageSquare, Smartphone, Save, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BroadcastPanel() {
  const [tab, setTab] = useState<'new' | 'drafts'>('new');
  const [channel, setChannel] = useState<'whatsapp' | 'telegram'>('whatsapp');
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);
  const [drafts, setDrafts] = useState<any[]>([]);

  useEffect(() => {
    if (tab === 'drafts') {
      fetchDrafts();
    }
  }, [tab]);

  const fetchDrafts = async () => {
    const { data } = await supabase
      .from('messages_log')
      .select('*')
      .eq('status', 'draft')
      .order('timestamp', { ascending: false });
    
    if (data) setDrafts(data);
  };

  const handleAction = async (actionType: 'send' | 'draft', draftId?: string, draftData?: any) => {
    const msgChannel = draftData ? draftData.channel : channel;
    const msgRecipient = draftData ? draftData.recipient : recipient;
    const msgText = draftData ? draftData.message : message;

    if (!msgText || !msgRecipient) return;
    
    setLoading(true);
    setStatus(null);

    try {
      if (actionType === 'draft') {
        // Just save as draft
        const { error } = await supabase.from('messages_log').insert([{
          channel: msgChannel,
          recipient: msgRecipient,
          message: msgText,
          status: 'draft'
        }]);
        if (error) throw error;
        setStatus({ type: 'success', msg: 'Saved to drafts for approval.' });
        setMessage("");
      } else {
        // Actually send it
        const endpoint = msgChannel === 'whatsapp' ? '/api/whatsapp' : '/api/telegram';
        const body = msgChannel === 'whatsapp' ? { to: msgRecipient, message: msgText } : { chatId: msgRecipient, message: msgText };

        const res = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await res.json();

        if (data.success) {
          setStatus({ type: 'success', msg: 'Broadcast sent successfully!' });
          if (!draftData) setMessage("");
          
          // If approving a draft, update its status
          if (draftId) {
            await supabase.from('messages_log').update({ status: 'sent' }).eq('id', draftId);
            fetchDrafts();
          }
        } else {
          setStatus({ type: 'error', msg: data.error || 'Failed to send broadcast.' });
        }
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Network error.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex border-b border-slate-800 mb-2">
        <button 
          onClick={() => setTab('new')}
          className={`flex-1 pb-2 text-sm font-medium transition-colors ${tab === 'new' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}
        >
          New Broadcast
        </button>
        <button 
          onClick={() => setTab('drafts')}
          className={`flex-1 pb-2 text-sm font-medium transition-colors ${tab === 'drafts' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Pending Drafts
        </button>
      </div>

      {tab === 'new' ? (
        <>
          <div className="flex gap-2 p-1 bg-slate-950 rounded-lg">
            <button 
              onClick={() => setChannel('whatsapp')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${channel === 'whatsapp' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Smartphone size={16} /> WhatsApp
            </button>
            <button 
              onClick={() => setChannel('telegram')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${channel === 'telegram' ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <MessageSquare size={16} /> Telegram
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Recipient / Group ID</label>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={channel === 'whatsapp' ? "Phone number (+234...)" : "@channel_name or Chat ID"}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200"
              />
            </div>
            
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Message</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your broadcast message here..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 resize-none"
              />
            </div>

            {status && (
              <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                {status.msg}
              </div>
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => handleAction('draft')}
                disabled={loading || !message || !recipient}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} /> Save Draft
              </button>
              <button 
                onClick={() => handleAction('send')}
                disabled={loading || !message || !recipient}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : <><Send size={16} /> Send Now</>}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {drafts.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">No pending drafts.</p>
          ) : (
            drafts.map(draft => (
              <div key={draft.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold 
                    ${draft.channel === 'whatsapp' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {draft.channel}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{draft.recipient}</span>
                </div>
                <p className="text-sm text-slate-300 mb-3 whitespace-pre-wrap">{draft.message}</p>
                <button 
                  onClick={() => handleAction('send', draft.id, draft)}
                  disabled={loading}
                  className="w-full py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-medium rounded text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <CheckCircle size={14} /> Approve & Send
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
