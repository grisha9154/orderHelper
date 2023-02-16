import { FC, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MoreHoriz as DotsIcon,
  Edit as EditIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";

import { CreateExpenseButton } from "../create-expense-button";

interface ActionsProps {
  id: string;
}

export const Actions: FC<ActionsProps> = ({ id }) => {
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
