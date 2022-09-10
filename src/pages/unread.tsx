import { CollectionsOutlined } from '@mui/icons-material';
import { Box, Container } from '@mui/system';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { articlesState, authState, postsState } from '../../store';
import AlreadyReadCount from '../components/AlreadyReadCount';
import PostList from '../components/PostList';

const Unread = () => {
  const currentUser = useRecoilValue(authState);
  const posts = useRecoilValue(postsState); // 記事一覧
  const articles = useRecoilValue(articlesState);
  const [unReadPosts, setUnReadPosts] = useState([]);

  //未読記事一覧
  React.useEffect(() => {
    const unReadArticles: any = articles.filter(
      (article: { members: string[] }) => {
        if (!article.members.includes(currentUser)) {
          return article;
        }
      }
    );
    const unReadArticlesId = unReadArticles.map((article: { id: string }) => {
      return article.id;
    });

    const filterPosts = posts.filter((post: { id: string }) => {
      if (unReadArticlesId.includes(post.id)) return post;
    });

    setUnReadPosts(filterPosts);
  }, [currentUser, articles, posts]);

  return (
    <>
      {currentUser && (
        <>
          <Head>
            <title>未読一覧</title>
          </Head>
          <Container maxWidth='md'>
            <Box component='h1' mt={6} sx={{ fontSize: '1.2rem' }}>
              未読一覧
            </Box>
            <PostList posts={unReadPosts} articles={articles} />
          </Container>
        </>
      )}
    </>
  );
};

export default Unread;
