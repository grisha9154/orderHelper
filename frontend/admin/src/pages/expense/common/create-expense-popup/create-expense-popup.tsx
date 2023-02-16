import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { useAppForm } from "components/form";
import { useCreateExpenseMutation } from "store/expense";

interface FormValues {
  cost: number;
  paymentDate: Date;
}

interface CreateExpenseFormProps {
  expenseCategoryId: string;
  handleSuccess: () => void;
}

const CreateExpenseForm: FC<CreateExpenseFormProps> = ({
  expenseCategoryId,
  handleSuccess,
}) => {
  const [createExpense] = useCreateExpenseMutation();

  const { Form, Controls } = useAppForm<FormValues>({
    defaultValues: {
      paymentDate: new Date(),
    },
    handleSubmit: async (values) => {
      await createExpense({
        expenseCategoryId,
        cost: values.cost,
        paymentDate: values.paymentDate,
      });
      handleSuccess();
    },
  });

  return (
    <Form>
      <Controls.Number
        name="cost"
        rules={{
          min: {
            message: "Значение не может быть меньше 0",
            value: 0,
          },
          required: "Поле обязательно",
        }}
      />
      <Controls.Date
        name="paymentDate"
        rules={{ required: "Поле обязательно" }}
      />
      <Controls.SubmitButton>Сохранить</Controls.SubmitButton>
    </Form>
  );
};

interface CreateExpensePopupProps {
  isOpen: boolean;
  handleClose: () => void;
  expenseCategoryId: string;
}

export const CreateExpensePopup: FC<CreateExpensePopupProps> = ({
  isOpen,
  handleClose,
  expenseCategoryId,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Расход</DialogTitle>
      <DialogContent>
        <CreateExpenseForm
          handleSuccess={handleClose}
          expenseCategoryId={expenseCategoryId}
        />
      </DialogContent>
    </Dialog>
  );
};
