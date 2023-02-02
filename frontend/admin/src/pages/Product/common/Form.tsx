import { BaseOption } from "components";
import { useAppForm } from "components/form";
import { FC } from "react";

export interface FormValues {
  title: string;
  description: string;
  category: BaseOption;
  price: number;
}

interface ProductFormProps {
  defaultValues?: Partial<FormValues>;
  handleSubmit: (value: FormValues) => Promise<void>;
  categoryOptions: BaseOption[];
}

export const ProductForm: FC<ProductFormProps> = ({
  handleSubmit,
  defaultValues,
  categoryOptions,
}) => {
  const { Form, Controls } = useAppForm<FormValues>({
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
      <Controls.SingleAutocomplete
        name="category"
        title="Категория"
        rules={{ required: "Поле обязательно" }}
        options={categoryOptions}
      />
      <Controls.Number
        name="price"
        title="Цена"
        rules={{ required: "Поле обязательно" }}
      />
      <Controls.SubmitButton>Сохранить</Controls.SubmitButton>
    </Form>
  );
};
