import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../../store";
import SidebarList from "./SidebarList";

export default function Sidebar() {
  const categories: any = useRecoilValue(categoriesState); // カテゴリー一覧

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 300,
        minHeight: "100vh",
        bgcolor: "background.paper",
        flexGrow: 0,
        display: { xs: "none", md: "block" },
        borderRight: "1px solid #e1e1e1",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          大丸白衣 研修サイト
        </ListSubheader>
      }
    >
      {categories.map((category: { id: string; name: string }) => (
        <SidebarList key={category.id} category={category} />
      ))}
    </List>
  );
}
