import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { categoriesState, drawerState } from "../../store";
import { useRecoilState, useRecoilValue } from "recoil";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarList from "./SidebarList";

export default function SidebarDrawer() {
  const categories = useRecoilValue(categoriesState); // カテゴリー一覧
  const [darawerOpen, setDrawerOpen] = useRecoilState(drawerState);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <div>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer open={darawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {categories.map(
              (category: { id: string; categoryName: string }) => (
                <SidebarList key={category.id} category={category} />
              )
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
