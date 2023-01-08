import React from "react";
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps,
  ListItem,
  TextField,
} from "@mui/material";

import { BaseOption } from "./interfaces";

interface BaseAutocompleteProps<
  T extends BaseOption = BaseOption,
  Multiple extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T, Multiple, undefined, undefined>,
    "renderInput" | "getOptionLabel" | "isOptionEqualToValue"
  > {
  placeholder?: string | undefined;
  error?: boolean;
}

const BaseAutocomplete = <
  T extends BaseOption = BaseOption,
  Multiple extends boolean | undefined = undefined
>({
  placeholder,
  error,
  ...props
}: BaseAutocompleteProps<T, Multiple>) => {
  return (
    <MuiAutocomplete
      disablePortal
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField {...params} error={error} placeholder={placeholder} />
      )}
      {...props}
    />
  );
};

type OmitFromBase<T extends {}> = Omit<
  T,
  "onChange" | "value" | "defaultValue" | "multiple"
>;

export interface SingleAutocompleteProps<T extends BaseOption>
  extends OmitFromBase<BaseAutocompleteProps<T>> {
  value?: T;
  handleChange: (newValue: T | undefined) => void;
}

export const SingleAutocomplete = <T extends BaseOption>({
  value,
  options,
  handleChange,
  ...props
}: SingleAutocompleteProps<T>) => {
  return (
    <BaseAutocomplete
      {...props}
      options={options ?? []}
      value={value ?? null}
      onChange={(_e, value) => {
        handleChange(value ?? undefined);
      }}
      renderOption={(optionProps, option) => (
        <ListItem {...optionProps}>{option.title}</ListItem>
      )}
    />
  );
};

export const Autocomplete = {
  Single: SingleAutocomplete,
};
