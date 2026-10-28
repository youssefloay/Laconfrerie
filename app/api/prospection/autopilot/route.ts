import { NextResponse } from 'next/server'
import { runAutopilotCycle } from '@/lib/autopilot-engine'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { zone, category, scrapeCount, sendImmediately, maxSendLimit } = body

    const result = await runAutopilotCycle({
      zone,
      category,
      scrapeCount: scrapeCount || 6,
      sendImmediately: sendImmediately ?? true,
      maxSendLimit: maxSendLimit || 3
    })

    return NextResponse.json({ success: true, result })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
