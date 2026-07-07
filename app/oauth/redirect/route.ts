import { NextRequest, NextResponse } from "next/server";

const EVENTBRITE_TOKEN_URL = "https://www.eventbrite.com/oauth/token";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const apiKey = process.env.EVENTBRITE_API_KEY;
  const clientSecret = process.env.EVENTBRITE_CLIENT_SECRET;

  if (!apiKey || !clientSecret) {
    return NextResponse.json(
      { error: "Eventbrite OAuth credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const tokenResponse = await fetch(EVENTBRITE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: apiKey,
        client_secret: clientSecret,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      console.error("Eventbrite token exchange failed:", errorBody);
      return NextResponse.json(
        { error: "Failed to exchange authorization code" },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();

    console.log("Eventbrite OAuth token received:", {
      token_type: tokenData.token_type,
      scope: tokenData.scope,
    });

    const redirectUrl = new URL("/my-account", request.url);
    redirectUrl.searchParams.set("eventbrite_connected", "true");

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Eventbrite OAuth error:", error);
    return NextResponse.json(
      { error: "OAuth handshake failed" },
      { status: 500 }
    );
  }
}
