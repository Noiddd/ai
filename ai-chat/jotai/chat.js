import { atom } from "jotai";

export const aiResponse = atom("");

export const updateResponse = atom(null, (get, set, responseStream) => {
  set(aiResponse, get(aiResponse) + responseStream);
});

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

export const addAIResponse = atom(null, (get, set, user, chatId) => {
  const chatMessagesWithoutLoading = get(chatMessages).splice(-1);

  const aiMessage = [
    {
      profile: user?.id,
      chat: chatId,
      content: get(aiResponse),
      role: "ai",
    },
  ];
  set(chatMessages, [...chatMessagesWithoutLoading, ...aiMessage]);
});

export const updateAIResponse = atom(null, (get, set, user, chatId) => {
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
});
