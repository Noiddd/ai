import { createServerClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { message, chatId, user } = await request.json();
  // If no message, return 400
  if (!message) {
    return new Response("No message!", { status: 400 });
  }

  // Create Supabase Server Client
  const supabase = createServerClient();

  // Insert Message
  const { data, error } = await supabase
    .from("messages")
    .insert({
      profile: user?.id,
      chat: chatId,
      content:
        message || "Was unable to find an answer to that... Please rephrase",
      role: "ai",
    })
    .select("*")
    .single();

  return NextResponse.json({ data });
}
