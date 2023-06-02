import { useDispatch, useSelector } from "react-redux";
import {
  addMessageStore,
  chatHasMessages,
  chatIsNew,
  chatIsNotNew,
  clearMessageStore,
} from "@/redux/chatSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const useChat = ({ chatId, initialMessages, user }) => {
  const router = useRouter();

  // Checking if chat is new
  //   const searchParams = useSearchParams();
  //   const writableParams = useMemo(
  //     () => new URLSearchParams(searchParams.toString()),
  //     [searchParams]
  //   );
  //   const isChatNew = writableParams.get("new") === "true";

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

      // Clear new param in url
      // writableParams.delete("new");
      //router.replace(`/chat/${chatId}`);
    } else {
      console.log("Chat is NOT NEW");
      dispatch(addMessageStore(initialMessages));
    }
  }, [chatId]);

  //   useEffect(() => {
  //     console.log("change in initial message");

  //     dispatch(clearMessageStore());
  //     dispatch(addMessageStore(initialMessages));
  //   }, [initialMessages]);
};

export default useChat;
