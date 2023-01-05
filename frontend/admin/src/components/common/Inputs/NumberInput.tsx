import { FC, WheelEvent } from "react";
import { TextField, TextFieldProps } from "@mui/material";

export type NumberInputProps = Omit<TextFieldProps, "type">;

export const NumberInput: FC<NumberInputProps> = ({ onWheel, ...props }) => {
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).blur();
    onWheel?.(e);
  };

  return <TextField type="number" onWheel={handleWheel} {...props} />;
};
