// app/api/mpesa/validation/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("🟡 VALIDATION CALLBACK:", payload);

  // TODO: implement validation rules
  const valid = true;

  if (valid) {
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Accepted",
    });
  }

  return NextResponse.json({
    ResultCode: 1,
    ResultDesc: "Rejected",
  });
}
