import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authState, spinnerState } from '../../store';
import SpinnerLoading from '../components/SpinnerLoading';

const Login = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState<any>(authState);
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setSpinner = useSetRecoilState<any>(spinnerState);

  useEffect(() => {
    if (user) {
      setCurrentUser(user.uid);
      router.push('/');
      console.log('ログイン中');
    }
  }, [user, router, setCurrentUser]);

  const signInUser = () => {
    setSpinner(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user.uid);
        router.push('/');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        alert('ログインに失敗しました。');
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Box
        sx={{
          width: { xs: '95%', sm: '100%' },
          maxWidth: '400px',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          bgcolor: 'white',
          borderRadius: 2,
        }}
      >
        <Box component='h1' sx={{ fontSize: 24, fontWeight: 'bold' }}>
          Login
        </Box>
        <FormControl>
          <TextField
            sx={{ m: 2, width: '300px' }}
            helperText='Please enter your Email'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            sx={{ m: 2, width: '300px' }}
            helperText='Please enter your password'
            label='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button variant='contained' onClick={signInUser}>
          ログイン
        </Button>
      </Box>
      <SpinnerLoading />
    </Box>
  );
};

export default Login;
