import { useParams } from "react-router-dom";
import {
  useGetExpenseCategoryQuery,
  useUpdateExpenseCategoryMutation,
} from "store/expense";

import { ExpenseCategoryFormValues } from "../../common";

type RouteParams = { id: string };

export const useExpenseCategoryEditData = () => {
  const { id } = useParams<RouteParams>();

  const { data } = useGetExpenseCategoryQuery(
    {
      id: `${id}`,
    },
    { skip: !id }
  );

  const [updateExpenseCategory] = useUpdateExpenseCategoryMutation();

  const handleSubmit = async (values: ExpenseCategoryFormValues) => {
    if (id) {
      await updateExpenseCategory({
        id,
        title: values.title,
        description: values.description,
      });
    }
  };

  return {
    handleSubmit,
    data,
  };
};
