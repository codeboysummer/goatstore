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
const emailInputSlice = createSlice({
  name: "email",
  initialState: { value: '' },
  reducers: {
    setemail: (state, action) => {
      state.value = action.payload;
    },
  },
});

const passwordInputSlice = createSlice({
  name: "password",
  initialState: { value: '' },
  reducers: {
    setpassword: (state, action) => {
      state.value = action.payload;
    },
  },
});

const userNameValidity = createSlice({
  name: "usernameIsValid",
  initialState: { value: true },
  reducers: {
    setusernameIsValid: (state, action) => {
      return { ...state, value: action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export const { setusernameIsValid } = userNameValidity.actions;
export const { setpassword } = passwordInputSlice.actions;
export const { setemail } = emailInputSlice.actions;

export const { setUsername } = usernameSlice.actions;

export default {
  user: userSlice.reducer,
  usernameIsValid: userNameValidity.reducer,
  username: usernameSlice.reducer,
  email: emailInputSlice.reducer,
  password: passwordInputSlice.reducer,
};
