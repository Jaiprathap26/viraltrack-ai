import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { content, platform, niche } = await req.json()
    if (!content) return NextResponse.json({ error: "Content is required" }, { status: 400 })
    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2000,
      system: "You are ViralTrack.ai — an expert content virality analyst with deep knowledge of TikTok, Instagram Reels, YouTube Shorts, and social media algorithms. You analyze content and predict viral potential with high accuracy.",
      messages: [{
        role: "user",
        content: `Analyze the viral potential of this content:

Platform: ${platform}
Niche: ${niche}
Content: ${content}

Provide a detailed analysis:

## VIRAL SCORE: [X/100]
(Score based on hook strength, trend alignment, engagement triggers, shareability, algorithm factors)

## SCORE BREAKDOWN
- Hook Strength (0-25): [score] — [reason]
- Trend Alignment (0-25): [score] — [reason]
- Engagement Triggers (0-25): [score] — [reason]
- Algorithm Factors (0-25): [score] — [reason]

## VERDICT
[One sentence summary: Will it go viral? Why?]

## WHAT'S WORKING
[2-3 things done well]

## TOP 5 IMPROVEMENTS (ranked by impact)
1. [Most impactful change]
2.
3.
4.
5.

## REWRITTEN HOOK
[Rewrite just the opening 2-3 sentences to maximize the hook score]

## BEST POSTING TIME
[Specific day and time for ${platform} in IST/EST]

## TRENDING HASHTAGS TO ADD
[5 relevant hashtags currently trending in ${niche}]`
      }]
    })
    return NextResponse.json({ analysis: response.content[0].type === "text" ? response.content[0].text : "" })
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}