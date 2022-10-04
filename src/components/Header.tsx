import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Link from 'next/link';
import { useRouter } from 'next/router';
import SidebarDrawer from './SidebarDrawer';

import { useRecoilState, useRecoilValue } from 'recoil';
import { articlesState, authState, postsState } from '../../store';

import MenuIconButton from './MenuIconButton';

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

  //未読カウントを表示
  React.useEffect(() => {
    const newArticles = articles.filter((article: { members: string[] }) => {
      if (article.members.includes(currentUser)) return article;
    });
    const result = posts.length - newArticles.length;
    setUnreadCount(result);
  }, [currentUser, articles, posts.length]);

  // メニューリスト
  const headerMenu = [
    { link: '/', title: 'トップページ' },
    { link: '/read', title: '記事一覧' },
  ];

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
            {/* {unReadCount > 0 && (
              <Link href={'/unread'}>
                <a>
                  <Tooltip title='未読件数'>
                    <Badge
                      color='primary'
                      badgeContent={unReadCount}
                      max={999}
                      sx={{ mx: 2, cursor: 'pointer' }}
                    >
                      <NotificationsIcon sx={{ color: 'gray' }} />
                    </Badge>
                  </Tooltip>
                </a>
              </Link>
            )} */}
            <MenuIconButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
