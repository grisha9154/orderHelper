import { FC, WheelEvent } from "react";
import { TextFieldProps } from "@mui/material";

import { Styled } from "./styled";

export type NumberInputProps = Omit<TextFieldProps, "type">;

export const NumberInput: FC<NumberInputProps> = ({ onWheel, ...props }) => {
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).blur();
    onWheel?.(e);
  };

  return <Styled.TextInput type="number" onWheel={handleWheel} {...props} />;
};
