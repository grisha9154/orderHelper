import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { getBaseQuery } from "store/baseQuery";

import {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "./interfaces";

export const categoryApi = createApi({
  reducerPath: "category",
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  tagTypes: ["Categories"],
  baseQuery: getBaseQuery({
    baseUrl: "categories",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "",
      providesTags: [{ type: "Categories" }],
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => `${id}`,
      providesTags: (_result, _error, categoryId) => [
        { type: "Categories", categoryId },
      ],
    }),
    createCategory: builder.mutation<Category, CreateCategoryPayload>({
      query: (model) => ({
        url: "",
        method: "POST",
        body: model,
      }),
      invalidatesTags: [{ type: "Categories" }],
    }),
    updateCategory: builder.mutation<Category, UpdateCategoryPayload>({
      query: (model) => ({
        url: "",
        method: "PUT",
        body: model,
      }),
      invalidatesTags: (_result, _error, params) => [
        { type: "Categories", categoryId: params.id },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
