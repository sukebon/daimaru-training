import {
  Box,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextareaAutosize,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../../../store';

const New = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();

  return (
    <Container maxWidth='md'>
      <Box component='h1'>作成する</Box>
      <FormControl fullWidth>
        <InputLabel htmlFor='outlined-adornment-amount'>タイトル</InputLabel>
        <OutlinedInput
          id='outlined-adornment-amount'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label='Amount'
        />
      </FormControl>
      <FormControl fullWidth>
        <TextareaAutosize
          maxRows={12}
          aria-label='maximum height'
          placeholder='Maximum 4 rows'
          style={{
            width: '100%',
            height: '200px',
            borderRadius: 3,
            outline: 'none',
            font: 'inherit',
            padding: '16.5px 14px',
          }}
        />
      </FormControl>
    </Container>
  );
};

export default New;
