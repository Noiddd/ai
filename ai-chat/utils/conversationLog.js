import { createServerClient } from "./supabase-server";

class ConversationLog {
  async getConversationHistory({ chatId, limit }) {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat", chatId)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error && !data) {
      console.log(error);
      return;
    }

    const response = data
      ? data.map((message) => {
          return `${message.role.toUpperCase()}: ${message.content}`;
        })
      : [];

    return response;
  }
}
export { ConversationLog };
