import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { articlesState, authState, postsState } from '../../../store';
import PostList from '../../components/PostList';

type Props = {
  posts: {
    id: string;
    title: string;
    content: string;
  }[];
};

const Posts: NextPage<Props> = () => {
  const currentUser = useRecoilValue(authState);
  const posts = useRecoilValue(postsState); // 記事一覧
  const articles = useRecoilValue(articlesState);
  return (
    <>
      {currentUser && (
        <>
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

export default Posts;
