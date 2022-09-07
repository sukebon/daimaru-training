import React, { useEffect, useState } from 'react';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { Box } from '@mui/system';
import {
  Alert,
  Button,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import {
  alreadyReadListState,
  categoriesState,
  postsState,
  subCategoriesState,
} from '../../store';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

type Props = {
  categoryId: string;
};

const CategoryMenu: NextPage<Props> = ({ categoryId }) => {
  const categories = useRecoilValue(categoriesState); // カテゴリー一覧
  const posts = useRecoilValue(postsState); // 記事一覧
  const alreadyReadList = useRecoilValue(alreadyReadListState); //既読リスト一覧

  const [categoryTitle, setCategoryTitle] = useState(''); //カテゴリー名
  const [categoryTitleCopy, setCategoryTitleCopy] = useState(''); //カテゴリー名

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleDeleteOpen = () => setOpenDeleteModal(true);
  const handleDeleteClose = () => setOpenDeleteModal(false);

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleEditeOpen = () => setOpenEditModal(true);
  const handleEditClose = () => setOpenEditModal(false);

  // 選択している カテゴリー名を取得
  useEffect(() => {
    categories.find((category: { id: string; name: string }) => {
      if (category.id === categoryId) {
        setCategoryTitle(category.name);
        setCategoryTitleCopy(category.name);
        return;
      }
    });
  }, [categoryId, categories]);

  // categoryを削除
  const deleteCategory = async () => {
    const result = confirm('削除して宜しいでしょうか');
    if (!result) return;
    try {
      await deleteDoc(doc(db, 'categories', categoryId));

      let newPostArray = posts.filter((post: { categoryId: string }) => {
        if (post.categoryId === categoryId) return post;
      });
      newPostArray.forEach(async (post: { id: string }) => {
        const categoryRef = doc(db, 'posts', `${post.id}`);
        await updateDoc(categoryRef, {
          categoryId: '未分類',
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  // カテゴリー名の編集
  const editCategoryName = async () => {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, {
      name: categoryTitle,
    });
  };

  return (
    <div>
      <Box
        display='flex'
        alignItems='center'
        id='basic-button'
        sx={{ cursor: 'pointer' }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVertSharpIcon />
      </Box>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleEditeOpen();
            setAnchorEl(null);
          }}
        >
          編集
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteOpen();
            setAnchorEl(null);
          }}
        >
          削除
        </MenuItem>
      </Menu>
      <>
        <>
          <Modal
            open={openDeleteModal}
            onClose={handleDeleteClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Stack spacing={2}>
                <Typography component='h3' fontSize='1.5rem'>
                  カテゴリーの削除
                </Typography>
                <Alert severity='error'>
                  この配下にあるすべてのデータ（サブカテゴリー・記事）が完全に削除されます。
                </Alert>
                <Typography component='p'>
                  カテゴリー名{' '}
                  <Box fontWeight='bold' component='span'>
                    {categoryTitle}
                  </Box>{' '}
                  を削除します。
                </Typography>
              </Stack>
              <Box display='flex' justifyContent='flex-end' mt={3}>
                <Button
                  variant='contained'
                  onClick={handleDeleteClose}
                  color={'inherit'}
                  sx={{ mr: 1 }}
                >
                  キャンセル
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => {
                    deleteCategory();
                    handleDeleteClose();
                  }}
                >
                  削除
                </Button>
              </Box>
            </Box>
          </Modal>

          <Modal
            open={openEditModal}
            onClose={handleEditClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Stack spacing={2}>
                <Typography component='h3' fontSize='1.5rem'>
                  カテゴリー名の編集
                </Typography>
                <Typography component='p'>
                  <Box fontWeight='bold' component='span'>
                    <TextField
                      label='カテゴリー名'
                      variant='outlined'
                      fullWidth
                      value={categoryTitle}
                      onChange={(e) => setCategoryTitle(e.target.value)}
                    />
                  </Box>
                </Typography>
              </Stack>
              <Box display='flex' justifyContent='flex-end' mt={3}>
                <Button
                  variant='contained'
                  onClick={() => {
                    setCategoryTitle(categoryTitleCopy);
                    handleEditClose();
                  }}
                  color={'inherit'}
                  sx={{ mr: 1 }}
                >
                  キャンセル
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    editCategoryName();
                    handleEditClose();
                  }}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      </>
    </div>
  );
};

export default CategoryMenu;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 700,
  outline: 'none',
  bgcolor: 'white',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};
