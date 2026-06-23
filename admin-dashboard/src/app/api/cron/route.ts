import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// This endpoint is meant to be called by a free cron service (like cron-job.org)
// every day (e.g., at 8:00 AM) to evaluate tasks and goals.
export async function GET(req: Request) {
  try {
    // Optional: Add a simple secret key check so not anyone can trigger the cron
    const { searchParams } = new URL(req.url);
    const cronSecret = searchParams.get('secret');
    if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch overdue tasks
    const { data: overdueTasks } = await supabaseAdmin
      .from('tasks')
      .select('*, goals(user_id, acc_users(phone, telegram_id))')
      .eq('status', 'pending')
      .lt('due_date', new Date().toISOString());

    // 2. Draft an accountability message if there are overdue tasks
    if (overdueTasks && overdueTasks.length > 0) {
      console.log(`Found ${overdueTasks.length} overdue tasks.`);
      
      const draftMessage = `⚠️ Accountability Alert!\nYou have ${overdueTasks.length} overdue tasks waiting for your attention. Please check your ACC dashboard.`;
      
      // We assume the user's personal telegram ID or whatsapp number is stored somewhere or we broadcast to a predefined admin channel
      // For now, drafting it to 'admin_channel'
      await supabaseAdmin.from('messages_log').insert([{
        channel: 'telegram',
        recipient: 'admin_channel',
        message: draftMessage,
        status: 'draft'
      }]);
    }

    return NextResponse.json({ success: true, message: 'Cron executed successfully (Drafts created)' });
  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
