import { createApi } from "@reduxjs/toolkit/query/react";
import { sleep } from "utils";

import { Product } from "./interfaces";

const fakeData = {
  1: [
    {
      id: "1",
      description: "descr11",
      title: "title1",
      price: 10,
    },
    {
      id: "2",
      description: "descr12",
      title: "title12",
      price: 100,
    },
  ],
  2: [
    {
      id: "3",
      description: "descr23",
      title: "title1",
      price: 555,
    },
    {
      id: "4",
      description: "descr23",
      title: "title1",
      price: 1000,
    },
  ],
};

export const productApi = createApi({
  reducerPath: "product",
  refetchOnMountOrArgChange: true,
  tagTypes: ["Products"],
  baseQuery: async (params) => {
    console.log(params, "QUERY");
    await sleep(3000);
    return await {
      // @ts-ignore
      data: fakeData[params] as Product[],
    };
  },
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<Product[], string>({
      query: (categoryId) => `${categoryId}`,
      providesTags: (_result, _error, categoryId) => [
        { type: "Products", categoryId },
      ],
    }),
    getProduct: builder.query<Product, string>({
      query: (productId) => `${productId}`,
      providesTags: (_result, _error, productId) => [
        { type: "Products", productId },
      ],
    }),
    addProduct: builder.mutation<Product, Product>({
      query: (categoryId) => `${categoryId}`,
      invalidatesTags: (_result, _error, params) => [
        { type: "Products", categoryId: params.categoryId },
      ],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (categoryId) => `${categoryId}`,
      invalidatesTags: (_result, _error, params) => [
        { type: "Products", productId: params.id },
      ],
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productApi;
