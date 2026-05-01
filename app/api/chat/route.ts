import { NextRequest, NextResponse } from 'next/server';
import { HAMZA_SYSTEM_PROMPT, HAMZA_CONTEXT } from '@/lib/hamza-context';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'system',
            content: HAMZA_SYSTEM_PROMPT + '\n\n=== CONTEXT ===\n' + HAMZA_CONTEXT,
          },
          ...messages,
        ],
        max_tokens: 600,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json(
          { error: err.error?.message || 'API error' },
          { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      content: data.choices?.[0]?.message?.content || '',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}