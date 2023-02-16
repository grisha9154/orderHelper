import { FC, useState } from "react";
import { Button } from "@mui/material";

import { CreateExpensePopup } from "pages/expense/common";

interface CreateExpenseButtonProps {
  expenseCategoryId: string;
}

export const CreateExpenseButton: FC<CreateExpenseButtonProps> = ({
  expenseCategoryId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CreateExpensePopup
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        expenseCategoryId={expenseCategoryId}
      />
      <Button onClick={() => setIsOpen(true)}>Добавить</Button>
    </>
  );
};
