import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { authState } from "../../store";
import Link from "next/link";
import { useRouter } from "next/router";
import SidebarDrawer from "./SidebarDrawer";
import { Users } from "../../data";
import { Divider } from "@mui/material";

const Header = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(authState);

  // 未ログインの場合、login画面へ移動
  React.useEffect(() => {
    if (!currentUser) {
      console.log(currentUser);
      router.push("/login");
    }
  }, [currentUser, router]);

  // サインアウト
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("logout");
        setCurrentUser("");
      })
      .catch((err) => {});
  };

  const headerMenu = [
    { link: "/", title: "トップページ" },

    {
      link: "/posts",
      title: "記事リスト",
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ディスプレイネームを表示
  const onDisplayName = (userId: string) => {
    const user: any = Users.find((user) => {
      if (user.uid === userId) return user.name;
    });
    if (!user) return;
    return user.name;
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e1e1e1",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "64px" }}>
          <SidebarDrawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              color: "black",
            }}
          >
            <Link href="/">
              <a>大丸白衣 研修サイト</a>
            </Link>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "left",
            }}
          >
            {headerMenu.map((menu: { title: string; link: string }) => (
              <Link key={menu.title} href={menu.link}>
                <a>
                  <MenuItem>
                    <Typography textAlign="center" color="black">
                      {menu.title}
                    </Typography>
                  </MenuItem>
                </a>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="メニュー">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "35px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  {onDisplayName(currentUser)}
                </Typography>
              </MenuItem>
              <Divider />
              {headerMenu.map((menu: { title: string; link: string }) => (
                <Link key={menu.title} href={menu.link}>
                  <a>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{menu.title}</Typography>
                    </MenuItem>
                  </a>
                </Link>
              ))}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={onSignOut} textAlign="center">
                  ログアウト
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
