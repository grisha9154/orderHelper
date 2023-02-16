import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateExpenseCategoryMutation } from "store/expense";
import { ExpenseCategoryForm } from "../common";
import { Path } from "global-constants";

export const ExpenseCategoryCreatePage: FC = () => {
  const navigate = useNavigate();
  const [createExpenseCategory] = useCreateExpenseCategoryMutation();

  return (
    <div>
      <h1>Создание категории расходов</h1>
      <ExpenseCategoryForm
        handleSubmit={async (values) => {
          const result = await createExpenseCategory({
            title: values.title,
            description: values.description,
          }).unwrap();

          navigate(`/${Path.EXPENSE_CATEGORY}/edit/${result.id}`);
        }}
        defaultValues={{
          description: "",
          title: "",
        }}
      />
    </div>
  );
};
