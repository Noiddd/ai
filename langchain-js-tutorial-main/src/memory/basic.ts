import { OpenAI } from "langchain/llms";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
/**
 * Gives a chain the ability to remember information from previous interactions.
 * This is useful for chatbots and conversation bots.
 *
 * `ConversationChain` is a simple type of memory that remembers all previous conversations
 * and adds them as context that is passed to the LLM.
 */

export const run = async () => {
  const model = new OpenAI({});

  //buffer memory remembers previous conversational back and forths directly
  const memory = new BufferMemory();
  const chain = new ConversationChain({ llm: model, memory: memory });

  const firstResponse = await chain.call({
    input: "Hello, I am Dion and im working as a software engineer.",
  });
  console.log(firstResponse);

  const secondResponse = await chain.call({ input: "What's my name and job?" });
  console.log(secondResponse);
 };
