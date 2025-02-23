import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare"

declare global {
  interface CloudflareEnv {
    STATIC_BASE_URL: string;
  }
}

const readDictionary = async (name: string) => {
  const { env }: {env: CloudflareEnv} = await getCloudflareContext()
  const url = `${env.STATIC_BASE_URL}/${name}.json`;
  const dictionary = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
  }});
  return dictionary.json();
}

const handle = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  const dictionary = await readDictionary(name);
  return NextResponse.json(dictionary);
}

export const GET = handle;

