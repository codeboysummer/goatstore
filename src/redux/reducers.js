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
  initialState: { value: "" },
  reducers: {
    setemail: (state, action) => {
      state.value = action.payload;
    },
  },
});

const passwordInputSlice = createSlice({
  name: "password",
  initialState: { value: "" },
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
const cardNameSlice = createSlice({
  name: "cardName",
  initialState: { value: "" },
  reducers: {
    setcardName: (state, action) => {
      state.value = action.payload;
    },
  },
});
const cardCompletedSlice = createSlice({
  name: "cardCompleted",
  initialState: { value: false },
  reducers: {
    setcardCompleted: (state, action) => {
      state.value = action.payload;
    },
  },
});
const tagSlice = createSlice({
  name: "tags",
  initialState: { value: [] },
  reducers: {
    setTags: (state, action) => {
      state.value = [action.payload];
    },
    addTag: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

const CardSlice = createSlice({
  name: "cards",
  initialState: { value: [] },
  reducers: {
    setcards: (state, action) => {
      state.value = action.payload;
    },
    addCards: (state, action) => {
      if (state.value.length > 0) {
        state.value = [...state.value, action.payload];
      }
      state.value = [action.payload];
    },
  },
});
const activeMeteorSlice = createSlice({
  name: "active",
  initialState: { value: false },
  reducers: {
    setactive: (state, action) => {
      state.value = action.payload;
    },
  },
});
const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState: { value: null },
  reducers: {
    setcurrentBoard: (state, action) => {
      state.value = action.payload;
    },
  },
});
const currentListDataSlice = createSlice({
  name: "currentList",
  initialState: { value: null },
  reducers: {
    setcurrentList: (state, action) => {
      state.value = action.payload;
    },
  },
});

// const sampleData = [
//   {
//     title: "💡 Ideas",
//     cards: [
//       {
//         name: "create new react components",
//         completed: false,
//         tags: [{ name: "figma", color: "red" }],
//         notes: [{ username: "usernames", note: "finish this project pls" }],
//       },
//     ],
//   },
// ];
export const { setcards, addCards } = CardSlice.actions;
export const { setcurrentList } = currentListDataSlice.actions;
export const { setcurrentBoard } = currentBoardSlice.actions;
export const { setactive } = activeMeteorSlice.actions;
export const { setTags, addTag } = tagSlice.actions;
export const { setcardName } = cardNameSlice.actions;
export const { setcardCompleted } = cardCompletedSlice.actions;
export const { setUser } = userSlice.actions;
export const { setusernameIsValid } = userNameValidity.actions;
export const { setpassword } = passwordInputSlice.actions;
export const { setemail } = emailInputSlice.actions;

export const { setUsername } = usernameSlice.actions;

export default {
  currentList: currentListDataSlice.reducer,
  cards: CardSlice.reducer,
  user: userSlice.reducer,
  usernameIsValid: userNameValidity.reducer,
  username: usernameSlice.reducer,
  email: emailInputSlice.reducer,
  password: passwordInputSlice.reducer,
  cardName: cardNameSlice.reducer,
  cardCompleted: cardCompletedSlice.reducer,
  tags: tagSlice.reducer,
  active: activeMeteorSlice.reducer,
  currentBoard: currentBoardSlice.reducer,
};
