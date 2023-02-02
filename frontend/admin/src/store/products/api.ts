import { createApi } from "@reduxjs/toolkit/query/react";

import { getBaseQuery } from "store/baseQuery";

import {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from "./interfaces";

export const productApi = createApi({
  reducerPath: "product",
  refetchOnMountOrArgChange: true,
  tagTypes: ["Products"],
  baseQuery: getBaseQuery({
    baseUrl: "products",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string | void>({
      query: (categoryId) => (categoryId ? `?categoryId=${categoryId}` : ""),
      providesTags: (_result, _error, categoryId) => [
        { type: "Products", categoryId },
      ],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `${id}`,
      providesTags: (_result, _error, productId) => [
        { type: "Products", productId },
      ],
    }),
    createProduct: builder.mutation<Product, CreateProductPayload>({
      query: (model) => ({
        url: "",
        method: "POST",
        body: model,
      }),
      invalidatesTags: (_result, _error, params) => [
        { type: "Products", categoryId: params.categoryId },
      ],
    }),
    updateProduct: builder.mutation<Product, UpdateProductPayload>({
      query: (model) => ({
        url: "",
        method: "PUT",
        body: model,
      }),
      invalidatesTags: (_result, _error, params) => [
        { type: "Products", productId: params.id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;
