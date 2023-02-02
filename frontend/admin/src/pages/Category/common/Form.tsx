import { useAppForm } from "components/form";
import { FC } from "react";

export interface FormValues {
  title: string;
  description: string;
}

interface CategoryFormProps {
  defaultValues?: FormValues;
  handleSubmit: (value: FormValues) => Promise<void>;
}

export const CategoryForm: FC<CategoryFormProps> = ({
  handleSubmit,
  defaultValues,
}) => {
  const { Form, Controls } = useAppForm<FormValues>({
    handleSubmit,
    defaultValues,
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
