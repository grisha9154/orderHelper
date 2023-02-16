import { FC } from "react";

import { useAppForm } from "components/form";

export interface ExpenseCategoryFormValues {
  title: string;
  description?: string;
}

interface ExpenseCategoryFormProps {
  defaultValues?: Partial<ExpenseCategoryFormValues>;
  handleSubmit: (value: ExpenseCategoryFormValues) => Promise<void>;
}

export const ExpenseCategoryForm: FC<ExpenseCategoryFormProps> = ({
  handleSubmit,
  defaultValues,
}) => {
  const { Form, Controls } = useAppForm<ExpenseCategoryFormValues>({
    handleSubmit,
    defaultValues,
    enableReinitializeDefaultValues: true,
  });

  return (
    <Form>
      <Controls.Text
        name="title"
        title="Наименование"
        rules={{ required: "Поле обязательно" }}
      />
      <Controls.Text
        name="description"
        title="Описание"
        rules={{ required: "Поле обязательно" }}
      />
      <Controls.SubmitButton>Сохранить</Controls.SubmitButton>
    </Form>
  );
};
