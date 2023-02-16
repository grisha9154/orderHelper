import { FC, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

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
        expenseCategoryId={expenseCategoryId}
        handleClose={() => setIsOpen(false)}
      />
      <Tooltip title="Добавить расход">
        <IconButton onClick={() => setIsOpen(true)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
