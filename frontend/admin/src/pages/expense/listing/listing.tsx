import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  MoreHoriz as DotsIcon,
  Edit as EditIcon,
  Receipt as ReceiptIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import moment from "moment";

import { DataGrid, useAppForm } from "components";
import { useLazyGetExpenseCategoriesQuery } from "store/expense";
import { CreateExpensePopup } from "../common";

interface ActionsProps {
  id: string;
}

interface CreateExpenseButtonProps {
  expenseCategoryId: string;
}

const CreateExpenseButton: FC<CreateExpenseButtonProps> = ({
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

const Actions: FC<ActionsProps> = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <DotsIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem sx={{ justifyContent: "center" }}>
          <Tooltip title="Редактировать">
            <Link to={`edit/${id}`}>
              <EditIcon />
            </Link>
          </Tooltip>
        </MenuItem>
        <MenuItem sx={{ justifyContent: "center" }}>
          <CreateExpenseButton expenseCategoryId={id} />
        </MenuItem>
        <MenuItem sx={{ justifyContent: "center" }}>
          <Tooltip title="Расходы по данной категории">
            <Link to={`details/${id}`}>
              <ReceiptIcon />
            </Link>
          </Tooltip>
        </MenuItem>
      </Menu>
    </Box>
  );
};

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

export const ExpenseCategoryListingPage: FC = () => {
  const [getCategories, { data, isLoading }] =
    useLazyGetExpenseCategoriesQuery();

  useEffect(() => {
    getCategories({
      filter: getDefaultDates(),
    });
  }, [getCategories]);

  const { Form, Controls } = useAppForm<FormValues>({
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

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Категории расходов</h1>
        <Link to="create">Создать</Link>
      </Box>
      <Form>
        <Box>
          <Controls.Date name="from" />
          <Controls.Date name="to" />
        </Box>
        <Controls.SubmitButton>Поиск</Controls.SubmitButton>
      </Form>
      <Box>{data?.totalSum}</Box>
      <DataGrid
        isLoading={isLoading}
        rows={data?.expenseCategories || []}
        columns={{
          id: {
            title: "",
            cell: ({ id }) => <Actions id={id} />,
          },
          title: { title: "Наименование", cell: ({ title }) => title },
          description: {
            title: "Описание",
            cell: ({ description }) => description,
          },
          expensesSum: {
            title: "Траты",
            cell: ({ expensesSum }) => expensesSum?.toString(),
          },
        }}
      />
    </div>
  );
};
