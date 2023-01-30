import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { value: null },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});
const usernameSlice = createSlice({
  name: "username",
  initialState: { value: null },
  reducers: {
    setUsername: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const { setUsername } = usernameSlice.actions;

export default {
  counter: counterSlice.reducer,
  word: wordSlice.reducer,
  user: userSlice.reducer,
  username: usernameSlice.reducer,
};
