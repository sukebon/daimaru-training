import Link from 'next/link';
import { NextPage } from 'next';
import { Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { alreadyReadListState } from '../../store';
import { useRecoilValue } from 'recoil';

type Props = {
  post: {
    id: string;
    title: string;
  };
};

const CategoryPost: NextPage<Props> = ({ post }) => {
  const alreadyReadList = useRecoilValue(alreadyReadListState);
  const [icon, setIcon] = useState(false);

  // 記事の削除
  const deletePost = async (postId: string) => {
    const result = confirm('削除して宜しいでしょうか');
    if (!result) return;
    try {
      await deleteDoc(doc(db, 'posts', `${postId}`));
      let newAlreadyReadList = alreadyReadList.filter(
        (list: { postId: string }) => {
          if (list.postId === postId) return list;
        }
      );
      newAlreadyReadList.forEach(async (list: { id: string }) => {
        await deleteDoc(doc(db, 'alreadyReadList', `${list.id}`));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleIcon = (bool: boolean) => {
    setIcon(bool);
  };

  return (
    <Box
      component='li'
      height='48px'
      p={1}
      sx={{
        cursor: 'pointer',
        listStyle: 'none',
        '&:hover': {
          backgroundColor: '#f4f4f4',
        },
      }}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      onMouseMove={() => handleIcon(true)}
      onMouseLeave={() => handleIcon(false)}
    >
      <Link href={`/posts/${post.id}`}>
        <Box pl={6} sx={{ flexGrow: 1 }}>
          {post.title}
        </Box>
      </Link>
      <Box sx={{ flexGrow: 0, display: icon ? 'block' : 'none' }}>
        <Box component='span' mr={2}>
          <Tooltip title='編集'>
            <EditIcon />
          </Tooltip>
        </Box>
        <Box
          component='span'
          mr={2}
          zIndex='100'
          onClick={() => deletePost(post.id)}
        >
          <Tooltip title='削除'>
            <DeleteIcon />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPost;
