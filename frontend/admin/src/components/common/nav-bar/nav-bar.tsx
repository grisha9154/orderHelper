import { FC } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, List, ListItem } from "@mui/material";

export interface Tab {
  title: string;
  path: string;
}

interface NavBarProps {
  tabs: Tab[];
}

export const NavBar: FC<NavBarProps> = ({ tabs }) => {
  return (
    <AppBar position="static">
      <List sx={{ display: "flex" }}>
        {tabs.map((x) => (
          <NavLink key={x.path} to={x.path} style={{ textDecoration: "none" }}>
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
    </AppBar>
  );
};
