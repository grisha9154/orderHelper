import React, {
  FC,
  FormHTMLAttributes,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  useForm,
  FormProvider,
  UseFormProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { useDeepCompareEffect } from "utils";

import {
  SubmitButton,
  TextControl,
  NumberControl,
  FileControl,
} from "./controls";

const useControls = <TFieldValues extends FieldValues>() =>
  useMemo(
    () => ({
      /**
       * @see {@link TextControl}
       */
      Text: TextControl<TFieldValues>,
      /**
       * @see {@link NumberControl}
       */
      Number: NumberControl<TFieldValues>,
      /**
       * @see {@link TextControl}
       */
      File: FileControl<TFieldValues>,
      /**
       * @see {@link SubmitButton}
       */
      SubmitButton,
    }),
    []
  );

interface UseAppFormParams<TFieldValues extends FieldValues>
  extends UseFormProps<TFieldValues> {
  handleSubmit: (values: TFieldValues) => void;
  enableReinitializeDefaultValues?: boolean;
}

export const useAppForm = <TFieldValues extends FieldValues>({
  handleSubmit,
  enableReinitializeDefaultValues,
  defaultValues,
  ...params
}: UseAppFormParams<TFieldValues>) => {
  const methods = useForm<TFieldValues>(params);

  const refMethods = useRef(methods);
  const refHandleSubmit = useRef(handleSubmit);

  refMethods.current = methods;
  refHandleSubmit.current = handleSubmit;

  const Form: FC<PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>> =
    useCallback(
      ({ children, ...props }) => (
        <FormProvider {...refMethods.current}>
          <form
            onSubmit={refMethods.current.handleSubmit(refHandleSubmit.current)}
            {...props}
          >
            {children}
          </form>
        </FormProvider>
      ),
      []
    );

  const Controls = useControls<TFieldValues>();

  const isSettedDefaultValue = useRef(false);

  useDeepCompareEffect(() => {
    (async () => {
      if (
        defaultValues &&
        (!isSettedDefaultValue.current || enableReinitializeDefaultValues)
      ) {
        const values =
          typeof defaultValues === "function"
            ? await defaultValues()
            : defaultValues;

        methods.reset(values);

        isSettedDefaultValue.current = true;
      }
    })();
  }, [defaultValues, enableReinitializeDefaultValues]);

  return { ...methods, Form, Controls };
};

export const useAppFormContext = <TFieldValues extends FieldValues>() => {
  const methods = useFormContext<TFieldValues>();
  const Controls = useControls<TFieldValues>();

  if (!methods) {
    throw new Error("useAppFormContext must be used within an Form");
  }

  return { ...methods, Controls };
};
