import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Users } from '../../../data';
import { db } from '../../../firebase';

const Auth = () => {
  const users: { uid: string; name: string; rank: number }[] = [];
  const [authorityUsers, setAuthorityUsers] = useState<any>();
  const router = useRouter();

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

  // userをデータベースに追加
  const addUser = async (user: { uid: string; name: string; rank: number }) => {
    await setDoc(doc(db, 'authority', `${user.uid}`), {
      uid: user.uid,
      name: user.name,
      rank: user.rank,
    });
  };

  return (
    <Container maxWidth='md'>
      <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
        ユーザー一覧
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell>uid</TableCell>
              <TableCell>ランク</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authorityUsers?.map(
              (user: { uid: string; name: string; rank: number }) => (
                <TableRow
                  key={user.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {user.name}
                  </TableCell>
                  <TableCell>{user.uid}</TableCell>
                  <TableCell>{user.rank}</TableCell>
                  <TableCell>
                    <Link href={`/auth/${user.uid}`}>
                      <Button>編集</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box my={6} display='flex' flexWrap='wrap'>
        {users?.map((user: { uid: string; name: string; rank: number }) => (
          <Button key={user.uid} onClick={() => addUser(user)}>
            {user.name}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default Auth;
