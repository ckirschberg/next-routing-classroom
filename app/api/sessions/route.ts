// app/api/sessions/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();

  const authHeader = req.headers.get("authorization");
  const jwt =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

  if (!jwt) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  });

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      starts_at: body.starts_at,
      ends_at: body.ends_at,
      title: body.title,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ event: data });
}
