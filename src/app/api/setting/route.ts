import { NextResponse, type NextRequest } from "next/server";

export const runtime = "edge";

function handleGet(req: NextRequest) {
  console.log({req})
  return NextResponse.json({ message: "Hello, world!" });
}

function handlePost(req: NextRequest) {
  console.log({req})
  return NextResponse.json({ message: "Hello, world!" });
}

export const GET = handleGet;
export const POST = handlePost;
