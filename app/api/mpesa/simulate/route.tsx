// app/api/mpesa/simulate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mpesaPost } from "@/app/lib/mpesa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      ShortCode: process.env.MPESA_SHORTCODE,
      CommandID: body.CommandID ?? "CustomerPayBillOnline",
      Amount: body.Amount ?? "1",
      Msisdn: body.Msisdn ?? "254708374149",
      BillRefNumber: body.BillRefNumber ?? "TestRef",
    };

    const response = await mpesaPost("/mpesa/c2b/v1/simulate", payload);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
