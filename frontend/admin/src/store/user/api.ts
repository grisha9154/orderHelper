import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { getBaseQuery } from "store/baseQuery";
import { SignInPayload, SignUpPayload } from "./interfaces";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string }, SignInPayload>({
      query: (payload) => ({
        url: "signin",
        method: "POST",
        body: payload,
      }),
    }),
    signUp: builder.mutation<void, SignUpPayload>({
      query: (payload) => ({
        url: "signup",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useLogoutMutation } =
  userApi;
