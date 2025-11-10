// app/api/events/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";


export async function POST(req: Request) {
  const body = await req.json();

  console.log("body", body);

  // SUPABASE PART:
  // In Supabase, column type should be `timestamptz` (timestamp with time zone)
  // so that Postgres stores it as UTC.

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      starts_at: body.starts_at, // 2025-11-02T11:00:00.000Z
      ends_at: body.ends_at, // 2025-11-02T12:00:00.000Z
      title: body.title
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ event: data });
}
