import { TextInput, TextInputProps } from "components/common";
import { connectField } from "../../connectField";

type TextControlProps = Omit<
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
