import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from "react-hook-form";

interface FieldProps<TValue, TFieldValues extends FieldValues> {
  field: Omit<ControllerRenderProps<TFieldValues>, "onChange" | "value"> & {
    onChange: (value: TValue) => void;
    value: TValue;
  };
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}

export interface ExternalProps<TValue, TFieldValues extends FieldValues> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: ControllerProps<FieldValues, string>["rules"];
  handleChange?: (
    event: TValue,
    fieldProps: FieldProps<TValue, TFieldValues>
  ) => void;
  handleBlur?: (fieldProps: FieldProps<TValue, TFieldValues>) => void;
  title?: string;
  showError?: boolean;
}

interface BaseInternalProps<TValue, TFieldValues extends FieldValues> {
  fieldProps: FieldProps<TValue, TFieldValues>;
}

export const connectField =
  <TValue, TInternalProps extends {}>(
    Component: <TFieldValues extends FieldValues>(
      props: TInternalProps & BaseInternalProps<TValue, TFieldValues>
    ) => JSX.Element
  ) =>
  <TFieldValues extends FieldValues>({
    showError = true,
    title,
    name,
    control,
    rules,
    handleChange,
    handleBlur,
    ...externalProps
  }: TInternalProps & ExternalProps<TValue, TFieldValues>) =>
    (
      <Box>
        {!!title && (
          <Typography
            sx={(theme) => ({
              fontFamily: "Blinker",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "26px",
              letterSpacing: "0.015em",
              marginBottom: "20px",
              color: theme.palette.secondary.main,
              [theme.breakpoints.between("xs", "sm")]: {
                fontSize: 16,
              },
            })}
          >
            {title}
          </Typography>
        )}
        <Controller<TFieldValues>
          name={name}
          control={control}
          rules={rules}
          render={(fieldProps) => {
            const { field, fieldState } = fieldProps;

            const onChange = useCallback(
              (value: TValue) => {
                if (handleChange) {
                  handleChange(value, fieldProps);
                } else {
                  field.onChange(value);
                }
              },
              // eslint-disable-next-line react-hooks/exhaustive-deps
              [fieldProps, handleChange]
            );

            const onBlur = useCallback(() => {
              if (handleBlur) {
                handleBlur(fieldProps);
              } else {
                field.onBlur();
              }
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [fieldProps, handleBlur]);

            const newFieldProps: FieldProps<TValue, TFieldValues> = useMemo(
              () => ({
                ...fieldProps,
                field: {
                  ...field,
                  onChange,
                  onBlur,
                },
                fieldState: {
                  ...fieldState,
                  error: showError ? fieldState.error : undefined,
                },
              }),
              // eslint-disable-next-line react-hooks/exhaustive-deps
              [fieldProps, handleBlur, handleChange]
            );

            const errorMesage = fieldState.error?.message;

            return (
              <Box>
                <Component<TFieldValues>
                  {...(externalProps as unknown as TInternalProps)}
                  fieldProps={newFieldProps}
                />
                {showError && !!errorMesage && (
                  <Typography
                    sx={(theme) => ({
                      color: theme.palette.error.main,
                      fontFamily: "Roboto, Blinker, sans-serif, Arial",
                      fontWeight: "400",
                      fontSize: "0.75rem",
                      lineHeight: "1.66",
                      margin: "3px 14px 0px",
                    })}
                  >
                    {errorMesage}
                  </Typography>
                )}
              </Box>
            );
          }}
        />
      </Box>
    );
