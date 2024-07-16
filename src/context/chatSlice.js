import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    user: {},
    chatId: null,
  },
  reducers: {
    addChatUser: (state, action) => {
      state.user = action.payload;
      state.chatId = action.payload.id;
    },
  },
});

export const { addChatUser } = chatSlice.actions;
export default chatSlice.reducer;
