import { createSlice } from "@reduxjs/toolkit";

const searchUser = createSlice({
  name: "filteredSearchUser",
  initialState: {
    users: [],
  },
  reducers: {
    addFiltered: (state, action) => {
      state.users.push(action.payload);
    },
    removeFilter: (state, action) => {
      state.users = [];
    },
  },
});

export const { addFiltered, removeFilter } = searchUser.actions;
export default searchUser.reducer;
