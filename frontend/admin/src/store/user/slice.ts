import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userApi } from "./api";
import { UserState } from "./interfaces";
import { Token } from "./token";

export const slice = createSlice({
  name: "user",
  initialState: (): UserState => {
    const token = Token.get();

    return {
      token,
      login: token && Token.parse(token).user,
      isAuth: !!token,
    };
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        Token.set(payload.token);
        const { user } = Token.parse(payload.token);

        state.token = payload.token;
        state.login = user;
        state.isAuth = true;
      }
    );

    builder.addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
      Token.remove();

      delete state.token;
      delete state.login;
      state.isAuth = false;
    });
  },
});

export const { reducer: userReducer } = slice;
