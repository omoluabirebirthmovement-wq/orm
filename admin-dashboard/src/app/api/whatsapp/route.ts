import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// This endpoint receives webhooks from the free Node.js whatsapp-web.js service
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // { event: 'message_received', from: '...', body: '...' }
    if (data.event === 'message_received') {
      await supabaseAdmin.from('messages_log').insert([{
        channel: 'whatsapp',
        recipient: data.from,
        message: data.body,
        status: 'received'
      }]);
      // Can add auto-reply logic here
    } else if (data.event === 'message_sent') {
      // update status in DB
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('WhatsApp Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

// Endpoint to trigger a WhatsApp message to be sent via the background service
export async function PUT(req: Request) {
  try {
    const { to, message } = await req.json();
    
    if (!to || !message) {
      return NextResponse.json({ error: 'to and message required' }, { status: 400 });
    }

    const WHATSAPP_SERVICE_URL = process.env.WHATSAPP_SERVICE_URL || 'http://localhost:3001';

    // Call the external background service
    const response = await fetch(`${WHATSAPP_SERVICE_URL}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message }),
    });

    const result = await response.json();

    // Log to Supabase
    await supabaseAdmin.from('messages_log').insert([{
      channel: 'whatsapp',
      recipient: to,
      message: message,
      status: result.success ? 'sent' : 'failed'
    }]);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('WhatsApp Send Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
