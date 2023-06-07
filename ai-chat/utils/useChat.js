import { useDispatch, useSelector } from "react-redux";
import {
  addMessageStore,
  chatIsNotNew,
  clearMessageStore,
} from "@/redux/chatSlice";
import { useEffect } from "react";

const useChat = ({ chatId, initialMessages, user }) => {
  const dispatch = useDispatch();

  const isChatNew = useSelector((state) => state.messages.isChatNew);

  useEffect(() => {
    dispatch(clearMessageStore());

    console.log("FIRST");
    if (isChatNew) {
      console.log("CHAT IS NEW");
      dispatch(addMessageStore(initialMessages));

      const emptyAiMessage = [
        {
          profile: user?.id,
          chat: chatId,
          content: "",
          role: "ai",
        },
      ];

      dispatch(addMessageStore(emptyAiMessage));

      dispatch(chatIsNotNew());
    } else {
      console.log("Chat is NOT NEW");
      dispatch(addMessageStore(initialMessages));
    }
  }, [chatId]);
};

export default useChat;
