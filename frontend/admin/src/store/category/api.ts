import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { Category } from "./interfaces";

const sleep = (ms: number = 1000) => new Promise((r) => setTimeout(r, ms));

export const categoryApi = createApi({
  reducerPath: "category",
  refetchOnMountOrArgChange: true,
  tagTypes: ["Categories"],
  baseQuery: async () => {
    console.log("HELLO");
    await sleep(3000);
    return await {
      data: [
        {
          id: "1",
          description: "descr",
          title: "title1",
        },
        {
          id: "2",
          description: "descr",
          title: "title1",
        },
      ] as Category[],
    };
  },
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ``,
      providesTags: [{ type: "Categories" }],
    }),
    getCategory: builder.query<Category, string>({
      query: (productId) => `${productId}`,
      providesTags: (_result, _error, categoryId) => [
        { type: "Categories", categoryId },
      ],
    }),
    addCategory: builder.mutation<Category, Category>({
      query: (categoryId) => `${categoryId}`,
      invalidatesTags: [{ type: "Categories" }],
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (categoryId) => `${categoryId}`,
      invalidatesTags: (_result, _error, params) => [
        { type: "Categories", categoryId: params.id },
      ],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
