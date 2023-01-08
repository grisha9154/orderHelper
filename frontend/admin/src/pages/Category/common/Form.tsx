import { FC } from "react";
import { useAppForm } from "packages";

export interface FormValues {
  name: string;
  description: string;
  file?: string;
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
        name="name"
        title="Наименование"
        rules={{ required: "Поле обязательно" }}
      />
      <Controls.Text
        name="description"
        title="Описание"
        rules={{ required: "Поле обязательно" }}
      />
      <Controls.File name="file" rules={{ required: "Поле обязательно" }} />
      <Controls.SubmitButton>Сохранить</Controls.SubmitButton>
    </Form>
  );
};
