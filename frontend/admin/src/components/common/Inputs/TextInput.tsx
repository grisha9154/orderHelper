import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";

export type TextInputProps = TextFieldProps;

export const TextInput: FC<TextInputProps> = (props) => {
  return <TextField {...props} />;
};
