"use client";

import { createSlice } from "@reduxjs/toolkit";

export const MessagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessageStore: (state, action) => {
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    },

    clearMessageStore: (state) => {
      return {
        ...state,
        messages: [],
      };
    },
    // deleteChat: (state, action) => {
    //   const chatId = action.payload.id;

    //   const newChatsArray = state.chats.filter((chat) => {
    //     return chat.id !== chatId;
    //   });

    //   return {
    //     ...state,
    //     chats: [...newChatsArray],
    //   };
    // },
  },
});

export const { addMessageStore, clearMessageStore } = MessagesSlice.actions;

export default MessagesSlice.reducer;
