import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabaseAdmin } from '@/lib/supabase';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // The system prompt defines the AI's persona and available "actions" (like creating tasks).
    const systemInstruction = `You are the AI Command Center Assistant for the Omoluabi Rebirth Movement (ORM) admin dashboard. 
Your role is to help manage goals, tasks, YGI members, and communication.
You can parse natural language commands to extract intent. 
If the user asks you to create a task, identify the task title, description, and priority, and format your response like:
[ACTION: CREATE_TASK]
Title: <title>
Description: <desc>
Priority: <high/medium/low>

If the user wants to set a goal:
[ACTION: CREATE_GOAL]
Title: <title>
Category: <personal/business/YGI/education>

If the user wants to send a message or blast (always draft it for approval):
[ACTION: DRAFT_MESSAGE]
Channel: <whatsapp/telegram>
Recipient: <phone number or ID>
Message: <the message content>

Otherwise, respond conversationally as a helpful, professional, and action-oriented leadership assistant.`;

    // Construct the prompt
    const fullPrompt = `${systemInstruction}\n\nUser: ${message}\nAssistant:`;

    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    // Naive parsing for actions (in a production app, use function calling / tools feature of Gemini)
    if (responseText.includes('[ACTION: CREATE_TASK]')) {
      const titleMatch = responseText.match(/Title:\s*(.+)/);
      const descMatch = responseText.match(/Description:\s*(.+)/);
      const priorityMatch = responseText.match(/Priority:\s*(.+)/);

      const title = titleMatch ? titleMatch[1].trim() : 'New Task';
      const description = descMatch ? descMatch[1].trim() : '';
      const priority = priorityMatch ? priorityMatch[1].trim().toLowerCase() : 'medium';

      // Insert into Supabase
      const { error } = await supabaseAdmin
        .from('tasks')
        .insert([{ title, description, priority, status: 'pending' }]);

      if (error) console.error('Error creating task:', error);
    }

    if (responseText.includes('[ACTION: DRAFT_MESSAGE]')) {
      const channelMatch = responseText.match(/Channel:\s*(.+)/i);
      const recipientMatch = responseText.match(/Recipient:\s*(.+)/i);
      const msgMatch = responseText.match(/Message:\s*(.+)/i);

      const channel = channelMatch ? channelMatch[1].trim().toLowerCase() : 'whatsapp';
      const recipient = recipientMatch ? recipientMatch[1].trim() : '';
      const draftedMessage = msgMatch ? msgMatch[1].trim() : '';

      if (recipient && draftedMessage) {
        const { error } = await supabaseAdmin
          .from('messages_log')
          .insert([{ channel, recipient, message: draftedMessage, status: 'draft' }]);
        
        if (error) console.error('Error creating draft:', error);
      }
    }
    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
