import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { getBaseQuery } from "store/baseQuery";
import {
  CreateExpenseCategoryPayload,
  CreateExpensePayload,
  Expense,
  ExpenseCategory,
  GetExpenseCategoriesPayload,
  GetExpenseCategoriesResult,
  GetExpenseCategoryPayload,
  UpdateExpenseCategoryPayload,
} from "./interfaces";

export const expenseApi = createApi({
  reducerPath: "expenseCategory",
  tagTypes: ["ExpenseCategories"],
  refetchOnMountOrArgChange: true,
  baseQuery: getBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getExpenseCategories: builder.query<
      GetExpenseCategoriesResult,
      GetExpenseCategoriesPayload
    >({
      query: ({ filter } = {}) => {
        let queryStr = `expense-category`;

        if (filter) {
          queryStr = `${queryStr}?from=${filter.from.toDateString()}&to=${filter.to.toDateString()}`;
        }

        return queryStr;
      },
      providesTags: ["ExpenseCategories"],
    }),
    getExpenseCategory: builder.query<
      ExpenseCategory,
      GetExpenseCategoryPayload
    >({
      query: ({ id, filter }) => {
        let queryStr = `expense-category/${id}`;

        if (filter) {
          queryStr = `${queryStr}?includeExpenses=true&from=${filter.from.toDateString()}&to=${filter.to.toDateString()}`;
        }

        return queryStr;
      },
      providesTags: (_result, _error, expenseCategoryId) => [
        { type: "ExpenseCategories", expenseCategoryId },
      ],
    }),
    createExpenseCategory: builder.mutation<
      ExpenseCategory,
      CreateExpenseCategoryPayload
    >({
      query: (model) => ({
        url: "expense-category",
        method: "POST",
        body: model,
      }),
      invalidatesTags: ["ExpenseCategories"],
    }),
    updateExpenseCategory: builder.mutation<
      ExpenseCategory,
      UpdateExpenseCategoryPayload
    >({
      query: (model) => ({
        url: "expense-category",
        method: "PUT",
        body: model,
      }),
      invalidatesTags: (_result, _error, params) => [
        { type: "ExpenseCategories", expenseCategoryId: params.id },
      ],
    }),
    createExpense: builder.mutation<Expense, CreateExpensePayload>({
      query: (model) => ({
        url: "expense",
        method: "POST",
        body: model,
      }),
      invalidatesTags: (_result, _error, params) => [
        {
          type: "ExpenseCategories",
          expenseCategoryId: params.expenseCategoryId,
        },
      ],
    }),
  }),
});

export const {
  useLazyGetExpenseCategoriesQuery,
  useGetExpenseCategoryQuery,
  useLazyGetExpenseCategoryQuery,
  useCreateExpenseCategoryMutation,
  useUpdateExpenseCategoryMutation,
  useCreateExpenseMutation,
} = expenseApi;
