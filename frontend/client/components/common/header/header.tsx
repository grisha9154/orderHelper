import { FC } from "react";
import Link from "next/link";
import { AppBar, Container, Toolbar } from "@mui/material";

import { Styled } from "./styles";

export const Header: FC = () => {
  return (
    <Styled.AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Link href={"/"}>
            <div style={{ color: "red" }}>Главная</div>
          </Link>
          <Link href={"/product"}>
            <div style={{ color: "red" }}>Товары</div>
          </Link>
        </Container>
      </Toolbar>
    </Styled.AppBar>
  );
};
