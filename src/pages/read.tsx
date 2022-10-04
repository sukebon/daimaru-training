import React from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { articlesState, authState, postsState } from '../../store';
import PostList from '../components/PostList';
import { Box, Container } from '@mui/system';

const Read = () => {
  const currentUser = useRecoilValue(authState);
  const posts = useRecoilValue(postsState); // 記事一覧
  const articles = useRecoilValue(articlesState);

  return (
    <>
      {currentUser && (
        <>
          <Head>
            <title>記事一覧</title>
          </Head>
          <Container maxWidth='md'>
            <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
              記事一覧
            </Box>
            <PostList posts={posts} articles={articles} />
          </Container>
        </>
      )}
    </>
  );
};

export default Read;
