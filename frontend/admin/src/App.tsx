import React, { FC, useLayoutEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import {
  CategoryListingPage,
  CategoryCreatePage,
  CategoryEditPage,
  ProductListingPage,
  SignInPage,
  SignUpPage,
} from "./pages";
import { Header, NavBar, PageContainer } from "./components";
import { Path } from "global-constants";

import "styles/index.css";
import { ProductCreatePage } from "pages/product/create";
import { ProductEditPage } from "pages/product/edit";
import { useAppSelector } from "store";

const RedirectToSignIn: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    navigate(Path.SIGN_IN);
  }, [navigate, pathname]);

  return null;
};

const App: FC = () => {
  const isAuth = useAppSelector(({ user }) => user.isAuth);

  return (
    <>
      <Header />
      <PageContainer>
        {!isAuth && (
          <Routes>
            <Route path={Path.SIGN_IN} element={<SignInPage />} />
            <Route path={Path.SIGN_UP} element={<SignUpPage />} />
            <Route path="*" element={<RedirectToSignIn />} />
          </Routes>
        )}
        <Routes>
          <Route path={Path.CATEGORY}>
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
    </>
  );
};

export default App;
