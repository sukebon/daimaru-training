import * as React from 'react';
import { NextPage } from 'next';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Box } from '@mui/system';
import { Button, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilValue } from 'recoil';
import { categoriesState } from '../../store';

const CategoryModalDelete = () => {
  const categories = useRecoilValue(categoriesState); // カテゴリー一覧
  // モーダルの変数と関数
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return <></>;
};

export default CategoryModalDelete;
