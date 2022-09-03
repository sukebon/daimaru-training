import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRecoilState } from 'recoil';
import { authState } from '../../store';
import Link from 'next/link';
import { useRouter } from 'next/router';

const settings = ['作成', 'Logout'];

const Header = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(authState);

  React.useEffect(() => {
    if (!currentUser) {
      console.log(currentUser);
      router.push('/login');
    }
  }, [currentUser, router]);

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('logout');
        setCurrentUser('');
      })
      .catch((err) => {});
  };
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

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ height: '64px' }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
            }}
          >
            大丸白衣 研修サイト
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Tooltip title='メニュー'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon fontSize='large' sx={{ color: 'white' }} />
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
                <Link href='/'>
                  <Typography textAlign='center'>トップページ</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href='/posts/new'>
                  <Typography textAlign='center'>作成</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href='/create-category'>
                  <Typography textAlign='center'>カテゴリー作成</Typography>
                </Link>
              </MenuItem>
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
