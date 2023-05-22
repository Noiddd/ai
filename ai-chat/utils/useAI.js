import { openai } from "./openAi";
import { createParser } from "eventsource-parser";

const useAI = async (prompt) => {
  const res = await openai
    .call({ input: prompt })
    .catch(
      (err) =>
        `Chat was unable to find an answer for that! (Error: ${err.message})`
    );

  return res;

  let counter = 0;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      //callback

      function push(event) {
        if (event.type === "event") {
          const { data } = event;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";

            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }

            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (error) {
            controller.error(err);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(push);

      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};

export default useAI;
