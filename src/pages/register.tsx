import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { authState, spinnerState } from '../../store';

const Register = () => {
  const router = useRouter();
  const setCurrentUser = useSetRecoilState<any>(authState);
  const setSpinner = useSetRecoilState<any>(spinnerState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    setSpinner(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user.uid);
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            alert('登録しました');
            router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        alert('失敗しました');
        console.log(error.code);
        console.log(error.message);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <>
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
        <Box sx={{ fontSize: 24, fontWeight: 'bold' }}>登録</Box>
        <FormControl>
          <TextField
            sx={{ m: 2, width: '300px' }}
            helperText='Please enter your Name'
            label='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ m: 2, width: '300px' }}
            helperText='Please enter your Email'
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ m: 2, width: '300px' }}
            helperText='Please enter your password'
            label='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant='contained'
            disabled={!name || !email || !password}
            onClick={createUser}
          >
            登録
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default Register;
