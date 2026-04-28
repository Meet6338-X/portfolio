import { NextRequest, NextResponse } from 'next/server';
import { portfolioConfig } from '@/config/portfolio.config';
import { buildSystemPrompt } from '@/lib/utils';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, visitorType } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const systemPrompt = buildSystemPrompt(portfolioConfig, visitorType);
    const { aiChat } = portfolioConfig;

    // Try primary model first, fall back to secondary
    const models = [aiChat.model, aiChat.fallbackModel, 'meta-llama/llama-3.1-8b-instruct:free'];

    let lastError: string = '';
    for (const model of models) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': `${portfolioConfig.name} Portfolio`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-10), // keep last 10 messages for context window
            ],
            max_tokens: 1024,
            temperature: 0.75,
            stream: false,
          }),
        });

        if (!response.ok) {
          const err = await response.text();
          lastError = err;
          continue; // try next model
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
          lastError = 'Empty response from model';
          continue;
        }

        // Detect visitor type from conversation if not already set
        let detectedVisitorType = visitorType;
        if (!visitorType) {
          const lowerMessages = messages.map((m: any) => m.content?.toLowerCase() || '').join(' ');
          if (/recruiter|hiring|position|role|opportunity|hr|talent/i.test(lowerMessages)) {
            detectedVisitorType = 'recruiter';
          } else if (/developer|engineer|code|tech|stack|api|framework|architecture/i.test(lowerMessages)) {
            detectedVisitorType = 'developer';
          }
        }

        return NextResponse.json({
          message: content,
          model,
          detectedVisitorType,
        });
      } catch (modelErr) {
        lastError = String(modelErr);
        continue;
      }
    }

    return NextResponse.json(
      { error: `All models failed. Last error: ${lastError}` },
      { status: 503 }
    );
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
