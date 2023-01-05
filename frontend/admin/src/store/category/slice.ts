import { createSlice } from "@reduxjs/toolkit";

interface Category {
  id: string;
  title: string;
  description: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: Readonly<CategoryState> = {
  categories: [
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
  ],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export const { actions: categoryActions, reducer: categoryReducer } =
  categorySlice;
