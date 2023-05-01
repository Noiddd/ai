const { useAuth } = require("@/components/providers/supabase-auth-provider");
const { useSupabase } = require("@/components/providers/supabase-provider");
import { useEffect } from "react";
import useSWR from "swr";

const useChats = () => {
  const { user } = useAuth();
  const { supabase } = useSupabase();

  const getChats = async () => {
    const { data, error } = await supabase
      .from("chat")
      .select("*")
      .eq("profile", user?.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    user ? ["chat", user.id] : null,
    getChats
  );

  // set chats
  useEffect(() => {}, [data]);

  return { data, error, isLoading, mutate };
};

export default useChats;
