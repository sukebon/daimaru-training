import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../../store';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const MenuIconButton = () => {
  const [authorityUsers, setAuthorityUsers] = React.useState<any>();
  const [currentUser, setCurrentUser] = useRecoilState(authState);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // users一覧
  useEffect(() => {
    const q = query(collection(db, 'authority'), orderBy('rank', 'asc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setAuthorityUsers(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  // ディスプレイネームを表示
  const onDisplayName = (userId: string) => {
    const user = authorityUsers?.find((user: { uid: string; name: string }) => {
      if (user.uid === userId) return user.name;
    });
    if (!user) return;
    return user.name;
  };

  // サインアウト
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('logout');
        setCurrentUser('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // メニューリスト
  const headerMenu = [
    { link: '/', title: 'トップページ' },
    // { link: '/profile', title: 'プロフィール編集' },
  ];

  return (
    <Box>
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
        {currentUser === 'EPJUZ2xqdsY8X28anovOwEylGBl1' && (
          <Link href='/auth'>
            <a>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>権限</Typography>
              </MenuItem>
            </a>
          </Link>
        )}
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={onSignOut} textAlign='center'>
            ログアウト
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuIconButton;
