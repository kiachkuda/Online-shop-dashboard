import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;
    if (!email) {
        return NextResponse.json({ error: "No email cookie found" }, { status: 400 });
    }
    return NextResponse.json({ email: email }, { status: 200 });
}