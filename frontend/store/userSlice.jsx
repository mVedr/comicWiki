"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currId: 0,
  currUserName: "",
  currEmail: "",
  adminIds: [],
  modIds: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReduxId: (state, action) => {
      state.currId = action.payload;
    },
    setReduxUserName: (state, action) => {
      state.currUserName = action.payload;
    },
    setReduxEmail: (state, action) => {
      state.currEmail = action.payload;
    },
    setAdminOf: (state, action) => {
      state.adminOf = action.payload;
    },
    setModOf: (state, action) => {
      state.modOf = action.payload;
    },
  },
});

export const {
  setReduxEmail,
  setReduxId,
  setReduxUserName,
  setAdminOf,
  setModOf,
} = userSlice.actions;
export default userSlice.reducer;
