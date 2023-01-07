import { BaseOption, useAppForm } from "components";
import { FC } from "react";

export interface FormValues {
  name: string;
  description: string;
  category?: BaseOption;
  file?: string;
  price?: number;
}

interface ProductFormProps {
  defaultValues?: FormValues;
  handleSubmit: (value: FormValues) => Promise<void>;
}

export const ProductForm: FC<ProductFormProps> = ({
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
      <Controls.SingleAutocomplete
        name="category"
        title="Категория"
        rules={{ required: "Поле обязательно" }}
        options={[
          { id: "1", title: "Category 11" },
          { id: "2", title: "Category 22" },
        ]}
      />
      <Controls.Number
        name="price"
        title="Цена"
        rules={{ required: "Поле обязательно" }}
      />
      <Controls.File name="file" rules={{ required: "Поле обязательно" }} />
      <Controls.SubmitButton>Сохранить</Controls.SubmitButton>
    </Form>
  );
};
