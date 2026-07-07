import { NextRequest, NextResponse } from "next/server";

interface EbWebhookPayload {
  api_url: string;
  config_id: string;
  event_id: string;
  action: "event.created" | "event.updated" | "event.published" | "event.unpublished";
  user_id: string;
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-eventbrite-signature");

  if (!signature) {
    console.warn("Eventbrite webhook: missing signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  let payload: EbWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  console.log("Eventbrite webhook received:", {
    action: payload.action,
    event_id: payload.event_id,
    config_id: payload.config_id,
  });

  try {
    const token = process.env.EVENTBRITE_PRIVATE_TOKEN;
    if (token) {
      const eventResponse = await fetch(payload.api_url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (eventResponse.ok) {
        const eventData = await eventResponse.json();
        console.log(`Event ${payload.action}: "${eventData.name?.text}" (${payload.event_id})`);
      }
    }
  } catch (error) {
    console.error("Eventbrite webhook: failed to fetch event details:", error);
  }

  return NextResponse.json({ received: true });
}
