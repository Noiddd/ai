"use client";

import { createSlice } from "@reduxjs/toolkit";

export const MessagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    isChatNew: false,
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

    updateEmptyAIMessage: (state, action) => {
      const stateWithoutEmptyMessage = state.messages.slice(0, -1);

      return {
        ...state,
        messages: [...stateWithoutEmptyMessage, ...action.payload],
      };
    },

    chatIsNew: (state) => {
      return { ...state, isChatNew: true };
    },

    chatIsNotNew: (state) => {
      return { ...state, isChatNew: false };
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

export const {
  addMessageStore,
  clearMessageStore,
  updateEmptyAIMessage,
  chatIsNew,
  chatIsNotNew,
} = MessagesSlice.actions;

export default MessagesSlice.reducer;
