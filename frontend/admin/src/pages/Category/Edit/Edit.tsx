import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryForm, FormValues } from "../common";

export const CategoryEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tt, setTT] = useState(0);

  const data = useMemo<FormValues>(() => {
    return { name: "name1", description: "test1" };
  }, [id]);

  return (
    <div>
      <h1>
        Редактирование категории {id} {tt}
      </h1>
      <button onClick={() => setTT((x) => x + 1)}>+++</button>
      <CategoryForm
        defaultValues={data}
        handleSubmit={async (data) => {
          console.log(data);
        }}
      />
    </div>
  );
};
