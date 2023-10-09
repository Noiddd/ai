import { createServerClient } from "@/utils/supabase-server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { message, chatId, user } = await request.json();
  // If no message, return 400
  if (!message) {
    return new Response("No message!", { status: 400 });
  }

  try {
    // Create Supabase Server Client
    const supabase = createServerClient();

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: "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",
    });
    const embeddingRes = await embeddings.embedQuery(message);

    // Insert Message
    const { data, error } = await supabase
      .from("messages")
      .insert({
        profile: user?.id,
        chat: chatId,
        content:
          message || "Was unable to find an answer to that... Please rephrase",
        role: "ai",
        embedding: embeddingRes,
      })
      .select("*")
      .single();

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
  }
}
