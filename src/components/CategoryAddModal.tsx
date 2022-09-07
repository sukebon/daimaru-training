import * as React from 'react';
import { NextPage } from 'next';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Box } from '@mui/system';
import { Button, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CategoryModal: NextPage = () => {
  const [inputName, setInputName] = React.useState('');
  // モーダルの変数と関数
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInputName('');
  };

  const addCategory = async () => {
    const categoryRef = await addDoc(collection(db, 'categories'), {
      name: inputName,
      createdAt: serverTimestamp(),
    });
    handleClose();
  };

  return (
    <>
      <Typography
        p={2}
        display='flex'
        alignItems='center'
        color='primary'
        sx={{ cursor: 'pointer' }}
        onClick={handleOpen}
      >
        <AddIcon color='primary' />
        カテゴリーを追加
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography component='h3' sx={{ mb: 2 }}>
            カテゴリー登録
          </Typography>

          <TextField
            id='outlined-basic'
            label='カテゴリー名'
            variant='outlined'
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box display='flex' justifyContent='flex-end'>
            <Button
              variant='contained'
              onClick={handleClose}
              color={'inherit'}
              sx={{ mr: 1 }}
            >
              キャンセル
            </Button>
            <Button
              variant='contained'
              disabled={!inputName}
              onClick={() => addCategory()}
            >
              登録
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CategoryModal;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  width: 400,
  outline: 'none',
  bgcolor: 'white',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};
