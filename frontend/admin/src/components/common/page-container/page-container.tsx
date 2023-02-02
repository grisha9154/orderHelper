import React, { FC, PropsWithChildren } from "react";
import { Container, useTheme } from "@mui/material";

export const PageContainer: FC<PropsWithChildren> = (props) => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        [theme.breakpoints.up("xl")]: {
          maxWidth: "1620px",
        },
        [theme.breakpoints.between("lg", "xl")]: {
          maxWidth: "1290px",
        },
        [theme.breakpoints.between("md", "lg")]: {
          maxWidth: "960px",
        },
        [theme.breakpoints.between("sm", "md")]: {
          maxWidth: "630px",
        },
        [theme.breakpoints.down("sm")]: {
          maxWidth: "330px",
        },
      }}
      maxWidth="xl"
      disableGutters
    >
      {props.children}
    </Container>
  );
};
