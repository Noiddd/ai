import streamResponse from "@/utils/streamResponse";

export async function POST(request) {
  const { prompt, chatId, user } = await request.json();

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

  const stream = streamResponse(prompt);

  return new Response(await stream);
}
