import useAI from "@/utils/useAI";
import { createServerClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request, res) {
  const req = await request.json();

  const { prompt, chatId, user } = req;

  const supabase = createServerClient();

  // Checking for prompt
  if (!prompt) {
    console.log("prompt error");
    // res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  // Checking for chat id
  if (!chatId) {
    console.log("chatid error");

    // res.status(400).json({ answer: "Please provide a valid chat ID!" });
    return;
  }

  // Get AI response
  const response = await useAI(prompt);

  console.log("AI Response:");
  console.log(response.response);

  const { data, error } = await supabase
    .from("messages")
    .insert({
      profile: user?.id,
      chat: chatId,
      content:
        response.response ||
        "Was unable to find an answer to that... Please rephrase",
      role: "ai",
    })
    .select("*")
    .single();

  return NextResponse.json({ data });
}
