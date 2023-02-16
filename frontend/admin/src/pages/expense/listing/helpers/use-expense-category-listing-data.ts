import { useAppForm } from "components";
import moment from "moment";
import { useEffect } from "react";
import { useLazyGetExpenseCategoriesQuery } from "store/expense";

interface FormValues {
  from: Date;
  to: Date;
}

const getDefaultDates = () => ({
  from: moment()
    .add({
      month: -1,
    })
    .toDate(),
  to: moment()
    .add({
      day: 1,
    })
    .toDate(),
});

export const useExpenseCategoryListingDate = () => {
  const [getCategories, { data, isLoading }] =
    useLazyGetExpenseCategoriesQuery();

  useEffect(() => {
    getCategories({
      filter: getDefaultDates(),
    });
  }, [getCategories]);

  const form = useAppForm<FormValues>({
    defaultValues: getDefaultDates(),
    handleSubmit: async (values) => {
      await getCategories({
        filter: {
          from: values.from,
          to: values.to,
        },
      });
    },
  });

  return { data, isLoading, ...form };
};
