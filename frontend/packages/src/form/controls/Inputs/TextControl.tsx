import React from "react";

import { TextInput, TextInputProps } from "../../../components";
import { connectField } from "../../connectField";

export type TextControlProps = Omit<
  TextInputProps,
  "name" | "onChange" | "onBlur" | "error" | "value" | "helperText"
>;

export const TextControl = connectField<string | undefined, TextControlProps>(
  ({ fieldProps, ...rest }) => {
    const { field, fieldState } = fieldProps;

    return (
      <TextInput
        name={field.name}
        onChange={(e) => field.onChange(e.target.value || undefined)}
        onBlur={field.onBlur}
        value={field.value}
        error={!!fieldState.error}
        {...rest}
      />
    );
  }
);
