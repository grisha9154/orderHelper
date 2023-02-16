import { FC, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Path } from "global-constants";
import { NavLink } from "react-router-dom";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";

import { useAppSelector } from "store";
import { useLogoutMutation } from "store/user";

const tabs = [
  {
    title: "Категории",
    path: Path.CATEGORY,
  },
  {
    title: "Товары",
    path: Path.PRODUCT,
  },
  {
    title: "Категории расходов",
    path: Path.EXPENSE_CATEGORY,
  },
];

const tabsForAuth = [
  {
    title: "Вход",
    path: Path.SIGN_IN,
  },
  {
    title: "Регистрация",
    path: Path.SIGN_UP,
  },
];

const UserMenu = () => {
  const [logout] = useLogoutMutation();
  const login = useAppSelector(({ user }) => user.login);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography>{login}</Typography>
      <IconButton size="large" onClick={handleOpen}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export const Header: FC = () => {
  const isAuth = useAppSelector(({ user }) => user.isAuth);

  const useTabs = isAuth ? tabs : tabsForAuth;

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <List sx={{ display: "flex" }}>
          {useTabs.map((x) => (
            <NavLink
              key={x.path}
              to={x.path}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <ListItem
                  sx={{ width: "auto", color: isActive ? "black" : "white" }}
                >
                  {x.title}
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
        {isAuth && <UserMenu />}
      </Toolbar>
    </AppBar>
  );
};
