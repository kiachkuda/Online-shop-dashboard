// app/api/mpesa/confirmation/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("🟢 CONFIRMATION CALLBACK:", payload);

  // TODO: save transaction to DB here

  return NextResponse.json({
    ResultCode: 0,
    ResultDesc: "Confirmation Received",
  });
}
