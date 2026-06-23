import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Webhook receiver for incoming Telegram messages (if needed)
export async function POST(req: Request) {
  try {
    const update = await req.json();
    
    // Process incoming message
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      // Log to messages_log
      await supabaseAdmin.from('messages_log').insert([{
        channel: 'telegram',
        recipient: chatId.toString(),
        message: text,
        status: 'received'
      }]);

      // Simple echo or handling
      // if (text.startsWith('/start')) ...
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Telegram Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

// Endpoint to broadcast messages to a specific chat/channel
export async function PUT(req: Request) {
  try {
    const { chatId, message } = await req.json();

    if (!chatId || !message) {
      return NextResponse.json({ error: 'chatId and message required' }, { status: 400 });
    }

    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ error: 'Telegram bot token missing' }, { status: 500 });
    }

    // Send via Telegram API
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await response.json();

    // Log to Supabase
    await supabaseAdmin.from('messages_log').insert([{
      channel: 'telegram',
      recipient: chatId.toString(),
      message: message,
      status: data.ok ? 'sent' : 'failed'
    }]);

    if (!data.ok) {
      return NextResponse.json({ error: data.description }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Telegram Broadcast Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
