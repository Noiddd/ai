import { openai } from "./openAi";

const useAI = async (prompt) => {
  const res = await openai
    .call({ input: prompt })
    .catch(
      (err) =>
        `Chat was unable to find an answer for that! (Error: ${err.message})`
    );

  return res;
};

export default useAI;
