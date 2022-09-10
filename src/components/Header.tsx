import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, Divider } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

import Link from 'next/link';
import { useRouter } from 'next/router';
import SidebarDrawer from './SidebarDrawer';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRecoilState, useRecoilValue } from 'recoil';
import { articlesState, authState, postsState } from '../../store';
import { Users } from '../../data';

const Header = () => {
  const router = useRouter();
  const posts = useRecoilValue(postsState); // 記事一覧
  const articles = useRecoilValue(articlesState);
  const [currentUser, setCurrentUser] = useRecoilState(authState);
  const [unReadCount, setUnreadCount] = React.useState(0);

  // 未ログインの場合、login画面へ移動
  React.useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  // サインアウト
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('logout');
        setCurrentUser('');
      })
      .catch((err) => {});
  };

  // ディスプレイネームを表示
  const onDisplayName = (userId: string) => {
    const user: any = Users.find((user) => {
      if (user.uid === userId) return user.name;
    });
    if (!user) return;
    return user.name;
  };

  //未読カウントを表示
  React.useEffect(() => {
    const newArticles: any = articles.filter(
      (article: { members: string[] }) => {
        if (article.members.includes(currentUser)) return article;
      }
    );
    const result = posts.length - newArticles.length;
    setUnreadCount(result);
  }, [currentUser, articles, posts.length]);

  // メニューリスト
  const headerMenu = [{ link: '/', title: 'トップページ' }];

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position='static'
      sx={{
        bgcolor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #e1e1e1',
        position: 'sticky',
        top: 0,
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ height: '64px' }}>
          <SidebarDrawer />

          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              flexGrow: 1,
              width: '60%',
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              color: 'black',
            }}
          >
            <Link href='/'>
              <a>大丸白衣 研修サイト</a>
            </Link>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              w: '80%',
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            {headerMenu.map((menu: { title: string; link: string }) => (
              <Link key={menu.title} href={menu.link}>
                <a>
                  <MenuItem sx={{ mr: 1 }}>
                    <Typography textAlign='center' color='black'>
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
              width: '20%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {unReadCount > 0 && (
              <Link href={'/unread'}>
                <a>
                  <Tooltip title='未読件数'>
                    <Badge
                      color='primary'
                      badgeContent={unReadCount}
                      max={999}
                      sx={{ mx: 2, cursor: 'pointer' }}
                    >
                      <ArticleIcon sx={{ color: 'gray' }} />
                    </Badge>
                  </Tooltip>
                </a>
              </Link>
            )}

            <Tooltip title='メニュー'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '35px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>
                  {onDisplayName(currentUser)}
                </Typography>
              </MenuItem>
              <Divider />
              {headerMenu.map((menu: { title: string; link: string }) => (
                <Link key={menu.title} href={menu.link}>
                  <a>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>{menu.title}</Typography>
                    </MenuItem>
                  </a>
                </Link>
              ))}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={onSignOut} textAlign='center'>
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
