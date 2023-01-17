import { FC, PropsWithChildren } from "react";

import { Styled } from "./styles";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return <Styled.Main component="main">{children}</Styled.Main>;
};
