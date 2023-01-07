import { FC } from "react";
import { TextFieldProps } from "@mui/material";

import { Styled } from "./styled";

export type TextInputProps = TextFieldProps;

export const TextInput: FC<TextInputProps> = (props) => {
  return <Styled.TextInput {...props} sx={{ width: "100%" }} />;
};
