import { atom } from "jotai";

export const aiResponse = atom("");

export const clearResponse = atom(null, (get, set) => {
  set(aiResponse, "");
});

export const chatMessages = atom([]);

export const isChatNew = atom(false);

export const clearChatMessages = atom(null, (get, set) => {
  set(chatMessages, []);
});

export const addMessageJotai = atom(null, (get, set, message) => {
  set(chatMessages, [...get(chatMessages), ...message]);
});

export const addSupabaseResponse = atom(
  null,
  async (get, set, user, chatId, prompt) => {
    try {
      const res = await fetch("/api/askQuestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          chatId,
          user,
        }),
      });

      if (!res.ok) {
        console.log("Response not ok", res);
        throw new Error(res.statusText);
      }

      // This data is a ReadableStream
      const data = res.body;
      if (!data) {
        console.log("No data from response.", data);
        throw new Error("No data from response.");
      }

      const reader = data.getReader();

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          console.log("this is the last response");
          console.log(get(aiResponse));

          try {
            const res = await fetch("/api/supabase", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: get(aiResponse),
                chatId,
                user,
              }),
            });
          } catch (error) {
            console.log(error);
          }

          break;
        }

        const text = new TextDecoder().decode(value);

        set(aiResponse, get(aiResponse) + text);

        const atomWithoutLastMessage = get(chatMessages).slice(0, -1);

        const aiMessage = [
          {
            profile: user?.id,
            chat: chatId,
            content: get(aiResponse),
            role: "ai",
          },
        ];

        set(chatMessages, [...atomWithoutLastMessage, ...aiMessage]);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
