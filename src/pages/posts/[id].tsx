import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { postsState } from '../../../store';
import Breadcrumb from '../../components/Breadcrumb';

const PostId = () => {
  const router = useRouter();
  const id = router.query.id;
  const posts = useRecoilValue(postsState); // 記事一覧
  const [filterPost, setFilterPost] = useState({
    title: '',
    id: '',
    content: '',
    subCategoryId: '',
  });

  useEffect(() => {
    const newPostObject: any = posts.find((post: { id: string }) => {
      if (post.id === id) return post;
    });
    setFilterPost(newPostObject);
  }, [id, posts]);

  return (
    <>
      {/* <Breadcrumb filterPost={filterPost} /> */}
      <Container maxWidth='md'>
        <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
          {filterPost.title}
        </Box>
        <Box
          width='100%'
          bgcolor='white'
          p={3}
          border='1px solid #e1e1e1'
          sx={{ overflowWrap: 'break-word' }}
        >
          <Typography width='100%'>{filterPost.content}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default PostId;
