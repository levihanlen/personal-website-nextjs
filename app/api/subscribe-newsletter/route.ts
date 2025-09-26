// app/api/subscribe/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const FORM_ID = process.env.CONVERTKIT_FORM_ID;
  const API_KEY = process.env.CONVERTKIT_API_KEY;
  const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`;

  if (!FORM_ID || !API_KEY) {
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: API_KEY,
        email: email,
      }),
    });

    if (res.status >= 400) {
      const data = await res.json();
      console.error("ConvertKit API error:", data);
      return NextResponse.json(
        { error: "There was an error subscribing. Please try again." },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Success! Please check your email to confirm." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
