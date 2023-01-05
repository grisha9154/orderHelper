import React from "react";

import { connectField } from "../../connectField";
import { NumberInput, NumberInputProps } from "components/common";

type NumberControlProps = Omit<
  NumberInputProps,
  "name" | "onChange" | "onBlur" | "error" | "value" | "helperText"
>;

export const NumberControl = connectField<
  number | undefined,
  NumberControlProps
>(({ fieldProps, ...props }) => {
  const { field, fieldState } = fieldProps;

  return (
    <NumberInput
      name={field.name}
      onChange={(e) => field.onChange(+e.target.value || undefined)}
      onBlur={field.onBlur}
      value={field.value}
      error={!!fieldState.error}
      {...props}
    />
  );
});
