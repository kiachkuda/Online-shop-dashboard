// app/api/mpesa/register-urls/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mpesaPost } from "@/app/lib/mpesa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      ShortCode: process.env.MPESA_SHORTCODE,
      ResponseType: process.env.MPESA_RESPONSE_TYPE ?? "Completed",
      ConfirmationURL:
        body.confirmationUrl ??
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mpesa/confirmation`,
      ValidationURL:
        body.validationUrl ??
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mpesa/validation`,
    };

    const response = await mpesaPost("/mpesa/c2b/v1/registerurl", payload);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
