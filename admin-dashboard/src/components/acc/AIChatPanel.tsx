"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

export default function AIChatPanel() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello Commander. I am ready. What would you like to plan today?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: data.reply || data.error || 'Connection error.' 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Network error communicating with AI Engine.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-3 rounded-2xl bg-slate-800 text-slate-400 rounded-tl-none border border-slate-700 text-sm">
              Thinking...
            </div>
          </div>
        )}
      </div>
      
      <div className="relative mt-auto">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Command the AI (e.g. Create task for YGI...)"
          className="w-full bg-slate-950 border border-slate-700 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-500"
          disabled={loading}
        />
        <button 
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
