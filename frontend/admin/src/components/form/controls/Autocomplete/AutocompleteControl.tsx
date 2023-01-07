import {
  BaseOption,
  SingleAutocompleteProps,
  Autocomplete,
} from "components/common";
import { connectField } from "components/form/connectField";

interface SingleAutocompleteControlProps
  extends Omit<
    SingleAutocompleteProps<BaseOption>,
    "handleChange" | "value" | "error"
  > {}

export const SingleAutocompleteControl = connectField<
  BaseOption | undefined,
  SingleAutocompleteControlProps
>(({ fieldProps, ...rest }) => {
  const { field, fieldState } = fieldProps;

  return (
    <Autocomplete.Single
      handleChange={field.onChange}
      value={field.value}
      error={!!fieldState.error}
      {...rest}
    />
  );
});
