import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import searchUser from "./searchUser";
import chatSlice from "./chatSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    filteredSearch: searchUser,
    chat: chatSlice,
  },
});

export default appStore;
