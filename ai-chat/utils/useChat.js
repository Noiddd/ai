import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addMessageJotai,
  chatMessages,
  clearChatMessages,
  isChatNew,
} from "@/jotai/chat";

const useChat = ({ chatId, initialMessages, user }) => {
  // const isChatNew = useSelector((state) => state.messages.isChatNew);

  const [messages, setMessages] = useAtom(chatMessages);
  const [newChat, setNewChat] = useAtom(isChatNew);
  const clearChatAtom = useSetAtom(clearChatMessages);
  const addMessageAtom = useSetAtom(addMessageJotai);

  useEffect(() => {
    //setMessages([]);
    clearChatAtom();

    console.log("FIRST");
    if (newChat) {
      console.log("CHAT IS NEW");

      setMessages([...initialMessages]);

      const emptyAiMessage = [
        {
          profile: user?.id,
          chat: chatId,
          content: "",
          role: "ai",
        },
      ];

      addMessageAtom(emptyAiMessage);

      setNewChat(false);
    } else {
      console.log("Chat is NOT NEW");

      setMessages([...initialMessages]);
    }
  }, [chatId]);
};

export default useChat;
