import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import {
  CategoryListingPage,
  CategoryCreatePage,
  CategoryEditPage,
  ProductListingPage,
} from "./pages";
import { NavBar, PageContainer } from "./components";
import { Path } from "global-constants";

import "styles/index.css";
import { ProductCreatePage } from "pages/Product/Create";
import { ProductEditPage } from "pages/Product/Edit";

const tabs = [
  {
    title: "Категории",
    path: Path.CATEGORY,
  },
  {
    title: "Товары",
    path: Path.PRODUCT,
  },
];

const App = () => {
  return (
    <BrowserRouter>
      <NavBar tabs={tabs} />

      <PageContainer>
        <Routes>
          <Route path={`${Path.CATEGORY}`}>
            <Route index element={<CategoryListingPage />} />
            <Route path="create" element={<CategoryCreatePage />} />
            <Route path="edit/:id" element={<CategoryEditPage />} />
          </Route>
          <Route path={`${Path.PRODUCT}/:id?`}>
            <Route index element={<ProductListingPage />} />
            <Route path="create" element={<ProductCreatePage />} />
            <Route path="edit/:id" element={<ProductEditPage />} />
          </Route>
        </Routes>
      </PageContainer>
    </BrowserRouter>
  );
};

export default App;
