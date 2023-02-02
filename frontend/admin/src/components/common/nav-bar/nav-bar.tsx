import { FC } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, List, ListItem } from "@mui/material";

export interface Tab {
  title: string;
  path: string;
}

interface NavBarProps {
  tabs: Tab[];
  strict?: boolean;
}

export const NavBar: FC<NavBarProps> = ({ tabs, strict }) => {
  return (
    <AppBar position="static">
      <List sx={{ display: "flex" }}>
        {tabs.map((x) => (
          <NavLink
            key={x.path}
            to={x.path}
            style={{ textDecoration: "none" }}
            end={strict}
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
    </AppBar>
  );
};
