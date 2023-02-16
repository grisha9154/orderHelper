import { useAppForm } from "components";
import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetExpenseCategoryQuery } from "store/expense";

interface FormValues {
  from: Date;
  to: Date;
}

type RouteParams = {
  id: string;
};

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

export const useExpenseCategoryDetailsData = () => {
  const { id } = useParams<RouteParams>();

  const [getCategory, { data }] = useLazyGetExpenseCategoryQuery();

  useEffect(() => {
    if (id) {
      getCategory({
        id,
        filter: getDefaultDates(),
      });
    }
  }, [getCategory, id]);

  const form = useAppForm<FormValues>({
    defaultValues: getDefaultDates(),
    handleSubmit: async (values) => {
      if (id) {
        await getCategory({
          id,
          filter: {
            from: values.from,
            to: values.to,
          },
        });
      }
    },
  });

  return {
    data,
    ...form,
  };
};
