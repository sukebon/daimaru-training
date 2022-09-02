import { Router } from '@mui/icons-material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <Box display='flex' bgcolor='#f5f5f5'>
      {router.pathname !== '/login' && router.pathname !== '/register' ? (
        <>
          <Sidebar />
          <Box flexGrow={1}>
            <Header />
            {children}
          </Box>
        </>
      ) : (
        children
      )}
    </Box>
  );
};

export default Layout;
