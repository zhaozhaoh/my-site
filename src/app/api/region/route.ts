// app/api/region/route.ts
export async function GET() {
  return Response.json({ region: process.env.VERCEL_REGION || 'unknown' });
}
