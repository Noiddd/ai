"use client";

import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./chatSlice";

// When passing in an object like {chat: chatReducer},
// that says that we want to have a state.chat section of our Redux state object,
// and that we want the chatReducer function to be in charge of deciding if and how to update the state.chat section
// whenever an action is dispatched.
export const store = configureStore({
  reducer: {
    messages: messageReducer,
  },
});
