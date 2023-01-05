import { FC } from "react";
import { NavLink } from "react-router-dom";
import { AppBar } from "@mui/material";

interface Tab {
  title: string;
  path: string;
}

interface NavBarProps {
  tabs: Tab[];
}

export const NavBar: FC<NavBarProps> = ({ tabs }) => {
  return (
    <AppBar position="static">
      <ul>
        {tabs.map((x) => {
          return (
            <li>
              <NavLink to={x.path}>{x.title}</NavLink>
            </li>
          );
        })}
      </ul>
    </AppBar>
  );
};
