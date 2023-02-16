import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { RootState } from "./store";

export function getBaseQuery(params?: FetchBaseQueryArgs) {
  return fetchBaseQuery({
    ...params,
    baseUrl: params?.baseUrl
      ? `http://localhost:5000/api/${params.baseUrl}`
      : "http://localhost:5000/api",
    prepareHeaders: async (headers, api) => {
      if (params?.prepareHeaders) {
        const result = await params?.prepareHeaders(headers, api);

        if (result instanceof Headers) {
          headers = result;
        }
      }

      const token = (api.getState() as RootState).user.token;

      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });
}
