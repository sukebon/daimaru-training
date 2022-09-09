import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { useRecoilValue } from "recoil";

import SidebarList from "./SidebarList";
import Link from "next/link";
import { Drawer } from "@mui/material";
import { categoriesState } from "../../store";

const Sidebar = () => {
  const categories = useRecoilValue(categoriesState);

  const drawerWidth = 300;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List
        sx={{
          width: "100%",
          minHeight: "100vh",
          maxWidth: drawerWidth,
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
            <Link href="/">大丸白衣 研修サイト</Link>
          </ListSubheader>
        }
      >
        {categories.map((category: { id: string; categoryName: string }) => (
          <SidebarList key={category.id} category={category} />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
