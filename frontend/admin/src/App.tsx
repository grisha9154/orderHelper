import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import {
  CategoryListingPage,
  CategoryCreatePage,
  CategoryEditPage,
} from "./pages";
import { NavBar, PageContainer } from "./components";
import { Path } from "global-constants";

import { ThemeProvider } from "@mui/material";

import { theme } from "styles/theme";
import "styles/index.css";

const tabs = [
  {
    title: "Категории",
    path: Path.CATEGORY,
  },
];

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar tabs={tabs} />

          <PageContainer>
            <Routes>
              <Route path={`${Path.CATEGORY}`}>
                <Route index element={<CategoryListingPage />} />
                <Route path="create" element={<CategoryCreatePage />} />
                <Route path="edit/:id" element={<CategoryEditPage />} />
              </Route>
            </Routes>
          </PageContainer>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
