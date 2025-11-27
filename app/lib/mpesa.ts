// lib/mpesa.ts
export async function getAccessToken() {
  const key = process.env.MPESA_CONSUMER_KEY!;
  const secret = process.env.MPESA_CONSUMER_SECRET!;
  const baseUrl = process.env.MPESA_BASE_URL!;

  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await fetch(
    `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch M-Pesa Access Token");
  const data = await res.json();
  return data.access_token as string;
}

export async function mpesaPost(url: string, body: any) {
  const baseUrl = process.env.MPESA_BASE_URL!;
  const token = await getAccessToken();

  const res = await fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return res;
}
