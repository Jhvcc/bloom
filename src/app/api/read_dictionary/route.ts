import { STATIC_BASE_URL } from "@/app/constant";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const readDictionary = async (name: string) => {
  const url = `${STATIC_BASE_URL}/${name}.json`;
  const dictionary = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
  }});
  console.log({url, dictionary});
  return dictionary.json();
}

const handle = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  console.log({name});
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  const dictionary = await readDictionary(name);
  console.log({dictionary});
  return NextResponse.json(dictionary);
}

export const GET = handle;

