import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function POST(request) {
  const { message, apiKey } = await request.json();

  if (!message) {
    return new Response("No message!", { status: 400 });
  }

  if (!apiKey) {
    return new Response("No key!", { status: 400 });
  }

  try {
    // creating embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: "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",
    });

    const embeddingRes = await embeddings.embedQuery(message);
    console.log("EMBEDDINGS");
    console.log(embeddingRes);

    return NextResponse.json({ embeddingRes });
  } catch (error) {}
}
