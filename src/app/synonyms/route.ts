
export async function GET(request: Request) {
  return Response.json({ h: "Hi" });
}

export async function POST(request: Request) {
  console.log((await request.json()).hej);
  return Response.json("aa");
}
