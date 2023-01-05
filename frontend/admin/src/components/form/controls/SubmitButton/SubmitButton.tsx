import React, { FC } from "react";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface SubmitButtonProps
  extends Omit<Parameters<typeof Button>[0], "type"> {}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={props.disabled || formState.isSubmitting}
      {...props}
    >
      {props.children}
    </Button>
  );
};
