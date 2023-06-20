import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { chatMessages, clearChatMessages, isChatNew } from "@/jotai/chat";

const useChat = ({ chatId, initialMessages, user }) => {
  const setMessages = useSetAtom(chatMessages);
  const [newChat, setNewChat] = useAtom(isChatNew);
  const clearChatAtom = useSetAtom(clearChatMessages);

  useEffect(() => {
    console.log("FIRST");
    if (newChat) {
      console.log("CHAT IS NEW");

      setNewChat(false);
    } else {
      console.log("interface, clearing chatmessages");
      clearChatAtom();

      console.log("chat is NOT NEW, setting initialMessages");
      setMessages([...initialMessages]);
    }
  }, [chatId]);
};

export default useChat;
